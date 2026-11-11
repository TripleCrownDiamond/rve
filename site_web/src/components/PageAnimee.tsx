import React, { useRef } from 'react';
import { useGsapScroll } from '../hooks/useGsapScroll';
import { useGsapIcons } from '../hooks/useGsapIcons';

/**
 * Enveloppe qui branche les deux couches d'animation sur une page interne.
 *
 * Les hooks travaillent par sélecteur, dans la portée d'un conteneur : sans
 * conteneur, ils ne trouvent rien. Les pages internes les déclaraient une à
 * une, ce qui veut dire qu'il suffisait d'en oublier une pour qu'elle reste
 * figée au milieu d'un site animé.
 *
 * `data-scroll` déclenche une entrée au défilement, `rve-gsap-icon` anime le
 * pictogramme d'une carte ou d'un bouton au survol. Les deux s'effacent sous
 * `prefers-reduced-motion`.
 */
export const PageAnimee: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  useGsapScroll(ref);
  useGsapIcons(ref);
  return <div ref={ref}>{children}</div>;
};
