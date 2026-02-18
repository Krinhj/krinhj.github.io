#!/usr/bin/env node

/**
 * Extract portfolio data from TypeScript source files into a JSON file
 * for the AI chat grounding context.
 *
 * Usage: node scripts/extract-portfolio-data.mjs
 *
 * Parses src/data/*.ts using regex (avoids needing tsx/ts-node since the
 * TS files import lucide-react which is a React component not usable in
 * plain Node). Re-run whenever src/data/*.ts files change.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA_DIR = join(ROOT, 'src', 'data');

function readFile(filename) {
  return readFileSync(join(DATA_DIR, filename), 'utf-8');
}

// ---------------------------------------------------------------------------
// Generic helpers
// ---------------------------------------------------------------------------

/**
 * Extract the raw text block of an array assigned to `exportName` (e.g.
 * `export const experiences: Experience[] = [...]`).
 * Handles nested brackets correctly.
 */
function extractArrayBlock(text, exportName) {
  // Match the opening bracket of the named export array
  const startRe = new RegExp(
    `(?:export\\s+const\\s+${exportName}|${exportName}\\s*:)\\s*[^=]*=?\\s*\\[`,
  );
  const startMatch = startRe.exec(text);
  if (!startMatch) return null;

  let depth = 1;
  let i = startMatch.index + startMatch[0].length;
  const start = i;

  while (i < text.length && depth > 0) {
    const ch = text[i];
    if (ch === '[') depth++;
    else if (ch === ']') depth--;
    i++;
  }

  return text.slice(start, i - 1); // contents between outer [ ]
}

/**
 * Split the top-level objects (depth-1 `{...}`) inside an array block.
 */
function splitTopLevelObjects(arrayBlock) {
  const objects = [];
  let depth = 0;
  let start = -1;

  for (let i = 0; i < arrayBlock.length; i++) {
    const ch = arrayBlock[i];
    if (ch === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0 && start !== -1) {
        objects.push(arrayBlock.slice(start, i + 1));
        start = -1;
      }
    }
  }

  return objects;
}

/**
 * Extract the raw text block of the sub-array at `fieldName` within an
 * object block. Handles nested brackets.
 */
function extractSubArrayBlock(objText, fieldName) {
  const re = new RegExp(`(?<![\\w])${fieldName}\\s*:\\s*\\[`);
  const match = re.exec(objText);
  if (!match) return null;

  let depth = 1;
  let i = match.index + match[0].length;
  const start = i;

  while (i < objText.length && depth > 0) {
    const ch = objText[i];
    if (ch === '[') depth++;
    else if (ch === ']') depth--;
    i++;
  }

  return objText.slice(start, i - 1);
}

/**
 * Extract all quoted string literals from a text block (handles ', ", `).
 * Backslash-escape sequences inside strings are preserved/decoded.
 */
function extractStrings(text) {
  const results = [];
  // Single-pass: detect quote char, then scan to closing (matching) quote.
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (ch === '"' || ch === "'" || ch === '`') {
      const quote = ch;
      i++;
      let str = '';
      while (i < text.length) {
        const c = text[i];
        if (c === '\\') {
          // consume escape
          i++;
          const esc = text[i] ?? '';
          if (esc === 'n') str += '\n';
          else if (esc === 't') str += '\t';
          else if (esc === 'r') str += '\r';
          else str += esc;
          i++;
        } else if (c === quote) {
          i++;
          break;
        } else {
          str += c;
          i++;
        }
      }
      results.push(str);
    } else {
      i++;
    }
  }
  return results;
}

/**
 * Extract a single scalar field value from an object text block.
 * Returns string | number | boolean | null.
 */
function extractField(objText, fieldName) {
  // Quoted string
  const strRe = new RegExp(
    `(?<![\\w])${fieldName}\\s*:\\s*(["'\`])([\\s\\S]*?)\\1`,
  );
  const strMatch = strRe.exec(objText);
  if (strMatch) {
    return strMatch[2]
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\r/g, '\r')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, '\\');
  }

  // Number
  const numRe = new RegExp(`(?<![\\w])${fieldName}\\s*:\\s*(-?\\d+(?:\\.\\d+)?)`);
  const numMatch = numRe.exec(objText);
  if (numMatch) return Number(numMatch[1]);

  // Boolean
  const boolRe = new RegExp(`(?<![\\w])${fieldName}\\s*:\\s*(true|false)`);
  const boolMatch = boolRe.exec(objText);
  if (boolMatch) return boolMatch[1] === 'true';

  return null;
}

