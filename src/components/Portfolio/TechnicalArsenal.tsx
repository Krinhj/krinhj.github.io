import React from 'react';
import type { SkillCategory, SkillToken } from '../../data';
import { skillCategories, aiMlSkills } from '../../data';
import { Cpu } from 'lucide-react';

const iconPath = (slug: string) => `/assets/tech-icons/${slug}.svg`;

interface CarouselStripProps {
  category: {
    title: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    skills: SkillToken[];
  };
  speed?: number;
  headline?: string;
}

const CarouselStrip: React.FC<CarouselStripProps> = ({ category, speed = 28, headline }) => {
  const IconComponent = category.icon;
  const items = [...category.skills, ...category.skills, ...category.skills];

  return (
    <article className="tech-strip">
      <header className="tech-strip__header">
        <div className="tech-strip__title">
          <span className="tech-strip__badge" aria-hidden="true">
            <IconComponent size={20} />
          </span>
          <h3>{headline ?? category.title}</h3>
        </div>
        <div className="tech-strip__divider" aria-hidden="true" />
      </header>

      <div
        className="tech-strip__viewport"
        role="list"
        aria-label={`${headline ?? category.title} technology carousel`}
      >
        <div
          className="tech-strip__track"
          style={{
            // Wider arrays scroll a touch slower for legibility
            ['--tech-strip-speed' as string]: `${Math.max(speed, category.skills.length * 3)}s`,
          }}
        >
          {items.map((skill, index) => (
            <div className="tech-token" key={`${skill.label}-${index}`} role="listitem">
              <span
                className="tech-token__icon"
                style={{ ['--tech-token-icon' as string]: `url(${iconPath(skill.icon)})` }}
                aria-hidden="true"
              />
              <span className="tech-token__label">{skill.label}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

const aiMlCategory: SkillCategory = {
  title: 'AI + ML Spotlight',
  icon: Cpu,
  skills: aiMlSkills,
};

export const TechnicalArsenal = () => {
  return (
    <section className="technical-arsenal section-shell">
      <div className="technical-arsenal__container">
        <header className="section-header tech-header">
          <span className="section-eyebrow">Synthwave Proficiency Grid</span>
          <h2 className="glitch" data-text="TECHNICAL ARSENAL">
            TECHNICAL ARSENAL
          </h2>
          <p className="body-text">
            A constantly evolving toolkit spanning languages, frameworks, platforms, and the AI
            systems powering Ronnie's delivery.
          </p>
        </header>

        <div className="tech-strip-stack">
          {skillCategories.map((category) => (
            <CarouselStrip key={category.title} category={category} />
          ))}

          <CarouselStrip category={aiMlCategory} speed={32} headline="AI + ML Spotlight" />
        </div>
      </div>
    </section>
  );
};
