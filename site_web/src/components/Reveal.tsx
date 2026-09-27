import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { fonduMontee, parentCadence, zoneReveal } from '../motion';

/**
 * Révélation au défilement, volontairement parcimonieuse.
 *
 * Elle ne s'applique qu'à l'en-tête d'une section, pas à chaque carte
 * d'une grille : la cascade appliquée à tous les éléments d'une page est
 * précisément ce qui signe une mise en page fabriquée à la chaîne. Ici le
 * mouvement dit « un nouveau sujet commence », et s'arrête là.
 *
 * `Cadence` reste disponible pour les rares familles où l'ordre d'arrivée
 * porte une information — un déroulé d'étapes, par exemple.
 */

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'header' | 'li' | 'section';
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  as = 'div',
}) => {
  const mouvementReduit = useReducedMotion();
  const Balise = motion[as];

  if (mouvementReduit) {
    const Statique = as;
    return <Statique className={className}>{children}</Statique>;
  }

  return (
    <Balise
      className={className}
      variants={fonduMontee}
      initial="cache"
      whileInView="vu"
      viewport={zoneReveal}
    >
      {children}
    </Balise>
  );
};

/** Conteneur qui fait entrer ses enfants dans l'ordre. */
export const Cadence: React.FC<RevealProps> = ({
  children,
  className = '',
  as = 'div',
}) => {
  const mouvementReduit = useReducedMotion();
  const Balise = motion[as];

  if (mouvementReduit) {
    const Statique = as;
    return <Statique className={className}>{children}</Statique>;
  }

  return (
    <Balise
      className={className}
      variants={parentCadence}
      initial="cache"
      whileInView="vu"
      viewport={zoneReveal}
    >
      {children}
    </Balise>
  );
};

/** Enfant d'une `Cadence`. */
export const CadenceItem: React.FC<RevealProps> = ({
  children,
  className = '',
  as = 'div',
}) => {
  const mouvementReduit = useReducedMotion();
  const Balise = motion[as];

  if (mouvementReduit) {
    const Statique = as;
    return <Statique className={className}>{children}</Statique>;
  }

  return (
    <Balise className={className} variants={fonduMontee}>
      {children}
    </Balise>
  );
};