/**
 * Extract an array of strings from a named field within an object block.
 */
function extractStringArrayField(objText, fieldName) {
  const sub = extractSubArrayBlock(objText, fieldName);
  if (!sub) return [];
  return extractStrings(sub);
}

// ---------------------------------------------------------------------------
// personalInfo.ts
// ---------------------------------------------------------------------------

function parsePersonalInfo() {
  const text = readFile('personalInfo.ts');

  // personalInfo object
  const piRe = /export\s+const\s+personalInfo\s*=\s*\{([\s\S]*?)\};/;
  const piBlock = piRe.exec(text)?.[1] ?? '';

  const name        = extractField(piBlock, 'name')       ?? '';
  const title       = extractField(piBlock, 'title')      ?? '';
  const email       = extractField(piBlock, 'email')      ?? '';
  const linkedin    = extractField(piBlock, 'linkedin')   ?? '';
  const github      = extractField(piBlock, 'github')     ?? '';
  const resumePath  = extractField(piBlock, 'resumePath') ?? '';

  // aboutSummary.professionalSummary
  const summaryBlock = extractSubArrayBlock(text, 'professionalSummary');
  const professionalSummary = summaryBlock ? extractStrings(summaryBlock) : [];

  // keyStrengths array
  const ksBlock = extractArrayBlock(text, 'keyStrengths');
  const keyStrengths = ksBlock
    ? splitTopLevelObjects(ksBlock).map((obj) => ({
        title:       extractField(obj, 'title')       ?? '',
        description: extractField(obj, 'description') ?? '',
      }))
    : [];

  // contactMethods array
  const cmBlock = extractArrayBlock(text, 'contactMethods');
  const contactMethods = cmBlock
    ? splitTopLevelObjects(cmBlock).map((obj) => ({
        label: extractField(obj, 'label') ?? '',
        value: extractField(obj, 'value') ?? '',
        link:  extractField(obj, 'link')  ?? '',
      }))
    : [];

  // contactCallToAction
  const ctaRe = /export\s+const\s+contactCallToAction\s*=\s*\{([\s\S]*?)\n\};/;
  const ctaBlock = ctaRe.exec(text)?.[1] ?? '';
  const ctaTitle       = extractField(ctaBlock, 'title')       ?? '';
  const ctaDescription = extractField(ctaBlock, 'description') ?? '';

  // primaryAction / secondaryAction from CTA
  const primaryActionRe  = /primaryAction\s*:\s*\{([^}]*)\}/;
  const secondaryActionRe = /secondaryAction\s*:\s*\{([^}]*)\}/;
  const paBlock  = primaryActionRe.exec(ctaBlock)?.[1]  ?? '';
  const saBlock  = secondaryActionRe.exec(ctaBlock)?.[1] ?? '';

  return {
    name,
    title,
    email,
    linkedin,
    github,
    resumePath,
    aboutSummary: { professionalSummary },
    keyStrengths,
    contactMethods,
    contactCallToAction: {
      title:       ctaTitle,
      description: ctaDescription,
      primaryAction: {
        label: extractField(paBlock, 'label') ?? '',
        link:  extractField(paBlock, 'link')  ?? '',
      },
      secondaryAction: {
        label: extractField(saBlock, 'label') ?? '',
        link:  extractField(saBlock, 'link')  ?? '',
      },
    },
  };
}

// ---------------------------------------------------------------------------
// experience.ts
// ---------------------------------------------------------------------------

function parseExperience() {
  const text = readFile('experience.ts');
  const arrayBlock = extractArrayBlock(text, 'experiences');
  if (!arrayBlock) return [];

  return splitTopLevelObjects(arrayBlock).map((obj) => ({
    id:                  extractField(obj, 'id'),
    title:               extractField(obj, 'title')               ?? '',
    company:             extractField(obj, 'company')             ?? '',
    location:            extractField(obj, 'location')            ?? '',
    period:              extractField(obj, 'period')              ?? '',
    type:                extractField(obj, 'type')                ?? '',
    achievements:        extractStringArrayField(obj, 'achievements'),
    detailedDescription: extractField(obj, 'detailedDescription') ?? '',
    skills:              extractStringArrayField(obj, 'skills'),
    challenges:          extractStringArrayField(obj, 'challenges'),
    impact:              extractField(obj, 'impact')              ?? '',
    highlights:          extractStringArrayField(obj, 'highlights'),
  }));
}

// ---------------------------------------------------------------------------
// projects.ts
// ---------------------------------------------------------------------------

/**
 * Extract `components` sub-array (array of objects) from a project block.
 */
