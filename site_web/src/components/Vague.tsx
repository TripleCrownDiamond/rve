import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { duree, ease, zoneReveal } from '../motion';

/**
 * La vague signature — charte §12.
 *
 * « La vague est le motif principal. Elle reprend la courbe du symbole et
 * assemble le vert, le jaune et le rouge. »
 *
 * Le tracé n'est pas une sinusoïde : il a été relevé sur l'ondulation du
 * logotype lui-même, puis converti en courbes de Bézier. Il en garde le
 * caractère — trois crêtes, la médiane la plus haute, un espacement
 * irrégulier — au lieu du rythme mécanique d'une onde calculée.
 *
 * Deux emplois, correspondant aux deux positions admises par §12
 * (« la vague en pied ou en bandeau latéral ») :
 *
 *  · `termine` — la vague ferme un aplat de couleur. Le bloc coloré
 *    descend jusqu'à la courbe et s'arrête dessus : l'arête du bloc EST
 *    le premier ruban. Les deux autres courent juste en dessous, sur le
 *    fond clair, seul endroit où ils se lisent. Rien ne flotte, aucune
 *    bande intermédiaire ne s'intercale.
 *  · par défaut — trois rubans tracés sur fond clair, en pied de section.
 *
 * Règles appliquées :
 *  · §18 « Les trois couleurs ensemble, uniquement en vagues. » C'est donc
 *    le seul endroit du site où le vert, le jaune et le rouge se touchent.
 *  · §12 jamais derrière du texte courant, jamais en motif répété, jamais
 *    combinée aux points et aux filets sur un même bloc.
 *  · §07 sur un support animé, « animation de la seule ondulation admise ».
 *    Le tracé progressif est le seul moment du site où le mouvement attire
 *    le regard pour lui-même.
 */

/** Courbe relevée sur l'ondulation du logotype. */
const TRACE =
  'M 0 108 C 38.8 98, 154.8 47.7, 233 48 C 311.2 48.3, 405.8 113.3, 469 110 ' +
  'C 532.2 106.7, 558.5 29.7, 612 28 C 665.5 26.3, 727 98.5, 790 100 ' +
  'C 853 101.5, 921.7 33.7, 990 37 C 1058.3 40.3, 1165 106.2, 1200 120';

/** Le même tracé refermé vers le haut : remplit tout ce qui est au-dessus. */
const APLAT = `${TRACE} L 1200 0 L 0 0 Z`;

/** Ordre du filet tricolore de la charte : vert, jaune, rouge. */
const RUBANS = [
  { couleur: 'var(--color-rve-green)', y: 0 },
  { couleur: 'var(--color-rve-yellow)', y: 18 },
  { couleur: 'var(--color-rve-red)', y: 36 },
] as const;

interface VagueProps {
  /** Trace la vague à l'entrée dans le champ. Réservé aux moments forts. */
  dessine?: boolean;
  /**
   * Ferme un aplat de couleur : le premier ruban devient l'arête du bloc.
   * Passer la couleur de l'aplat, p. ex. `var(--color-rve-green)`.
   */
  termine?: string;
  className?: string;
}

export const Vague: React.FC<VagueProps> = ({
  dessine = false,
  termine,
  className = '',
}) => {
  const mouvementReduit = useReducedMotion();
  const anime = dessine && !mouvementReduit;

  // En mode terminaison, le premier ruban est remplacé par l'aplat lui-même.
  const rubans = termine ? RUBANS.slice(1) : RUBANS;

  return (
    <svg
      viewBox="0 0 1200 160"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {termine && <path d={APLAT} fill={termine} />}

      {rubans.map(({ couleur, y }, i) => (
        <motion.path
          key={couleur}
          d={TRACE}
          transform={`translate(0 ${y})`}
          fill="none"
          stroke={couleur}
          strokeWidth={13}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={anime ? { pathLength: 0 } : false}
          whileInView={anime ? { pathLength: 1 } : undefined}
          viewport={zoneReveal}
          transition={{
            duration: duree.vague,
            ease: ease.sortie,
            delay: i * 0.09,
          }}
        />
      ))}
    </svg>
  );
};
