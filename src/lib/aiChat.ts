export type ChatRole = 'system' | 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface StreamDonePayload {
  type?: string;
  content?: string;
  command?: string;
  action?: {
    type?: string;
    command?: string;
  };
  reason?: string;
}

export interface StreamOptions {
  messages: ChatMessage[];
  onChunk: (chunk: string) => void;
  onComplete?: (payload?: StreamDonePayload) => void;
  onError?: (error: Error) => void;
}

const SSE_DELIMITER = '\n\n';

export function streamAiChat({
  messages,
  onChunk,
  onComplete,
  onError,
}: StreamOptions): AbortController {
  const controller = new AbortController();
  let hasCompleted = false;

  const complete = (payload?: StreamDonePayload) => {
    if (hasCompleted) {
      return;
    }
    hasCompleted = true;
    onComplete?.(payload);
  };

  (async () => {
    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        const errorText = await response.text();
        throw new Error(
          errorText || `Assistant request failed with status ${response.status}`,
        );
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      const flushEvent = (rawEvent: string) => {
        const lines = rawEvent.split('\n');
        let dataPayload = '';

        for (const line of lines) {
          if (line.startsWith('data:')) {
            dataPayload += line.slice(5).trim();
          }
        }

        if (!dataPayload) {
          return;
        }

        if (dataPayload === '[DONE]') {
          complete();
          return;
        }

        try {
          const payload = JSON.parse(dataPayload);

          if (payload.type === 'chunk' && typeof payload.content === 'string') {
            onChunk(payload.content);
          } else if (payload.type === 'done') {
            complete(payload);
          } else if (payload.type === 'error') {
            throw new Error(payload.message ?? 'Assistant unavailable');
          }
        } catch (error) {
          hasCompleted = true;
          onError?.(
            error instanceof Error
              ? error
              : new Error('Malformed stream payload'),
          );
        }
      };

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });

        let boundaryIndex = buffer.indexOf(SSE_DELIMITER);
        while (boundaryIndex !== -1) {
          const rawEvent = buffer.slice(0, boundaryIndex).trim();
          buffer = buffer.slice(boundaryIndex + SSE_DELIMITER.length);
          if (rawEvent) {
            flushEvent(rawEvent);
          }
          boundaryIndex = buffer.indexOf(SSE_DELIMITER);
        }
      }

      if (buffer.trim().length > 0) {
        flushEvent(buffer.trim());
      }

      complete();
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        return;
      }
      hasCompleted = true;
      onError?.(error as Error);
    }
  })();

  return controller;
}
