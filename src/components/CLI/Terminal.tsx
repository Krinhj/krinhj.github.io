import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommandHandler } from './CommandHandler';
import { BootSequence } from '../Effects/BootSequence';
import { MatrixTransition } from '../Effects/MatrixTransition';
import Index from '../../pages/Index';

interface TerminalProps {
  className?: string;
}

const Terminal: React.FC<TerminalProps> = ({ className = '' }) => {
  const [terminalHistory, setTerminalHistory] = useState([
    '> SYNTHWAVE PORTFOLIO SYSTEM v2.0',
    '> Initializing cyberpunk interface...',
    '> Type "pf help" for available commands',
    '> Type "pf boot" to launch portfolio'
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isHacking, setIsHacking] = useState(false);
  const [showBootSequence, setShowBootSequence] = useState(false);
  const [showMatrixTransition, setShowMatrixTransition] = useState(false);
  const [terminalDark, setTerminalDark] = useState(false);
  const [terminalBounds, setTerminalBounds] = useState<DOMRect | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Get command handler with boot sequence setter
  const { handleCommand } = useCommandHandler({ 
    setTerminalHistory, 
    setIsHacking, 
    setShowBootSequence 
  });

  // Handle boot sequence completion - now triggers terminal dark then matrix transition
  const handleBootComplete = () => {
    setShowBootSequence(false);
    
    // Get terminal bounds for positioning the circle
    if (terminalContentRef.current) {
      const bounds = terminalContentRef.current.getBoundingClientRect();
      setTerminalBounds(bounds);
    }
    
    // Make terminal go dark first
    setTimeout(() => {
      setTerminalDark(true);
    }, 300);
    
    // Then start matrix transition
    setTimeout(() => {
      setShowMatrixTransition(true);
      // Keep terminal dark but don't hide it completely during transition
    }, 800);
  };

  // Handle matrix transition completion
  const handleMatrixTransitionComplete = () => {
    setShowMatrixTransition(false);
    navigate('/index');
  };

  // Auto-scroll to bottom when terminal history changes
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [terminalHistory]);

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput, terminalHistory, setCurrentInput);
    }
  };

  return (
    <div 
      className={className}
      style={{ 
        width: '100%', 
        maxWidth: 'min(64rem, 95vw)',
        margin: '0 auto' // Center the terminal
      }}>
      <div style={{
        borderRadius: '8px',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        border: '2px solid hsl(var(--primary) / 0.3)',
        height: 'fit-content', // Prevent expanding beyond content
        transition: 'none' // Remove any hover transitions
      }}>
        
        {/* Terminal Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
          borderBottom: '1px solid hsl(var(--primary) / 0.3)',
          backgroundColor: 'hsl(var(--primary) / 0.05)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: 'hsl(var(--primary))',
              boxShadow: 'var(--shadow-glow)',
              animation: 'energy-pulse 2s ease-in-out infinite'
            }} />
            <span style={{
              color: 'hsl(var(--primary))',
              fontWeight: 'bold',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }} className="mono-font">
              SYNTHWAVE TERMINAL
            </span>
          </div>
          <div style={{
            color: 'hsl(var(--primary) / 0.6)',
            fontSize: '0.75rem'
          }} className="mono-font">
            Connected to krinhj.portfolio.local
          </div>
        </div>
        
        {/* Terminal Content - Auto-scrolling ONLY within terminal */}
        <div 
          ref={terminalContentRef}
          style={{
            height: 'min(500px, 60vh)', // Responsive height for mobile
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '1rem',
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', // Responsive font size
            scrollBehavior: 'smooth',
            position: 'relative'
          }}
          className="mono-font"
        >
          {/* Dark overlay when terminal goes dark */}
          {terminalDark && !showMatrixTransition && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'hsl(var(--background) / 0.95)',
              zIndex: 20,
              transition: 'opacity 0.5s ease-out',
              opacity: 1
            }} />
          )}
          {/* Boot Sequence Overlay */}
          {showBootSequence && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BootSequence 
                onComplete={handleBootComplete}
                inTerminal={true}
              />
            </div>
          )}

          {!showBootSequence && (
            <>
              {terminalHistory.map((line, index) => (
                <div 
                  key={index}
                  style={{
                    marginBottom: '2px',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    overflowWrap: 'anywhere',
                    color: line.startsWith('>') 
                      ? 'hsl(var(--primary))' 
                      : line.includes('[HACKING]')
                        ? '#EF4444'
                        : line.includes('▓') || line.includes('═') || line.includes('╔') 
                          ? 'hsl(var(--primary) / 0.8)' 
                          : '#4ADE80'
                  }}
                >
                  {line}
                </div>
              ))}
              
              {/* Input Line */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                marginTop: '1rem',
                minHeight: '20px'
              }}>
                <span style={{
                  color: 'hsl(var(--primary))',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  {'>'}
                </span>
                <div style={{ flex: 1, position: 'relative' }}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    style={{
                      backgroundColor: 'transparent',
                      color: '#4ADE80',
                      fontFamily: 'inherit',
                      outline: 'none',
                      border: 'none',
                      width: '100%',
                      caretColor: 'transparent',
                      fontSize: '0.875rem'
                    }}
                    className="mono-font"
                    placeholder={currentInput ? "" : "Type 'pf help' for commands..."}
                    autoComplete="off"
                    spellCheck="false"
                    autoFocus
                  />
                  {/* Custom Cursor */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '0',
                      width: '2px',
                      height: '16px',
                      backgroundColor: '#4ADE80',
                      boxShadow: '0 0 5px #4ADE80',
                      pointerEvents: 'none',
                      animation: 'cursor-blink 1s infinite',
                      left: currentInput.length === 0
                        ? '0px' // Position right after the input, before placeholder
                        : `${currentInput.length * 7.2}px` // Position after typed text
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Terminal Footer */}
        <div style={{
          padding: '0.75rem',
          borderTop: '1px solid hsl(var(--primary) / 0.3)',
          backgroundColor: 'hsl(var(--primary) / 0.05)',
          color: 'hsl(var(--primary) / 0.6)',
          fontSize: '0.75rem',
          textAlign: 'center'
        }} className="mono-font">
          Press TAB for autocomplete • CTRL+C to interrupt • Type "pf boot" to launch portfolio
        </div>
      </div>

      {/* Matrix Transition Overlay */}
      <MatrixTransition 
        isActive={showMatrixTransition}
        onTransitionComplete={handleMatrixTransitionComplete}
        portfolioContent={<Index />}
        terminalBounds={terminalBounds}
      />
    </div>
  );
};

export default Terminal;