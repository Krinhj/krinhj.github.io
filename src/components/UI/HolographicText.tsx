import React from 'react';

interface HolographicTextProps {
  children: React.ReactNode;
  variant?: 'holo' | 'glitch' | 'normal';
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
  dataText?: string; // For glitch effect
}

export const HolographicText: React.FC<HolographicTextProps> = ({ 
  children, 
  variant = 'holo',
  className = '',
  as: Component = 'div',
  dataText
}) => {
  // Convert children to string for data-text attribute if not provided
  const textContent = dataText || (typeof children === 'string' ? children : '');

  // Base classes for all variants
  const baseClasses = 'relative inline-block font-bold text-transform-uppercase letter-spacing-wide';

  // Variant-specific classes
  const variantClasses = {
    holo: 'holo-text',
    glitch: 'glitch',
    normal: 'text-white'
  };

  // Combine classes
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  // For glitch effect, we need the data-text attribute
  const componentProps = variant === 'glitch' 
    ? { 
        className: combinedClasses,
        'data-text': textContent 
      }
    : { 
        className: combinedClasses,
        ...(variant === 'holo' && textContent ? { 'data-text': textContent } : {})
      };

  return (
    <Component {...componentProps}>
      {children}
    </Component>
  );
};

// Convenience components for common use cases
export const HoloTitle: React.FC<Omit<HolographicTextProps, 'variant' | 'as'>> = (props) => (
  <HolographicText {...props} variant="holo" as="h2" />
);

export const GlitchTitle: React.FC<Omit<HolographicTextProps, 'variant' | 'as'>> = (props) => (
  <HolographicText {...props} variant="glitch" as="h2" />
);

export const HoloHeading: React.FC<Omit<HolographicTextProps, 'variant' | 'as'> & { level?: 1 | 2 | 3 | 4 | 5 | 6 }> = ({ 
  level = 1, 
  ...props 
}) => (
  <HolographicText 
    {...props} 
    variant="holo" 
    as={`h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'} 
  />
);

// Section title component - perfect for your section headers
export const SectionTitle: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  withScanLine?: boolean;
  subtitle?: string;
}> = ({ 
  children, 
  className = '', 
  withScanLine = true,
  subtitle 
}) => {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <GlitchTitle 
        className="text-4xl md:text-6xl font-bold mb-6"
        dataText={typeof children === 'string' ? children : ''}
      >
        {children}
      </GlitchTitle>
      
      {withScanLine && subtitle && (
        <div className="scan-line">
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      )}
    </div>
  );
};

// Hero name component - special styling for your name
export const HeroName: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <HolographicText
      variant="holo"
      as="h1"
      className={`text-6xl md:text-8xl font-bold mb-6 ${className}`}
      dataText={typeof children === 'string' ? children : ''}
    >
      {children}
    </HolographicText>
  );
};

// Quote text component - for your motto
export const QuoteText: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <HolographicText
      variant="glitch"
      as="div"
      className={`text-2xl md:text-3xl font-bold text-red-electric ${className}`}
      dataText={typeof children === 'string' ? children : ''}
    >
      {children}
    </HolographicText>
  );
};