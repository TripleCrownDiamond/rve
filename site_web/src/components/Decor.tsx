import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

/**
 * Décor géométrique discret — charte §12.
 *
 * Le vocabulaire formel du réseau comprend « la vague, les points, les
 * lignes de structure et les aplats ». La vague est réservée au pivot de
 * la page ; ce fichier couvre les deux autres, en fond, à très faible
 * opacité.
 *
 * Règles qui bornent ces formes :
 *  · §12 interdit « un motif de fond répété utilisé comme papier peint » :
 *    une seule forme par section, posée dans un angle, jamais en trame.
 *  · §12 interdit de réunir vague, points ET filets sur un même bloc :
 *    aucun de ces décors ne se pose sur la section qui porte la vague.
 *  · §18 interdit un dégradé entre les couleurs principales : ces formes
 *    sont d'un seul ton, et leur transparence vient de l'opacité.
 *  · §29 impose une zone de repos : le décor n'occupe jamais la colonne
 *    de texte, il se tient dans la marge.
 *
 * Tous sont `aria-hidden` et ne reçoivent pas le pointeur : ils ne portent
 * aucune information, ils donnent seulement de la profondeur au blanc.
 */

/**
 * Tache — reprend la silhouette irrégulière des pastilles du logotype,
 * agrandie. Ce n'est pas un cercle : les points du logo sont peints à la
 * main, et c'est ce qui les distingue d'une puce générique.
 */
export const Tache: React.FC<{
  couleur?: string;
  className?: string;
}> = ({ couleur = 'var(--color-rve-green)', className = '' }) => (
  <svg
    viewBox="0 0 200 200"
    aria-hidden="true"
    focusable="false"
    className={`pointer-events-none ${className}`}
  >
    <path
      d="M104 8c38 2 74 24 86 58 12 34-2 74-26 100s-58 38-90 30S18 156 10 122 18 48 44 26 66 6 104 8Z"
      fill={couleur}
    />
  </svg>
);

/**
 * Lignes de structure — un faisceau de filets parallèles qui suit la pente
 * d'une crête de l'ondulation. Elles donnent une direction à un angle vide
 * sans y poser de contenu.
 */
export const Lignes: React.FC<{
  couleur?: string;
  className?: string;
}> = ({ couleur = 'var(--color-rve-green)', className = '' }) => (
  <svg
    viewBox="0 0 160 160"
    aria-hidden="true"
    focusable="false"
    className={`pointer-events-none ${className}`}
  >
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <line
        key={i}
        x1={i * 26}
        y1={160}
        x2={i * 26 + 84}
        y2={0}
        stroke={couleur}
        strokeWidth={2}
        strokeLinecap="round"
      />
    ))}
  </svg>
);

/**
 * Arc — un fragment de la courbe du symbole, isolé. Sert de respiration
 * dans une marge, à l'échelle où l'ondulation complète serait trop lourde.
 */
export const Arc: React.FC<{
  couleur?: string;
  className?: string;
}> = ({ couleur = 'var(--color-rve-green)', className = '' }) => (
  <svg
    viewBox="0 0 240 120"
    aria-hidden="true"
    focusable="false"
    className={`pointer-events-none ${className}`}
  >
    <path
      d="M 0 110 C 30 100, 70 18, 120 20 C 170 22, 210 96, 240 108"
      fill="none"
      stroke={couleur}
      strokeWidth={10}
      strokeLinecap="round"
    />
  </svg>
);

/* ------------------------------------------------------------------ *
 * Formes animées
 * ------------------------------------------------------------------ */

/**
 * Dérive lente d'une forme décorative.
 *
 * Le mouvement est volontairement long (12 à 20 secondes) et de faible
 * amplitude : à cette vitesse, l'œil ne le suit pas, il perçoit seulement
 * que la page n'est pas figée. Une forme qui bouge assez pour être suivie
 * détournerait de la lecture, ce que la charte §44 exclut.
 *
 * Ce n'est pas une animation d'interface : elle ne signale rien et ne
 * répond à rien, donc elle échappe au plafond de 150 à 250 ms qui borne
 * les transitions fonctionnelles. Elle s'arrête entièrement sous
 * `prefers-reduced-motion`.
 */
export const Flottante: React.FC<{
  children: React.ReactNode;
  /** Amplitude verticale, en pixels. */
  derive?: number;
  /** Durée d'un aller-retour complet, en secondes. */
  duree?: number;
  /** Décalage de départ, pour que deux formes voisines ne battent pas ensemble. */
  retard?: number;
  rotation?: number;
  className?: string;
}> = ({
  children,
  derive = 14,
  duree = 16,
  retard = 0,
  rotation = 0,
  className = '',
}) => {
  const mouvementReduit = useReducedMotion();

  if (mouvementReduit) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -derive, 0],
        rotate: rotation ? [0, rotation, 0] : undefined,
      }}
      transition={{
        duration: duree,
        delay: retard,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

/** Anneau ouvert — reprend l'épaisseur de trait de l'ondulation. */
export const Anneau: React.FC<{ couleur?: string; className?: string }> = ({
  couleur = 'var(--color-rve-green)',
  className = '',
}) => (
  <svg
    viewBox="0 0 120 120"
    aria-hidden="true"
    focusable="false"
    className={`pointer-events-none ${className}`}
  >
    <circle
      cx="60"
      cy="60"
      r="50"
      fill="none"
      stroke={couleur}
      strokeWidth="9"
      strokeLinecap="round"
      strokeDasharray="240 80"
    />
  </svg>
);

/** Semis de points — les pastilles du logotype, dispersées. */
export const Semis: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 160 120"
    aria-hidden="true"
    focusable="false"
    className={`pointer-events-none ${className}`}
  >
    {[
      [22, 30, 11, 'var(--color-rve-green)'],
      [78, 18, 9, 'var(--color-rve-yellow)'],
      [130, 42, 12, 'var(--color-rve-red)'],
      [48, 78, 8, 'var(--color-rve-lime)'],
      [108, 92, 10, 'var(--color-rve-green)'],
    ].map(([cx, cy, r, c], i) => (
      <ellipse
        key={i}
        cx={cx as number}
        cy={cy as number}
        rx={r as number}
        ry={(r as number) * 0.9}
        fill={c as string}
      />
    ))}
  </svg>
);
