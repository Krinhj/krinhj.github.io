import React, { useState } from 'react';
import { ExternalLink, Github, Info } from 'lucide-react';
import { ProjectDetailModal } from '../UI/ProjectDetailModal';

// CPU Exam Schedule Finder Screenshots
import MainUI from '../../assets/screenshots/ExamFinder/MainUI.png';
import ExamSchedResults from '../../assets/screenshots/ExamFinder/ExamSchedResults.png';
import ExamSchedResults2 from '../../assets/screenshots/ExamFinder/ExamSchedResults2.png';
import ExamSchedResults3 from '../../assets/screenshots/ExamFinder/ExamSchedResults3.png';
import NoActiveExamPeriod from '../../assets/screenshots/ExamFinder/NoActiveExamPeriod.png';
import LessGap2 from '../../assets/screenshots/ExamFinder/LessGap2.png';

// Danger Zone Screenshots
import DZTitleScreen from '../../assets/screenshots/DangerZone/Title Screen.jpg';
import DZOpeningScreen from '../../assets/screenshots/DangerZone/Opening Screen.jpg';
import DZLoginScreen from '../../assets/screenshots/DangerZone/Login Screen.jpg';
import DZMainMenu from '../../assets/screenshots/DangerZone/Main Menu.jpg';
import DZLevelSelection from '../../assets/screenshots/DangerZone/Level Selection Menu.jpg';
import DZLevelPreview from '../../assets/screenshots/DangerZone/Level Preview.jpg';
import DZGameplay from '../../assets/screenshots/DangerZone/Gameplay.jpg';
import DZEnvironmentInteraction from '../../assets/screenshots/DangerZone/Environment Interaction.jpg';
import DZObjectiveAlert from '../../assets/screenshots/DangerZone/New Objective Alert.jpg';
import DZObjectiveTab from '../../assets/screenshots/DangerZone/Objective Tab.jpg';
import DZLevelComplete from '../../assets/screenshots/DangerZone/Level Complete Screen.jpg';
import DZLeaderboard from '../../assets/screenshots/DangerZone/Leaderboard View.jpg';

