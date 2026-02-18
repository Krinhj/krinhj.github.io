import { promises as fs } from 'fs';
import path from 'path';

/**
 * @typedef {{ title?: string, description?: string }} Strength
 * @typedef {{
 *   name?: string, subtitle?: string, description?: string, detailedDescription?: string,
 *   status?: string, tech?: string[], features?: string[], challenges?: string[],
 *   impact?: string, timeline?: string, teamSize?: string,
 *   components?: { name?: string, description?: string, features?: string[] }[]
 * }} Project
 * @typedef {{
 *   title?: string, company?: string, location?: string, period?: string, type?: string,
 *   achievements?: string[], detailedDescription?: string, skills?: string[],
 *   challenges?: string[], impact?: string, highlights?: string[]
 * }} Experience
 * @typedef {{ title?: string, skills?: string[] }} SkillCategory
 *
 * @typedef {{
 *   personalInfo?: {
 *     name?: string;
 *     title?: string;
 *     email?: string;
 *     aboutSummary?: string[] | { professionalSummary?: string[] };
 *     keyStrengths?: Strength[];
 *     contactMethods?: { label?: string, value?: string, link?: string }[];
 *   };
 *   projects?: Project[];
 *   experience?: Experience[];
 *   skills?: {
 *     allSkills?: string[];
 *     categories?: SkillCategory[];
 *     aiMlSkills?: string[];
 *   };
 * }} PortfolioData
 *
 * @typedef {{
 *   context: string;
 *   summary: {
 *     projectCount: number;
 *     experienceCount: number;
 *     skillCount: number;
 *   };
 * }} GroundingPayload
 */

/** @type {GroundingPayload | null} */
let cachedPayload = null;

/**
 * @returns {Promise<PortfolioData | null>}
 */
