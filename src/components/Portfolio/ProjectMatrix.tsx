import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

export const ProjectMatrix = () => {
  const projects = [
    {
      id: 1,
      name: "GetMeHired",
      subtitle: "AI-Powered Job Application Tracking Platform",
      description: "Job application tracker powered by OpenAI API. Smart categorization, Resume Builder, Cover Letter Writer, and AI-driven insights for job seekers.",
      tech: ["React", "Node.js", "OpenAI API", "Vercel", "Supabase"],
      status: "LIVE",
      link: "https://get-me-hired.vercel.app",
      github: "https://github.com/Krinhj",
      color: "primary"
    },
    {
      id: 2,
      name: "3D Disaster Simulation Game",
      subtitle: "Unity Thesis Project",
      description: "Comprehensive 3D disaster simulation game built in Unity with C#. Features real-time scoring algorithms, Firebase-powered leaderboards, and persistent run history system for educational disaster preparedness training.",
      tech: ["Unity", "C#", "Firebase", "Unity Editor"],
      status: "COMPLETED",
      link: "#",
      github: "https://github.com/Krinhj",
      color: "primary-glow"
    },
    {
      id: 3,
      name: "DBM National Tax Allocation Webpage",
      subtitle: "National Database Architecture",
      description: "Enterprise-grade database system for the Department of Budget & Management. Handling National Tax Allocation data with Java MVC framework.",
      tech: ["Java", "SQL Server", "REST API", "MVC"],
      status: "LIVE",
      link: "https://reports.dbm.gov.ph/ira2",
      github: "https://github.com/Krinhj",
      color: "primary-glow"
    },
    {
      id: 4,
      name: "DBM National Wealth Webpage",
      subtitle: "National Database Architecture",
      description: "Enterprise-grade database system for the Department of Budget & Management. Handling National Wealth data with Java MVC framework.",
      tech: ["Java", "SQL Server", "REST API", "MVC"],
      status: "LIVE",
      link: "https://reports.dbm.gov.ph/national_wealth/dashboard",
      github: "https://github.com/Krinhj",
      color: "primary-glow"
    },
    {
      id: 5,
      name: "TDEE Calculator API",
      subtitle: "Production REST API",
      description: "High-performance REST API deployed on RapidAPI marketplace. Calculates Total Daily Energy Expenditure with precision algorithms.",
      tech: ["Node.js", "Express", "Railway", "RapidAPI"],
      status: "LIVE",
      link: "#",
      github: "https://github.com/Krinhj",
      color: "primary-dim"
    },
    {
      id: 6,
      name: "Baptism Records Manager",
      subtitle: "Parish Management Desktop App",
      description: "Comprehensive parish management system built with Tauri V2. Features full CRUD operations, permissions-based access control, automated backup/restore system, and detailed audit logging for all administrative actions.",
      tech: ["React", "Tailwind", "Tauri V2", "Rust"],
      status: "PRODUCTION",
      link: "#",
      github: "https://github.com/Krinhj",
      color: "primary"
    },
    {
      id: 7,
      name: "MediTriage AI",
      subtitle: "Healthcare Chatbot System",
      description: "Intelligent medical triage chatbot using advanced NLP. Assists patients with symptom assessment and healthcare navigation.",
      tech: ["Python", "Pandas", "Hugging Face", "ML"],
      status: "ON HOLD",
      link: "#",
      github: "https://github.com/Krinhj",
      color: "primary-dim"
    }
  ];

  return (
    <section id="projects-section" style={{
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
            data-text="PROJECT MATRIX"
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
            PROJECT MATRIX
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'hsl(var(--muted-foreground))',
            maxWidth: '48rem',
            margin: '0 auto'
          }}>
            Cutting-edge applications pushing the boundaries of web technology
          </p>
        </div>

        {/* Projects grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="energy-card"
              style={{
                borderRadius: '12px',
                padding: '2rem',
                position: 'relative',
                animationDelay: `${index * 0.2}s`
              }}
            >
              {/* Project header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'hsl(var(--primary))',
                    marginBottom: '0.25rem'
                  }}>
                    {project.name}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'hsl(var(--muted-foreground))'
                  }}>
                    {project.subtitle}
                  </p>
                </div>
                <div>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    backgroundColor: project.status === 'LIVE' 
                      ? 'hsl(var(--primary) / 0.2)' 
                      : project.status === 'PRODUCTION'
                      ? 'hsl(var(--primary) / 0.2)'
                      : 'hsl(var(--muted) / 0.2)',
                    color: project.status === 'LIVE' 
                      ? 'hsl(var(--primary))' 
                      : project.status === 'PRODUCTION'
                      ? 'hsl(var(--primary))'
                      : 'hsl(var(--muted-foreground))',
                    animation: project.status === 'LIVE' ? 'energy-pulse 2s ease-in-out infinite' : 'none'
                  }}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project description */}
              <p style={{
                color: 'hsl(var(--foreground) / 0.8)',
                marginBottom: '1.5rem',
                lineHeight: 1.6,
                fontSize: '1rem'
              }}>
                {project.description}
              </p>

              {/* Tech stack */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '1.5rem'
              }}>
                {project.tech.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    style={{
                      padding: '0.25rem 0.75rem',
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

              {/* Action buttons */}
              <div style={{
                display: 'flex',
                gap: '1rem'
              }}>
                {project.status === 'LIVE' && project.link && project.link !== '#' && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neon-button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      fontSize: '0.875rem',
                      borderRadius: '6px',
                      textDecoration: 'none'
                    }}
                  >
                    <ExternalLink size={16} />
                    VIEW LIVE
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    backgroundColor: 'transparent'
                  }}
                >
                  <Github size={16} />
                  CODE
                </a>
              </div>
            </div>
          ))}
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