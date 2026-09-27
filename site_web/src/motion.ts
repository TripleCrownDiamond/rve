/**
 * Système de mouvement — RVE-Bénin
 *
 * Le plafond vient de la charte, pas d'un usage générique du web :
 * §44 « Des animations sobres de 150 à 250 ms. » Aucune animation isolée
 * ne dépasse donc 250 ms. Une séquence peut enchaîner plusieurs
 * battements décalés — la contrainte porte sur chaque animation, pas sur
 * la durée totale d'une entrée orchestrée.
 *
 * Le seul moment fort du site est le tracé de la vague signature. La
 * charte §07 est explicite : sur un support animé, « animation de la
 * seule ondulation admise ». C'est donc le seul endroit où le mouvement
 * a le droit d'attirer le regard pour lui-même ; partout ailleurs il ne
 * fait qu'accompagner la lecture.
 *
 * Seuls `transform` et `opacity` sont animés : les deux propriétés que
 * le compositeur traite sans repasser par la mise en page.
 */

/** Courbes. Sortie douce qui se pose, sans rebond. */
export const ease = {
  sortie: [0.2, 0, 0, 1] as const,
} as const;

/** Durées, en secondes — bornées par la charte §44. */
export const duree = {
  micro: 0.15, // survol, pression
  etat: 0.2, // bascule, sélection
  entree: 0.25, // entrée d'un bloc — plafond charte
  vague: 1.1, // tracé de la vague : dessin continu, pas une entrée
} as const;

/** Décalages d'entrée, alignés sur l'échelle d'espacement. */
export const decalage = { sm: 8, md: 14, lg: 20 } as const;

/** Cadence entre éléments d'une même famille. */
export const cadence = { serre: 0.04, normal: 0.07 } as const;

/* ------------------------------------------------------------------ *
 * Primitives
 * ------------------------------------------------------------------ */

/** Entrée par défaut : fondu + montée courte. */
export const fonduMontee = {
  cache: { opacity: 0, y: decalage.md },
  vu: {
    opacity: 1,
    y: 0,
    transition: { duration: duree.entree, ease: ease.sortie },
  },
} as const;

/** Conteneur qui cadence ses enfants. */
export const parentCadence = {
  cache: {},
  vu: { transition: { staggerChildren: cadence.normal } },
} as const;

/**
 * Déclencheur de révélation au défilement.
 * `once` évite qu'un bloc rejoue à chaque passage ; `amount` attend qu'un
 * quart de l'élément soit visible pour que l'animation accompagne la
 * lecture au lieu de la précéder.
 */
export const zoneReveal = { once: true, amount: 0.25 } as const;

/** Pression tactile — valeur fixe, jamais en dessous de 0,95. */
export const pression = { scale: 0.96 } as const;
