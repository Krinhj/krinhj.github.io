import { useEffect, useRef, useState } from 'react';

export const SynthwaveBackground = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    // Add mouse move listener to window for global tracking
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Create dynamic moving scan lines occasionally
    const createMovingLine = () => {
      const line = document.createElement('div');
      line.className = 'absolute bg-red-electric h-px w-full opacity-20 pointer-events-none';
      line.style.top = Math.random() * 100 + '%';
      line.style.animation = `scan-line ${3 + Math.random() * 2}s linear infinite`;
      line.style.background = 'linear-gradient(90deg, transparent, var(--red-electric), transparent)';
      grid.appendChild(line);
      
      // Clean up after animation
      setTimeout(() => {
        if (line.parentNode) {
          line.remove();
        }
      }, 5000);
    };

    // Create a moving line every 3 seconds
    const interval = setInterval(createMovingLine, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Main Cyberpunk Grid with Cursor Reactivity */}
      <div 
        className="cyberpunk-grid"
        style={{
          // Create a radial gradient that follows the mouse cursor
          background: `
            radial-gradient(
              300px circle at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(239, 68, 68, 0.15) 0%,
              rgba(239, 68, 68, 0.05) 30%,
              transparent 50%
            ),
            linear-gradient(0deg, transparent 24%, rgba(220, 38, 38, 0.05) 25%, rgba(220, 38, 38, 0.05) 26%, transparent 27%, transparent 74%, rgba(220, 38, 38, 0.05) 75%, rgba(220, 38, 38, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(220, 38, 38, 0.05) 25%, rgba(220, 38, 38, 0.05) 26%, transparent 27%, transparent 74%, rgba(220, 38, 38, 0.05) 75%, rgba(220, 38, 38, 0.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '100% 100%, 50px 50px, 50px 50px',
          backgroundPosition: '0 0, 0 0, 0 0',
        }}
      />
      
      {/* Dynamic Moving Scan Lines Container */}
      <div 
        ref={gridRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          mixBlendMode: 'screen' // Creates nice blending effect
        }}
      />

      {/* Subtle Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-electric rounded-full opacity-20"
            style={{
              left: `${15 + (i * 12)}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float-particle ${4 + (i * 0.5)}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              boxShadow: '0 0 4px var(--red-electric)',
            }}
          />
        ))}
      </div>


    </>
  );
};