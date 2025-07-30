import React, { useState, useEffect } from 'react';

interface MatrixTransitionProps {
  onTransitionComplete: () => void;
  isActive: boolean;
  portfolioContent?: React.ReactNode;
  terminalBounds?: DOMRect;
}

export const MatrixTransition: React.FC<MatrixTransitionProps> = ({
  onTransitionComplete,
  isActive,
  portfolioContent,
  terminalBounds
}) => {
  const [phase, setPhase] = useState<'idle' | 'blinking' | 'expanding' | 'revealing' | 'complete'>('idle');
  const [showCircle, setShowCircle] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    // Start the transition sequence
    const sequence = async () => {
      // Phase 1: Show blinking circle (terminal is already dark)
      setPhase('blinking');
      setShowCircle(true);
      
      // Blink for 1.5 seconds
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Phase 2: Expand to horizontal line
      setPhase('expanding');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Phase 3: Reveal portfolio with masking wipe
      setPhase('revealing');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Phase 4: Complete transition
      setPhase('complete');
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Notify parent component
      onTransitionComplete();
    };

    sequence();
  }, [isActive, onTransitionComplete]);

  if (!isActive) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      pointerEvents: 'none'
    }}>
      
      {/* Pre-loaded Portfolio Content (always loaded behind) */}
      {portfolioContent && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1
        }}>
          {portfolioContent}
        </div>
      )}

      {/* Full screen mask that covers everything initially */}
      {phase !== 'complete' && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'hsl(var(--background))',
          zIndex: 5
        }} />
      )}
      
      {/* Blinking Red Circle */}
      {(phase === 'blinking' || phase === 'expanding') && (
        <div
          style={{
            position: 'absolute',
            top: terminalBounds ? terminalBounds.top + terminalBounds.height / 2 : '50%',
            left: terminalBounds ? terminalBounds.left + terminalBounds.width / 2 : '50%',
            transform: 'translate(-50%, -50%)',
            width: phase === 'expanding' ? '100vw' : '12px',
            height: phase === 'expanding' ? '3px' : '12px',
            backgroundColor: 'hsl(var(--primary))',
            borderRadius: phase === 'expanding' ? '0' : '50%',
            boxShadow: '0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary) / 0.5)',
            animation: phase === 'blinking' ? 'matrix-blink 0.5s infinite' : 'none',
            transition: phase === 'expanding' ? 'all 0.8s ease-out' : 'none',
            zIndex: 10
          }}
        />
      )}


      {/* Expanding Reveal Window Effect */}
      {phase === 'revealing' && (
        <>
          {/* Portfolio content with expanding clip-path reveal */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)',
              animation: 'matrix-expand-reveal 1.5s ease-out forwards',
              zIndex: 8
            }}
          >
            {portfolioContent}
          </div>
          
          {/* Top splitting line */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '3px',
              backgroundColor: 'hsl(var(--primary))',
              boxShadow: '0 0 15px hsl(var(--primary)), 0 0 30px hsl(var(--primary) / 0.7)',
              animation: 'matrix-line-move-up 1.5s ease-out forwards',
              zIndex: 15,
              transformOrigin: 'center'
            }}
          />
          
          {/* Bottom splitting line */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '3px',
              backgroundColor: 'hsl(var(--primary))',
              boxShadow: '0 0 15px hsl(var(--primary)), 0 0 30px hsl(var(--primary) / 0.7)',
              animation: 'matrix-line-move-down 1.5s ease-out forwards',
              zIndex: 15,
              transformOrigin: 'center'
            }}
          />
        </>
      )}
    </div>
  );
};