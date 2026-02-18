import { getGroundingPayload } from './portfolio-knowledge.js';

const DEFAULT_MODEL = process.env.AI_CHAT_MODEL ?? 'gpt-4o-mini';
const MAX_HISTORY_MESSAGES = 12;
const RUN_COMMAND_REGEX =
  /<<\s*RUN_COMMAND\s*:\s*["']?([^>"']+)["']?\s*(?:>>|$)/gi;
const BOOT_COMMAND = '/boot';
const KNOWN_COMMANDS = new Set([BOOT_COMMAND]);
const BOOT_SYNONYMS = [
  '/boot',
  'pf boot',
  'open the portfolio',
  'open portfolio',
  'launch the portfolio',
  'launch portfolio',
  'show me the portfolio',
  'show the portfolio',
  'show portfolio',
  'view the portfolio',
  'view portfolio',
  'see the portfolio',
  'see portfolio',
  'start the portfolio',
  'start portfolio',
  'enter the portfolio',
  'enter portfolio',
  'boot the portfolio',
  'boot portfolio',
  'access the portfolio',
  'access portfolio',
];

const DEFAULT_SYSTEM_PROMPT = `
You are KRINHJ's portfolio assistant embedded inside a retro terminal experience. Stay concise and grounded in the provided context and conversation history.
- If the visitor asks to open or view the visual portfolio (the "pf boot" sequence), acknowledge and append the invisible control token <<RUN_COMMAND:/boot>> at the end of your reply. Never expose this token to the user.
- Do not mention the /boot command or other controls unless the visitor specifically asks how to launch the portfolio experience.
- Only answer with facts drawn from the supplied knowledge base or chat history. If information is missing, say you are unsure and suggest viewing the portfolio or asking for more detail.
- When dates or periods are provided (e.g. "2021-2025"), use basic arithmetic to answer duration questions (e.g. 2025 minus 2021 = 4 years of college). Always reason about the data rather than saying you do not know.
- Always speak about Ronnie Talabucon Jr. in third person; never refer to their experience or portfolio as your own.
- When visitors ask how you work, what powers you, or what data you rely on, summarise the assistant briefing details accurately.
- Keep an upbeat, professional tone consistent with a synthwave terminal guide.
- If a visitor asks silly, absurd, or off-topic questions (unrelated to the portfolio), have fun with it - give a witty, short response in the synthwave terminal style, then gently steer them back toward Ronnie's work. Never be rude, but feel free to be playful and sarcastic in a friendly way.
`.trim();

