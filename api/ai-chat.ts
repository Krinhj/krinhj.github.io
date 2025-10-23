import type { IncomingMessage, ServerResponse } from 'http';

type ApiRequest = IncomingMessage & {
  method?: string;
};

type ApiResponse = ServerResponse & {
  setHeader(name: string, value: string): void;
  write(chunk: any): void;
  end(chunk?: any): void;
  writeHead?(statusCode: number, statusMessage?: string): ApiResponse;
  flushHeaders?(): void;
};

type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

type RequestBody = {
  messages?: ChatMessage[];
};

const DEFAULT_MODEL = process.env.AI_CHAT_MODEL ?? 'gpt-4o-mini';

const DEFAULT_SYSTEM_PROMPT = `
You are KRINHJ's portfolio assistant. Respond concisely, using only the facts supplied in the conversation or future knowledge base.
If you are asked to open the visual portfolio, respond with an action payload: {"type":"RUN_COMMAND","command":"/boot"} after acknowledging.
If you do not know the answer, say so and suggest checking the projects or requesting more detail from Ronnie.
`.trim();

async function readRequestBody(req: ApiRequest): Promise<RequestBody> {
  if ('body' in req && req.body) {
    return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  }

  const chunks: Buffer[] = [];

  await new Promise<void>((resolve, reject) => {
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    req.on('end', resolve);
    req.on('error', reject);
  });

  if (chunks.length === 0) {
    return {};
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf-8'));
}

function writeSse(res: ApiResponse, payload: unknown) {
  res.write(`data: ${JSON.stringify(payload)}\n\n`);
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST, OPTIONS');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        error: 'Missing OPENAI_API_KEY environment variable.',
      }),
    );
    return;
  }

  try {
    const body = await readRequestBody(req);
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Missing chat messages.' }));
      return;
    }

    const upstreamMessages: ChatMessage[] = [
      { role: 'system', content: DEFAULT_SYSTEM_PROMPT },
      ...messages,
    ];

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.flushHeaders?.();

    const abortController = new AbortController();

    req.on('close', () => {
      abortController.abort();
    });

    const openAiResponse = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: DEFAULT_MODEL,
          stream: true,
          messages: upstreamMessages,
        }),
        signal: abortController.signal,
      },
    );

    if (!openAiResponse.ok || !openAiResponse.body) {
      const errorText = await openAiResponse.text();
      res.statusCode = openAiResponse.status;
      writeSse(res, {
        type: 'error',
        message:
          errorText || `Upstream error ${openAiResponse.status.toString()}`,
      });
      writeSse(res, '[DONE]');
      res.end();
      return;
    }

    const reader = openAiResponse.body.getReader();
    const decoder = new TextDecoder('utf-8');
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
        return false;
      }

      if (dataPayload === '[DONE]') {
        writeSse(res, { type: 'done' });
        writeSse(res, '[DONE]');
        res.end();
        return true;
      }

      try {
        const parsed = JSON.parse(dataPayload);
        const delta = parsed.choices?.[0]?.delta;
        const finishReason = parsed.choices?.[0]?.finish_reason;
        const contentChunk = delta?.content as string | undefined;

        if (contentChunk) {
          writeSse(res, { type: 'chunk', content: contentChunk });
        }

        if (finishReason === 'stop') {
          writeSse(res, { type: 'done' });
          writeSse(res, '[DONE]');
          res.end();
          return true;
        }
      } catch (error) {
        writeSse(res, {
          type: 'error',
          message:
            error instanceof Error
              ? error.message
              : 'Failed to parse upstream payload.',
        });
        writeSse(res, '[DONE]');
        res.end();
        return true;
      }

      return false;
    };

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      let boundaryIndex = buffer.indexOf('\n\n');
      while (boundaryIndex !== -1) {
        const rawEvent = buffer.slice(0, boundaryIndex).trim();
        buffer = buffer.slice(boundaryIndex + 2);
        if (rawEvent) {
          const shouldTerminate = flushEvent(rawEvent);
          if (shouldTerminate) {
            return;
          }
        }
        boundaryIndex = buffer.indexOf('\n\n');
      }
    }

    if (buffer.trim().length > 0) {
      const shouldTerminate = flushEvent(buffer.trim());
      if (shouldTerminate) {
        return;
      }
    }

    writeSse(res, { type: 'done' });
    writeSse(res, '[DONE]');
    res.end();
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      res.end();
      return;
    }

    res.statusCode = 500;
    res.end(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : 'Unexpected server error encountered.',
      }),
    );
  }
}
