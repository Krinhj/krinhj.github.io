import { useEffect, useRef, useState } from 'react';

interface SynthwaveBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  disablePageScroll?: boolean; // New prop to control page scrolling
}

const SynthwaveBackground: React.FC<SynthwaveBackgroundProps> = ({ 
  children, 
  className = '', 
  disablePageScroll = false 
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
      
      {/* Moving scan lines and enhanced grid */}
      <div 
        ref={gridRef}
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `
            linear-gradient(0deg, transparent 24%, rgba(220, 38, 38, 0.12) 25%, rgba(220, 38, 38, 0.12) 26%, transparent 27%, transparent 74%, rgba(220, 38, 38, 0.12) 75%, rgba(220, 38, 38, 0.12) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(220, 38, 38, 0.12) 25%, rgba(220, 38, 38, 0.12) 26%, transparent 27%, transparent 74%, rgba(220, 38, 38, 0.12) 75%, rgba(220, 38, 38, 0.12) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: '0 0, 0 0',
          perspective: '1000px',
          transform: 'rotateX(60deg) rotateY(0deg)',
          transformOrigin: 'center bottom',
          mixBlendMode: 'screen'
        }}
      />
      
      

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-electric rounded-full opacity-20"
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${15 + (i % 4) * 20}%`,
              animation: `float-particle ${4 + (i * 0.5)}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
              boxShadow: '0 0 4px var(--red-electric)',
            }}
          />
        ))}
        {/* Additional smaller particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`small-${i}`}
            className="absolute w-0.5 h-0.5 bg-red-bright rounded-full opacity-30"
            style={{
              left: `${20 + (i * 10)}%`,
              top: `${25 + (i % 3) * 30}%`,
              animation: `float-particle ${6 + (i * 0.3)}s ease-in-out infinite reverse`,
              animationDelay: `${i * 0.6}s`,
              boxShadow: '0 0 2px var(--red-bright)',
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