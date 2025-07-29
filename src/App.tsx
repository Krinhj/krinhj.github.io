import React, { useState } from 'react';
import './App.css';

// Import pages
import { TerminalPage } from './pages/TerminalPage';
import { Portfolio } from './pages/Portfolio';
import { BootSequence } from './components/Effects/BootSequence';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'terminal' | 'boot' | 'portfolio'>('terminal');

  const handleBootStart = () => {
    setCurrentView('boot');
  };

  const handleBootComplete = () => {
    setCurrentView('portfolio');
  };

  const handleReturnToCLI = () => {
    setCurrentView('terminal');
  };

  // Render based on current view
  switch (currentView) {
    case 'boot':
      return <BootSequence onComplete={handleBootComplete} />;
    
    case 'portfolio':
      return <Portfolio onReturnToCLI={handleReturnToCLI} />;
    
    case 'terminal':
    default:
      return <TerminalPage onBootStart={handleBootStart} />;
  }
};

export default App;