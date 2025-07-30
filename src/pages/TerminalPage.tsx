import React from 'react';
import SynthwaveBackground from '../components/Effects/SynthwaveBackground';
import Terminal from '../components/CLI/Terminal';

const TerminalPage: React.FC = () => {
  // Force disable scrolling on mount
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  return (
    <SynthwaveBackground disablePageScroll={true}>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        boxSizing: 'border-box',
        margin: 0
      }}>
        <Terminal />
      </div>
    </SynthwaveBackground>
  );
};

export default TerminalPage;