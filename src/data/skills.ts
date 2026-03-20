import type { LucideIcon } from 'lucide-react';
import { Code, Database, Server, Wrench } from 'lucide-react';

export interface SkillToken {
  label: string;
  icon: string;
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: SkillToken[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    icon: Code,
    skills: [
      { label: 'Python', icon: 'python' },
      { label: 'SQL', icon: 'sql' },
      { label: 'TypeScript', icon: 'typescript' },
      { label: 'JavaScript', icon: 'javascript' },
      { label: 'C#', icon: 'csharp' },
      { label: 'Java', icon: 'java' },
      { label: 'Rust', icon: 'rust' },
      { label: 'PHP', icon: 'php' },
    ],
  },
  {
    title: 'Frameworks',
    icon: Server,
    skills: [
      { label: 'Next.js', icon: 'nextjs' },
      { label: 'React', icon: 'react' },
      { label: 'Node.js', icon: 'node' },
      { label: '.NET Framework', icon: 'dotnet' },
      { label: 'Tauri V2', icon: 'tauri' },
      { label: 'Express', icon: 'express' },
      { label: 'Tailwind CSS', icon: 'tailwind' },
    ],
  },
  {
    title: 'Databases',
    icon: Database,
    skills: [
      { label: 'SQL Server', icon: 'sqlserver' },
      { label: 'MySQL', icon: 'mysql' },
      { label: 'MongoDB', icon: 'mongodb' },
      { label: 'Supabase', icon: 'supabase' },
      { label: 'Firebase', icon: 'firebase' },
    ],
  },
  {
    title: 'Tools',
    icon: Wrench,
    skills: [
      { label: 'VS Code', icon: 'vscode' },
      { label: 'Visual Studio 2022', icon: 'visual-studio' },
      { label: 'Unity Editor', icon: 'unity' },
      { label: 'Postman', icon: 'postman' },
      { label: 'Git', icon: 'git' },
      { label: 'Docker', icon: 'docker' },
      { label: 'Vercel', icon: 'vercel' },
      { label: 'n8n', icon: 'n8n' },
      { label: 'Airbyte', icon: 'airbyte' },
      { label: 'S3', icon: 's3' },
    ],
  },
];

export const aiMlSkills: SkillToken[] = [
  { label: 'RAG Architecture', icon: 'rag' },
  { label: 'OpenAI API', icon: 'openai' },
  { label: 'Anthropic API', icon: 'anthropic' },
  { label: 'AI SDK', icon: 'ai-sdk' },
  { label: 'Mastra', icon: 'mastra' },
  { label: 'Embeddings', icon: 'embeddings' },
  { label: 'Pinecone', icon: 'pinecone' },
  { label: 'OCR (DataLab, Pixtral)', icon: 'ocr' },
  { label: 'Hugging Face', icon: 'huggingface' },
  { label: 'Pandas', icon: 'pandas' },
  { label: 'Ollama', icon: 'ollama' },
  { label: 'Machine Learning', icon: 'machine-learning' },
  { label: 'NLP', icon: 'nlp' },
];
