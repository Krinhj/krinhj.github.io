import React from 'react';
import { skillCategories, aiMlSkills } from '../../data';

export const TechnicalArsenal = () => {
  return (
    <section style={{
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
            data-text="TECHNICAL ARSENAL"
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
            TECHNICAL ARSENAL
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'hsl(var(--muted-foreground))',
            maxWidth: '48rem',
            margin: '0 auto'
          }}>
            Tech Stack and Tools
          </p>
        </div>

        {/* Skills grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(500px, 100%), 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={categoryIndex}
                className="energy-card"
                style={{
                  borderRadius: '12px',
                  padding: '2rem',
                  position: 'relative',
                  animationDelay: `${categoryIndex * 0.2}s`
                }}
              >
                {/* Category header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    padding: '0.5rem',
                    backgroundColor: 'hsl(var(--primary) / 0.2)',
                    borderRadius: '8px',
                    flexShrink: 0
                  }}>
                    <IconComponent style={{
                      width: '24px',
                      height: '24px',
                      color: 'hsl(var(--primary))'
                    }} />
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'hsl(var(--primary))',
                    marginBottom: 0
                  }}>
                    {category.title}
                  </h3>
                </div>

                {/* Skills list - responsive grid */}
                <div 
                  className="skills-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: '0.75rem',
                    marginBottom: '1.5rem'
                  }}
                >
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      style={{
                        padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(0.75rem, 3vw, 1rem)',
                        backgroundColor: 'transparent',
                        border: '2px solid hsl(var(--primary))',
                        borderRadius: '8px',
                        textAlign: 'center',
                        fontSize: 'clamp(0.75rem, 2.2vw, 0.875rem)',
                        color: 'hsl(var(--primary))',
                        fontFamily: 'monospace',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        transition: 'all 0.3s ease',
                        minWidth: 0,
                        wordBreak: 'break-word'
                      }}
                      className="hover:bg-primary hover:bg-opacity-10"
                    >
                      {skill}
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* AI/ML Special section */}
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <div 
            className="energy-card"
            style={{
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '32rem',
              margin: '0 auto'
            }}
          >
            <h4 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: 'hsl(var(--primary))',
              marginBottom: '1rem'
            }}>
              AI/ML Exploration
            </h4>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              {aiMlSkills.map((tech, index) => (
                <span 
                  key={index}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: 'hsl(var(--primary) / 0.1)',
                    border: '1px solid hsl(var(--primary) / 0.3)',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    color: 'hsl(var(--primary))',
                    fontFamily: 'monospace'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
            <p style={{
              fontSize: '0.875rem',
              color: 'hsl(var(--muted-foreground))'
            }}>
              Constantly exploring the frontier of artificial intelligence
            </p>
          </div>
        </div>

        {/* Bottom scan line */}
        <div className="scan-line" style={{ marginTop: '4rem' }}>
          <div style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, hsl(var(--primary)), transparent)'
          }} />
        </div>
      </div>
    </section>
  );
};