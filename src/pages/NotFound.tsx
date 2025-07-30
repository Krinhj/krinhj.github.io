import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="cyberpunk-grid" />
      
      <div className="text-center z-20 relative">
        <div className="text-6xl md:text-8xl font-bold text-primary mb-8">
          404
        </div>
        
        <div className="text-xl md:text-2xl text-muted-foreground mb-4">
          PAGE NOT FOUND
        </div>
        
        <div className="text-base text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for has been moved to another dimension.
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/')}
            className="neon-button rounded-lg px-6 py-3"
          >
            RETURN HOME
          </button>
          <button 
            onClick={() => navigate('/terminal')}
            className="neon-button rounded-lg px-6 py-3"
          >
            ENTER TERMINAL
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;