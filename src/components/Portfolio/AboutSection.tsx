import React from 'react';
import { Code2, Brain, Rocket, Calendar } from 'lucide-react';
import { aboutSummary, keyStrengths } from '../../data';

const iconByStrength: Record<string, React.ComponentType<{ size?: number }>> = {
  'Full-Stack Development': Code2,
  'AI Integration': Brain,
  'System Architecture': Rocket,
  'Project Leadership': Calendar,
};

export const AboutSection = () => {
  return (
    <section id="about-section" className="section-shell section-shell--wide">
      <div className="section-intro section-intro--center">
        <h2 className="glitch section-heading" data-text="ABOUT ME">
          ABOUT ME
        </h2>
        <p className="section-description">
          Full-stack Developer • AI Engineer • System Architect
        </p>
      </div>

      <article className="energy-card content-medium">
        <h3 className="about-summary__title">
          <Brain size={24} />
          Professional Summary
        </h3>

        <div className="about-summary__body">
          {aboutSummary.professionalSummary.map((paragraph) => (
            <p key={paragraph} className="body-text">
              {paragraph}
            </p>
          ))}
        </div>

        <div>
          <h4 className="about-strengths__header">Key Strengths</h4>
          <div className="about-strengths__grid">
            {keyStrengths.map((strength) => {
              const IconComponent =
                iconByStrength[strength.title] ?? Code2;

              return (
                <div key={strength.title} className="about-strengths__card">
                  <span className="about-strengths__title">
                    <IconComponent size={18} />
                    {strength.title}
                  </span>
                  <p className="body-text--sm">{strength.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </article>

      <div className="scan-line mt-section-gap">
        <div className="scan-line__beam" />
      </div>
    </section>
  );
};