async function loadPortfolioData() {
  try {
    const knowledgePath = path.join(
      process.cwd(),
      'extracted-portfolio-data.json',
    );
    const raw = await fs.readFile(knowledgePath, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.warn('[portfolio-knowledge] Failed to load data file:', error);
    return null;
  }
}

/**
 * Normalize aboutSummary which can be either a string[], or { professionalSummary: string[] }
 * @param {string[] | { professionalSummary?: string[] } | undefined} aboutSummary
 * @returns {string[]}
 */
function normalizeAboutSummary(aboutSummary) {
  if (!aboutSummary) return [];
  if (Array.isArray(aboutSummary)) return aboutSummary;
  if (Array.isArray(aboutSummary.professionalSummary)) {
    return aboutSummary.professionalSummary;
  }
  return [];
}

/**
 * @param {Strength[] | undefined} strengths
 */
function formatStrengths(strengths) {
  if (!strengths?.length) {
    return '';
  }

  const strongPoints = strengths
    .filter((item) => item?.title && item?.description)
    .map((item) => {
      const title = item.title?.trim() ?? '';
      const description = item.description?.trim()?.replace(/\.$/, '') ?? '';
      return `- ${title}: ${description}.`;
    });

  if (!strongPoints.length) {
    return '';
  }

  return ['Key strengths:', ...strongPoints].join('\n');
}

/**
 * @param {Project[] | undefined} projects
 */
function formatProjects(projects) {
  if (!projects?.length) {
    return { text: '', count: 0 };
  }

  const projectLines = projects.map((project) => {
    const parts = [];
    const name = project.name?.trim() ?? 'Untitled Project';
    const status = project.status?.trim();
    const subtitle = project.subtitle?.trim();

    parts.push(`### ${name}${status ? ` [${status}]` : ''}`);

    if (subtitle) {
      parts.push(subtitle);
    }

    const description = project.description?.trim();
    if (description) {
      parts.push(description);
    }

    const detailedDescription = project.detailedDescription?.trim();
    if (detailedDescription && detailedDescription !== description) {
      parts.push(detailedDescription);
    }

    const techStack = project.tech?.join(', ');
    if (techStack) {
      parts.push(`Tech stack: ${techStack}`);
    }

    if (project.timeline?.trim()) {
      parts.push(`Timeline: ${project.timeline.trim()}`);
    }

    if (project.teamSize?.trim()) {
      parts.push(`Team: ${project.teamSize.trim()}`);
    }

    // Components (e.g. GAIA AI, Momentum Application)
    if (project.components?.length) {
      for (const comp of project.components) {
        if (comp.name && comp.description) {
          parts.push(`Component - ${comp.name}: ${comp.description}`);
          if (comp.features?.length) {
            parts.push(
              comp.features.map((f) => `  * ${f}`).join('\n'),
            );
          }
        }
      }
    }

    // Features
    if (project.features?.length) {
      parts.push(
        'Key features:\n' +
          project.features.map((f) => `  - ${f}`).join('\n'),
      );
    }

    // Impact
    if (project.impact?.trim()) {
      parts.push(`Impact: ${project.impact.trim()}`);
    }

    return parts.join('\n');
  });

  return {
    text: ['=== Projects ===', ...projectLines].join('\n\n'),
    count: projects.length,
  };
}

/**
 * @param {Experience[] | undefined} experience
 */
function formatExperience(experience) {
  if (!experience?.length) {
    return { text: '', count: 0 };
  }

  const experienceLines = experience.map((role) => {
    const parts = [];
    const title = role.title?.trim() ?? 'Role';
    const company = role.company?.trim();
    const location = role.location?.trim();
    const period = role.period?.trim();
    const type = role.type?.trim();

    let header = `### ${title}`;
    if (company) header += ` at ${company}`;
    if (location) header += ` (${location})`;
    parts.push(header);

    if (period || type) {
      parts.push(
        [period, type?.toLowerCase()].filter(Boolean).join(' - '),
      );
    }

    const detailedDescription = role.detailedDescription?.trim();
    if (detailedDescription) {
      parts.push(detailedDescription);
    }

    // Achievements
    if (role.achievements?.length) {
      parts.push(
        'Achievements:\n' +
          role.achievements.map((a) => `  - ${a}`).join('\n'),
      );
    }

    // Skills used in role
    if (role.skills?.length) {
      parts.push(`Skills: ${role.skills.join(', ')}`);
    }

    // Impact
    if (role.impact?.trim()) {
      parts.push(`Impact: ${role.impact.trim()}`);
    }

    // Highlights
    if (role.highlights?.length) {
      parts.push(
        'Highlights:\n' +
          role.highlights.map((h) => `  - ${h}`).join('\n'),
      );
    }

    return parts.join('\n');
  });

  return {
    text: ['=== Experience ===', ...experienceLines].join('\n\n'),
    count: experience.length,
  };
}

/**
 * @param {SkillCategory[] | undefined} categories
 * @param {string[] | undefined} allSkills
 * @param {string[] | undefined} aiMlSkills
 */
function formatSkills(categories, allSkills, aiMlSkills) {
  const uniqueSkills = new Set();

  if (categories?.length) {
    for (const category of categories) {
      category.skills?.forEach((skill) => uniqueSkills.add(skill.trim()));
    }
  }

  if (allSkills?.length) {
    allSkills.forEach((skill) => uniqueSkills.add(skill.trim()));
  }

  if (aiMlSkills?.length) {
    aiMlSkills.forEach((skill) => uniqueSkills.add(skill.trim()));
  }

  const sortedSkills = Array.from(uniqueSkills)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  if (!sortedSkills.length) {
    return { text: '', count: 0 };
  }

  const categoriesSummary =
    categories
      ?.filter((category) => category.title && category.skills?.length)
      .map((category) => {
        const title = category.title?.trim() ?? 'Skills';
        const subset =
          category.skills
            ?.map((skill) => skill.trim())
            .join(', ') ?? '';
        return `- ${title}: ${subset}`;
      }) ?? [];

  const lines = ['=== Skills ===', ...categoriesSummary];

  if (aiMlSkills?.length) {
    lines.push(`- AI/ML: ${aiMlSkills.join(', ')}`);
  }

  lines.push(`All technologies: ${sortedSkills.join(', ')}`);

  return { text: lines.join('\n'), count: sortedSkills.length };
}

function trimLines(input) {
  return input
    .split('\n')
    .map((line) => line.trimEnd())
    .filter((line) => line.length > 0)
    .join('\n');
}

/**
 * @returns {Promise<GroundingPayload>}
 */
export async function getGroundingPayload() {
  if (cachedPayload) {
    return cachedPayload;
  }

  const data = await loadPortfolioData();

  if (!data) {
    cachedPayload = {
      context:
        'Ronnie Talabucon Jr. is a full-stack developer with AI integration experience. Ask follow-up questions to clarify missing details.',
      summary: {
        projectCount: 0,
        experienceCount: 0,
        skillCount: 0,
      },
    };

    return cachedPayload;
  }

  const lines = [];
  const aboutLines = [];

  if (data.personalInfo?.name) {
    const name = data.personalInfo.name.trim();
    const title = data.personalInfo.title?.trim();
    const summaryParts = normalizeAboutSummary(data.personalInfo.aboutSummary);
    const aboutSummary = summaryParts.join(' ');

    aboutLines.push(`Primary subject: ${name}${title ? ` - ${title}` : ''}.`);

    if (aboutSummary) {
      aboutLines.push(aboutSummary);
    }
    if (data.personalInfo.email) {
      aboutLines.push(`Preferred contact: ${data.personalInfo.email.trim()}.`);
    }

    // Contact methods
    if (data.personalInfo.contactMethods?.length) {
      const contacts = data.personalInfo.contactMethods
        .filter((c) => c.label && c.value)
        .map((c) => `${c.label}: ${c.value}`)
        .join(' | ');
      if (contacts) {
        aboutLines.push(`Contact: ${contacts}`);
      }
    }
  }

  const strengthsText = formatStrengths(data.personalInfo?.keyStrengths);
  if (strengthsText) {
    aboutLines.push(strengthsText);
  }

  if (aboutLines.length) {
    lines.push('=== Portfolio Snapshot ===');
    lines.push(...aboutLines);
  }

  const experienceSection = formatExperience(data.experience);
  if (experienceSection.text) {
    lines.push('', experienceSection.text);
  }

  const projectSection = formatProjects(data.projects);
  if (projectSection.text) {
    lines.push('', projectSection.text);
  }

  const skillsSection = formatSkills(
    data.skills?.categories,
    data.skills?.allSkills,
    data.skills?.aiMlSkills,
  );
  if (skillsSection.text) {
    lines.push('', skillsSection.text);
  }

  lines.push(
    '',
    'Assistant briefing: Synthwave terminal guide powered by the curated portfolio content and product documentation Ronnie ships with this site. It can surface highlights, answer questions, and trigger commands like /boot when visitors want the full experience—no external data or personal records beyond what is published here.',
  );

  const context = trimLines(lines.join('\n'));

  cachedPayload = {
    context,
    summary: {
      projectCount: projectSection.count,
      experienceCount: experienceSection.count,
      skillCount: skillsSection.count,
    },
  };

  return cachedPayload;
}
