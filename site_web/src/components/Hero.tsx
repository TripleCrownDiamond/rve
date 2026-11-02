import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Compteur } from './Motion';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { cadence, duree, ease } from '../motion';
import { useGsapIcons } from '../hooks/useGsapIcons';

const arriveeHero = {
  cache: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: duree.entree, ease: ease.sortie } },
};

interface HeroProps {
  onDiscoverClick: () => void;
  onActionsClick: () => void;
  onOpenJoin: () => void;
}

const photos = [
  {
    src: '/assets/img/hero-reseau.jpg',
    alt: 'Photo de famille des membres du Réseau Voix EssentiELLES Bénin',
    titre: 'Les voix du réseau réunies',
    position: 'center 35%',
  },
  {
    src: '/assets/img/atelier-ecriture.jpg',
    alt: 'Deux participantes travaillent ensemble autour d’une table',
    titre: 'Des échanges qui font avancer le réseau',
    position: 'center 43%',
  },
  {
    src: '/assets/img/pleniere-parakou.jpg',
    alt: 'Deux participantes prennent part à une rencontre du réseau',
    titre: 'Une parole portée collectivement',
    position: 'center 42%',
  },
] as const;

/** Les photos défilent ; le texte reste sous les visages. */
export const Hero: React.FC<HeroProps> = ({ onDiscoverClick, onActionsClick, onOpenJoin }) => {
  const sectionRef = useRef<HTMLElement>(null);
  useGsapIcons(sectionRef);
  const mouvementReduit = useReducedMotion();
  const [photoActive, setPhotoActive] = useState(0);
  const [pauseManuelle, setPauseManuelle] = useState(false);
  const [interaction, setInteraction] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const photo = photos[photoActive];

  useEffect(() => {
    // Les autres photos sont chargées après la photo de famille pour éviter
    // qu’un réseau lent laisse apparaître le fond pendant la transition.
    photos.slice(1).forEach(({ src }) => { const image = new Image(); image.src = src; });
  }, []);

  useEffect(() => {
    const suivreVisibilite = () => setPageVisible(document.visibilityState === 'visible');
    suivreVisibilite();
    document.addEventListener('visibilitychange', suivreVisibilite);
    return () => document.removeEventListener('visibilitychange', suivreVisibilite);
  }, []);

  useEffect(() => {
    if (mouvementReduit || pauseManuelle || interaction || !pageVisible) return;
    const minuterie = window.setTimeout(() => setPhotoActive((index) => (index + 1) % photos.length), 5500);
    return () => window.clearTimeout(minuterie);
  }, [photoActive, mouvementReduit, pauseManuelle, interaction, pageVisible]);

  const avancer = (sens: -1 | 1) => {
    setPhotoActive((index) => (index + sens + photos.length) % photos.length);
  };

  return (
    <section ref={sectionRef} className="bg-surface">
      <div
        className="relative mt-20 overflow-hidden bg-rve-green-deep sm:mt-24"
        role="region"
        aria-roledescription="carrousel"
        aria-label="Photos du Réseau Voix EssentiELLES Bénin"
      >
        <div className="relative h-[42vw] min-h-[250px] max-h-[590px] w-full overflow-hidden sm:h-[43vw]">
          <AnimatePresence initial={false} mode="sync">
            <motion.img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: photo.position }}
              initial={mouvementReduit ? false : { opacity: 0, x: 24, scale: 1.035 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={mouvementReduit ? undefined : { opacity: 0, x: -24, scale: 1.015 }}
              transition={{ duration: mouvementReduit ? 0 : 0.25, ease: [0.2, 0, 0, 1] }}
              fetchPriority={photoActive === 0 ? 'high' : 'auto'}
            />
          </AnimatePresence>
          <div
            className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 bg-rve-green-deep/90 p-1 text-white sm:bottom-6 sm:right-6"
            aria-label="Commandes du carrousel"
            onMouseEnter={() => setInteraction(true)}
            onMouseLeave={() => setInteraction(false)}
            onFocusCapture={() => setInteraction(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setInteraction(false);
            }}
          >
            <button type="button" onClick={() => avancer(-1)} aria-label="Photo précédente" className="flex h-9 w-9 cursor-pointer items-center justify-center transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <span className="min-w-10 text-center text-xs font-bold tabular-nums" aria-live="off">{photoActive + 1} / {photos.length}</span>
            <button type="button" onClick={() => avancer(1)} aria-label="Photo suivante" className="flex h-9 w-9 cursor-pointer items-center justify-center transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            {!mouvementReduit && <button type="button" onClick={() => setPauseManuelle((pause) => !pause)} aria-label={pauseManuelle ? 'Reprendre le défilement' : 'Mettre le défilement en pause'} className="flex h-9 w-9 cursor-pointer items-center justify-center transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              {pauseManuelle ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
            </button>}
          </div>
        </div>
        <div className="bg-rve-green px-6 py-7 text-white sm:px-8 lg:px-10">
          <motion.div
            className="mx-auto flex max-w-[1240px] flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
            variants={{ cache: {}, visible: { transition: { delayChildren: 0.12, staggerChildren: cadence.normal } } }}
            initial={mouvementReduit ? false : 'cache'}
            animate="visible"
          >
            <div className="max-w-[740px]">
              <motion.p variants={arriveeHero} className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-white/80">Réseau Voix EssentiELLES Bénin <span className="mx-1 opacity-60" aria-hidden="true">·</span> {photo.titre}</motion.p>
              <motion.h1 variants={arriveeHero} className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold leading-[1.12] tracking-tight">
                Des voix de femmes pour un Bénin plus inclusif
              </motion.h1>
              <motion.p variants={arriveeHero} className="mt-3 max-w-[62ch] text-sm leading-relaxed text-white/90 sm:text-base">
                Neuf organisations féminines unissent leurs actions pour les droits, la santé, le leadership et l’autonomie des femmes et des filles.
              </motion.p>
            </div>
            <motion.div variants={arriveeHero} className="flex shrink-0 flex-wrap items-center gap-3">
              <button onClick={onDiscoverClick} data-gsap-glow="var(--color-rve-yellow)" className="rve-gsap-icon group inline-flex cursor-pointer items-center gap-2 bg-rve-yellow px-5 py-3 text-sm font-bold text-rve-green-deep transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-white">
                Découvrir le réseau <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button onClick={onActionsClick} className="cursor-pointer px-2 py-3 text-sm font-bold text-white underline decoration-white/60 underline-offset-4 hover:decoration-white">
                Voir nos actions
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="bg-surface-honey">
        <div className="mx-auto max-w-[1240px] px-6 py-10 sm:px-8 lg:px-10">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4">
            {[
              ['9', 'Organisations membres', 'OSC féminines fédérées', 'text-rve-red-ink'],
              ['6', 'Domaines d’intervention', 'Droits, santé, climat, leadership', 'text-rve-green-deep'],
              ['2025', 'Année de création', 'Naissance de la coalition', 'text-rve-yellow-ink'],
              ['1', 'Voix collective', 'Un plaidoyer porté ensemble', 'text-rve-red-ink'],
            ].map(([figure, label, detail, couleur]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className={`block font-display text-4xl font-extrabold tabular-nums leading-none ${couleur}`}>
                    <Compteur valeur={Number(figure)} />
                  </span>
                  <span className="mt-2 block text-sm font-bold text-ink">{label}</span>
                  <span className="mt-0.5 block text-[0.8125rem] text-ink-muted">{detail}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-ink-soft">Avec le soutien de <strong className="text-ink">Speak Up Africa</strong></p>
            <button onClick={onOpenJoin} className="cursor-pointer text-sm font-bold text-rve-green-ink underline underline-offset-4 hover:text-rve-green">
              Découvrir comment adhérer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