function extractComponents(objText) {
  const sub = extractSubArrayBlock(objText, 'components');
  if (!sub) return [];

  return splitTopLevelObjects(sub).map((comp) => ({
    name:        extractField(comp, 'name')        ?? '',
    description: extractField(comp, 'description') ?? '',
    features:    extractStringArrayField(comp, 'features'),
  }));
}

function parseProjects() {
  const text = readFile('projects.ts');
  const arrayBlock = extractArrayBlock(text, 'projects');
  if (!arrayBlock) return [];

  return splitTopLevelObjects(arrayBlock).map((obj) => ({
    id:                  extractField(obj, 'id'),
    name:                extractField(obj, 'name')                ?? '',
    subtitle:            extractField(obj, 'subtitle')            ?? '',
    description:         extractField(obj, 'description')         ?? '',
    detailedDescription: extractField(obj, 'detailedDescription') ?? '',
    tech:                extractStringArrayField(obj, 'tech'),
    status:              extractField(obj, 'status')              ?? '',
    link:                extractField(obj, 'link')                ?? '',
    github:              extractField(obj, 'github')              ?? '',
    components:          extractComponents(obj),
    features:            extractStringArrayField(obj, 'features'),
    challenges:          extractStringArrayField(obj, 'challenges'),
    impact:              extractField(obj, 'impact')              ?? '',
    timeline:            extractField(obj, 'timeline')            ?? '',
    teamSize:            extractField(obj, 'teamSize')            ?? '',
    isPublicRepo:        extractField(obj, 'isPublicRepo')        ?? false,
  }));
}

// ---------------------------------------------------------------------------
// skills.ts
// ---------------------------------------------------------------------------

function parseSkills() {
  const text = readFile('skills.ts');

  // skillCategories
  const catBlock = extractArrayBlock(text, 'skillCategories');
  const categories = catBlock
    ? splitTopLevelObjects(catBlock).map((catObj) => {
        const title = extractField(catObj, 'title') ?? '';
        // skills sub-array contains objects with `label` field
        const skillsSub = extractSubArrayBlock(catObj, 'skills');
        const skills = skillsSub
          ? splitTopLevelObjects(skillsSub).map(
              (sk) => extractField(sk, 'label') ?? '',
            )
          : [];
        return { title, skills };
      })
    : [];

  // aiMlSkills
  const aiBlock = extractArrayBlock(text, 'aiMlSkills');
  const aiMlSkills = aiBlock
    ? splitTopLevelObjects(aiBlock).map(
        (sk) => extractField(sk, 'label') ?? '',
      )
    : [];

  const allSkills = [
    ...categories.flatMap((c) => c.skills),
    ...aiMlSkills,
  ];

  return { categories, aiMlSkills, allSkills };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log('[extract] Reading TypeScript source data...');

  const personalInfo = parsePersonalInfo();
  const experience   = parseExperience();
  const projects     = parseProjects();
  const skills       = parseSkills();

  const DEPLOYED_STATUSES = new Set(['LIVE', 'PRODUCTION', 'COMPLETED']);

  const data = {
    personalInfo,
    projects,
    experience,
    skills,
    statistics: {
      totalProjects:      projects.length,
      deployedProjects:   projects.filter((p) => DEPLOYED_STATUSES.has(p.status)).length,
      totalSkills:        skills.allSkills.length,
      experienceEntries:  experience.length,
    },
    metadata: {
      extractedAt:          new Date().toISOString(),
      extractorVersion:     '2.0.0',
      dataStructureVersion: '2.0',
      source:               'scripts/extract-portfolio-data.mjs',
    },
  };

  const outPath = join(ROOT, 'extracted-portfolio-data.json');
  writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf-8');

  console.log(`[extract] Written to ${outPath}`);
  console.log(
    `[extract] ${projects.length} projects, ${experience.length} experiences, ${skills.allSkills.length} skills`,
  );

  // Quick sanity output
  console.log('\n[extract] Projects:');
  projects.forEach((p) =>
    console.log(`  [${p.status}] #${p.id} ${p.name}`),
  );
  console.log('\n[extract] Experiences:');
  experience.forEach((e) =>
    console.log(`  [${e.type}] ${e.title} @ ${e.company} (${e.period})`),
  );
  console.log('\n[extract] Skill categories:');
  skills.categories.forEach((c) =>
    console.log(`  ${c.title}: ${c.skills.join(', ')}`),
  );
  console.log(`  AI/ML: ${skills.aiMlSkills.join(', ')}`);
}

main();
