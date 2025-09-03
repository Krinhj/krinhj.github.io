import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import SynthwaveBackground from '../components/Effects/SynthwaveBackground';
import { HeroSection } from '../components/Portfolio/HeroSection';
import { AboutSection } from '../components/Portfolio/AboutSection';
import { ProjectMatrix } from '../components/Portfolio/ProjectMatrix';
import { ExperienceTimeline } from '../components/Portfolio/ExperienceTimeline';
import { TechnicalArsenal } from '../components/Portfolio/TechnicalArsenal';
import { ContactPortal } from '../components/Portfolio/ContactPortal';

const Index: React.FC = () => {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [audioData, setAudioData] = useState<number>(0);
  const [frequencyData, setFrequencyData] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set volume to 30%
      audioRef.current.loop = true;
      
      const handleCanPlayThrough = () => {
        setAudioLoaded(true);
      };
      
      audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
        }
      };
    }
  }, []);

  const setupAudioAnalysis = () => {
    if (!audioRef.current) return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audioRef.current);
      
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      
      startAudioAnalysis();
    } catch (error) {
      console.error('Audio analysis setup failed:', error);
    }
  };

  const startAudioAnalysis = () => {
    if (!analyserRef.current || !dataArrayRef.current) return;
    
    const updateAudioData = () => {
      if (analyserRef.current && dataArrayRef.current && audioEnabled) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        
        // Calculate average amplitude from lower frequencies (bass/mids)
        const bassRange = dataArrayRef.current.slice(0, 64);
        const average = bassRange.reduce((sum, value) => sum + value, 0) / bassRange.length;
        const normalized = average / 255; // Normalize to 0-1
        
        // Create frequency bars data (32 bars covering different frequency ranges)
        const barCount = 32;
        const barsData: number[] = [];
        const chunkSize = Math.floor(dataArrayRef.current.length / barCount);
        
        for (let i = 0; i < barCount; i++) {
          const start = i * chunkSize;
          const end = start + chunkSize;
          const chunk = dataArrayRef.current.slice(start, end);
          const barValue = chunk.reduce((sum, value) => sum + value, 0) / chunk.length;
          barsData.push(barValue / 255); // Normalize to 0-1
        }
        
        setAudioData(normalized);
        setFrequencyData(barsData);
        animationFrameRef.current = requestAnimationFrame(updateAudioData);
      }
    };
    
    updateAudioData();
  };

  const toggleAudio = () => {
    if (audioRef.current && audioLoaded) {
      if (audioEnabled) {
        audioRef.current.pause();
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        setAudioData(0);
        setFrequencyData([]);
      } else {
        audioRef.current.play().then(() => {
          if (!audioContextRef.current) {
            setupAudioAnalysis();
          } else {
            startAudioAnalysis();
          }
        }).catch(console.error);
      }
      setAudioEnabled(!audioEnabled);
    }
  };

  const handleReturnToCLI = () => {
    navigate('/terminal');
  };

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <SynthwaveBackground disablePageScroll={false} audioData={audioData} frequencyData={frequencyData}>
        {/* Hidden audio element */}
        <audio 
        ref={audioRef}
        preload="auto"
        style={{ display: 'none' }}
      >
        <source src="/soundtrack.mp3" type="audio/mpeg" />
        <source src="/soundtrack.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      {/* Fixed Controls - Enhanced cyberpunk styling */}
      <div style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 50
      }}>
        <button
          onClick={toggleAudio}
          className="neon-button"
          disabled={!audioLoaded}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.75rem',
            borderRadius: '0.5rem',
            backgroundColor: 'hsl(var(--background) / 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid hsl(var(--primary) / 0.5)',
            boxShadow: '0 4px 12px hsl(var(--background) / 0.3), inset 0 1px 0 hsl(var(--primary) / 0.2)',
            opacity: audioLoaded ? 1 : 0.6,
            cursor: audioLoaded ? 'pointer' : 'not-allowed'
          }}
        >
          {!audioLoaded 
            ? '⏳ LOADING...' 
            : audioEnabled 
              ? '🎵 AUDIO: ON' 
              : '🔇 AUDIO: OFF'
          }
        </button>
      </div>

      <div style={{
        position: 'fixed',
        top: '1rem',
        left: '1rem',
        zIndex: 50
      }}>
        <button
          onClick={handleReturnToCLI}
          className="neon-button"
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.75rem',
            borderRadius: '0.5rem',
            backgroundColor: 'hsl(var(--background) / 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid hsl(var(--primary) / 0.5)',
            boxShadow: '0 4px 12px hsl(var(--background) / 0.3), inset 0 1px 0 hsl(var(--primary) / 0.2)'
          }}
        >
          📟 RETURN TO CLI
        </button>
      </div>

      {/* Main content - simple and clean */}
      <div style={{ 
        margin: 0, 
        padding: 0,
        width: '100%',
        minHeight: '100vh'
      }}>
        <HeroSection audioEnabled={audioEnabled} frequencyData={frequencyData} />
        <AboutSection />
        <ProjectMatrix />
        <ExperienceTimeline />
        <TechnicalArsenal />
        <ContactPortal />

        {/* Footer with quote */}
        <footer style={{
          textAlign: 'center',
          padding: '3rem 1rem',
          borderTop: '1px solid hsl(var(--primary) / 0.3)',
          marginTop: '5rem'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: 'bold',
              color: 'hsl(var(--primary-glow))',
              fontStyle: 'italic',
              letterSpacing: '0.05em',
              marginBottom: '0.5rem'
            }}>
              "Mieux que jamais"
            </div>
            <div style={{
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              color: 'hsl(var(--muted-foreground))'
            }}>
              Better than ever
            </div>
          </div>
          
          <div style={{
            color: 'hsl(var(--foreground))',
            fontSize: '1.125rem',
            marginBottom: '2rem',
            maxWidth: '32rem',
            margin: '0 auto 2rem auto'
          }}>
            Commitment to continuous improvement and leaving everything better than found.
          </div>
          
          <div style={{
            color: 'hsl(var(--muted-foreground))',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            © 2025 Ronnie Talabucon Jr. • Portfolio v2.0
          </div>
        </footer>
      </div>

      {/* Ambient lighting effects */}
      <div style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: '25%',
          width: '24rem',
          height: '24rem',
          backgroundColor: 'hsl(var(--primary) / 0.05)',
          borderRadius: '50%',
          filter: 'blur(48px)',
          animation: 'energy-pulse 4s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: '25%',
          width: '24rem',
          height: '24rem',
          backgroundColor: 'hsl(var(--primary-glow) / 0.05)',
          borderRadius: '50%',
          filter: 'blur(48px)',
          animation: 'energy-pulse 4s ease-in-out infinite',
          animationDelay: '1s'
        }} />
      </div>
    </SynthwaveBackground>
    </div>
  );
};

export default Index;