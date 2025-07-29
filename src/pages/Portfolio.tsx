import React, { useState } from 'react';

// Import existing components
import { SynthwaveBackground } from '../components/Effects/SynthwaveBackground';
import { HeroSection } from '../components/Portfolio/HeroSection';
import { ProjectMatrix } from '../components/Portfolio/ProjectMatrix';
import { ExperienceTimeline } from '../components/Portfolio/ExperienceTimeline';
import { TechnicalArsenal } from '../components/Portfolio/TechnicalArsenal';
import { ContactPortal } from '../components/Portfolio/ContactPortal';

interface PortfolioProps {
  onReturnToCLI: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onReturnToCLI }) => {
  const [audioEnabled, setAudioEnabled] = useState(false);

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background Effects */}
      <SynthwaveBackground />
      
      {/* Fixed Controls */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleAudio}
          className="neon-button px-4 py-2 text-sm"
        >
          {audioEnabled ? '🎵 AUDIO: ON' : '🔇 AUDIO: OFF'}
        </button>
      </div>

      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={onReturnToCLI}
          className="neon-button px-4 py-2 text-sm"
        >
          📟 RETURN TO CLI
        </button>
      </div>

      {/* Hero Section - Now as dedicated component */}
      <HeroSection />

      {/* Portfolio Sections */}
      <ProjectMatrix />
      <ExperienceTimeline />
      <TechnicalArsenal />
      <ContactPortal />

      {/* Footer */}
      <footer className="text-center py-12 px-4 border-t border-primary/30 mt-20">
        <div className="mb-4">
          <div className="text-2xl text-primary italic mb-2">
            "Mieux que jamais"
          </div>
          <div className="text-white/60 text-sm">
            Better than ever
          </div>
        </div>
        
        <div className="text-white/80 text-lg mb-8">
          Commitment to continuous improvement and leaving everything better than found.
        </div>
        
        <div className="text-white/40 text-xs uppercase tracking-wide">
          © 2025 Ronnie Talabucon Jr. • Portfolio v2.0
        </div>
      </footer>
    </div>
  );
};