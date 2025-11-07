import { Mail, Linkedin, Github } from 'lucide-react';

export interface ContactMethod {
  icon: any;
  label: string;
  value: string;
  link: string;
  color: string;
}

export interface KeyStrength {
  icon: any;
  title: string;
  description: string;
}

export const contactMethods: ContactMethod[] = [
  {
    icon: Mail,
    label: "Email",
    value: "ron.talabuconjr.dev@gmail.com",
    link: "mailto:ron.talabuconjr.dev@gmail.com",
    color: "primary"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "ronnie-talabucon-jr",
    link: "https://www.linkedin.com/in/ronnietalabuconjr",
    color: "primary-glow"
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@Krinhj",
    link: "https://github.com/Krinhj",
    color: "primary"
  }
];

export const personalInfo = {
  name: "Ronnie Talabucon Jr.",
  title: "Full-stack Developer • AI Engineer • System Architect",
  email: "ron.talabuconjr.dev@gmail.com",
  linkedin: "https://www.linkedin.com/in/ronnietalabuconjr",
  github: "https://github.com/Krinhj",
  resumePath: "/Talabucon_Resume.pdf"
};

export const aboutSummary = {
  professionalSummary: [
    "I am a recent Computer Science graduate with a passion for building innovative, user-focused solutions. Experienced in full-stack development, system architecture, database management, and AI-focused technologies like LLMs, Vector Databases, and RAG techniques.",
    "As a Computer Science student who focused on Software Development and Databases, I have experience in building robust applications and efficient system designs. During my internship at the Department of Budget and Management, I contributed to enterprise-scale government systems, working with national financial data and modernizing legacy infrastructure. I thrive on solving complex technical challenges and transforming ideas into scalable, real-world applications.",
    "To put it simply, I turn everyday problems into opportunities for innovation through relentless curiosity and persistence.",
    "Currently developing Momentum AI Suite - an ambitious AI-powered productivity ecosystem that showcases my expertise in modern web technologies, AI, and complex system integration."
  ]
};

export const keyStrengths = [
  {
    title: "Full-Stack Development",
    description: "React, Node.js, TypeScript, Python - Building scalable web applications from front-end to database"
  },
  {
    title: "AI Integration",
    description: "Large Language Models, vector databases, and AI-powered applications"
  },
  {
    title: "System Architecture",
    description: "Designing complex, multi-component systems with focus on scalability and maintainability"
  },
  {
    title: "Project Leadership",
    description: "Leading development teams, managing complex projects from conception to deployment"
  }
];

export const contactCallToAction = {
  title: "Ready to Build Something Amazing?",
  description: "Let's collaborate on your next project. Whether it's building cutting-edge web applications, architecting robust databases, or exploring AI-powered solutions, I'm ready to make it happen.",
  primaryAction: {
    label: "SEND MESSAGE",
    link: "mailto:ron.talabuconjr.dev@gmail.com"
  },
  secondaryAction: {
    label: "VIEW RESUME",
    link: "/Talabucon_Resume.pdf"
  }
};
