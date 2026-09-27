import React from 'react';

/**
 * Les points — charte §12, second élément du vocabulaire formel.
 *
 * « Employer la vague comme signature de structure et les points comme
 * rythme. » Ils reprennent les trois pastilles qui coiffent l'ondulation
 * du logotype, dans leur ordre d'origine : jaune, rouge, vert.
 *
 * Les pastilles du logo ne sont pas des cercles parfaits : ce sont des
 * taches posées à la main, légèrement irrégulières et d'aplomb variable.
 * Le léger décalage vertical et les rayons inégaux ci-dessous en gardent
 * la trace, plutôt qu'un alignement mécanique de trois ronds identiques.
 *
 * §12 interdit de réunir vague, points ET filets sur un même bloc : ce
 * composant ne se pose donc que là où les filets ont été retirés.
 */
export const Points: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 84 26"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <ellipse cx="11" cy="15" rx="10.5" ry="9.5" fill="var(--color-rve-yellow)" />
    <ellipse cx="42" cy="10" rx="11.5" ry="10" fill="var(--color-rve-red)" />
    <ellipse cx="73" cy="14" rx="10" ry="9" fill="var(--color-rve-lime)" />
  </svg>
);

/**
 * Une seule pastille — « Une pastille colorée par bloc informationnel »
 * (§12, autorisé). Sert à distinguer les blocs d'une même famille.
 */
export const Pastille: React.FC<{ couleur: string; className?: string }> = ({
  couleur,
  className = '',
}) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
    <ellipse cx="12" cy="12" rx="11.5" ry="10.5" fill={couleur} />
  </svg>
);
