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
    "I'm an AI Engineer and Full-Stack Developer currently building production-grade AI systems at Zaigo — RAG pipelines, multi-modal document ingestion, intelligent automation tools, and data-driven dashboards for real enterprise clients. I graduated with a BS in Computer Science from Central Philippine University in 2025 and went straight into shipping.",
    "I've contributed to backend systems at a national scale during my internship at the Department of Budget and Management, and I now lead multiple client AI projects simultaneously — from architecture decisions through to deployment. I thrive at the intersection of LLMs, data pipelines, and practical engineering."
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
    description: "Leading end-to-end delivery of multiple concurrent client AI projects, from scoping to production."
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
