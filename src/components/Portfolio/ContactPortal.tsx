import React from 'react';
import { Mail, Linkedin, Github, MapPin, ExternalLink } from 'lucide-react';

export const ContactPortal = () => {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "ron.talabuconjr.dev@gmail.com",
      link: "mailto:ron.talabuconjr.dev@gmail.com",
      color: "primary"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "ronnie-talabucon-jr",
      link: "https://www.linkedin.com/in/ronnie-talabucon-jr-30528b31b",
      color: "primary-glow"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@Krinhj",
      link: "https://github.com/Krinhj",
      color: "primary"
    }
  ];

  return (
    <section style={{
      padding: '5rem 1rem',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '64rem',
        margin: '0 auto'
      }}>
        {/* Section header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: 'hsl(var(--primary))',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            marginBottom: '1rem',
            textShadow: '0 0 20px hsl(var(--primary) / 0.5)'
          }}>
            CONTACT PORTAL
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'hsl(var(--muted-foreground))',
            maxWidth: '48rem',
            margin: '0 auto'
          }}>
            Establish secure connection
          </p>
        </div>

        {/* Contact methods grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '4rem'
        }}>
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <a
                key={index}
                href={method.link}
                target={method.link.startsWith('http') ? '_blank' : '_self'}
                rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="energy-card"
                style={{
                  borderRadius: '12px',
                  padding: '1.5rem',
                  display: 'block',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    padding: '0.75rem',
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
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: 'bold',
                      color: 'hsl(var(--primary))',
                      marginBottom: '0.25rem'
                    }}>
                      {method.label}
                    </h3>
                    <p style={{
                      color: 'hsl(var(--foreground) / 0.8)',
                      fontSize: '0.875rem'
                    }}>
                      {method.value}
                    </p>
                  </div>
                  {method.link.startsWith('http') && (
                    <ExternalLink style={{
                      width: '16px',
                      height: '16px',
                      color: 'hsl(var(--muted-foreground))',
                      flexShrink: 0
                    }} />
                  )}
                </div>
              </a>
            );
          })}
        </div>

        {/* Call to action */}
        <div style={{ textAlign: 'center' }}>
          <div 
            className="energy-card"
            style={{
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '48rem',
              margin: '0 auto'
            }}
          >
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'hsl(var(--primary))',
              marginBottom: '1rem'
            }}>
              Ready to Build Something Amazing?
            </h3>
            <p style={{
              color: 'hsl(var(--foreground) / 0.8)',
              marginBottom: '1.5rem',
              lineHeight: 1.6,
              fontSize: '1rem'
            }}>
              Let's collaborate on your next project. Whether it's building cutting-edge web applications, 
              architecting robust databases, or exploring AI-powered solutions, I'm ready to make it happen.
            </p>
            
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <a
                href="mailto:ron.talabuconjr.dev@gmail.com"
                className="neon-button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.875rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                <Mail size={16} />
                SEND MESSAGE
              </a>
              <a
                href="/Talabucon_Resume.pdf"
                className="neon-button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.875rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  backgroundColor: 'transparent'
                }}
              >
                <ExternalLink size={16} />
                DOWNLOAD RESUME
              </a>
            </div>
          </div>
        </div>

        {/* Bottom scan line */}
        <div className="scan-line" style={{ marginTop: '4rem' }}>
          <div style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, hsl(var(--primary)), transparent)'
          }} />
        </div>
        <div style={{
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
          }}>
          <button 
            className="neon-button"
            onClick={() => {
              const projectsSection = document.getElementById('hero-section');
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            style={{
              borderRadius: '8px',
              padding: '0.75rem 5rem',
              fontSize: '0.875rem',
              fontWeight: 600
            }}
          >
            BACK TO TOP
          </button>
        </div>
      </div>
    </section>
  );
};