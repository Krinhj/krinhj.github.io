import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { FormEvent } from 'react';
import { Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  useCommandHandler,
  createMessage,
  INITIAL_SYSTEM_LINES,
} from './CommandHandler';
import type { TerminalMessage } from './CommandHandler';
import {
  streamAiChat,
  type ChatMessage,
  type StreamDonePayload,
} from '../../lib/aiChat';
import { BootSequence } from '../Effects/BootSequence';
import { MatrixTransition } from '../Effects/MatrixTransition';
import Index from '../../pages/Index';

interface TerminalProps {
  className?: string;
}

const Terminal: React.FC<TerminalProps> = ({ className = '' }) => {
  const [terminalHistory, setTerminalHistory] = useState<TerminalMessage[]>([
    createMessage('system', INITIAL_SYSTEM_LINES),
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [showBootSequence, setShowBootSequence] = useState(false);
  const [showMatrixTransition, setShowMatrixTransition] = useState(false);
  const [terminalDark, setTerminalDark] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const streamAbortRef = useRef<AbortController | null>(null);
  const navigate = useNavigate();

  const appendMessages = useCallback(
    (messages: TerminalMessage[]) => {
      setTerminalHistory((prev) => [...prev, ...messages]);
    },
    [setTerminalHistory],
  );

  const replaceMessages = useCallback(
    (messages: TerminalMessage[]) => {
      setTerminalHistory(messages);
    },
    [setTerminalHistory],
  );

  const { handleCommand } = useCommandHandler({
    appendMessages,
    replaceMessages,
    setShowBootSequence,
  });

  const stopActiveStream = useCallback(() => {
    if (streamAbortRef.current) {
      streamAbortRef.current.abort();
      streamAbortRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  const handleBootComplete = () => {
    setShowBootSequence(false);

    setTimeout(() => {
      setTerminalDark(true);
    }, 300);

    setTimeout(() => {
      setShowMatrixTransition(true);
    }, 800);
  };

  const handleMatrixTransitionComplete = () => {
    navigate('/index');
  };

  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop =
        terminalContentRef.current.scrollHeight;
    }
  }, [terminalHistory, showBootSequence]);

  useEffect(() => {
    if (inputRef.current) {
      const focusTimer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      return () => clearTimeout(focusTimer);
    }
  }, []);

  useEffect(() => {
    const handleDocumentClick = () => {
      inputRef.current?.focus();
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  useEffect(
    () => () => {
      streamAbortRef.current?.abort();
    },
    [],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const rawInput = currentInput;
    const trimmed = rawInput.trim();

    if (!trimmed) {
      setCurrentInput('');
      return;
    }

    const userMessageEntry = createMessage('user', [rawInput]);

    if (trimmed.startsWith('/')) {
      stopActiveStream();
      appendMessages([userMessageEntry]);
      handleCommand(trimmed);
      setCurrentInput('');
      return;
    }

    stopActiveStream();

    const conversationContext: ChatMessage[] = terminalHistory
      .filter((message) => {
        if (message.role === 'assistant') {
          return true;
        }
        if (message.role === 'user') {
          const text = message.lines.join('\n').trim();
          return text.length > 0 && !text.startsWith('/');
        }
        return false;
      })
      .map((message) => ({
        role: message.role,
        content: message.lines.join('\n'),
      })) as ChatMessage[];

    const assistantDraft = createMessage('assistant', ['assistant is thinking...']);
    appendMessages([userMessageEntry, assistantDraft]);

    let aggregatedAssistantText = '';
    const updateAssistantDraft = (text: string, placeholder = false) => {
      const normalized =
        text.length > 0
          ? text
          : placeholder
          ? 'assistant is thinking...'
          : '';
      const lines =
        normalized.length > 0 ? normalized.split(/\r?\n/) : [''];
      setTerminalHistory((prev) =>
        prev.map((message) =>
          message.id === assistantDraft.id ? { ...message, lines } : message,
        ),
      );
    };

    setIsStreaming(true);
    streamAbortRef.current = streamAiChat({
      messages: [
        ...conversationContext,
        { role: 'user', content: rawInput } as ChatMessage,
      ],
      onChunk: (chunk) => {
        aggregatedAssistantText += chunk;
        updateAssistantDraft(aggregatedAssistantText, true);
      },
      onComplete: (payload?: StreamDonePayload) => {
        if (!aggregatedAssistantText && payload?.content) {
          aggregatedAssistantText = payload.content;
          updateAssistantDraft(aggregatedAssistantText);
        } else if (!aggregatedAssistantText) {
          updateAssistantDraft('Assistant did not return a response. Please try again.');
        }

        const directive =
          payload?.action?.command ??
          payload?.command ??
          payload?.action ??
          null;
        if (typeof directive === 'string' && directive.trim().length > 0) {
          const normalizedDirective = directive.trim();
          handleCommand(
            normalizedDirective.startsWith('/')
              ? normalizedDirective
              : `/${normalizedDirective}`,
          );
        }

        streamAbortRef.current = null;
        setIsStreaming(false);
      },
      onError: (error) => {
        const errorMessage = error.message || 'Assistant unavailable';
        updateAssistantDraft(`Assistant error: ${errorMessage}`);
        streamAbortRef.current = null;
        setIsStreaming(false);
      },
    });

    setCurrentInput('');
  };

  return (
    <div
      className={className}
      style={{
        width: '100%',
        maxWidth: 'min(64rem, 95vw)',
        margin: '3rem auto',
      }}
    >
      <div
        style={{
          borderRadius: '8px',
          overflow: 'hidden',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          border: '2px solid hsl(var(--primary) / 0.3)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'none',
          minHeight: '620px',
          height: 'clamp(620px, 80vh, 720px)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            padding: '1.25rem',
            borderBottom: '1px solid hsl(var(--primary) / 0.3)',
            backgroundColor: 'hsl(var(--primary) / 0.05)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: 'hsl(var(--primary))',
                  boxShadow: 'var(--shadow-glow)',
                  animation: 'energy-pulse 2s ease-in-out infinite',
                }}
              />
              <span
                style={{
                  color: 'hsl(var(--primary))',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
                className="mono-font"
              >
                SYNTHWAVE TERMINAL
              </span>
            </div>
            <div
              style={{
                color: 'hsl(var(--primary) / 0.6)',
                fontSize: '0.75rem',
              }}
              className="mono-font"
            >
              Connected to krinhj.portfolio.local
            </div>
          </div>
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                color: 'hsl(var(--primary))',
                fontFamily: 'Share Tech Mono, monospace',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              KRINHJ Portfolio Terminal
            </h1>
            <p
              style={{
                marginTop: '0.4rem',
                color: 'hsl(var(--foreground) / 0.75)',
                fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                fontFamily: 'Share Tech Mono, monospace',
              }}
            >
              Ask anything about my work or type a command. Say "open the portfolio" to launch the full experience.
            </p>
          </div>
        </div>

        <div
          ref={terminalContentRef}
          className="mono-font terminal-history"
          role="log"
          aria-live="polite"
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '1rem',
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
            scrollBehavior: 'smooth',
            position: 'relative',
          }}
        >
          {terminalDark && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'hsl(var(--background) / 0.95)',
                zIndex: 20,
                transition: 'opacity 0.5s ease-out',
                opacity: 1,
              }}
            />
          )}

          {showBootSequence && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BootSequence onComplete={handleBootComplete} inTerminal />
            </div>
          )}

          {!showBootSequence &&
            terminalHistory.map((message) => (
              <div
                key={message.id}
                className={`terminal-message terminal-message--${message.role}`}
              >
                <pre className="terminal-message__text">
                  {message.lines.join('\n')}
                </pre>
              </div>
            ))}
        </div>

        <form className="terminal-footer" onSubmit={handleSubmit}>
          <input
            id="terminal-input"
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(event) => setCurrentInput(event.target.value)}
            autoComplete="off"
            spellCheck={false}
            className="terminal-input"
            placeholder='Ask about projects or type commands like "/help"'
            aria-label="Chat input"
            disabled={isStreaming || showBootSequence || showMatrixTransition}
          />
          <button
            type="submit"
            className="terminal-send-btn"
            aria-label="Send message"
            disabled={isStreaming || showBootSequence || showMatrixTransition}
          >
            <Send size={16} strokeWidth={2} />
          </button>
        </form>

        <div
          style={{
            padding: '0.75rem',
            borderTop: '1px solid hsl(var(--primary) / 0.2)',
            backgroundColor: 'hsl(var(--primary) / 0.05)',
            color: 'hsl(var(--primary) / 0.6)',
            fontSize: '0.75rem',
            textAlign: 'center',
          }}
          className="mono-font"
        >
          Try "/help" for commands or ask the assistant to open the portfolio.
        </div>
      </div>

      <MatrixTransition
        isActive={showMatrixTransition}
        onTransitionComplete={handleMatrixTransitionComplete}
        portfolioContent={<Index />}
      />
    </div>
  );
};

export default Terminal;
