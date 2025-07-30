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
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <Terminal />
      </div>
    </SynthwaveBackground>
  );
};

export default TerminalPage;