import React from 'react';

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  target?: '_blank' | '_self';
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const NeonButton: React.FC<NeonButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  target,
  rel,
  type = 'button'
}) => {
  // Base classes that apply to all buttons
  const baseClasses = 'neon-button relative inline-flex items-center justify-center gap-2 font-semibold text-center transition-all duration-300 ease-out cursor-pointer select-none';

  // Size variants
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm rounded-md',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-xl'
  };

  // Variant styles
  const variantClasses = {
    primary: 'border-2 border-red-electric text-red-electric hover:bg-red-electric hover:text-black',
    secondary: 'border-2 border-red-primary text-red-primary hover:bg-red-primary hover:text-black bg-red-primary bg-opacity-10',
    ghost: 'border-2 border-transparent text-red-electric hover:border-red-electric hover:bg-red-electric hover:bg-opacity-10'
  };

  // Disabled styles
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed pointer-events-none' 
    : '';

  // Combine all classes
  const combinedClasses = `
    ${baseClasses} 
    ${sizeClasses[size]} 
    ${variantClasses[variant]} 
    ${disabledClasses} 
    ${className}
  `.trim();

  // Common props for both button and anchor
  const commonProps = {
    className: combinedClasses,
    onClick: disabled ? undefined : onClick,
  };

  // If href is provided, render as anchor tag
  if (href && !disabled) {
    return (
      <a
        {...commonProps}
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
      >
        {children}
      </a>
    );
  }

  // Otherwise render as button
  return (
    <button
      {...commonProps}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Convenience components for common use cases
export const PrimaryButton: React.FC<Omit<NeonButtonProps, 'variant'>> = (props) => (
  <NeonButton {...props} variant="primary" />
);

export const SecondaryButton: React.FC<Omit<NeonButtonProps, 'variant'>> = (props) => (
  <NeonButton {...props} variant="secondary" />
);

export const GhostButton: React.FC<Omit<NeonButtonProps, 'variant'>> = (props) => (
  <NeonButton {...props} variant="ghost" />
);

// Special button for CLI return
export const CliButton: React.FC<Omit<NeonButtonProps, 'variant' | 'size'>> = (props) => (
  <NeonButton {...props} variant="primary" size="sm" />
);

// Special button for audio controls
export const AudioButton: React.FC<Omit<NeonButtonProps, 'variant' | 'size'>> = (props) => (
  <NeonButton {...props} variant="secondary" size="sm" />
);

// CTA Button with enhanced styling
export const CtaButton: React.FC<Omit<NeonButtonProps, 'variant' | 'size'> & { icon?: React.ReactNode }> = ({ 
  children, 
  icon,
  className = '',
  ...props 
}) => (
  <NeonButton 
    {...props} 
    variant="primary" 
    size="lg"
    className={`font-bold tracking-wide ${className}`}
  >
    {icon && <span className="w-5 h-5">{icon}</span>}
    {children}
  </NeonButton>
);

// Project access button
export const ProjectButton: React.FC<Omit<NeonButtonProps, 'variant' | 'size'> & { 
  isLive?: boolean;
  icon?: React.ReactNode;
}> = ({ 
  children, 
  isLive = false,
  icon,
  className = '',
  ...props 
}) => (
  <NeonButton 
    {...props} 
    variant={isLive ? "primary" : "secondary"} 
    size="sm"
    className={`text-sm ${className}`}
  >
    {icon && <span className="w-4 h-4">{icon}</span>}
    {children}
  </NeonButton>
);

// Social link button
export const SocialButton: React.FC<Omit<NeonButtonProps, 'variant'> & { 
  platform: 'github' | 'linkedin' | 'email' | 'website';
  icon?: React.ReactNode;
}> = ({ 
  children, 
  platform,
  icon,
  className = '',
  ...props 
}) => {
  const platformStyles = {
    github: 'hover:border-gray-400 hover:text-gray-400',
    linkedin: 'hover:border-blue-400 hover:text-blue-400',
    email: 'hover:border-green-400 hover:text-green-400', 
    website: 'hover:border-purple-400 hover:text-purple-400'
  };

  return (
    <NeonButton 
      {...props} 
      variant="ghost"
      className={`${platformStyles[platform]} ${className}`}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </NeonButton>
  );
};

// Button group component for organizing multiple buttons
export const ButtonGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
  direction?: 'row' | 'column';
  gap?: 'sm' | 'md' | 'lg';
}> = ({ 
  children, 
  className = '',
  direction = 'row',
  gap = 'md'
}) => {
  const directionClasses = direction === 'row' ? 'flex-row flex-wrap' : 'flex-col';
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4', 
    lg: 'gap-6'
  };

  return (
    <div className={`flex ${directionClasses} ${gapClasses[gap]} justify-center items-center ${className}`}>
      {children}
    </div>
  );
};