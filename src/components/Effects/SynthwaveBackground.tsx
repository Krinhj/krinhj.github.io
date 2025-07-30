import { useEffect, useRef, useState } from 'react';

interface SynthwaveBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  disablePageScroll?: boolean; // New prop to control page scrolling
  audioData?: number; // Audio analysis data (0-1)
  frequencyData?: number[]; // Frequency bars data
}

const SynthwaveBackground: React.FC<SynthwaveBackgroundProps> = ({ 
  children, 
  className = '', 
  disablePageScroll = false,
  audioData = 0,
  frequencyData = []
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  // Only prevent page scrolling when explicitly requested (for terminal page)
  useEffect(() => {
    if (disablePageScroll) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
      };
    } else {
      // Ensure scrolling is enabled for portfolio page
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }
  }, [disablePageScroll]);


  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Create additional moving grid lines
    const createMovingLine = () => {
      const line = document.createElement('div');
      line.className = 'absolute h-px w-full opacity-20';
      line.style.top = Math.random() * 100 + '%';
      line.style.background = 'hsl(var(--primary))';
      line.style.animation = `scan-line ${3 + Math.random() * 2}s linear infinite`;
      grid.appendChild(line);

      setTimeout(() => line.remove(), 5000);
    };

    // Create moving lines at Lovable's frequency
    const interval = setInterval(createMovingLine, 2000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`${disablePageScroll ? 'h-screen overflow-hidden' : 'min-h-screen'} ${className}`} style={{
      margin: 0,
      padding: 0,
      width: '100%',
      backgroundColor: 'hsl(var(--background))',
      position: 'relative'
    }}>
      {/* Static cyberpunk grid */}
      <div className="cyberpunk-grid" />
      
      {/* Moving scan lines and enhanced grid - Audio Reactive */}
      <div 
        ref={gridRef}
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `
            linear-gradient(0deg, transparent 24%, rgba(220, 38, 38, ${0.12 + (audioData * 0.15)}) 25%, rgba(220, 38, 38, ${0.12 + (audioData * 0.15)}) 26%, transparent 27%, transparent 74%, rgba(220, 38, 38, ${0.12 + (audioData * 0.15)}) 75%, rgba(220, 38, 38, ${0.12 + (audioData * 0.15)}) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(220, 38, 38, ${0.12 + (audioData * 0.15)}) 25%, rgba(220, 38, 38, ${0.12 + (audioData * 0.15)}) 26%, transparent 27%, transparent 74%, rgba(220, 38, 38, ${0.12 + (audioData * 0.15)}) 75%, rgba(220, 38, 38, ${0.12 + (audioData * 0.15)}) 76%, transparent 77%, transparent)
          `,
          backgroundSize: `${50 + (audioData * 10)}px ${50 + (audioData * 10)}px`,
          backgroundPosition: '0 0, 0 0',
          perspective: '1000px',
          transform: `rotateX(${60 + (audioData * 5)}deg) rotateY(0deg) scale(${1 + (audioData * 0.05)})`,
          transformOrigin: 'center bottom',
          mixBlendMode: 'screen',
          transition: 'all 0.1s ease-out'
        }}
      />

      {/* Audio-reactive scan lines */}
      {audioData > 0.1 && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <div 
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: 0,
              right: 0,
              height: '2px',
              background: `linear-gradient(90deg, transparent, rgba(220, 38, 38, ${audioData}) 30%, rgba(255, 70, 70, ${audioData * 1.2}) 50%, rgba(220, 38, 38, ${audioData}) 70%, transparent)`,
              animation: `scan ${2 - (audioData * 0.5)}s linear infinite`,
              boxShadow: `0 0 ${10 + (audioData * 20)}px rgba(220, 38, 38, ${audioData * 0.8})`
            }}
          />
        </div>
      )}

      {/* Audio Visualizer Bars - Synthwave Style */}
      {frequencyData.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-5">
          {/* Left side bars */}
          <div 
            style={{
              position: 'absolute',
              left: '10%',
              bottom: '20%',
              display: 'flex',
              alignItems: 'end',
              gap: '3px',
              transform: 'rotate(-10deg)',
              opacity: 0.8
            }}
          >
            {frequencyData.slice(0, 16).map((value, index) => (
              <div
                key={`left-${index}`}
                style={{
                  width: '2px',
                  height: `${10 + (value * 80)}px`,
                  background: `linear-gradient(to top, 
                    rgba(220, 38, 38, ${0.6 + (value * 0.4)}), 
                    rgba(255, 70, 70, ${0.8 + (value * 0.2)}),
                    rgba(255, 150, 150, ${value})
                  )`,
                  boxShadow: `0 0 ${4 + (value * 8)}px rgba(220, 38, 38, ${value * 0.6})`,
                  transition: 'all 0.1s ease-out',
                  borderRadius: '1px'
                }}
              />
            ))}
          </div>

          {/* Right side bars */}
          <div 
            style={{
              position: 'absolute',
              right: '10%',
              bottom: '20%',
              display: 'flex',
              alignItems: 'end',
              gap: '3px',
              transform: 'rotate(10deg)',
              opacity: 0.8
            }}
          >
            {frequencyData.slice(16, 32).map((value, index) => (
              <div
                key={`right-${index}`}
                style={{
                  width: '2px',
                  height: `${10 + (value * 80)}px`,
                  background: `linear-gradient(to top, 
                    rgba(220, 38, 38, ${0.6 + (value * 0.4)}), 
                    rgba(255, 70, 70, ${0.8 + (value * 0.2)}),
                    rgba(255, 150, 150, ${value})
                  )`,
                  boxShadow: `0 0 ${4 + (value * 8)}px rgba(220, 38, 38, ${value * 0.6})`,
                  transition: 'all 0.1s ease-out',
                  borderRadius: '1px'
                }}
              />
            ))}
          </div>

          {/* Center bars - smaller and subtle */}
          <div 
            style={{
              position: 'absolute',
              left: '50%',
              top: '15%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'end',
              gap: '2px',
              opacity: 0.4
            }}
          >
            {frequencyData.slice(8, 24).map((value, index) => (
              <div
                key={`center-${index}`}
                style={{
                  width: '1px',
                  height: `${5 + (value * 30)}px`,
                  background: `rgba(220, 38, 38, ${0.4 + (value * 0.6)})`,
                  boxShadow: `0 0 ${2 + (value * 4)}px rgba(220, 38, 38, ${value * 0.4})`,
                  transition: 'all 0.1s ease-out'
                }}
              />
            ))}
          </div>
        </div>
      )}
      
      

      {/* Enhanced Floating Particles - Audio Reactive */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${4 + (audioData * 6)}px`,
              height: `${4 + (audioData * 6)}px`,
              backgroundColor: `rgba(220, 38, 38, ${0.3 + (audioData * 0.4)})`,
              left: `${10 + (i * 8)}%`,
              top: `${15 + (i % 4) * 20}%`,
              animation: `float-particle ${4 + (i * 0.5) - (audioData * 2)}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
              boxShadow: `0 0 ${8 + (audioData * 12)}px rgba(220, 38, 38, ${0.4 + (audioData * 0.4)})`,
              transform: `scale(${1 + (audioData * 0.5)})`,
              transition: 'all 0.1s ease-out'
            }}
          />
        ))}
        {/* Additional smaller particles - Audio Reactive */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`small-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${2 + (audioData * 3)}px`,
              height: `${2 + (audioData * 3)}px`,
              backgroundColor: `rgba(255, 70, 70, ${0.4 + (audioData * 0.3)})`,
              left: `${20 + (i * 10)}%`,
              top: `${25 + (i % 3) * 30}%`,
              animation: `float-particle ${6 + (i * 0.3) - (audioData * 1.5)}s ease-in-out infinite reverse`,
              animationDelay: `${i * 0.6}s`,
              boxShadow: `0 0 ${4 + (audioData * 8)}px rgba(255, 70, 70, ${0.5 + (audioData * 0.3)})`,
              transform: `scale(${1 + (audioData * 0.3)})`,
              transition: 'all 0.1s ease-out'
            }}
          />
        ))}
      </div>

      {/* Content */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
};

export default SynthwaveBackground;