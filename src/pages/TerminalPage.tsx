import React, { useState, useEffect, useRef } from 'react';

interface TerminalPageProps {
  onBootStart: () => void;
}

export const TerminalPage: React.FC<TerminalPageProps> = ({ onBootStart }) => {
  const [terminalHistory, setTerminalHistory] = useState([
    '> SYNTHWAVE PORTFOLIO SYSTEM v2.0',
    '> Initializing cyberpunk interface...',
    '> Type "pf help" for available commands',
    '> Type "pf boot" to launch portfolio'
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isHacking, setIsHacking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus CLI input
  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, []);

  // Keep focus on input
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // CLI Commands
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
      onBootStart();
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
      onBootStart();
      return [
        '',
        '> Exiting terminal mode...',
      ];
    }
  };

  const handleCommand = (input: string) => {
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
    }
  };

  return (
    <div className="fixed inset-0 bg-black font-mono text-sm z-50 overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="cyberpunk-grid" />
      
      {/* Terminal */}
      <div className="flex flex-col h-full">
        {/* Terminal Header */}
        <div className="flex items-center justify-between p-4 border-b border-primary/30 bg-primary/5 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-[0_0_10px_theme(colors.primary)]" />
            <span className="text-primary font-bold uppercase tracking-wider">SYNTHWAVE TERMINAL</span>
          </div>
          <div className="text-primary/60 text-xs">
            Connected to krinhj.portfolio.local
          </div>
        </div>
        
        {/* Terminal Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-1">
          {terminalHistory.map((line, index) => (
            <div 
              key={index} 
              className={`whitespace-pre-wrap break-words ${
                line.startsWith('>') 
                  ? 'text-primary' 
                  : line.includes('[HACKING]')
                    ? 'text-red-600 font-bold animate-pulse'
                    : line.includes('▓') || line.includes('═') || line.includes('╔') 
                      ? 'text-primary/80' 
                      : 'text-green-400'
              }`}
            >
              {line}
            </div>
          ))}
          
          {/* Input Line */}
          <div className="flex items-start gap-2 mt-4 min-h-[20px]">
            <span className="text-primary font-bold flex-shrink-0">{'>'}</span>
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-transparent text-green-400 font-mono outline-none border-none w-full pl-4 caret-transparent"
                placeholder={currentInput ? "" : "Type 'pf help' for commands..."}
                autoComplete="off"
                spellCheck="false"
                autoFocus
              />
              {/* Custom Cursor */}
              <div 
                className="absolute top-0 w-[3px] h-4 bg-green-400 animate-pulse shadow-[0_0_5px_theme(colors.green.400)] pointer-events-none"
                style={{
                  left: currentInput.length === 0
                    ? '16px'
                    : `${20 + (currentInput.length * 8.4)}px`
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Terminal Footer */}
        <div className="p-2 border-t border-primary/30 bg-primary/5 text-primary/60 text-xs text-center flex-shrink-0">
          Press TAB for autocomplete • CTRL+C to interrupt • Type "pf boot" to launch portfolio
        </div>
      </div>
    </div>
  );
};