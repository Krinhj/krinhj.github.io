// Re-export all data from individual files
export * from './projects';
export * from './experience';
export * from './skills';
export * from './personalInfo';

// Import everything for the export function
import { projects } from './projects';
import { experiences, deployedProjectsCount } from './experience';
import { skillCategories, aiMlSkills } from './skills';
import { contactMethods, personalInfo, aboutSummary, keyStrengths, contactCallToAction } from './personalInfo';

// Comprehensive data export function for resume generation
export const exportPortfolioData = () => {
  return {
    personalInfo: {
      ...personalInfo,
      aboutSummary: aboutSummary.professionalSummary,
      keyStrengths,
      contactMethods: contactMethods.map(method => ({
        label: method.label,
        value: method.value,
        link: method.link
      })),
      contactCallToAction
    },
    projects: projects.map(project => ({
      id: project.id,
      name: project.name,
      subtitle: project.subtitle,
      description: project.description,
      detailedDescription: project.detailedDescription,
      tech: project.tech,
      status: project.status,
      link: project.link,
      github: project.github,
      components: project.components,
      features: project.features,
      challenges: project.challenges,
      impact: project.impact,
      timeline: project.timeline,
      teamSize: project.teamSize,
      isPublicRepo: project.isPublicRepo,
      screenshots: project.screenshots ? project.screenshots.length : 0
    })),
    experience: experiences.map(exp => ({
      id: exp.id,
      title: exp.title,
      company: exp.company,
      location: exp.location,
      period: exp.period,
      type: exp.type,
      achievements: exp.achievements,
      detailedDescription: exp.detailedDescription,
      skills: exp.skills,
      challenges: exp.challenges,
      impact: exp.impact,
      highlights: exp.highlights
    })),
    skills: {
      categories: skillCategories.map(category => ({
        title: category.title,
        skills: category.skills
      })),
      aiMlSkills,
      allSkills: skillCategories.flatMap(category => category.skills).concat(aiMlSkills)
    },
    statistics: {
      totalProjects: projects.length,
      deployedProjects: deployedProjectsCount,
      totalSkills: skillCategories.flatMap(category => category.skills).length + aiMlSkills.length,
      experienceEntries: experiences.length
    },
    metadata: {
      lastUpdated: new Date().toISOString(),
      portfolioVersion: '2.0',
      dataStructureVersion: '1.0'
    }
  };
};

// Development-only data extraction (for resume generation)
export const getResumeData = () => {
  if (typeof window !== 'undefined' && (window as any).__DEV__ !== true) {
    console.warn('getResumeData() is only available in development mode');
    return null;
  }
  
  return exportPortfolioData();
};

// Type definitions for export
export type PortfolioData = ReturnType<typeof exportPortfolioData>;