export const ProjectMatrix = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const projects = [
    {
      id: 1,
      name: "Momentum AI Suite",
      subtitle: "Comprehensive AI-Powered Self-Improvement Ecosystem",
      description: "Advanced productivity platform combining a full-featured self-improvement application with GAIA AI - a custom Llama3.1-based assistant that orchestrates all system functions. Features task management, habit tracking, fitness, nutrition, finance, and intelligent AI guidance.",
      detailedDescription: "Momentum AI Suite represents my most ambitious project - a comprehensive ecosystem that revolutionizes personal productivity through intelligent automation. The platform consists of two integrated components: the Momentum Application (complete self-improvement suite) and GAIA AI (custom-trained virtual assistant), working in harmony to provide users with an unprecedented level of personalized productivity support.",
      tech: ["React", "Node.js", "TypeScript", "Tauri V2", "Rust", "Ollama", "Llama3.1", "QDrant", "Vector Database"],
      status: "IN PROGRESS",
      link: "#",
      github: "https://github.com/Krinhj",
      color: "primary-glow",
      components: [
        {
          name: "GAIA AI",
          description: "Custom Llama3.1-based virtual assistant and orchestration engine",
          features: [
            "Semantic understanding using QDrant vector database for context-aware responses",
            "Domain-specific training for productivity and self-improvement guidance",
            "Intelligent task prioritization and scheduling recommendations",
            "Natural language interface for complex productivity workflows",
            "Real-time learning from user patterns and preferences"
          ]
        },
        {
          name: "Momentum Application",
          description: "Comprehensive cross-platform self-improvement suite",
          features: [
            "Task management with AI-powered priority optimization",
            "Habit tracking with personalized coaching insights",
            "Fitness module with workout planning and progress analytics",
            "Nutritional management with meal planning and dietary guidance",
            "Financial management with AI-driven budgeting and expense optimization",
            "Real-time synchronization across devices with offline capabilities"
          ]
        }
      ],
      features: [
        "GAIA AI - Custom Llama3.1-based virtual assistant trained specifically for productivity guidance",
        "Intelligent task orchestration with AI-powered priority management and scheduling",
        "Comprehensive habit tracking with AI insights and personalized coaching recommendations",
        "Fitness module with workout planning, progress tracking, and AI-generated fitness advice",
        "Nutritional management with meal planning and dietary guidance powered by machine learning",
        "Financial management tools with AI-driven budgeting insights and expense optimization",
        "Vector database integration using QDrant for semantic search and context-aware responses",
        "Cross-platform desktop application built with Tauri V2 for native performance",
        "Real-time data synchronization and offline capability for seamless user experience"
      ],
      challenges: [
        "Architecting a complex multi-domain system that maintains coherent data flow between productivity modules",
        "Training and fine-tuning Llama3.1 for domain-specific productivity and self-improvement guidance",
        "Implementing vector database architecture with QDrant for semantic understanding of user context",
        "Building robust inter-process communication between the React frontend and Rust backend via Tauri",
        "Designing AI orchestration logic that can intelligently coordinate between different application modules",
        "Creating a scalable architecture that supports real-time AI inference while maintaining application performance",
        "Developing context-aware AI responses that understand user patterns and provide meaningful insights"
      ],
      impact: "Momentum AI Suite represents the convergence of modern AI capabilities with practical productivity needs. By integrating a custom-trained language model directly into a comprehensive self-improvement platform, this project demonstrates advanced full-stack development skills, AI implementation expertise, and complex system architecture design. The platform showcases my ability to build cutting-edge applications that solve real-world problems through intelligent automation and personalized user experiences.",
      timeline: "2024 - Present (Major Personal Project)",
      teamSize: "Solo Developer & AI Architect",
      isPublicRepo: false
    },
    {
      id: 2,
      name: "GetMeHired",
      subtitle: "AI-Powered Job Application Tracking Platform",
      description: "Job application tracker powered by OpenAI API. Smart categorization, Resume Builder, Cover Letter Writer, and AI-driven insights for job seekers.",
      tech: ["React", "Node.js", "OpenAI API", "Vercel", "Supabase"],
      status: "LIVE",
      link: "https://get-me-hired.vercel.app",
      github: "https://github.com/Krinhj",
      color: "primary",
      isPublicRepo: false
    },
    {
      id: 3,
      name: "CPU Exam Schedule Finder",
      subtitle: "Full-Stack Search Application",
      description: "Modern web application solving real-world problem at Central Philippine University. Students can search exam schedules by subject instead of manually scanning PDF images, featuring smart error handling and mobile-responsive design.",
      detailedDescription: "A comprehensive full-stack web application built to address a significant pain point at Central Philippine University. The university publishes exam schedules as scanned PDF images, making it impossible for students to use Ctrl+F to search for their subjects. This forces students to manually scan through multiple pages of images to find their exam information. My solution digitizes this process with a modern, searchable interface that dramatically improves the student experience.",
      tech: ["React 19", "TypeScript", "Express.js", "Supabase", "Tailwind CSS"],
      status: "LIVE",
      link: "https://cpuexamfinder.vercel.app",
      github: "https://github.com/Krinhj/cpu-exam-schedule-finder",
      color: "primary",
      features: [
        "Flexible search functionality - search by subject code, name, or instructor",
        "Mobile-responsive design optimized for student use on any device",
        "Smart error handling with contextual messages (database down vs no active exam period)",
        "Real-time validation and instant search results",
        "CPU-branded interface maintaining university visual identity",
        "RESTful API with comprehensive documentation",
        "Admin panel for data management and updates"
      ],
      challenges: [
        "Designing a flexible database schema to handle varying exam schedule formats",
        "Implementing smart search that works across multiple data fields simultaneously",
        "Creating robust error handling that distinguishes between system errors and data availability",
        "Optimizing mobile performance while maintaining rich functionality",
        "Building a scalable API architecture that can handle high student traffic during exam periods"
      ],
      impact: "Built after my graduation from CPU (June 2025) to help my brother and fellow students, this project demonstrates practical application of modern web development skills to solve real-world problems. The application has potential for official university adoption and showcases my commitment to using technology for social good.",
      timeline: "June 2025 - Post Graduation Project",
      teamSize: "Solo Developer",
      screenshots: [
        MainUI,
        ExamSchedResults,
        ExamSchedResults2,
        ExamSchedResults3,
        NoActiveExamPeriod,
        LessGap2
      ],
      isPublicRepo: true
    },
    {
      id: 3,
      name: "Danger Zone",
      subtitle: "Unity Thesis Project",
      description: "Comprehensive 3D disaster simulation game built in Unity with C#. Features real-time scoring algorithms, Firebase-powered leaderboards, and persistent run history system for educational disaster preparedness training.",
      detailedDescription: "A comprehensive 3D disaster simulation game developed as a Senior-year thesis project, focusing on educational disaster preparedness training through immersive gameplay. Players navigate through realistic disaster scenarios, learning crucial survival skills while competing on global leaderboards. The game combines educational content with engaging mechanics to create an effective learning experience for disaster preparedness.",
      tech: ["Unity", "C#", "Firebase", "Unity Editor"],
      status: "COMPLETED",
      link: "#",
      github: "https://github.com/Krinhj",
      color: "primary-glow",
      isPublicRepo: false,
      features: [
        "Immersive 3D disaster simulation environments with realistic physics",
        "Real-time scoring system based on decision-making and survival actions",
        "Firebase-powered global leaderboards for competitive learning",
        "Comprehensive user authentication and profile management system",
        "Persistent run history tracking to monitor learning progress",
        "Interactive tutorial system for disaster preparedness education",
        "Multiple disaster scenarios including fire, earthquake, and flood simulations",
        "Objective-based gameplay with dynamic alerts and guidance systems"
      ],
      challenges: [
        "Leading a 4-person development team and coordinating project milestones",
        "Designing realistic disaster physics and environmental interactions in Unity",
        "Implementing complex scoring algorithms that accurately reflect disaster preparedness knowledge",
        "Managing Unity Version Control for collaborative development workflow",
        "Integrating Firebase real-time database for seamless leaderboard synchronization",
        "Optimizing 3D performance for various hardware configurations",
        "Balancing educational content with engaging gameplay mechanics while meeting academic requirements"
      ],
      impact: "This thesis project demonstrates advanced Unity development skills, team leadership, and educational game design principles. Successfully led a 4-person development team to completion as academic requirement while creating a practical tool for disaster preparedness education. The project showcases ability to manage development teams, work with complex 3D environments, real-time databases, and comprehensive game design.",
      timeline: "Academic Thesis Project - 2024",
      teamSize: "Team of 4 - Project Leader & Game Designer",
      screenshots: [
        DZTitleScreen,
        DZOpeningScreen,
        DZLoginScreen,
        DZMainMenu,
        DZLevelSelection,
        DZLevelPreview,
        DZGameplay,
        DZEnvironmentInteraction,
        DZObjectiveAlert,
        DZObjectiveTab,
        DZLevelComplete,
        DZLeaderboard
      ]
    },
    {
      id: 4,
      name: "TDEE Calculator API",
      subtitle: "Production REST API",
      description: "High-performance REST API deployed on RapidAPI marketplace. Calculates Total Daily Energy Expenditure with precision algorithms.",
      tech: ["Node.js", "Express", "Railway", "RapidAPI"],
      status: "LIVE",
      link: "#",
      github: "https://github.com/Krinhj",
      color: "primary-dim",
      isPublicRepo: true
    },
    {
      id: 5,
      name: "Baptism Records Manager",
      subtitle: "Parish Management Desktop App",
      description: "Comprehensive parish management system built with Tauri V2. Features full CRUD operations, permissions-based access control, automated backup/restore system, and detailed audit logging for all administrative actions.",
      tech: ["React", "Tailwind", "Tauri V2", "Rust"],
      status: "PRODUCTION",
      link: "#",
      github: "https://github.com/Krinhj",
      color: "primary",
      isPublicRepo: false
    },
    {
      id: 6,
      name: "MediTriage AI",
      subtitle: "Healthcare Chatbot System",
      description: "Intelligent medical triage chatbot using advanced NLP and DDXPlus Dataset. Assists patients with symptom assessment and healthcare navigation.",
      tech: ["Python", "Pandas", "Hugging Face", "DDXPlus Dataset", "ML"],
      status: "ON HOLD",
      link: "#",
      github: "https://github.com/Krinhj",
      color: "primary-dim",
      isPublicRepo: false
    },
  ];

  return (
    <section id="projects-section" style={{
      padding: '5rem 1rem',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto'
      }}>
        {/* Section header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <h2 
            className="glitch"
            data-text="PROJECT MATRIX"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 900,
              color: 'hsl(var(--primary))',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: '1rem',
              textShadow: '0 0 20px hsl(var(--primary) / 0.5)'
            }}
          >
            PROJECT MATRIX
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'hsl(var(--muted-foreground))',
            maxWidth: '48rem',
            margin: '0 auto'
          }}>
            Cutting-edge applications pushing the boundaries of web technology
          </p>
        </div>

        {/* Projects grid */}
        <div 
          className="projects-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(500px, 100%), 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}
        >
          {projects.map((project, index) => {
            const isFlagship = project.name === "Momentum AI Suite";
            return (
              <div 
                key={project.id}
                className={`energy-card ${isFlagship ? 'flagship-project' : ''}`}
                style={{
                  borderRadius: '12px',
                  padding: '2rem',
                  position: 'relative',
                  animationDelay: `${index * 0.2}s`,
                  ...(isFlagship && {
                    border: '3px solid hsl(0 84% 60%) !important',
                    boxShadow: '0 0 40px hsl(0 84% 60% / 0.4), inset 0 0 40px hsl(0 84% 60% / 0.1) !important',
                    background: 'linear-gradient(135deg, hsl(var(--background)), hsl(0 84% 60% / 0.08)) !important',
                    transform: 'scale(1.02)'
                  })
                }}
              >
            
              {/* Project header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'hsl(var(--primary))',
                    marginBottom: '0.25rem'
                  }}>
                    {project.name}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'hsl(var(--muted-foreground))'
                  }}>
                    {project.subtitle}
                  </p>
                </div>
                <div>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    backgroundColor: project.status === 'LIVE' 
                      ? 'hsl(var(--primary) / 0.2)' 
                      : project.status === 'PRODUCTION'
                      ? 'hsl(var(--primary) / 0.2)'
                      : 'hsl(var(--muted) / 0.2)',
                    color: project.status === 'LIVE' 
                      ? 'hsl(var(--primary))' 
                      : project.status === 'PRODUCTION'
                      ? 'hsl(var(--primary))'
                      : 'hsl(var(--muted-foreground))',
                    animation: project.status === 'LIVE' ? 'energy-pulse 2s ease-in-out infinite' : 'none'
                  }}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project description */}
              <p style={{
                color: 'hsl(var(--foreground) / 0.8)',
                marginBottom: '1.5rem',
                lineHeight: 1.6,
                fontSize: '1rem'
              }}>
                {project.description}
              </p>

              {/* Tech stack */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '1.5rem'
              }}>
                {project.tech.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: 'hsl(var(--primary) / 0.1)',
                      border: '1px solid hsl(var(--primary) / 0.3)',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      color: 'hsl(var(--primary))',
                      fontFamily: 'monospace'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={() => openModal(project)}
                  className="neon-button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    borderRadius: '6px',
                    backgroundColor: 'hsl(var(--primary) / 0.1)',
                    border: '1px solid hsl(var(--primary) / 0.3)',
                    color: 'hsl(var(--primary))',
                    cursor: 'pointer'
                  }}
                >
                  <Info size={16} />
                  DETAILS
                </button>
                {project.status === 'LIVE' && project.link && project.link !== '#' && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neon-button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      fontSize: '0.875rem',
                      borderRadius: '6px',
                      textDecoration: 'none'
                    }}
                  >
                    <ExternalLink size={16} />
                    LIVE
                  </a>
                )}
                {project.isPublicRepo && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neon-button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      fontSize: '0.875rem',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <Github size={16} />
                    CODE
                  </a>
                )}
              </div>
            </div>
          );
          })}
        </div>

        {/* Bottom scan line */}
        <div className="scan-line" style={{
          marginTop: '4rem'
        }}>
          <div style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, hsl(var(--primary)), transparent)'
          }} />
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};