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
    sm: 'h-14',
    md: 'h-16',
    lg: 'h-20',
  };

  // Charte §07 : « Sur fond vert ou noir, utiliser obligatoirement la
  // version blanche. » C'est un fichier à part, pas une inversion CSS de
  // la version couleur : le filtre écraserait aussi les trois points, qui
  // doivent disparaître proprement dans la version monochrome.
  return (
    <img
      src={
        variant === 'white'
          ? '/assets/logos/rve-benin-blanc.png'
          : '/assets/logos/rve-benin.png'
      }
      alt="Réseau Voix EssentiELLES Bénin"
      className={`inline-block w-auto object-contain ${heights[size]} ${className}`}
    />
  );
};