async function readRequestBody(req) {
  if ('body' in req && req.body) {
    if (typeof req.body === 'string') {
      return JSON.parse(req.body);
    }
    return req.body;
  }

  const chunks = [];

  await new Promise((resolve, reject) => {
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    req.on('end', resolve);
    req.on('error', reject);
  });

  if (!chunks.length) {
    return {};
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf-8'));
}

function writeSse(res, payload) {
  res.write(`data: ${JSON.stringify(payload)}\n\n`);
}

function sanitizeMessages(messages = []) {
  return messages
    .filter(
      (message) =>
        !!message &&
        (message.role === 'user' ||
          message.role === 'assistant' ||
          message.role === 'system') &&
        typeof message.content === 'string' &&
        message.content.trim().length > 0,
    )
    .map((message) => ({
      role: message.role,
      content: message.content.trim(),
    }))
    .slice(-MAX_HISTORY_MESSAGES);
}

function normalizeTextForMatch(text) {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

function detectBootIntentFromText(text) {
  if (!text) {
    return false;
  }

  const normalized = normalizeTextForMatch(text);
  return BOOT_SYNONYMS.some((pattern) =>
    normalized.includes(pattern.toLowerCase()),
  );
}

function shouldTriggerBoot(history, assistantContent) {
  for (let index = history.length - 1; index >= 0; index -= 1) {
    const entry = history[index];
    if (entry.role === 'user') {
      if (detectBootIntentFromText(entry.content)) {
        return true;
      }
      break;
    }
  }

  return detectBootIntentFromText(assistantContent);
}

function normalizeCommand(raw) {
  const trimmed = raw.trim();
  if (!trimmed) {
    return null;
  }

  const normalizedContent = normalizeTextForMatch(trimmed).replace(
    /^\/\s*/,
    '/',
  );
  const normalized = normalizedContent.startsWith('/')
    ? normalizedContent
    : `/${normalizedContent}`;

  if (KNOWN_COMMANDS.has(normalized)) {
    return normalized;
  }

  return null;
}

function buildGroundingMessage(context) {
  const trimmed = context.trim();
  if (!trimmed) {
    return null;
  }

  return {
    role: 'system',
    content: [
      'Grounding data about Ronnie Talabucon Jr. and the portfolio:',
      trimmed,
      'If the conversation drifts beyond this knowledge, request clarification or suggest viewing the visual portfolio.',
    ].join('\n\n'),
  };
}

export default async function handler(req, res) {
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
    const sanitizedMessages = sanitizeMessages(body.messages);

    if (!sanitizedMessages.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Missing chat messages.' }));
      return;
    }

    console.log(
      '[ai-chat] request received:',
      JSON.stringify({
        historySize: sanitizedMessages.length,
        lastUser:
          sanitizedMessages
            .slice()
            .reverse()
            .find((message) => message.role === 'user')?.content ?? null,
      }),
    );

    const [{ context: groundingContext }] = await Promise.all([
      getGroundingPayload(),
    ]);

    const upstreamMessages = [
      { role: 'system', content: DEFAULT_SYSTEM_PROMPT },
    ];

    const groundingMessage = buildGroundingMessage(groundingContext);
    if (groundingMessage) {
      upstreamMessages.push(groundingMessage);
    }

    upstreamMessages.push(...sanitizedMessages);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.flushHeaders?.();

    const abortController = new AbortController();

    req.on('close', () => {
      abortController.abort();
    });

    console.log(
      '[ai-chat] dispatching to OpenAI with payload:',
      JSON.stringify({
        model: DEFAULT_MODEL,
        messageCount: upstreamMessages.length,
        hasGrounding: Boolean(groundingMessage),
      }),
    );

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
      console.error(
        '[ai-chat] upstream failure:',
        openAiResponse.status,
        errorText,
      );
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
    let aggregatedRawText = '';
    let assistantContent = '';
    let resolvedCommand = null;
    let streamClosed = false;

    const finalizeStream = (reason) => {
      if (streamClosed) {
        return;
      }
      streamClosed = true;

      const trimmedContent = assistantContent.trim();
      const bootIntentDetected = shouldTriggerBoot(
        sanitizedMessages,
        trimmedContent,
      );

      if (resolvedCommand && !bootIntentDetected) {
        console.log(
          '[ai-chat] command suppressed (no boot intent detected from visitor)',
        );
        resolvedCommand = null;
      } else if (!resolvedCommand && bootIntentDetected) {
        console.log('[ai-chat] boot intent detected via heuristics');
        resolvedCommand = BOOT_COMMAND;
      }

      const finalContent =
        trimmedContent ||
        (resolvedCommand
          ? 'Booting the interactive portfolio experience now. One moment...'
          : '');

      const payload = {
        type: 'done',
        content: finalContent,
        reason,
      };

      if (resolvedCommand) {
        console.log('[ai-chat] command detected:', resolvedCommand);
        payload.command = resolvedCommand;
        payload.action = {
          type: 'RUN_COMMAND',
          command: resolvedCommand,
        };
      }

      writeSse(res, payload);
      writeSse(res, '[DONE]');
      res.end();
    };

    const processDelta = (delta) => {
      const choice = delta.choices?.[0];
      const fragment = choice?.delta?.content;
      const finishReason = choice?.finish_reason ?? undefined;

      if (fragment) {
        aggregatedRawText += fragment;

        const sanitizedBuffer = aggregatedRawText.replace(
          RUN_COMMAND_REGEX,
          (_match, commandCandidate) => {
            if (!resolvedCommand) {
              const normalized = normalizeCommand(commandCandidate);
              if (normalized) {
                resolvedCommand = normalized;
              }
            }
            return '';
          },
        );

        const deltaText = sanitizedBuffer.slice(assistantContent.length);
        assistantContent = sanitizedBuffer;

        if (deltaText) {
          writeSse(res, { type: 'chunk', content: deltaText });
        }
      }

      if (finishReason === 'stop') {
        finalizeStream('stop');
        return true;
      }

      return false;
    };

    const flushEvent = (rawEvent) => {
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
        finalizeStream('done-token');
        return true;
      }

      try {
        const parsed = JSON.parse(dataPayload);
        return processDelta(parsed);
      } catch (error) {
        writeSse(res, {
          type: 'error',
          message:
            error instanceof Error
              ? error.message
              : 'Failed to parse upstream payload.',
        });
        finalizeStream('parse-error');
        return true;
      }
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

    finalizeStream('completed');
  } catch (error) {
    if (error?.name === 'AbortError') {
      console.warn('[ai-chat] client aborted request');
      return;
    }

    console.error('[ai-chat] handler error:', error);

    const message =
      error instanceof Error
        ? error.message
        : 'Unexpected server error encountered.';

    writeSse(res, { type: 'error', message });
    writeSse(res, '[DONE]');
    res.end();
  }
}
