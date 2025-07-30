import { useState, useEffect } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
  inTerminal?: boolean; // New prop to control if it's in terminal or full screen
}

export const BootSequence = ({ onComplete, inTerminal = false }: BootSequenceProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const bootSteps = [
    { text: 'INITIALIZING SYNTHWAVE PORTFOLIO SYSTEM...', delay: 500 },
    { text: 'Loading neural network modules...', delay: 300 },
    { text: 'Establishing quantum entanglement...', delay: 400 },
    { text: 'Calibrating holographic projectors...', delay: 350 },
    { text: 'Activating cyberpunk interface...', delay: 300 },
    { text: 'Synchronizing with the matrix...', delay: 400 },
    { text: 'Compiling reality fragments...', delay: 350 },
    { text: 'Deploying neon lighting systems...', delay: 300 }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < bootSteps.length) {
        setCurrentStep(prev => prev + 1);
        setProgress(Math.floor(((currentStep + 1) / bootSteps.length) * 100));
      } else {
        // Final completion
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, bootSteps[currentStep]?.delay || 400);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete, bootSteps]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Terminal version - renders within terminal content area
  if (inTerminal) {
    const barLength = 40;
    const filledLength = Math.floor((progress / 100) * barLength);
    const progressBar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);

    return (
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem 1rem',
        fontFamily: 'monospace'
      }}>
        {/* Header */}
        <div style={{
          color: 'hsl(var(--primary))',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          ╔══════════════════════════════════════════════════╗
          <br />
          ║              SYNTHWAVE BOOT SEQUENCE             ║
          <br />
          ╚══════════════════════════════════════════════════╝
        </div>

        {/* Current step */}
        {currentStep < bootSteps.length && (
          <div style={{
            color: '#4ADE80',
            fontSize: '1rem',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            {bootSteps[currentStep].text}
            <span style={{
              color: '#4ADE80',
              marginLeft: '8px',
              opacity: showCursor ? 1 : 0,
              transition: 'opacity 0.1s ease'
            }}>
              |
            </span>
          </div>
        )}

        {/* Progress bar */}
        <div style={{
          color: 'hsl(var(--primary))',
          fontSize: '0.875rem',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          [{progressBar}] {progress}%
        </div>

        {/* Status text */}
        <div style={{
          color: 'hsl(var(--primary) / 0.7)',
          fontSize: '0.875rem',
          textAlign: 'center'
        }}>
          {currentStep >= bootSteps.length ? (
            <>
              ✓ All systems operational
              <br />
              ✓ Neural pathways established
              <br />
              ✓ Holographic interface ready
              <br />
              ✓ Matrix connection stable
              <br />
              <br />
              <span style={{ color: 'hsl(var(--primary))' }}>
                LAUNCHING PORTFOLIO IN 3... 2... 1...
              </span>
            </>
          ) : (
            'Please wait while the system initializes...'
          )}
        </div>
      </div>
    );
  }

  // Full screen version - original functionality for main portfolio
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: '#000000',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        textAlign: 'center',
        width: '100%',
        maxWidth: '64rem',
        margin: '0 auto',
        padding: '2rem'
      }}>
        {/* Main boot sequence text */}
        <div style={{ marginBottom: '3rem' }}>
          {bootSteps.slice(0, currentStep + 1).map((step, index) => (
            <div 
              key={index} 
              style={{
                marginBottom: '1rem',
                textAlign: 'center',
                fontFamily: 'monospace',
                transition: 'all 0.3s ease',
                fontSize: index === currentStep ? 'clamp(1.5rem, 4vw, 2rem)' : 'clamp(1.25rem, 3vw, 1.75rem)',
                color: index === currentStep ? 'hsl(var(--primary-glow))' : 'hsl(var(--primary))',
                textShadow: index === currentStep 
                  ? '0 0 20px hsl(var(--primary-glow))' 
                  : '0 0 10px hsl(var(--primary))'
              }}
            >
              <span style={{ color: 'hsl(var(--primary))' }}>{'>'}</span> {step.text}
              {index === currentStep && (
                <span style={{
                  marginLeft: '8px',
                  color: '#4ADE80',
                  opacity: showCursor ? 1 : 0,
                  transition: 'opacity 0.1s ease',
                  textShadow: '0 0 10px #4ADE80'
                }}>
                  |
                </span>
              )}
            </div>
          ))}
        </div>
        
        {/* Progress bar */}
        <div style={{
          width: '100%',
          maxWidth: '32rem',
          margin: '0 auto 1.5rem auto'
        }}>
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#1F2937',
            borderRadius: '9999px',
            border: '1px solid hsl(var(--primary))',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary-glow)))',
              width: `${progress}%`,
              transition: 'width 0.5s ease-out',
              borderRadius: '9999px',
              boxShadow: '0 0 10px hsl(var(--primary))'
            }} />
          </div>
          
          <div style={{
            textAlign: 'center',
            marginTop: '1rem'
          }}>
            <span style={{
              color: 'hsl(var(--primary))',
              fontSize: '1.125rem',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              textShadow: '0 0 10px hsl(var(--primary))'
            }}>
              {progress}%
            </span>
          </div>
        </div>

        {/* Final message */}
        {currentStep >= bootSteps.length && (
          <div style={{
            color: 'hsl(var(--primary-glow))',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            animation: 'energy-pulse 2s ease-in-out infinite',
            textShadow: '0 0 20px hsl(var(--primary-glow))'
          }}>
            PORTFOLIO SYSTEM ACTIVATED - Launching...
          </div>
        )}
      </div>
    </div>
  );
};