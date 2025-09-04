import { Code, Database, Server, Wrench } from 'lucide-react';

export interface SkillCategory {
  title: string;
  icon: any;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
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
    skills: ["SQL Server", "MySQL", "MongoDB", "Supabase", "Firebase"]
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["VS Code", "Visual Studio 2022", "Unity Editor", "Postman", "Git"]
  }
];

export const aiMlSkills = ["OpenAI API", "Hugging Face", "Pandas", "Machine Learning", "NLP"];