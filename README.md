# 🌆 KRINHJ Portfolio

> A synthwave-inspired, interactive portfolio website showcasing full-stack development prowess with a retro-futuristic aesthetic.

[![Live Demo](https://img.shields.io/badge/Live-Demo-red?style=for-the-badge&logo=vercel)](https://krinhj.vercel.app)
[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

## 🎯 Overview

An immersive cyberpunk-themed portfolio featuring dual interfaces: a command-line terminal experience and a visual portfolio showcase. Built with modern web technologies and optimized for all devices, this project demonstrates advanced React patterns, responsive design, and creative UI/UX implementation.

**🔗 Live Site:** [krinhj.vercel.app](https://krinhj.vercel.app)

## ✨ Features

### 🖥️ Dual Interface System
- **Terminal Mode**: Interactive CLI with custom commands (`pf help`, `pf boot`, etc.)
- **Portfolio Mode**: Visual showcase with audio-reactive background effects
- Seamless navigation between both interfaces

### 🎨 Cyberpunk Aesthetic
- **Neon Red Color Scheme**: Pure black background with electric red accents
- **Synthwave Background**: Animated grid patterns and particle effects
- **Audio Visualization**: Real-time frequency analysis with waveform display
- **Holographic Effects**: Text glitch animations and neon glow effects
- **Energy Cards**: Interactive project cards with pulse animations

### 📱 Mobile-Optimized Design
- **Responsive Timeline**: Mobile-friendly experience cards with optimized spacing
- **Adaptive Grids**: Auto-fitting project and skill grids for all screen sizes
- **Touch-Friendly**: Optimized button sizes and interactions for mobile devices
- **Performance Optimized**: Smooth animations across all device types

### 🚀 Interactive Portfolio Sections
- **Hero Section**: Typewriter animation with audio-reactive visualizer
- **Project Matrix**: 7 production projects with live deployment links
- **Experience Timeline**: Professional journey with alternating card layout
- **Technical Arsenal**: Skills categorized by type with interactive badges
- **Contact Portal**: Multiple communication channels with CTAs

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **TailwindCSS 4.1** - Utility-first CSS framework
- **React Router 7** - Client-side routing

### UI/UX
- **Lucide React** - Beautiful SVG icons
- **Spline** - 3D interactive elements
- **Three.js** - 3D graphics and animations
- **Web Audio API** - Real-time audio analysis
- **CSS Grid/Flexbox** - Modern layout systems

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite Plugin React** - Fast refresh and HMR

## 🎵 Audio Features

The portfolio includes an interactive audio system with:
- **Background Soundtrack**: Synthwave music with volume controls
- **Frequency Analysis**: Real-time audio visualization
- **Waveform Display**: Dynamic audio-reactive graphics
- **User Controls**: Toggle audio on/off with visual feedback

## 📊 Projects Showcase

### Featured Projects (10 Total)
1. **GetMeHired** - AI-powered job tracking platform (LIVE)
2. **CPU Exam Schedule Finder** - Full-stack search application for CPU students (LIVE)
3. **3D Disaster Simulation** - Unity thesis project (COMPLETED)
4. **DBM National Tax Allocation** - Government database system (LIVE)
5. **DBM National Wealth** - National database architecture (LIVE)
6. **TDEE Calculator API** - Production REST API (LIVE)
7. **Baptism Records Manager** - Tauri desktop application (PRODUCTION)
8. **GAIA AI** - Personal AI Assistant with Llama3.1 (IN PROGRESS)
9. **MediTriage AI** - Healthcare chatbot with DDXPlus Dataset (ON HOLD)
10. **Momentum** - Personal productivity and task management app (IN PROGRESS)

## 🏗️ Architecture

### Component Structure
```
src/
├── components/
│   ├── CLI/                 # Terminal interface
│   │   ├── Terminal.tsx     # Main terminal component
│   │   └── CommandHandler.tsx # Command processing
│   ├── Effects/             # Visual effects
│   │   ├── SynthwaveBackground.tsx
│   │   ├── HolographicGrid.tsx
│   │   └── BootSequence.tsx
│   ├── Portfolio/           # Portfolio sections
│   │   ├── HeroSection.tsx
│   │   ├── ProjectMatrix.tsx
│   │   ├── ExperienceTimeline.tsx
│   │   ├── TechnicalArsenal.tsx
│   │   └── ContactPortal.tsx
│   └── UI/                  # Reusable UI components
│       ├── HolographicText.tsx
│       └── NeonButton.tsx
├── pages/                   # Route components
│   ├── Index.tsx           # Main portfolio page
│   ├── TerminalPage.tsx    # Terminal interface
│   └── NotFound.tsx        # 404 page
└── assets/                 # Static assets
```

### Key Design Patterns
- **Component Composition**: Modular, reusable components
- **Custom Hooks**: Audio processing and command handling
- **CSS-in-JS**: Inline styles with CSS custom properties
- **Responsive Design**: Mobile-first approach with clamp() functions
- **Performance Optimization**: Lazy loading and animation controls

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser with Web Audio API support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Krinhj/krinhj.github.io.git
   cd krinhj.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🎮 Terminal Commands

Access the terminal interface and try these commands:

- `pf help` - Show available commands
- `pf boot` - Launch portfolio interface
- `pf about` - Display developer information
- `pf projects` - List all projects
- `pf skills` - Show technical skills
- `pf contact` - Get contact information
- `clear` - Clear terminal history

## 📱 Mobile Optimizations

### Responsive Improvements
- **Timeline Cards**: Vertical stacking with improved spacing
- **Project Grid**: Auto-fitting columns that prevent horizontal scroll
- **Skill Cards**: Optimized grid layout for touch interaction
- **Typography**: Fluid scaling with clamp() functions
- **Navigation**: Touch-friendly button sizes and spacing

### Performance Features
- **Reduced Animations**: Respects `prefers-reduced-motion`
- **Optimized Images**: Proper sizing and loading
- **Efficient Rendering**: Minimized layout shifts
- **Battery Friendly**: Optimized animation frame rates

## 🎨 Customization

### Color Scheme
The cyberpunk theme uses HSL color values defined in CSS custom properties:
```css
:root {
  --background: 0 0% 0%;           /* Pure black */
  --primary: 0 84% 60%;            /* Electric red */
  --primary-glow: 0 100% 70%;      /* Bright red glow */
  --foreground: 0 0% 95%;          /* Bright white */
}
```

### Adding New Projects
Update the `projects` array in `ProjectMatrix.tsx`:
```typescript
{
  id: 8,
  name: "Your Project",
  subtitle: "Project Description",
  description: "Detailed description...",
  tech: ["Tech", "Stack"],
  status: "LIVE", // LIVE | PRODUCTION | COMPLETED | ON HOLD
  link: "https://your-project.com",
  github: "https://github.com/username/repo"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Synthwave Music**: Background audio for immersive experience
- **Cyberpunk Aesthetics**: Inspired by retro-futuristic design
- **Open Source Community**: Libraries and tools that made this possible
- **GitHub Pages**: Free hosting for portfolio websites

## 📞 Connect

- **Portfolio**: [krinhj.vercel.app](https://krinhj.vercel.app)
- **GitHub**: [@Krinhj](https://github.com/Krinhj)
- **LinkedIn**: [ronnie-talabucon-jr](https://www.linkedin.com/in/ronnie-talabucon-jr-30528b31b)
- **Email**: ron.talabuconjr.dev@gmail.com

---

**"Mieux que jamais"** - *Better than ever*

Built with ❤️ and lots of ☕ by Ronnie Talabucon Jr.