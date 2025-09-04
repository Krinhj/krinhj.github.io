import React from 'react';
import { Code2, Brain, Rocket, Calendar } from 'lucide-react';
import { aboutSummary, keyStrengths } from '../../data';

export const AboutSection = () => {
  return (
    <section id="about-section" style={{
      padding: '5rem 1rem',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto'
      }}>
        {/* Section header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <h2 
            className="glitch"
            data-text="ABOUT ME"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 900,
              color: 'hsl(var(--primary))',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: '1rem',
              textShadow: '0 0 20px hsl(var(--primary) / 0.5)'
            }}
          >
            ABOUT ME
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'hsl(var(--muted-foreground))',
            maxWidth: '48rem',
            margin: '0 auto'
          }}>
            Full-stack Developer • AI Enthusiast • System Architect
          </p>
        </div>

        {/* Professional Summary - Full Width */}
        <div className="energy-card" style={{
          borderRadius: '12px',
          padding: '3rem',
          position: 'relative',
          maxWidth: '70rem',
          margin: '0 auto'
        }}>
          <h3 style={{
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: 'hsl(var(--primary))',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Brain size={24} />
            Professional Summary
          </h3>
          
          <div style={{
            color: 'hsl(var(--foreground) / 0.9)',
            lineHeight: 1.7,
            fontSize: '1.1rem',
            marginBottom: '2rem'
          }}>
            {aboutSummary.professionalSummary.map((paragraph, index) => (
              <p key={index} style={{ marginBottom: index === aboutSummary.professionalSummary.length - 1 ? 0 : '1.5rem' }}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Key Strengths */}
          <div>
            <h4 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: 'hsl(var(--primary))',
              marginBottom: '1rem'
            }}>
              Key Strengths
            </h4>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem'
            }}>
              {keyStrengths.map((strength, index) => {
                const getIcon = (title: string) => {
                  switch (title) {
                    case 'Full-Stack Development': return Code2;
                    case 'AI Integration': return Brain;
                    case 'System Architecture': return Rocket;
                    case 'Project Leadership': return Calendar;
                    default: return Code2;
                  }
                };
                const IconComponent = getIcon(strength.title);
                
                return (
                  <div key={index} style={{
                    padding: '1rem',
                    border: '1px solid hsl(var(--primary) / 0.2)',
                    borderRadius: '8px',
                    backgroundColor: 'hsl(var(--primary) / 0.05)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem'
                    }}>
                      <IconComponent size={18} style={{ color: 'hsl(var(--primary))' }} />
                      <span style={{
                        fontWeight: 'bold',
                        color: 'hsl(var(--primary))'
                      }}>
                        {strength.title}
                      </span>
                    </div>
                    <p style={{
                      fontSize: '0.9rem',
                      color: 'hsl(var(--foreground) / 0.8)',
                      lineHeight: 1.5
                    }}>
                      {strength.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>


        {/* Bottom scan line */}
        <div className="scan-line" style={{
          marginTop: '4rem'
        }}>
          <div style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, hsl(var(--primary)), transparent)'
          }} />
        </div>
      </div>
    </section>
  );
};