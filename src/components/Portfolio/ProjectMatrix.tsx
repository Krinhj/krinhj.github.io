import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { SectionTitle } from '../UI/HolographicText';
import { ProjectButton } from '../UI/NeonButton';

export const ProjectMatrix = () => {
  const projects = [
    {
      id: 1,
      name: "GetMeHired",
      subtitle: "AI Job Tracking Platform",
      description: "Revolutionary job application tracker powered by OpenAI API. Smart categorization, automated follow-ups, and AI-driven insights for job seekers.",
      tech: ["React", "Node.js", "OpenAI API", "Vercel"],
      status: "LIVE",
      link: "https://get-me-hired.vercel.app",
      github: "https://github.com/Krinhj",
      color: "primary"
    },
    {
      id: 2,
      name: "DBM Government System",
      subtitle: "National Database Architecture",
      description: "Enterprise-grade database system for Department of Budget & Management. Handling national tax allocation data with Java MVC framework.",
      tech: ["Java", "SQL Server", "REST API", "MVC"],
      status: "PRODUCTION",
      link: "#",
      github: "https://github.com/Krinhj",
      color: "primary-glow"
    },
    {
      id: 3,
      name: "MediTriage AI",
      subtitle: "Healthcare Chatbot System",
      description: "Intelligent medical triage chatbot using advanced NLP. Assists patients with symptom assessment and healthcare navigation.",
      tech: ["Python", "Pandas", "Hugging Face", "ML"],
      status: "ON HOLD",
      link: "#",
      github: "https://github.com/Krinhj",
      color: "primary-dim"
    },
    {
      id: 4,
      name: "TDEE Calculator API",
      subtitle: "Production REST API",
      description: "High-performance REST API deployed on RapidAPI marketplace. Calculates Total Daily Energy Expenditure with precision algorithms.",
      tech: ["Node.js", "Express", "Railway", "RapidAPI"],
      status: "LIVE",
      link: "#",
      github: "https://github.com/Krinhj",
      color: "primary"
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header with glitch effect and scan line */}
        <SectionTitle subtitle="Cutting-edge applications pushing the boundaries of web technology">
          PROJECT MATRIX
        </SectionTitle>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="energy-card rounded-xl p-6 group"
              style={{ 
                animationDelay: `${index * 0.2}s`,
                animation: 'fade-in 0.8s ease-out forwards'
              }}
            >
              {/* Project header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-red-electric mb-1">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {project.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span 
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      project.status === 'LIVE' 
                        ? 'bg-red-electric bg-opacity-20 text-red-electric animate-pulse' 
                        : project.status === 'PRODUCTION'
                        ? 'bg-red-primary bg-opacity-20 text-red-primary'
                        : 'bg-gray-600 bg-opacity-20 text-gray-400'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project description */}
              <p className="text-white text-opacity-80 mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 bg-red-primary bg-opacity-10 border border-red-primary border-opacity-30 rounded-lg text-sm text-red-electric font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex gap-4">
                {project.status === 'LIVE' && project.link && project.link !== '#' && (
                  <ProjectButton
                    isLive={true}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={<ExternalLink size={16} />}
                  >
                    VIEW LIVE
                  </ProjectButton>
                )}
                <ProjectButton
                  isLive={false}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<Github size={16} />}
                >
                  CODE
                </ProjectButton>
              </div>

              {/* Hover effect overlay - SUBTLE VERSION */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-red-electric from-opacity-5 to-red-primary to-opacity-5 rounded-xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom scan line */}
        <div className="mt-16 scan-line">
          <div className="h-px bg-gradient-to-r from-transparent via-red-electric to-transparent" />
        </div>
      </div>
    </section>
  );
};