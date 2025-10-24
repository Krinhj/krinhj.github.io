import React, { useState, useEffect } from 'react';
import { personalInfo, aboutSummary } from '../../data/personalInfo';

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
  const introSummary = aboutSummary.professionalSummary.slice(0, 1);

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
    <section id="hero-section" className="hero-section">
      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-headline">Ronnie Talabucon Jr.</h1>

        <div className="hero-wave">
          {audioEnabled ? (
            frequencyData.length > 0 ? (
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
                    const amplified = Math.max(0.05, value * 8);
                    const y = 20 + (amplified - 0.4) * 100;
                    return `L ${x} ${Math.max(2, Math.min(38, y))}`;
                  }).join(' ')}`}
                  fill="none"
                  stroke="url(#waveGradient)"
                  strokeWidth="3"
                  filter="url(#glow)"
                />
              </svg>
            ) : (
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
            <div className="scan-line" style={{ width: '60%' }}>
              <div style={{
                height: '1px',
                background: 'linear-gradient(to right, transparent, hsl(var(--primary)), transparent)',
                width: '100%'
              }} />
            </div>
          )}
        </div>

        <div className="hero-username mono-font">
          <span className="hero-username__prompt">{'>'}</span>
          <span className="hero-username__value">{typedText}</span>
          {showCursor && (
            <span className="hero-username__cursor">|</span>
          )}
        </div>

        <div className="hero-bio">
          <p className="hero-subtitle">{personalInfo.title}</p>
          {introSummary.map((paragraph) => (
            <p key={paragraph} className="body-text body-text--center">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="hero-location">
          📍 Roxas City / Iloilo City, Philippines
        </div>

        <div className="hero-actions">
          <button 
            className="neon-button"
            onClick={() => {
              const projectsSection = document.getElementById('projects-section');
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            VIEW PROJECTS
          </button>
          <a
            href="/Talabucon_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="neon-button neon-button--solid"
          >
            VIEW CV
          </a>
          <a
            href="https://github.com/Krinhj"
            target="_blank"
            rel="noopener noreferrer"
            className="neon-button neon-button--icon"
          >
            <span style={{ fontSize: '1rem' }}>💻</span> GITHUB
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="neon-button neon-button--icon"
          >
            <span style={{ fontSize: '1rem' }}>💼</span> LINKEDIN
          </a>
        </div>
      </div>

      <div className="hero-geometry-layer">
        <div
          className="hero-geometry-square"
          style={{ top: '25%', left: '25%', width: '5rem', height: '5rem' }}
        />
        <div
          className="hero-geometry-square hero-geometry-square--alt"
          style={{ top: '75%', right: '25%', width: '4rem', height: '4rem' }}
        />
        <div
          className="hero-geometry-dot"
          style={{ top: '50%', right: '16.666667%', width: '1.5rem', height: '1.5rem' }}
        />
      </div>
    </section>
  );
};
