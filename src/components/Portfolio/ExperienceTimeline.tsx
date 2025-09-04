import React, { useState } from 'react';
import { Calendar, MapPin, Info } from 'lucide-react';
import { ExperienceDetailModal } from '../UI/ExperienceDetailModal';
import { experiences, deployedProjectsCount } from '../../data';

export const ExperienceTimeline = () => {
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (experience: any) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExperience(null);
  };

  return (
    <section style={{
      padding: '5rem 1rem',
      position: 'relative',
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
          <h2 
            className="glitch"
            data-text="EXPERIENCE TIMELINE"
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
            EXPERIENCE TIMELINE
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'hsl(var(--muted-foreground))',
            maxWidth: '48rem',
            margin: '0 auto'
          }}>
            Professional and Academic Journey
          </p>
        </div>

        {/* Timeline */}
        <div style={{
          position: 'relative',
          maxWidth: '80rem',
          margin: '0 auto'
        }} className="timeline-container">
          {/* Central timeline line - responsive positioning */}
          <div 
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--primary-glow)), hsl(var(--primary)))',
              transform: 'translateX(-50%)',
              zIndex: 1
            }}
            className="timeline-line"
          />

          {experiences.map((exp, index) => {
            const IconComponent = exp.icon;
            const isLeft = index % 2 === 0;
            
            return (
              <div 
                key={exp.id}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: index === experiences.length - 1 ? 0 : '4rem',
                  minHeight: '200px'
                }}
              >
                {/* Timeline node with neon glow */}
                <div 
                  className="timeline-node"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '16px',
                    height: '16px',
                    backgroundColor: 'hsl(var(--primary))',
                    borderRadius: '50%',
                    border: '4px solid hsl(var(--background))',
                    boxShadow: '0 0 20px hsl(var(--primary) / 0.5), 0 0 40px hsl(var(--primary) / 0.3)',
                    zIndex: 10
                  }} 
                />

                {/* Content card */}
                <div 
                  className="energy-card timeline-card"
                  style={{
                    borderRadius: '12px',
                    padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                    width: 'clamp(300px, 42%, 600px)',
                    marginLeft: isLeft ? 0 : '58%',
                    marginRight: isLeft ? '58%' : 0,
                    position: 'relative',
                    minHeight: '400px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem',
                      flexShrink: 0
                    }}>
                      <div style={{
                        padding: '0.5rem',
                        backgroundColor: 'hsl(var(--primary) / 0.2)',
                        borderRadius: '8px'
                      }}>
                        <IconComponent style={{
                          width: '24px',
                          height: '24px',
                          color: 'hsl(var(--primary))'
                        }} />
                      </div>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        backgroundColor: exp.type === 'INTERNSHIP' 
                          ? 'hsl(var(--primary) / 0.2)' 
                          : 'hsl(var(--primary) / 0.2)',
                        color: 'hsl(var(--primary))',
                        textAlign: 'center',
                        whiteSpace: 'nowrap'
                      }}>
                        {exp.type}
                      </span>
                    </div>
                    <div style={{ flex: 1, paddingTop: '0.25rem' }}>
                      <h3 style={{
                        fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                        fontWeight: 'bold',
                        color: 'hsl(var(--primary))',
                        marginBottom: '0.5rem',
                        lineHeight: 1.2
                      }}>
                        {exp.title}
                      </h3>
                      <p style={{
                        color: 'hsl(var(--foreground))',
                        fontWeight: 600,
                        fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                        lineHeight: 1.3
                      }}>
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    marginBottom: '1.5rem',
                    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                    color: 'hsl(var(--muted-foreground))'
                  }} className="timeline-details">
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <Calendar size={14} />
                      {exp.period}
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <MapPin size={14} />
                      {exp.location}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div style={{ flex: 1, marginBottom: '1.5rem' }}>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0
                    }}>
                      {exp.achievements.slice(0, 5).map((achievement, achIndex) => (
                        <li 
                          key={achIndex}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.75rem',
                            marginBottom: '0.75rem',
                            fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                            color: 'hsl(var(--foreground) / 0.85)',
                            lineHeight: 1.6
                          }}
                        >
                          <span style={{
                            color: 'hsl(var(--primary))',
                            marginTop: '0.25rem',
                            flexShrink: 0,
                            fontSize: '0.8em'
                          }}>
                            ▸
                          </span>
                          <span style={{ wordBreak: 'break-word' }}>
                            {achievement}
                          </span>
                        </li>
                      ))}
                      {exp.achievements.length > 5 && (
                        <li style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          marginTop: '0.5rem',
                          fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                          color: 'hsl(var(--primary))',
                          fontStyle: 'italic'
                        }}>
                          <span>▸</span>
                          +{exp.achievements.length - 5} more achievements...
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Details Button */}
                  <div style={{ marginTop: 'auto' }}>
                    <button
                      onClick={() => openModal(exp)}
                      className="neon-button"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                        borderRadius: '6px',
                        backgroundColor: 'hsl(var(--primary) / 0.1)',
                        border: '1px solid hsl(var(--primary) / 0.3)',
                        color: 'hsl(var(--primary))',
                        cursor: 'pointer'
                      }}
                    >
                      <Info size={16} />
                      VIEW DETAILS
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Professional Achievement highlight */}
        <div style={{
          textAlign: 'center',
          marginTop: '4rem'
        }}>
          <div 
            className="energy-card"
            style={{
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '20rem',
              margin: '0 auto'
            }}
          >
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'hsl(var(--primary))',
              marginBottom: '0.5rem'
            }}>
              {deployedProjectsCount}+
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: 'hsl(var(--muted-foreground))',
              marginBottom: '0.25rem'
            }}>
              Production Projects Deployed
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: 'hsl(var(--primary))'
            }}>
              Quality • Innovation • Impact
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

        {/* Experience Detail Modal */}
        <ExperienceDetailModal 
          experience={selectedExperience}
          isOpen={isModalOpen}
          onClose={closeModal}
        />

        {/* Responsive Timeline Styles */}
        <style jsx>{`
          @media (max-width: 768px) {
            .timeline-container {
              max-width: 100% !important;
            }
            
            .timeline-line {
              left: 2rem !important;
              transform: none !important;
            }
            
            .timeline-node {
              left: 2rem !important;
              transform: translateY(-50%) !important;
            }
            
            .timeline-card {
              width: calc(100% - 4rem) !important;
              margin-left: 4rem !important;
              margin-right: 0 !important;
              min-height: auto !important;
            }
            
            .timeline-details {
              flex-direction: column !important;
              gap: 0.25rem !important;
            }
          }
          
          @media (min-width: 1400px) {
            .timeline-card {
              width: clamp(400px, 45%, 700px) !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};