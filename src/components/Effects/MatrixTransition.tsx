import React, { useState, useEffect } from 'react';

interface MatrixTransitionProps {
  onTransitionComplete: () => void;
  isActive: boolean;
  portfolioContent?: React.ReactNode;
}

export const MatrixTransition: React.FC<MatrixTransitionProps> = ({
  onTransitionComplete,
  isActive,
  portfolioContent
}) => {
  const [phase, setPhase] = useState<'idle' | 'blinking' | 'expanding' | 'revealing' | 'complete'>('idle');

  useEffect(() => {
    if (!isActive) return;

    // Start the transition sequence
    const sequence = async () => {
      // Phase 1: Show blinking circle (terminal is already dark)
      setPhase('blinking');
      
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
      
      {/* No masks - terminal stays visible, portfolio appears during reveal */}
      
      {/* Blinking Red Circle - centered on screen */}
      {(phase === 'blinking' || phase === 'expanding') && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
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


      {/* Portfolio with expanding clip-path reveal - appears OVER terminal */}
      {(phase === 'revealing' || phase === 'complete') && portfolioContent && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            clipPath: phase === 'complete' ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)',
            animation: phase === 'revealing' ? 'matrix-expand-reveal 1.5s ease-out forwards' : 'none',
            zIndex: 20
          }}
        >
          {portfolioContent}
        </div>
      )}

      {/* Splitting Lines */}
      {phase === 'revealing' && (
        <>
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
              zIndex: 25,
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
              zIndex: 25,
              transformOrigin: 'center'
            }}
          />
        </>
      )}
    </div>
  );
};
