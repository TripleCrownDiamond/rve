import React from 'react';

/** Photographie locale du réseau, avec un voile uni pour préserver la lisibilité. */
export const HeroBackground: React.FC = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none" aria-hidden="true">
    <img
      src="/assets/img/hero-reseau.jpg"
      alt=""
      className="w-full h-full object-cover object-center"
      fetchPriority="high"
    />
    <div className="absolute inset-0 bg-[#101814]/60" />
  </div>
);
