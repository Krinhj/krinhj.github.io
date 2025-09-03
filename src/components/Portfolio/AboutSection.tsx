import React from 'react';
import { Code2, Brain, Rocket, Calendar } from 'lucide-react';

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
            <p style={{ marginBottom: '1.5rem' }}>
              I am a recent Computer Science graduate with a passion for building innovative, user-focused solutions. 
              Experienced in full-stack development, system architecture, database management, and AI-focused technologies like 
              LLMs, Vector Databases, and RAG techniques.
            </p>
            
            <p style={{ marginBottom: '1.5rem' }}>
              As a Computer Science student who focused on Software Development and Databases, I have experience in building robust applications and efficient system designs. During my internship at the Department of Budget and Management, I contributed to enterprise-scale 
              government systems, working with national financial data and modernizing legacy infrastructure. 
              I thrive on solving complex technical challenges and transforming ideas into scalable, real-world applications.
            </p>
              
            <p style={{ marginBottom: '1.5rem' }}>
              To put it simply, I turn everyday problems into opportunities for innovation through relentless curiosity and persistence.
            </p>
            
            <p>
              Currently developing Momentum AI Suite - an ambitious AI-powered productivity ecosystem that showcases 
              my expertise in modern web technologies, AI, and complex system integration.
            </p>
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
              <div style={{
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
                  <Code2 size={18} style={{ color: 'hsl(var(--primary))' }} />
                  <span style={{
                    fontWeight: 'bold',
                    color: 'hsl(var(--primary))'
                  }}>
                    Full-Stack Development
                  </span>
                </div>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'hsl(var(--foreground) / 0.8)',
                  lineHeight: 1.5
                }}>
                  React, Node.js, TypeScript, Python - Building scalable web applications from front-end to database
                </p>
              </div>

              <div style={{
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
                  <Brain size={18} style={{ color: 'hsl(var(--primary))' }} />
                  <span style={{
                    fontWeight: 'bold',
                    color: 'hsl(var(--primary))'
                  }}>
                    AI Integration
                  </span>
                </div>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'hsl(var(--foreground) / 0.8)',
                  lineHeight: 1.5
                }}>
                  Large Language Models, vector databases, and AI-powered applications
                </p>
              </div>

              <div style={{
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
                  <Rocket size={18} style={{ color: 'hsl(var(--primary))' }} />
                  <span style={{
                    fontWeight: 'bold',
                    color: 'hsl(var(--primary))'
                  }}>
                    System Architecture
                  </span>
                </div>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'hsl(var(--foreground) / 0.8)',
                  lineHeight: 1.5
                }}>
                  Designing complex, multi-component systems with focus on scalability and maintainability
                </p>
              </div>

              <div style={{
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
                  <Calendar size={18} style={{ color: 'hsl(var(--primary))' }} />
                  <span style={{
                    fontWeight: 'bold',
                    color: 'hsl(var(--primary))'
                  }}>
                    Project Leadership
                  </span>
                </div>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'hsl(var(--foreground) / 0.8)',
                  lineHeight: 1.5
                }}>
                  Leading development teams, managing complex projects from conception to deployment
                </p>
              </div>
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