import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { FormEvent } from 'react';
import { Send, Info, X } from 'lucide-react';
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

const ASSISTANT_INFO_SUMMARY =
  "This assistant is the synthwave terminal guide for Ronnie Talabucon Jr.'s portfolio—it draws from the same curated profile content and design documentation that power the live experience. It can answer questions, surface highlights, and run commands like /boot when you want the full interface, all without reaching beyond what's published here.";

const RUN_COMMAND_MARKER_REGEX = /<<\s*RUN_COMMAND[^>]*(?:>>|$)/gi;

const sanitizeDirectiveMarkers = (text: string): string =>
  text.replace(RUN_COMMAND_MARKER_REGEX, '');

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
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [activeAssistantMessageId, setActiveAssistantMessageId] = useState<
    string | null
  >(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const streamAbortRef = useRef<AbortController | null>(null);
  const typingIntervalRef = useRef<number | null>(null);
  const clearTypingRef = useRef<(() => void) | null>(null);
  const navigate = useNavigate();

  const openInfoModal = useCallback(() => {
    setShowInfoModal(true);
  }, []);

  const closeInfoModal = useCallback(() => {
    setShowInfoModal(false);
  }, []);

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
    if (typingIntervalRef.current !== null) {
      window.clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    clearTypingRef.current?.();
    clearTypingRef.current = null;
    setIsStreaming(false);
    setActiveAssistantMessageId(null);
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
      if (!showInfoModal) {
        inputRef.current?.focus();
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [showInfoModal]);

  useEffect(() => {
    if (!showInfoModal) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeInfoModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showInfoModal, closeInfoModal]);

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

    const thinkingLine = 'Assistant is thinking';
    const assistantDraft = createMessage('assistant', [thinkingLine]);
    appendMessages([userMessageEntry, assistantDraft]);
    setActiveAssistantMessageId(assistantDraft.id);

    let aggregatedAssistantText = '';
    let displayedAssistantText = '';
    let pendingCharacters: string[] = [];
    let settleTimerId: number | null = null;

    const updateAssistantDraft = (text: string, placeholder = false) => {
      const normalized =
        text.length > 0 ? text : placeholder ? thinkingLine : '';
      const lines =
        normalized.length > 0 ? normalized.split(/\r?\n/) : [''];
      setTerminalHistory((prev) =>
        prev.map((message) =>
          message.id === assistantDraft.id ? { ...message, lines } : message,
        ),
      );
    };

    const clearTyping = () => {
      pendingCharacters = [];
      if (settleTimerId !== null) {
        window.clearInterval(settleTimerId);
        settleTimerId = null;
      }
      if (typingIntervalRef.current !== null) {
        window.clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    };

    clearTypingRef.current = clearTyping;

    const flushPendingCharacters = () => {
      if (pendingCharacters.length === 0) {
        if (typingIntervalRef.current !== null) {
          window.clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
        }
        return;
      }

      const batchSize = Math.max(
        1,
        Math.min(2, Math.ceil(pendingCharacters.length / 40)),
      );
      const nextBatch = pendingCharacters.splice(0, batchSize).join('');
      displayedAssistantText += nextBatch;
      updateAssistantDraft(displayedAssistantText, true);
    };

    const ensureTypingLoop = () => {
      if (typingIntervalRef.current !== null) {
        return;
      }
      typingIntervalRef.current = window.setInterval(
        flushPendingCharacters,
        38,
      );
    };

    setIsStreaming(true);
    streamAbortRef.current = streamAiChat({
      messages: [
        ...conversationContext,
        { role: 'user', content: rawInput } as ChatMessage,
      ],
      onChunk: (chunk) => {
        const sanitizedChunk = sanitizeDirectiveMarkers(chunk);
        if (!sanitizedChunk) {
          return;
        }
        aggregatedAssistantText = sanitizeDirectiveMarkers(
          aggregatedAssistantText + sanitizedChunk,
        );
        pendingCharacters = pendingCharacters.concat([...sanitizedChunk]);
        ensureTypingLoop();
      },
      onComplete: (payload?: StreamDonePayload) => {
        if (!aggregatedAssistantText && payload?.content) {
          aggregatedAssistantText = sanitizeDirectiveMarkers(payload.content);
        } else if (!aggregatedAssistantText) {
          aggregatedAssistantText =
            'Assistant did not return a response. Please try again.';
          updateAssistantDraft(aggregatedAssistantText);
        }

        const remainingCharacters =
          aggregatedAssistantText.slice(displayedAssistantText.length);
        if (
          remainingCharacters.length > 0 &&
          pendingCharacters.length === 0
        ) {
          pendingCharacters = pendingCharacters.concat([
            ...remainingCharacters,
          ]);
          ensureTypingLoop();
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
        setActiveAssistantMessageId(null);

        const finalizeMessage = () => {
          clearTyping();
          displayedAssistantText = aggregatedAssistantText;
          if (aggregatedAssistantText.length > 0) {
            updateAssistantDraft(aggregatedAssistantText);
          }
          clearTypingRef.current = null;
        };

        if (pendingCharacters.length === 0) {
          finalizeMessage();
        } else {
          settleTimerId = window.setInterval(() => {
            if (pendingCharacters.length === 0) {
              if (settleTimerId !== null) {
                window.clearInterval(settleTimerId);
                settleTimerId = null;
              }
              finalizeMessage();
            }
          }, 36);
        }
      },
      onError: (error) => {
        const errorMessage = error.message || 'Assistant unavailable';
        clearTyping();
        updateAssistantDraft(`Assistant error: ${errorMessage}`);
        streamAbortRef.current = null;
        setIsStreaming(false);
        setActiveAssistantMessageId(null);
        clearTypingRef.current = null;
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
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  color: 'hsl(var(--primary) / 0.6)',
                  fontSize: '0.75rem',
                }}
                className="mono-font"
              >
                Connected to krinhj.portfolio.local
              </div>
              <button
                type="button"
                className="terminal-info-btn"
                aria-label="Open assistant information"
                onClick={(event) => {
                  event.stopPropagation();
                  openInfoModal();
                }}
              >
                <Info size={16} strokeWidth={2} />
              </button>
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
                className={[
                  'terminal-message',
                  `terminal-message--${message.role}`,
                  isStreaming && activeAssistantMessageId === message.id
                    ? 'terminal-message--typing'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
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

      {showInfoModal && (
        <div
          className="terminal-info-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="terminal-info-title"
          onClick={closeInfoModal}
        >
          <div
            className="terminal-info-modal__content"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="terminal-info-modal__header">
              <div>
                <h2 id="terminal-info-title">About this assistant</h2>
                <p>
                  Your synthwave guide for Ronnie Talabucon Jr.&apos;s
                  portfolio.
                </p>
              </div>
              <button
                type="button"
                className="terminal-info-modal__close"
                aria-label="Close assistant information"
                onClick={closeInfoModal}
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>

            <div className="terminal-info-modal__body">
              <p>{ASSISTANT_INFO_SUMMARY}</p>
              <p>
                Ask about projects, skills, or command it to open the portfolio—
                and feel free to verify its instructions in natural language
                whenever you need a refresher.
              </p>
            </div>
          </div>
        </div>
      )}

      <MatrixTransition
        isActive={showMatrixTransition}
        onTransitionComplete={handleMatrixTransitionComplete}
        portfolioContent={<Index />}
      />
    </div>
  );
};

export default Terminal;
