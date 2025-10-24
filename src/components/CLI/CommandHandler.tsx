import { useNavigate } from 'react-router-dom';

export type TerminalMessage = {
  id: string;
  role: 'system' | 'assistant' | 'user';
  lines: string[];
};

export const createMessage = (
  role: TerminalMessage['role'],
  lines: string[],
): TerminalMessage => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role,
  lines,
});

export const INITIAL_SYSTEM_LINES = [
  'Greetings, explorer!',
  'Ask anything about Ronnie Talabucon Jr. - projects, experience, or skills - and I will guide you.',
  'Need the full portfolio interface? Ask me to open it or type "/boot".',
];

export const CLEARED_SYSTEM_LINES = [
  'Terminal cleared.',
  'I am ready for new questions about Ronnie Talabucon Jr.',
  'Type "/help" for commands or ask me to open the portfolio.',
];

const HELP_LINES = [
  '',
  '==============================',
  '  WELCOME TO THE KRINHJ TERMINAL',
  '==============================',
  '',
  ' Type naturally to ask about projects, experience, or skills.',
  ' You can also run the visual portfolio anytime:',
  '',
  '  /boot  -> Launch the full portfolio interface',
  '  /clear -> Reset terminal output',
  '  /exit  -> Exit terminal (same as /boot)',
  '',
  '==============================',
];

interface CommandHandlerProps {
  appendMessages: (messages: TerminalMessage[]) => void;
  replaceMessages: (messages: TerminalMessage[]) => void;
  setShowBootSequence?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useCommandHandler = ({
  appendMessages,
  replaceMessages,
  setShowBootSequence,
}: CommandHandlerProps) => {
  const navigate = useNavigate();

  const sendLines = (
    lines: string[],
    role: TerminalMessage['role'] = 'assistant',
  ) => {
    appendMessages([createMessage(role, lines)]);
  };

  const commands: Record<string, () => void> = {
    help: () => sendLines(HELP_LINES),
    boot: () => {
      replaceMessages([]);
      setShowBootSequence?.(true);
    },
    clear: () =>
      replaceMessages([createMessage('system', CLEARED_SYSTEM_LINES)]),
    exit: () => {
      sendLines(['', '> Exiting terminal mode...']);
      navigate('/index');
    },
  };

  const handleUnknownCommand = (display: string) => {
    const fallback = display.trim() || display || 'command';
    sendLines([
      '',
      `Unknown command: ${fallback}`,
      'Type "/help" for available commands.',
    ]);
  };

  const handleCommand = (input: string) => {
    const normalized = input.trim().toLowerCase();

    if (!normalized) {
      return;
    }

    if (normalized.startsWith('/')) {
      const commandKey = normalized.slice(1);
      if (commands[commandKey]) {
        commands[commandKey]();
        return;
      }
      handleUnknownCommand(input);
      return;
    }

    handleUnknownCommand(input);
  };

  return { handleCommand };
};
