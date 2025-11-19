import React, { useState } from 'react';
import { ExternalLink, Github, Info } from 'lucide-react';
import { ProjectDetailModal } from '../UI/ProjectDetailModal';
import { projects } from '../../data';

export const ProjectMatrix = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

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
            Designing software that explores smarter, better solutions.
          </p>
        </div>

        {/* Projects grid */}
        <div
          className="projects-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(500px, 100%), 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}
        >
          {projects.map((project, index) => {
            const isFlagship = project.name === "Momentum AI Suite";
            return (
              <div
                key={project.id}
                className={`energy-card ${isFlagship ? 'flagship-project' : ''}`}
                style={{
                  borderRadius: '12px',
                  padding: '2rem',
                  position: 'relative',
                  animationDelay: `${index * 0.2}s`,
                  gridTemplateRows: 'auto 1fr auto auto',
                  ...(isFlagship && {
                    border: '3px solid hsl(0 84% 60%) !important',
                    boxShadow: '0 0 40px hsl(0 84% 60% / 0.4), inset 0 0 40px hsl(0 84% 60% / 0.1) !important',
                    background: 'linear-gradient(135deg, hsl(var(--background)), hsl(0 84% 60% / 0.08)) !important',
                    transform: 'scale(1.02)'
                  })
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
                    <span
                      className="project-status"
                      style={{
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
                      }}
                    >
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
                  marginBottom: '1.5rem',
                  alignItems: 'center'
                }}>
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="project-chip"
                      style={{
                        backgroundColor: 'hsl(var(--primary) / 0.1)',
                        border: '1px solid hsl(var(--primary) / 0.3)',
                        color: 'hsl(var(--primary))'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div style={{
                  display: 'flex',
                  gap: '0.75rem',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => openModal(project)}
                    className="neon-button project-action"
                    style={{
                      backgroundColor: 'hsl(var(--primary) / 0.1)',
                      border: '2px solid hsl(var(--primary) / 0.3)',
                      color: 'hsl(var(--primary))'
                    }}
                  >
                    <Info size={16} />
                    DETAILS
                  </button>
                  {project.status === 'LIVE' && project.link && project.link !== '#' && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neon-button project-action"
                    >
                      <ExternalLink size={16} />
                      LIVE
                    </a>
                  )}
                  {project.isPublicRepo && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neon-button project-action"
                      style={{
                        backgroundColor: 'transparent'
                      }}
                    >
                      <Github size={16} />
                      CODE
                    </a>
                  )}
                </div>
              </div>
            );
          })}
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

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};
