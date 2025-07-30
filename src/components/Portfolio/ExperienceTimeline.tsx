import React from 'react';
import { Calendar, MapPin, Code, GraduationCap } from 'lucide-react';

export const ExperienceTimeline = () => {
  const experiences = [
    {
      id: 1,
      title: "Backend Developer Intern",
      company: "Department of Budget and Management",
      location: "Philippines Government",
      period: "Feb 2025 - May 2025",
      type: "INTERNSHIP",
      achievements: [
        "MongoDB to SQL migration for National Tax Allocation system",
        "Excel data scraper with advanced coordinate detection algorithms",
        "REST API development using Java MVC framework",
        "Database optimization for government-scale operations"
      ],
      icon: Code,
      color: "primary"
    },
    {
      id: 2,
      title: "Computer Science Graduate",
      company: "University Achievement",
      location: "Academic Excellence",
      period: "2025",
      type: "EDUCATION",
      achievements: [
        "Full-stack development specialization",
        "Database architecture and optimization focus",
        "AI/ML project development experience",
        "Software engineering best practices"
      ],
      icon: GraduationCap,
      color: "primary-glow"
    }
  ];

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
            data-text="EXPERIENCE MATRIX"
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
            EXPERIENCE MATRIX
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'hsl(var(--muted-foreground))',
            maxWidth: '48rem',
            margin: '0 auto'
          }}>
            Professional journey through the digital realm
          </p>
        </div>

        {/* Timeline */}
        <div style={{
          position: 'relative',
          maxWidth: '48rem',
          margin: '0 auto'
        }}>
          {/* Central timeline line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--primary-glow)), hsl(var(--primary)))',
            transform: 'translateX(-50%)',
            zIndex: 1
          }} />

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
                <div style={{
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
                }} />

                {/* Content card */}
                <div 
                  className="energy-card"
                  style={{
                    borderRadius: '12px',
                    padding: '2rem',
                    width: '45%',
                    marginLeft: isLeft ? 0 : '55%',
                    marginRight: isLeft ? '55%' : 0,
                    position: 'relative'
                  }}
                >
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    marginBottom: '1rem'
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
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: 'hsl(var(--primary))',
                        marginBottom: '0.25rem'
                      }}>
                        {exp.title}
                      </h3>
                      <p style={{
                        color: 'hsl(var(--foreground))',
                        fontWeight: 600,
                        marginBottom: '0.5rem'
                      }}>
                        {exp.company}
                      </p>
                    </div>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      backgroundColor: exp.type === 'INTERNSHIP' 
                        ? 'hsl(var(--primary) / 0.2)' 
                        : 'hsl(var(--primary) / 0.2)',
                      color: 'hsl(var(--primary))'
                    }}>
                      {exp.type}
                    </span>
                  </div>

                  {/* Details */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem',
                    fontSize: '0.875rem',
                    color: 'hsl(var(--muted-foreground))'
                  }}>
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
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {exp.achievements.map((achievement, achIndex) => (
                      <li 
                        key={achIndex}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.5rem',
                          marginBottom: '0.5rem',
                          fontSize: '0.875rem',
                          color: 'hsl(var(--foreground) / 0.8)',
                          lineHeight: 1.5
                        }}
                      >
                        <span style={{
                          color: 'hsl(var(--primary))',
                          marginTop: '0.25rem',
                          flexShrink: 0
                        }}>
                          ▸
                        </span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
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
              4+
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
      </div>
    </section>
  );
};