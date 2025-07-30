import { useNavigate } from 'react-router-dom';

interface CommandHandlerProps {
  setTerminalHistory: React.Dispatch<React.SetStateAction<string[]>>;
  setIsHacking: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBootSequence?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useCommandHandler = ({ setTerminalHistory, setIsHacking, setShowBootSequence }: CommandHandlerProps) => {
  const navigate = useNavigate();

  const pfCommands: { [key: string]: () => string[] } = {
    help: () => [
      '',
      '═══════════════════════════════════════',
      '  PORTFOLIO COMMAND SUITE v2.0',
      '═══════════════════════════════════════',
      '',
      '  pf boot       → Launch portfolio interface',
      '  pf about      → Display bio information',
      '  pf projects   → List all projects',
      '  pf skills     → Show technical skills',
      '  pf contact    → Display contact info',
      '  pf quote      → Show inspirational quote',
      '  pf stats      → Display system stats',
      '  pf matrix     → Enter the matrix...',
      '  pf hack       → Hollywood hacker simulation',
      '  pf easteregg  → Find the hidden surprise',
      '  clear         → Clear terminal',
      '  exit          → Close terminal (same as pf boot)',
      '',
      '═══════════════════════════════════════',
    ],
    boot: () => {
      // Clear terminal and trigger boot sequence
      setTerminalHistory([]);
      if (setShowBootSequence) {
        setShowBootSequence(true);
      }
      return [];
    },
    about: () => [
      '',
      '╔══════════════════════════════════════╗',
      '║           RONNIE TALABUCON JR.       ║',
      '╠══════════════════════════════════════╣',
      '║ Status: Fresh CS Graduate            ║',
      '║ Role: Full-Stack Developer           ║',
      '║ Specialty: Database Architecture     ║',
      '║ Location: Roxas City/Iloilo, PH     ║',
      '║ Philosophy: Leave it better than     ║',
      '║             I found it               ║',
      '║ Quote: "Mieux que jamais"            ║',
      '╚══════════════════════════════════════╝',
    ],
    projects: () => [
      '',
      '▓▓▓ ACTIVE PROJECTS ▓▓▓',
      '',
      '→ GetMeHired [LIVE]',
      '  AI job tracking with OpenAI',
      '  Tech: React, Node.js, OpenAI API',
      '  URL: get-me-hired.vercel.app',
      '',
      '→ DBM Government System [DEPLOYED]',
      '  National database migration',
      '  Tech: Java, SQL Server, REST API',
      '',
      '→ MediTriage AI [ON HOLD]',
      '  Healthcare chatbot',
      '  Tech: Python, Pandas, Hugging Face',
      '',
      '→ TDEE Calculator API [PRODUCTION]',
      '  RapidAPI marketplace',
      '  Tech: Node.js, Express, Railway',
    ],
    skills: () => [
      '',
      '▓▓▓ TECHNICAL ARSENAL ▓▓▓',
      '',
      'Languages:',
      '  Python, SQL, TypeScript, JavaScript',
      '  C#, Java, PHP, HTML5, CSS3',
      '',
      'Frameworks:',
      '  React, Node.js, Express, .NET Framework',
      '  Tauri V2, Tailwind CSS, Bootstrap',
      '',
      'Databases:',
      '  SQL Server, MySQL, MongoDB, Supabase',
      '',
      'Tools & Cloud:',
      '  VS Code, Visual Studio 2022, Git',
      '  Railway, Vercel, RapidAPI, Postman',
    ],
    contact: () => [
      '',
      '▓▓▓ CONTACT PROTOCOLS ▓▓▓',
      '',
      '📧 Email: ron.talabuconjr.dev@gmail.com',
      '💼 LinkedIn: linkedin.com/in/ronnie-talabucon-jr',
      '💻 GitHub: github.com/Krinhj',
      '📍 Location: Roxas City/Iloilo City, Philippines',
      '',
      'Status: Available for opportunities',
      'Response Time: < 24 hours',
      'Preferred: Email or LinkedIn',
    ],
    quote: () => [
      '',
      '     ╔══════════════════════════════╗',
      '     ║                              ║',
      '     ║    "Mieux que jamais"        ║',
      '     ║                              ║',
      '     ║       Better than ever       ║',
      '     ║                              ║',
      '     ║   - Ronnie\'s Life Motto      ║',
      '     ║                              ║',
      '     ╚══════════════════════════════╝',
      '',
      'Commitment to continuous improvement',
      'and leaving everything better than found.',
    ],
    stats: () => [
      '',
      '▓▓▓ SYSTEM STATISTICS ▓▓▓',
      '',
      'Status: Fresh Graduate (2025)',
      'Projects Completed: 10+',
      'Code Quality: Production-ready',
      'Government Clearance: ✓ (DBM Intern)',
      'Team Collaboration: Excellent',
      'Problem Solving: Systematic',
      'Continuous Learning: Active',
      '',
      'Specialization: Full-Stack + Database',
      'Experience: Real-world + Academic',
      'Availability: Open to opportunities',
    ],
    matrix: () => [
      '',
      '⠀⠀⠀⠀⠀⠀⠀⣠⣴⣶⣿⣿⣷⣶⣄⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
      '⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀',
      '⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠀⠀⠀⠀',
      '⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⠿⠿⠿⢿⣿⣿⣿⠏⠀⠀⠀⠀',
      '⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠉⠻⠏⠀⠀⠀⠀⠀',
      '⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
      '',
      'Wake up, Ronnie... The portfolio has you.',
      'Follow the red pixels to "pf boot".',
    ],
    hack: () => {
      setIsHacking(true);
      const hackingLines = [
        'INITIATING HACK SEQUENCE...',
        'Connecting to mainframe...',
        'Bypassing firewall... ████████ 100%',
        'Decrypting password database...',
        'Access granted to secure systems...',
        'Downloading classified files...',
        'Installing backdoor...',
        'Covering digital tracks...',
        'HACK COMPLETE - SYSTEM COMPROMISED'
      ];
      
      let lineIndex = 0;
      const interval = setInterval(() => {
        if (lineIndex < hackingLines.length) {
          setTerminalHistory(prev => [...prev, `[HACKING] ${hackingLines[lineIndex]}`]);
          lineIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsHacking(false);
            setTerminalHistory(prev => [...prev, '', 'Just kidding! This is just for fun 😄', 'Type "pf boot" to launch the real portfolio']);
          }, 1000);
        }
      }, 600);
      
      return ['', 'INITIATING HOLLYWOOD HACKER MODE...', ''];
    },
    easteregg: () => [
      '',
      '🎉 CONGRATULATIONS! 🎉',
      '',
      'You found the secret command!',
      '',
      '  ╔═══════════════════════════════╗',
      '  ║  🚀 BONUS ACHIEVEMENT UNLOCKED ║',
      '  ║                               ║',
      '  ║     "Command Line Explorer"   ║',
      '  ║                               ║',
      '  ║   +50 Developer XP Points     ║',
      '  ╚═══════════════════════════════╝',
      '',
      'Fun fact: This portfolio combines',
      'interactive CLI, 3D graphics, and',
      'will soon have custom AI music!',
      '',
      'Now type "pf boot" to see the magic!',
    ],
    clear: () => {
      setTerminalHistory([
        '> SYNTHWAVE PORTFOLIO SYSTEM v2.0',
        '> Terminal cleared. Type "pf help" for commands.',
      ]);
      return [];
    },
    exit: () => {
      navigate('/');
      return [
        '',
        '> Exiting terminal mode...',
      ];
    }
  };

  const handleCommand = (
    input: string,
    terminalHistory: string[],
    setCurrentInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const command = input.toLowerCase().trim();
    const newHistory = [...terminalHistory, `> ${input}`];
    
    if (pfCommands[command]) {
      const output = pfCommands[command]();
      if (output.length > 0) {
        setTerminalHistory([...newHistory, ...output]);
      }
    } else if (command.startsWith('pf ')) {
      const subCommand = command.slice(3);
      if (pfCommands[subCommand]) {
        const output = pfCommands[subCommand]();
        if (output.length > 0) {
          setTerminalHistory([...newHistory, ...output]);
        }
      } else {
        setTerminalHistory([...newHistory, '', `Unknown command: ${command}`, 'Type "pf help" for available commands.']);
      }
    } else if (command === '') {
      setTerminalHistory(newHistory);
    } else {
      setTerminalHistory([...newHistory, '', `Unknown command: ${command}`, 'Type "pf help" for available commands.']);
    }
    
    setCurrentInput('');
  };

  return { handleCommand };
};