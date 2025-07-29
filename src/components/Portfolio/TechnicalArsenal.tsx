import React from 'react';
import { Code, Database, Server, Wrench } from 'lucide-react';
import { SectionTitle } from '../UI/HolographicText';

export const TechnicalArsenal = () => {
  const skillCategories = [
    {
      title: "Languages",
      icon: Code,
      skills: ["Python", "SQL", "TypeScript", "JavaScript", "C#", "Java", "PHP"]
    },
    {
      title: "Frameworks",
      icon: Server,
      skills: ["React", "Node.js", ".NET Framework", "Tauri V2", "Express"]
    },
    {
      title: "Databases",
      icon: Database,
      skills: ["SQL Server", "MySQL", "MongoDB", "Supabase"]
    },
    {
      title: "Tools",
      icon: Wrench,
      skills: ["VS Code", "Visual Studio 2022", "Postman", "Git"]
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header - Professional title */}
        <SectionTitle subtitle="Core technologies and development tools">
          TECH STACK
        </SectionTitle>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={categoryIndex}
                className="energy-card rounded-xl p-6"
                style={{ 
                  animationDelay: `${categoryIndex * 0.2}s`,
                  animation: 'fade-in 0.8s ease-out forwards'
                }}
              >
                {/* Category header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-red-electric bg-opacity-20 rounded-lg">
                    <IconComponent className="w-6 h-6 text-red-electric" />
                  </div>
                  <h3 className="text-2xl font-bold text-red-electric">
                    {category.title}
                  </h3>
                </div>

                {/* Skills list - 2 column grid */}
                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="group relative overflow-hidden"
                      style={{ 
                        animationDelay: `${(categoryIndex * 0.2) + (skillIndex * 0.1)}s`
                      }}
                    >
                      <div className="neon-button rounded-lg p-3 text-center text-sm font-mono relative z-10">
                        {skill}
                      </div>
                      
                      {/* Scanning effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="scan-line h-full">
                          <div className="h-full bg-gradient-to-r from-transparent via-red-electric via-opacity-20 to-transparent" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* NO PROFICIENCY BAR - Removed meaningless percentages */}

                {/* Subtle hover effect for the entire card */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-electric from-opacity-3 to-red-primary to-opacity-3 rounded-xl" />
                </div>
              </div>
            );
          })}
        </div>

        {/* AI/ML Special section - Professional focus */}
        <div className="mt-12 text-center">
          <div className="energy-card rounded-xl p-6 max-w-2xl mx-auto">
            <h4 className="text-xl font-bold text-red-electric mb-4">
              AI/ML Development
            </h4>
            <div className="flex flex-wrap justify-center gap-3">
              {["OpenAI API", "Hugging Face", "Pandas", "Machine Learning", "NLP"].map((tech, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-red-electric bg-opacity-10 border border-red-electric border-opacity-30 rounded-lg text-sm text-red-electric font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Building intelligent applications with modern AI frameworks
            </p>
          </div>
        </div>

        {/* Bottom scan line */}
        <div className="mt-16 scan-line">
          <div className="h-px bg-gradient-to-r from-transparent via-red-electric to-transparent" />
        </div>
      </div>
    </section>
  );
};