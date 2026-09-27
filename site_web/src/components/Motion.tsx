import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { duree, ease } from '../motion';

/**
 * Couche d'animation du site.
 *
 * Elle s'appuie sur `motion`, déjà présent dans le projet, plutôt que
 * d'ajouter GSAP : les deux savent faire ce qui suit, et une seconde
 * librairie d'animation ajouterait environ 70 ko à un site consulté en
 * grande partie depuis des téléphones sur réseau mobile africain, pour un
 * résultat visuellement identique.
 *
 * Tout ici n'anime que `transform` et `opacity`, les deux propriétés que
 * le compositeur traite sans repasser par la mise en page. Chaque effet
 * s'efface entièrement sous `prefers-reduced-motion`.
 */

/* ------------------------------------------------------------------ *
 * Parallaxe
 * ------------------------------------------------------------------ */

/**
 * Déplacement lent d'un élément pendant le défilement.
 *
 * L'amplitude est volontairement faible : au-delà d'une cinquantaine de
 * pixels, une image de fond se décolle de son bloc et le texte posé
 * dessus semble flotter.
 */
export const Parallaxe: React.FC<{
  children: React.ReactNode;
  amplitude?: number;
  className?: string;
}> = ({ children, amplitude = 40, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouvementReduit = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-amplitude, amplitude]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={mouvementReduit ? undefined : { y }} className="h-full">
        {children}
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------ *
 * Compteur
 * ------------------------------------------------------------------ */

/**
 * Nombre qui se compte à l'entrée dans le champ.
 *
 * Le chiffre final est rendu dès le premier cadre pour les lecteurs
 * d'écran et sous mouvement réduit : l'animation décore la donnée, elle
 * ne la remplace jamais.
 */
export const Compteur: React.FC<{
  valeur: number;
  duree?: number;
  className?: string;
}> = ({ valeur, duree: duration = 1.1, className = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const mouvementReduit = useReducedMotion();
  const [affiche, setAffiche] = useState(mouvementReduit ? valeur : 0);

  useEffect(() => {
    if (mouvementReduit) return;
    const el = ref.current;
    if (!el) return;

    const observateur = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        observateur.disconnect();
        const depart = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - depart) / (duration * 1000), 1);
          // Sortie expo : le compte ralentit en approchant de sa valeur,
          // ce qui donne l'impression qu'il se pose au lieu de s'arrêter.
          const eased = 1 - Math.pow(1 - p, 3);
          setAffiche(Math.round(valeur * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observateur.observe(el);
    return () => observateur.disconnect();
  }, [valeur, duration, mouvementReduit]);

  return (
    <span ref={ref} className={className}>
      {affiche}
    </span>
  );
};

/* ------------------------------------------------------------------ *
 * Titre qui se découvre
 * ------------------------------------------------------------------ */

/**
 * Titre révélé mot à mot derrière un masque.
 *
 * Chaque mot monte depuis sa propre ligne : c'est le seul effet du site
 * qui découpe du texte, et il est réservé aux titres de premier niveau.
 * Le texte reste un seul nœud pour les lecteurs d'écran grâce au
 * `aria-label` porté par le conteneur.
 */
export const TitreRevele: React.FC<{
  texte: string;
  className?: string;
  as?: 'h1' | 'h2';
}> = ({ texte, className = '', as = 'h2' }) => {
  const mouvementReduit = useReducedMotion();
  const Balise = as;

  if (mouvementReduit) {
    return <Balise className={className}>{texte}</Balise>;
  }

  const mots = texte.split(' ');

  return (
    <Balise className={className} aria-label={texte}>
      <motion.span
        aria-hidden="true"
        initial="cache"
        whileInView="vu"
        viewport={{ once: true, amount: 0.5 }}
        variants={{ vu: { transition: { staggerChildren: 0.045 } } }}
        className="inline"
      >
        {mots.map((mot, i) => (
          <span
            key={`${mot}-${i}`}
            className="inline-block overflow-hidden align-bottom"
          >
            <motion.span
              className="inline-block"
              variants={{
                cache: { y: '100%' },
                vu: {
                  y: 0,
                  transition: { duration: duree.entree, ease: ease.sortie },
                },
              }}
            >
              {mot}
              {i < mots.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Balise>
  );
};

/* ------------------------------------------------------------------ *
 * Barre de progression de lecture
 * ------------------------------------------------------------------ */

/** Avancement dans la page, en filet fin sous l'en-tête. */
export const ProgressionLecture: React.FC = () => {
  const mouvementReduit = useReducedMotion();
  const { scrollYProgress } = useScroll();
  if (mouvementReduit) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-rve-green"
    />
  );
};

/* ------------------------------------------------------------------ *
 * Survol suivi
 * ------------------------------------------------------------------ */

/**
 * Inclinaison légère d'une carte selon la position du pointeur.
 *
 * Bornée à trois degrés et désactivée au doigt : sur un écran tactile il
 * n'y a pas de survol, et l'effet ne se déclencherait qu'au moment du
 * clic, ce qui donnerait l'impression d'un défaut.
 */
export const CarteSuivie: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouvementReduit = useReducedMotion();
  const [inclinaison, setInclinaison] = useState({ x: 0, y: 0 });

  const suivre = (e: React.MouseEvent) => {
    if (mouvementReduit) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setInclinaison({ x: -py * 6, y: px * 6 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={suivre}
      onMouseLeave={() => setInclinaison({ x: 0, y: 0 })}
      animate={{ rotateX: inclinaison.x, rotateY: inclinaison.y }}
      transition={{ duration: duree.etat, ease: ease.sortie }}
      style={{ transformPerspective: 900 }}
      className={`[@media(pointer:coarse)]:!transform-none ${className}`}
    >
      {children}
    </motion.div>
  );
};
