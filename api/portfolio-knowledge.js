import { promises as fs } from 'fs';
import path from 'path';

/**
 * @typedef {{ title?: string, description?: string }} Strength
 * @typedef {{ name?: string, subtitle?: string, description?: string, status?: string, tech?: string[] }} Project
 * @typedef {{ title?: string, company?: string, location?: string, period?: string, type?: string }} Experience
 * @typedef {{ title?: string, skills?: string[] }} SkillCategory
 *
 * @typedef {{
 *   personalInfo?: {
 *     name?: string;
 *     title?: string;
 *     email?: string;
 *     aboutSummary?: string[];
 *     keyStrengths?: Strength[];
 *   };
 *   projects?: Project[];
 *   experience?: Experience[];
 *   skills?: {
 *     allSkills?: string[];
 *     categories?: SkillCategory[];
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
 * @param {Strength[] | undefined} strengths
 */
function formatStrengths(strengths) {
  if (!strengths?.length) {
    return '';
  }

  const strongPoints = strengths
    .filter((item) => item?.title && item?.description)
    .slice(0, 4)
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

  const projectLines = projects.slice(0, 6).map((project) => {
    const fragments = [];
    const name = project.name?.trim() ?? 'Untitled Project';
    fragments.push(name);

    const status = project.status?.trim();
    if (status) {
      fragments.push(`status: ${status}`);
    }

    const subtitle = project.subtitle?.trim();
    if (subtitle) {
      fragments.push(subtitle);
    }

    const description = project.description?.trim();
    if (description) {
      fragments.push(description);
    }

    const techStack = project.tech?.slice(0, 6).join(', ');
    if (techStack) {
      fragments.push(`stack: ${techStack}`);
    }

    return `- ${fragments.join(' - ')}`;
  });

  return {
    text: ['Flagship projects:', ...projectLines].join('\n'),
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
    const fragments = [];
    const title = role.title?.trim() ?? 'Role';
    fragments.push(title);

    const company = role.company?.trim();
    if (company) {
      fragments.push(`at ${company}`);
    }

    const location = role.location?.trim();
    if (location) {
      fragments.push(`(${location})`);
    }

    const period = role.period?.trim();
    if (period) {
      fragments.push(period);
    }

    const type = role.type?.trim();
    if (type) {
      fragments.push(type.toLowerCase());
    }

    return `- ${fragments.join(' - ')}`;
  });

  return {
    text: ['Experience history:', ...experienceLines].join('\n'),
    count: experience.length,
  };
}

/**
 * @param {SkillCategory[] | undefined} categories
 * @param {string[] | undefined} allSkills
 */
function formatSkills(categories, allSkills) {
  const uniqueSkills = new Set();

  if (categories?.length) {
    for (const category of categories) {
      category.skills?.forEach((skill) => uniqueSkills.add(skill.trim()));
    }
  }

  if (allSkills?.length) {
    allSkills.forEach((skill) => uniqueSkills.add(skill.trim()));
  }

  const sortedSkills = Array.from(uniqueSkills)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  const topSkills = sortedSkills.slice(0, 18);
  if (!topSkills.length) {
    return { text: '', count: 0 };
  }

  const categoriesSummary =
    categories
      ?.filter((category) => category.title && category.skills?.length)
      .slice(0, 4)
      .map((category) => {
        const title = category.title?.trim() ?? 'Skills';
        const subset =
          category.skills
            ?.slice(0, 6)
            .map((skill) => skill.trim())
            .join(', ') ?? '';
        return `- ${title}: ${subset}`;
      }) ?? [];

  const lines = [
    'Core skills:',
    ...categoriesSummary,
    `Highlighted technologies: ${topSkills.join(', ')}`,
  ];

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
    const aboutSummary = data.personalInfo.aboutSummary?.join(' ');

    aboutLines.push(`Primary subject: ${name}${title ? ` - ${title}` : ''}.`);

    if (aboutSummary) {
      aboutLines.push(aboutSummary);
    }
    if (data.personalInfo.email) {
      aboutLines.push(`Preferred contact: ${data.personalInfo.email.trim()}.`);
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

  const projectSection = formatProjects(data.projects);
  if (projectSection.text) {
    lines.push('', projectSection.text);
  }

  const experienceSection = formatExperience(data.experience);
  if (experienceSection.text) {
    lines.push('', experienceSection.text);
  }

  const skillsSection = formatSkills(
    data.skills?.categories,
    data.skills?.allSkills,
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
