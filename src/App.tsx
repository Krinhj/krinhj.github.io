import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App: React.FC = () => {
  const [isBooted, setIsBooted] = useState(false);
  const [showCLI, setShowCLI] = useState(true);
  const [currentSection, setCurrentSection] = useState('terminal');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [scanlinePosition, setScanlinePosition] = useState(0);
  const [terminalHistory, setTerminalHistory] = useState([
    '> SYNTHWAVE PORTFOLIO SYSTEM v2.0',
    '> Initializing cyberpunk interface...',
    '> Type "pf help" for available commands',
    '> Type "pf boot" to launch portfolio'
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isHacking, setIsHacking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus CLI input
  useEffect(() => {
    if (showCLI && inputRef.current) {
      // Small delay to ensure the element is rendered
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [showCLI]);

  // Keep focus on input
  useEffect(() => {
    const handleClick = () => {
      if (showCLI && inputRef.current) {
        inputRef.current.focus();
      }
    };

    if (showCLI) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [showCLI]);

  // Subtle pulse effect for grid
  useEffect(() => {
    const interval = setInterval(() => {
      setScanlinePosition(prev => (prev + 0.2) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Function to return to CLI with fresh terminal
  const returnToCLI = () => {
    setShowCLI(true);
    setCurrentSection('terminal');
    setIsBooted(false);
    // Clear terminal and show fresh start message
    setTerminalHistory([
      '> SYNTHWAVE PORTFOLIO SYSTEM v2.0',
      '> Welcome back to terminal mode.',
      '> Type "pf help" for available commands',
      '> Type "pf boot" to launch portfolio again'
    ]);
    setCurrentInput('');
    
    // Focus input after a short delay
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

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
      setTimeout(() => {
        setIsBooted(true);
        setShowCLI(false);
        setCurrentSection('portfolio');
      }, 2000);
      return [
        '',
        '> Initializing synthwave interface...',
        '> Loading 3D grid systems... ████████ 100%',
        '> Activating holographic displays... ████████ 100%',
        '> Establishing neural connections... ████████ 100%',
        '> Welcome to the future, Ronnie.',
        '> Launching portfolio in 2 seconds...',
      ];
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
      setTimeout(() => {
        setIsBooted(true);
        setShowCLI(false);
        setCurrentSection('portfolio');
      }, 1000);
      return [
        '',
        '> Exiting terminal mode...',
        '> Launching graphical interface...',
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

  // Audio control
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  // CLI Terminal Component
  const TerminalCLI = () => (
    <div className="terminal-cli">
      {/* Terminal Header */}
      <div className="terminal-header">
        <div className="terminal-controls">
          <div className="terminal-dot"></div>
          <span className="terminal-title">SYNTHWAVE TERMINAL</span>
        </div>
        <div className="terminal-connection">
          Connected to krinhj.portfolio.local
        </div>
      </div>
      
      {/* Terminal Content */}
      <div className="terminal-content">
        {terminalHistory.map((line, index) => (
          <div 
            key={index} 
            className={`terminal-line ${
              line.startsWith('>') 
                ? 'text-red-400' 
                : line.includes('[HACKING]')
                  ? 'hacking-text'
                  : line.includes('▓') || line.includes('═') || line.includes('╔') 
                    ? 'text-red-300' 
                    : 'text-green-400'
            }`}
          >
            {line}
          </div>
        ))}
        
        {/* Current Input Line */}
        <div className="terminal-input-line" onClick={() => inputRef.current?.focus()}>
          <span className="terminal-prompt">{'>'}</span>
          <div className="input-with-cursor">
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="terminal-input"
              placeholder={currentInput ? "" : "Type 'pf help' for commands..."}
              autoComplete="off"
              spellCheck="false"
              autoFocus
            />
            <div 
              className="terminal-cursor"
              style={{
                left: currentInput.length === 0
                  ? '12px' // Empty: positioned before placeholder
                  : `${16 + (currentInput.length * 8.4)}px` // Typing: after text
              }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Terminal Footer */}
      <div className="terminal-footer">
        Press TAB for autocomplete • CTRL+C to interrupt • Type "pf boot" to launch portfolio
      </div>
    </div>
  );

  // 3D Holographic Grid Component
  const HolographicGrid = () => (
    <div className="holographic-grid">
      {/* 3D Grid Container */}
      <div className="grid-3d-container">
        {/* Horizontal Grid Lines with 3D depth */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="grid-line-horizontal"
            style={{
              top: `${i * 10}%`,
              transform: `rotateX(60deg) translateZ(${i * -20}px)`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
        
        {/* Vertical Grid Lines with 3D depth */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="grid-line-vertical"
            style={{
              left: `${i * 8.33}%`,
              transform: `rotateX(60deg) rotateY(10deg) translateZ(${i * -15}px)`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
        
        {/* Snaking Energy Lines */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`snake-${i}`}
            className="energy-snake"
            style={{
              left: `${i * 30}%`,
              top: `${20 + i * 20}%`,
              transform: `rotateX(45deg) rotateY(${i * 15}deg) translateZ(${i * -30}px)`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}
      </div>
      
      {/* Ambient glow */}
      <div className="ambient-glow" />
      
      {/* Elegant floating elements */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="floating-element"
          style={{
            left: `${20 + (i * 15)}%`,
            top: `${25 + (i % 2) * 30}%`,
            animationDelay: `${i * 0.8}s`,
            transform: `translateZ(${i * -20}px)`,
          }}
        />
      ))}
    </div>
  );

  // Holographic Text Component
  const HolographicText: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <div className={`holographic-text ${className}`}>
      <div className="holographic-blur">{children}</div>
      <div className="holographic-main">{children}</div>
      <div className="holographic-glow" />
    </div>
  );

  // Simple Button Component - NO GLOWING PROP
  const NeonButton: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => (
    <button
      onClick={onClick}
      className="neon-button"
    >
      {children}
    </button>
  );

  // Project data
  const projects = [
    {
      title: "GetMeHired",
      description: "AI-powered job application tracking with resume builder and cover letter writer using OpenAI API.",
      tech: ["React", "Node.js", "OpenAI API", "Vercel"],
      link: "https://get-me-hired.vercel.app",
      status: "LIVE"
    },
    {
      title: "DBM Government System",
      description: "National Tax Allocation database migration and REST API development for Department of Budget and Management.",
      tech: ["Java", "SQL Server", "REST API", "MongoDB"],
      status: "DEPLOYED"
    },
    {
      title: "MediTriage AI",
      description: "Healthcare chatbot for medical triage using machine learning to determine treatment urgency.",
      tech: ["Python", "Pandas", "Hugging Face", "DDXPlus"],
      status: "ON HOLD"
    },
    {
      title: "TDEE Calculator API",
      description: "Production REST API for Total Daily Energy Expenditure calculation, available on RapidAPI marketplace.",
      tech: ["Node.js", "Express", "Railway", "RapidAPI"],
      status: "PRODUCTION"
    }
  ];

  // Project Card Component
  const ProjectCard: React.FC<{ title: string; description: string; tech: string[]; link?: string; status: string }> = ({ title, description, tech, link, status }) => (
    <div className="project-card">
      <div className="project-card-glow" />
      <div className="project-card-content">
        <div className="project-card-accent" />
        
        <HolographicText className="project-title">{title}</HolographicText>
        <p className="project-description">{description}</p>
        
        <div className="project-tech">
          {tech.map((t, i) => (
            <span key={i} className="tech-tag">{t}</span>
          ))}
        </div>
        
        {status && (
          <div className="project-status">STATUS: {status}</div>
        )}
        
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <NeonButton>ACCESS PROJECT</NeonButton>
          </a>
        )}
      </div>
    </div>
  );

  // Main Portfolio Component
  const Portfolio = () => (
    <div className="portfolio-main">
      <HolographicGrid />
      
      {/* Audio Control */}
      <div className="audio-control">
        <NeonButton onClick={toggleAudio}>
          {audioEnabled ? '🎵 AUDIO: ON' : '🔇 AUDIO: OFF'}
        </NeonButton>
      </div>

      {/* CLI Return Button - NOW WORKING! */}
      <div className="cli-return">
        <NeonButton onClick={returnToCLI}>
          📟 RETURN TO CLI
        </NeonButton>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <HolographicText className="hero-name">
            RONNIE TALABUCON JR.
          </HolographicText>
          <div className="hero-username">{'>'} KRINHJ_</div>
          <div className="hero-title">
            Full-Stack Developer • Software Engineer • Database Architect
          </div>
          <div className="hero-location">
            📍 Roxas City/Iloilo City, Philippines
          </div>
          <div className="hero-description">
            Building impactful software with a mission to leave every project 
            better than I found it.
          </div>
          
          <div className="hero-actions">
            <a href="https://github.com/Krinhj" target="_blank" rel="noopener noreferrer">
              <NeonButton>💻 GITHUB</NeonButton>
            </a>
            <a href="https://www.linkedin.com/in/ronnie-talabucon-jr-30528b31b" target="_blank" rel="noopener noreferrer">
              <NeonButton>💼 LINKEDIN</NeonButton>
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <HolographicText className="section-title">PROJECT MATRIX</HolographicText>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section">
        <HolographicText className="section-title">EXPERIENCE LOG</HolographicText>
        <div className="experience-timeline">
          <div className="timeline-item">
            <div className="timeline-dot active" />
            <h3 className="experience-title">Backend Developer Intern</h3>
            <p className="experience-company">Department of Budget and Management • Feb 2025 - May 2025</p>
            <ul className="experience-details">
              <li>• Migrated MongoDB to SQL Database for National Tax Allocation system</li>
              <li>• Built automated Excel data scraper with coordinate detection</li>
              <li>• Developed REST APIs using Java MVC framework</li>
              <li>• Processed regional data across all Philippines regions</li>
            </ul>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot" />
            <h3 className="experience-title">Computer Science Graduate</h3>
            <p className="experience-company">Fresh Graduate • 2025</p>
            <p className="experience-details">
              Specialized in full-stack development with strong database architecture background.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <HolographicText className="section-title">TECHNICAL ARSENAL</HolographicText>
        <div className="skills-grid">
          <div className="skill-category">
            <h3 className="skill-category-title">LANGUAGES</h3>
            <div className="skill-items">
              {['Python', 'SQL', 'TypeScript', 'JavaScript', 'C#', 'Java', 'PHP'].map(skill => (
                <div key={skill} className="skill-item">{skill}</div>
              ))}
            </div>
          </div>

          <div className="skill-category">
            <h3 className="skill-category-title">FRAMEWORKS</h3>
            <div className="skill-items">
              {['React', 'Node.js', 'Express', '.NET Framework', 'Tauri V2'].map(skill => (
                <div key={skill} className="skill-item">{skill}</div>
              ))}
            </div>
          </div>

          <div className="skill-category">
            <h3 className="skill-category-title">DATABASES</h3>
            <div className="skill-items">
              {['SQL Server', 'MySQL', 'MongoDB', 'Supabase'].map(skill => (
                <div key={skill} className="skill-item">{skill}</div>
              ))}
            </div>
          </div>

          <div className="skill-category">
            <h3 className="skill-category-title">TOOLS & CLOUD</h3>
            <div className="skill-items">
              {['VS Code', 'Git', 'Railway', 'Vercel', 'Postman'].map(skill => (
                <div key={skill} className="skill-item">{skill}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <HolographicText className="section-title">CONTACT PORTAL</HolographicText>
        <div className="contact-grid">
          <a href="mailto:ron.talabuconjr.dev@gmail.com" className="contact-card">
            <div className="contact-icon">📧</div>
            <div className="contact-label">EMAIL</div>
            <div className="contact-value">ron.talabuconjr.dev@gmail.com</div>
          </a>

          <a href="https://www.linkedin.com/in/ronnie-talabucon-jr-30528b31b" target="_blank" rel="noopener noreferrer" className="contact-card">
            <div className="contact-icon">💼</div>
            <div className="contact-label">LINKEDIN</div>
            <div className="contact-value">Professional Network</div>
          </a>

          <a href="https://github.com/Krinhj" target="_blank" rel="noopener noreferrer" className="contact-card">
            <div className="contact-icon">💻</div>
            <div className="contact-label">GITHUB</div>
            <div className="contact-value">Code Repository</div>
          </a>

          <div className="contact-card">
            <div className="contact-icon">📍</div>
            <div className="contact-label">LOCATION</div>
            <div className="contact-value">Roxas City/Iloilo City, Philippines</div>
          </div>
        </div>

        <div className="contact-cta">
          <p className="contact-message">
            Ready to collaborate on projects that make a positive impact.
          </p>
          <a href="mailto:ron.talabuconjr.dev@gmail.com">
            <NeonButton>INITIATE CONTACT</NeonButton>
          </a>
        </div>
      </section>

      {/* Footer with Quote */}
      <footer className="portfolio-footer">
        <div className="footer-quote">
          <div className="quote-text">"Mieux que jamais"</div>
          <div className="quote-translation">Better than ever</div>
        </div>
        <p className="footer-tagline">
          Leaving every project better than I found it
        </p>
        <p className="footer-copyright">
          © 2025 RONNIE TALABUCON JR. • PORTFOLIO v2.0 • SYNTHWAVE EDITION
        </p>
      </footer>
    </div>
  );

  // Main render logic
  if (showCLI) {
    return <TerminalCLI />;
  }

  return (
    <div ref={containerRef} className="app-container">
      <Portfolio />
    </div>
  );
};

export default App;