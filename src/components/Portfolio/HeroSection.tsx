import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-4xl">
        {/* Main holographic name - matching your screenshot */}
        <div className="mb-4">
          <div className="holographic-text text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider">
            <div className="holographic-blur">RONNIE TALABUCON JR.</div>
            <div className="holographic-main">RONNIE TALABUCON JR.</div>
          </div>
        </div>
        
        <div className="text-primary text-xl md:text-2xl font-mono mb-4 animate-pulse">
          {'>'} KRINHJ_
        </div>
        
        <div className="text-white/90 text-lg md:text-xl mb-4 uppercase tracking-wide">
          CS Graduate • Full-Stack Developer • Database Architect
        </div>
        
        <div className="text-primary text-base md:text-lg mb-8 opacity-80">
          📍 Roxas City/Iloilo City, Philippines
        </div>
        
        <div className="text-primary/80 text-lg md:text-xl mb-4 italic font-bold">
          "Mieux que jamais"
        </div>
        
        <div className="text-white/60 text-sm mb-8">
          Better than ever
        </div>
        
        <div className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Building impactful software with a mission to leave every project 
          <span className="text-primary"> better than I found it</span>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <button className="neon-button px-6 py-3">
            VIEW PROJECTS
          </button>
          <button className="neon-button px-6 py-3">
            DOWNLOAD CV
          </button>
        </div>
        
        {/* Stats from your screenshot */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm mb-8">
          <div className="px-4 py-2 border border-primary/30 bg-primary/5">
            <span className="text-primary">389</span> Day Duolingo Streak
          </div>
          <div className="px-4 py-2 border border-primary/30 bg-primary/5">
            <span className="text-primary">DBM</span> Intern 2025
          </div>
          <div className="px-4 py-2 border border-primary/30 bg-primary/5">
            <span className="text-primary">4</span> Live Projects
          </div>
        </div>
        
        {/* GitHub and LinkedIn buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="https://github.com/Krinhj" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="neon-button px-6 py-3"
          >
            💻 GITHUB
          </a>
          <a 
            href="https://www.linkedin.com/in/ronnie-talabucon-jr-30528b31b" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="neon-button px-6 py-3"
          >
            💼 LINKEDIN
          </a>
        </div>
      </div>
    </section>
  );
};