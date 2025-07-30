import React, { useState, useEffect } from 'react';

export const HeroSection: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'KRINHJ';

  useEffect(() => {
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 150);

    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      margin: 0,
      padding: 0,
      marginTop: 0,
      width: '100%'
    }}>
      {/* Background overlay for better text readability - made more transparent */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'hsl(var(--background) / 0.3)',
        zIndex: 10
      }} />
      
      {/* Main hero content */}
      <div style={{
        textAlign: 'center',
        zIndex: 20,
        position: 'relative'
      }}>
        {/* Main name with cleaner holographic effect */}
        <h1 
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: 900,
            marginBottom: '1rem',
            letterSpacing: '0.1em',
            lineHeight: 0.9,
            textTransform: 'uppercase',
            color: 'hsl(var(--primary))',
            textShadow: `
              0 0 20px hsl(var(--primary) / 0.6),
              0 0 40px hsl(var(--primary) / 0.4),
              0 0 60px hsl(var(--primary) / 0.2)
            `,
            fontFamily: 'Share Tech Mono, Courier New, monospace'
          }}
        >
          RONNIE TALABUCON JR.
        </h1>

        {/* Scan line under big name */}
        <div className="scan-line" style={{ marginBottom: '1rem' }}>
          <div style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, hsl(var(--primary)), transparent)',
            width: '60%',
            margin: '0 auto'
          }} />
        </div>

        {/* Terminal-style username */}
        <div style={{
          fontSize: 'clamp(1.25rem, 4vw, 2rem)',
          fontFamily: 'monospace',
          color: 'hsl(var(--primary))',
          marginBottom: '2rem'
        }}>
          <span style={{ color: 'hsl(var(--muted-foreground))' }}>{'>'}</span>{' '}
          <span style={{ color: 'hsl(var(--primary-glow))' }}>{typedText}</span>
          {showCursor && (
            <span
              style={{
                color: 'hsl(var(--primary))',
                marginLeft: '4px',
                animation: 'cursor-blink 1s infinite',
                fontSize: 'inherit',
                fontWeight: 'inherit'
              }}
            >
              |
            </span>
          )}
        </div>

        {/* Subtitle */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            color: 'hsl(var(--muted-foreground))',
            fontWeight: 300,
            letterSpacing: '0.05em'
          }}>
            CS Graduate • Full-Stack Developer • Database Architect
          </p>
        </div>

        {/* Location */}
        <div style={{
          color: 'hsl(var(--muted-foreground))',
          fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
          marginBottom: '3rem',
          opacity: 0.8
        }}>
          📍 Roxas City/Iloilo City, Philippines
        </div>

        {/* All buttons in one line */}
        <div style={{
          display: 'flex',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '2rem',
          flexWrap: 'wrap'
        }}>
          <button 
            className="neon-button"
            onClick={() => {
              const projectsSection = document.getElementById('projects-section');
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            style={{
              borderRadius: '8px',
              padding: '0.75rem 1.5rem',
              fontSize: '0.875rem',
              fontWeight: 600
            }}
          >
            VIEW PROJECTS
          </button>
          <a 
            href="/Talabucon_Resume.pdf"
            download="Talabucon_Resume.pdf"
            className="neon-button"
            style={{
              borderRadius: '8px',
              padding: '0.75rem 1.5rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              backgroundColor: 'hsl(var(--primary) / 0.1)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            DOWNLOAD CV
          </a>
          <a 
            href="https://github.com/Krinhj" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="neon-button"
            style={{
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              fontSize: '0.875rem',
              textDecoration: 'none'
            }}
          >
            <span style={{ fontSize: '1rem' }}>💻</span> GITHUB
          </a>
          <a 
            href="https://www.linkedin.com/in/ronnie-talabucon-jr-30528b31b" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="neon-button"
            style={{
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              fontSize: '0.875rem',
              textDecoration: 'none'
            }}
          >
            <span style={{ fontSize: '1rem' }}>💼</span> LINKEDIN
          </a>
        </div>
      </div>

      {/* Floating geometric shapes */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '25%',
          width: '5rem',
          height: '5rem',
          border: '1px solid hsl(var(--primary) / 0.3)',
          transform: 'rotate(45deg)',
          animation: 'float-particle 15s linear infinite reverse'
        }} />
        <div style={{
          position: 'absolute',
          top: '75%',
          right: '25%',
          width: '4rem',
          height: '4rem',
          border: '1px solid hsl(var(--primary-glow) / 0.4)',
          animation: 'float-particle 20s linear infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '16.666667%',
          width: '1.5rem',
          height: '1.5rem',
          backgroundColor: 'hsl(var(--primary) / 0.5)',
          borderRadius: '50%',
          animation: 'energy-pulse 3s ease-in-out infinite'
        }} />
      </div>
    </section>
  );
};