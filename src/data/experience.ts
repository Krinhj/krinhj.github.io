import { Code, GraduationCap } from 'lucide-react';

export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  achievements: string[];
  detailedDescription: string;
  skills: string[];
  challenges: string[];
  impact: string;
  highlights: string[];
  icon: any;
  color: string;
}

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Backend Developer Intern",
    company: "Department of Budget and Management - Central Office",
    location: "San Miguel, Manila, Philippines",
    period: "Feb 2025 - May 2025",
    type: "INTERNSHIP",
    achievements: [
      "Led MongoDB to SQL migration for National Tax Allocation system (reports.dbm.gov.ph/ira2)",
      "Developed National Wealth tracking system with comprehensive dashboard (reports.dbm.gov.ph/national_wealth/dashboard)",
      "Built advanced Excel data scraper with coordinate detection algorithms for automated data processing",
      "Architected REST API endpoints using Java MVC framework for enterprise-scale government operations",
      "Optimized SQL Server database performance for handling national-level financial data",
      "Implemented data validation and error handling for critical government financial systems",
      "Collaborated with senior developers on production deployments affecting nationwide tax allocation"
    ],
    detailedDescription: "During my senior-year internship at the Department of Budget and Management's Central Office, I worked as a Backend Developer on critical national financial systems. This role provided hands-on experience with enterprise-scale database architecture, government-level data processing, and production system deployment. I collaborated with senior developers and IT teams to modernize legacy systems and improve data management processes for nationwide financial operations.",
    skills: ["Java", "SQL Server", "REST API Development", "Database Migration", "Excel VBA", "Data Processing", "MVC Architecture", "Enterprise Systems", "Government IT"],
    challenges: [
      "Migrating from MongoDB to SQL Server while maintaining data integrity for national tax allocation records",
      "Developing coordinate detection algorithms for processing complex Excel spreadsheet layouts",
      "Ensuring zero-downtime deployment for production systems affecting nationwide operations",
      "Working with sensitive government financial data requiring strict security and validation protocols",
      "Optimizing database performance for handling millions of records across multiple government agencies",
      "Collaborating in a formal government IT environment with established protocols and approval processes"
    ],
    impact: "My contributions directly supported the modernization of critical government financial systems used for national tax allocation and wealth tracking. The database migration improved system performance and reliability, while the automated data processing tools reduced manual work hours for government staff. These systems now serve as the backbone for financial reporting and decision-making at the national level, demonstrating the real-world impact of well-architected software solutions in government operations.",
    highlights: [
      "Successfully completed database migration with zero data loss for production systems",
      "Automated data processing workflows that previously required manual coordination across departments",
      "Received commendation from senior developers for code quality and problem-solving approach",
      "Contributed to systems that handle billions of pesos in national financial data",
      "Gained experience with government IT security standards and compliance requirements"
    ],
    icon: Code,
    color: "primary"
  },
  {
    id: 2,
    title: "Computer Science Graduate",
    company: "Central Philippine University",
    location: "Iloilo City, Iloilo, Philippines",
    period: "2021-2025",
    type: "EDUCATION",
    achievements: [
      "Full-stack development specialization",
      "Database architecture and optimization focus",
      "Unity 3D game development with C# programming",
      "Firebase integration for real-time data management",
      "Advanced scoring algorithms and leaderboard systems",
      "AI/ML project development experience",
      "Software engineering best practices"
    ],
    detailedDescription: "Completed a comprehensive Computer Science degree with focus on practical software development and modern technologies. My academic journey emphasized hands-on learning through project-based courses, team collaborations, and industry-relevant technologies. Specialized in full-stack web development, database systems, and game development while maintaining strong academic performance and actively participating in programming competitions and technology clubs.",
    skills: ["React", "Node.js", "TypeScript", "Python", "Java", "C#", "Unity", "SQL", "Firebase", "Git", "Agile Development", "Software Architecture", "AI/ML Fundamentals"],
    challenges: [
      "Balancing academic coursework with practical project development and internship responsibilities",
      "Leading team projects while managing diverse skill levels and coordination across group members",
      "Mastering multiple programming languages and frameworks simultaneously across different domains",
      "Developing complex thesis project (Danger Zone) while meeting academic requirements and deadlines",
      "Adapting to remote learning during the pandemic while maintaining hands-on technical skills",
      "Integrating theoretical computer science concepts with real-world application development"
    ],
    impact: "My education provided a strong foundation in computer science fundamentals while emphasizing practical application development. Through coursework and projects, I developed expertise in multiple technology stacks and gained experience in team leadership, project management, and software engineering best practices. This academic foundation directly enabled my success in internship roles and personal project development, demonstrating the value of comprehensive computer science education.",
    highlights: [
      "Graduated with strong academic performance and practical development experience",
      "Successfully led multiple team-based software development projects",
      "Developed thesis project that showcased advanced Unity development and team leadership skills",
      "Participated in programming competitions and technology-focused student organizations",
      "Built a portfolio of diverse projects spanning web development, game development, and AI/ML applications",
      "Established foundation for continuous learning and adaptation to emerging technologies"
    ],
    icon: GraduationCap,
    color: "primary-glow"
  }
];

// Import projects data to calculate dynamic count
const projectStatuses = [
  "LIVE", "COMPLETED", "LIVE", "LIVE", "LIVE", "PRODUCTION", "ON HOLD"
];

// Calculate deployed projects dynamically
export const deployedProjectsCount = projectStatuses.filter(status => 
  status === 'LIVE' || status === 'PRODUCTION' || status === 'COMPLETED'
).length;