import { useState, useEffect } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const bootSteps = [
    "SYSTEM INITIALIZING...",
    "Loading cyberpunk_portfolio.exe...",
    "Establishing neon matrix...",
    "Calibrating holographic displays...",
    "READY TO SHOCK AND AWE"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < bootSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Complete IMMEDIATELY after final step
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    }, 400); // MUCH faster - 400ms per step = 2.3 seconds total

    return () => clearTimeout(timer);
  }, [currentStep, onComplete, bootSteps.length]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center w-full max-w-4xl mx-auto px-8">
        {/* Main boot sequence text - PROPERLY CENTERED */}
        <div className="mb-12">
          {bootSteps.slice(0, currentStep + 1).map((step, index) => (
            <div 
              key={index} 
              className={`mb-4 text-center font-mono transition-all duration-300 ${
                index === currentStep 
                  ? 'text-red-bright text-2xl md:text-3xl' 
                  : 'text-red-electric text-xl md:text-2xl'
              }`}
              style={{
                textShadow: index === currentStep 
                  ? '0 0 20px var(--red-bright)' 
                  : '0 0 10px var(--red-electric)'
              }}
            >
              <span className="text-red-primary">{'>'}</span> {step}
              {index === currentStep && (
                <span 
                  className={`ml-2 text-green-terminal ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                  style={{ 
                    transition: 'opacity 0.1s ease',
                    textShadow: '0 0 10px var(--green-terminal)'
                  }}
                >
                  |
                </span>
              )}
            </div>
          ))}
        </div>
        
        {/* Progress bar - CENTERED */}
        <div className="w-full max-w-lg mx-auto mb-6">
          <div className="w-full h-2 bg-gray-900 rounded-full border border-red-electric">
            <div 
              className="h-full bg-gradient-to-r from-red-electric to-red-bright transition-all duration-500 ease-out rounded-full"
              style={{ 
                width: `${((currentStep + 1) / bootSteps.length) * 100}%`,
                boxShadow: '0 0 10px var(--red-electric)'
              }}
            />
          </div>
          
          <div className="text-center mt-4">
            <span 
              className="text-red-electric text-lg font-mono font-bold"
              style={{ textShadow: '0 0 10px var(--red-electric)' }}
            >
              {Math.round(((currentStep + 1) / bootSteps.length) * 100)}%
            </span>
          </div>
        </div>

        {/* Final message */}
        {currentStep === bootSteps.length - 1 && (
          <div 
            className="text-red-bright text-xl font-bold animate-pulse"
            style={{ textShadow: '0 0 20px var(--red-bright)' }}
          >
            Launching portfolio...
          </div>
        )}
      </div>
    </div>
  );
};