import React, { useState, useEffect } from 'react';

interface HeroSectionProps {
  audioEnabled?: boolean;
  frequencyData?: number[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  audioEnabled = false, 
  frequencyData = [] 
}) => {
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
    <section id='hero-section' style={{
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
        position: 'relative',
        padding: '0 1rem',
        maxWidth: '100%'
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

        {/* Audio Visualizer or Scan line under big name */}
        <div style={{ marginBottom: '1rem', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {audioEnabled ? (
            frequencyData.length > 0 ? (
              // Audio Waveform Line
              <svg 
                width="min(400px, 80vw)" 
                height="40" 
                style={{ overflow: 'visible' }}
                viewBox="0 0 400 40"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
                    <stop offset="20%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.8 }} />
                    <stop offset="50%" style={{ stopColor: 'hsl(var(--primary-glow))', stopOpacity: 1 }} />
                    <stop offset="80%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <path
                  d={`M 0 20 ${frequencyData.slice(0, 32).map((value, index) => {
                    const x = (index / 31) * 400;
                    // Much more dramatic amplitude - boost the values
                    const amplified = Math.max(0.05, value * 8); // Amplify by 8x
                    const y = 20 + (amplified - 0.4) * 100; // Bigger ±50px amplitude
                    return `L ${x} ${Math.max(2, Math.min(38, y))}`;
                  }).join(' ')}`}
                  fill="none"
                  stroke="url(#waveGradient)"
                  strokeWidth="3"
                  filter="url(#glow)"
                  style={{ 
                    transition: 'none' // Remove transition for immediate response
                  }}
                />
              </svg>
            ) : (
              // Audio enabled but no data - show gentle wave
              <svg 
                width="min(400px, 80vw)" 
                height="40" 
                style={{ overflow: 'visible' }}
                viewBox="0 0 400 40"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="staticGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
                    <stop offset="20%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.6 }} />
                    <stop offset="50%" style={{ stopColor: 'hsl(var(--primary-glow))', stopOpacity: 0.8 }} />
                    <stop offset="80%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.6 }} />
                    <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 20 Q 100 15 200 20 T 400 20"
                  fill="none"
                  stroke="url(#staticGradient)"
                  strokeWidth="2"
                  opacity="0.7"
                />
              </svg>
            )
          ) : (
            // Static Scan Line
            <div className="scan-line" style={{ width: '60%' }}>
              <div style={{
                height: '1px',
                background: 'linear-gradient(to right, transparent, hsl(var(--primary)), transparent)',
                width: '100%'
              }} />
            </div>
          )}
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
            Full-Stack Developer • Database Architect • AI Enthusiast
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
          flexDirection: 'row',
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