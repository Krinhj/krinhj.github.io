import React from 'react';
import { Calendar, MapPin, Code, GraduationCap } from 'lucide-react';
import { SectionTitle } from '../UI/HolographicText';

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
        "Strong foundation in software engineering principles"
      ],
      icon: GraduationCap,
      color: "primary-glow"
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section header with holo-text effect */}
        <SectionTitle subtitle="Professional journey through the digital realm">
          EXPERIENCE MATRIX
        </SectionTitle>

        {/* Timeline */}
        <div className="relative">
          {/* Central timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-electric via-red-bright to-red-electric transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => {
            const IconComponent = exp.icon;
            return (
              <div 
                key={exp.id}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline node with neon glow */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-electric rounded-full border-4 border-black z-10" 
                     style={{ boxShadow: 'var(--shadow-neon)' }} />

                {/* Content card */}
                <div className={`energy-card rounded-xl p-6 ml-16 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'
                }`}>
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2 bg-red-electric bg-opacity-20 rounded-lg">
                      <IconComponent className="w-6 h-6 text-red-electric" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-red-electric mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-white font-semibold">
                        {exp.company}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      exp.type === 'INTERNSHIP' 
                        ? 'bg-red-electric bg-opacity-20 text-red-electric' 
                        : 'bg-red-primary bg-opacity-20 text-red-primary'
                    }`}>
                      {exp.type}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      {exp.location}
                    </div>
                  </div>

                  {/* Achievements */}
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li 
                        key={achIndex}
                        className="flex items-start gap-2 text-sm text-white text-opacity-80"
                      >
                        <span className="text-red-electric mt-1">▸</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>

                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-electric from-opacity-5 to-red-primary to-opacity-5 rounded-xl" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Professional Achievement highlight - NO DUOLINGO */}
        <div className="text-center mt-16">
          <div className="energy-card rounded-xl p-8 max-w-md mx-auto">
            <div className="text-4xl font-bold text-red-electric mb-2">4+</div>
            <div className="text-sm text-gray-400">
              Production Projects Deployed
            </div>
            <div className="text-xs text-red-electric mt-1">
              Quality • Innovation • Impact
            </div>
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