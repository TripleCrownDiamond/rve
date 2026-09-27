import React from 'react';

interface LogoProps {
  variant?: 'color' | 'white';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'color',
  className = '',
  size = 'md',
}) => {
  const heights = {
    sm: 'h-9',
    md: 'h-12',
    lg: 'h-16',
  };

  return (
    <img
      src="/assets/logos/rve-benin.png"
      alt="Réseau Voix EssentiELLES Bénin"
      className={`inline-block w-auto object-contain ${heights[size]} ${className} ${variant === 'white' ? 'brightness-0 invert' : ''}`}
    />
  );
};
