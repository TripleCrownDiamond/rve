import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { duree, ease, pression } from '../motion';
import { Pastille } from './Points';
import { Compteur, Parallaxe } from './Motion';
import { ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface HeroProps {
  onDiscoverClick: () => void;
  onActionsClick: () => void;
  onOpenJoin: () => void;
}

/**
 * Hero — slider. Un seul slide aujourd'hui, la structure en attend d'autres.
 *
 * Le tableau `SLIDES` est la seule source : y ajouter une entrée suffit à
 * faire apparaître la navigation, la rotation automatique et le compteur.
 * Avec un slide unique, aucun de ces contrôles ne s'affiche — une pagination
 * à une seule puce et des flèches inertes seraient du décor. C'est aussi la
 * forme qu'un champ répétable de CMS alimentera directement.
 *
 * La photographie retenue montre une membre du réseau au micro en séance
 * plénière : c'est l'image la plus proche du nom même du réseau. Le voile
 * est directionnel (dense à gauche, nul à droite) pour dégager une zone de
 * texte sans assombrir les visages, conformément à la charte §04 qui impose
 * un voile d'au moins 40 % dès qu'un texte se pose sur une photographie.
 */

interface Slide {
  id: string;
  image: string;
  /** Cadrage de l'image : garde les visages hors de la zone de texte. */
  cadrage: string;
  titre: string;
  /** Contraint la coupure du titre sans forcer de retour à la ligne. */
  largeurTitre: string;
  amorce: string;
}

const SLIDES: Slide[] = [
  {
    id: 'pleniere',
    image: '/assets/img/pleniere-parakou.jpg',
    cadrage: '62% 42%',
    titre: 'Des voix de femmes pour un Bénin plus inclusif',
    largeurTitre: '11em',
    amorce:
      'Le Réseau Voix EssentiELLES Bénin fédère neuf organisations féminines de la société civile autour des droits, de la santé, du leadership et de l’autonomisation des femmes et des filles.',
  },
  {
    id: 'atelier',
    image: '/assets/img/atelier-ecriture.jpg',
    cadrage: '50% 38%',
    titre: 'Une position se prépare avant de se porter',
    largeurTitre: '13em',
    amorce:
      'Ateliers, concertations et travaux de plaidoyer : les organisations membres construisent ensemble les positions que le réseau défend ensuite auprès des institutions.',
  },
];

/** Durée d'affichage d'un slide avant passage au suivant. */
const ROTATION_MS = 7000;

export const Hero: React.FC<HeroProps> = ({
  onDiscoverClick,
  onActionsClick,
  onOpenJoin,
}) => {
  const mouvementReduit = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [enPause, setEnPause] = useState(false);
  const minuteur = useRef<number | null>(null);

  const plusieurs = SLIDES.length > 1;
  const slide = SLIDES[index];

  const aller = useCallback((n: number) => {
    setIndex((i) => (n + SLIDES.length) % SLIDES.length);
  }, []);

  // Rotation automatique. Suspendue au survol et au focus clavier, et
  // jamais lancée si le système demande de réduire les animations : un
  // carrousel qui avance seul déplace une cible de lecture.
  useEffect(() => {
    if (!plusieurs || enPause || mouvementReduit) return;
    minuteur.current = window.setTimeout(
      () => aller(index + 1),
      ROTATION_MS,
    );
    return () => {
      if (minuteur.current) window.clearTimeout(minuteur.current);
    };
  }, [index, enPause, plusieurs, mouvementReduit, aller]);

  const auClavier = (e: React.KeyboardEvent) => {
    if (!plusieurs) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      aller(index - 1);
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      aller(index + 1);
    }
  };

  // Un seul enchaînement, rejoué à chaque changement de slide. Chaque
  // battement tient dans le plafond de la charte (§44 : 150 à 250 ms) ;
  // c'est le décalage entre eux, non leur durée, qui donne la séquence.
  const sequence = !mouvementReduit;
  const battement = {
    cache: { opacity: 0, y: 14 },
    vu: {
      opacity: 1,
      y: 0,
      transition: { duration: duree.entree, ease: ease.sortie },
    },
  };

  return (
    <section className="w-full">
      {/* ---------- Slider ---------- */}
      <div
        className="relative flex min-h-[88vh] items-center overflow-hidden bg-night-deep"
        role={plusieurs ? 'region' : undefined}
        aria-roledescription={plusieurs ? 'carrousel' : undefined}
        aria-label={plusieurs ? 'Mises en avant du réseau' : undefined}
        tabIndex={plusieurs ? 0 : undefined}
        onKeyDown={auClavier}
        onMouseEnter={() => setEnPause(true)}
        onMouseLeave={() => setEnPause(false)}
        onFocusCapture={() => setEnPause(true)}
        onBlurCapture={() => setEnPause(false)}
      >
        {/* Image : fondu simple d'un slide à l'autre. Aucun glissement —
            un déplacement horizontal sous un texte fixe désoriente plus
            qu'il n'informe. */}
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            aria-hidden="true"
            initial={mouvementReduit ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duree.entree, ease: ease.sortie }}
          >
            {/* La photographie descend plus lentement que la page : le
                texte se détache du fond sans que l'image ne s'en décolle. */}
            <Parallaxe amplitude={38} className="absolute inset-0 overflow-hidden">
              <img
                src={slide.image}
                alt=""
                className="h-[118%] w-full object-cover"
                style={{ objectPosition: slide.cadrage }}
                fetchPriority={index === 0 ? 'high' : 'auto'}
              />
            </Parallaxe>
            {/* Voile. Sur grand écran il est directionnel : dense à gauche
                sous le texte, nul à droite pour dégager les visages. Sur
                mobile la colonne de texte couvre toute la largeur, il n'y a
                plus de côté à préserver : le voile devient uniforme pour
                tenir les 40 % minimum qu'impose §04 partout où du texte se
                pose sur une photographie. */}
            <div className="absolute inset-0 bg-night-deep/70 lg:hidden" />
            <div className="absolute inset-0 hidden bg-gradient-to-r from-night-deep via-night-deep/75 to-transparent lg:block" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night-deep/80 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 py-24 sm:px-8 lg:px-10">
          <motion.div
            key={slide.id}
            className="max-w-2xl"
            initial={sequence ? 'cache' : false}
            animate={sequence ? 'vu' : undefined}
            variants={{
              cache: {},
              vu: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
            }}
          >
            <motion.h1
              variants={battement}
              style={{ maxWidth: slide.largeurTitre }}
              className="font-display text-[clamp(2.5rem,5.8vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight text-white"
            >
              {slide.titre}
            </motion.h1>

            {/* Le filet tricolore du logotype, repris tel quel : vert, jaune,
                rouge, dans l'ordre qu'il a sous le mot « Essentielles ». */}
            <motion.div
              variants={battement}
              className="mt-8 flex h-1.5 w-32 overflow-hidden rounded-full"
              aria-hidden="true"
            >
              <span className="flex-1 bg-rve-green" />
              <span className="flex-1 bg-rve-yellow" />
              <span className="flex-1 bg-rve-red" />
            </motion.div>

            <motion.p
              variants={battement}
              className="mt-8 max-w-xl text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-relaxed text-white/85"
            >
              {slide.amorce}
            </motion.p>

            <motion.div
              variants={battement}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <motion.button
                onClick={onDiscoverClick}
                whileTap={pression}
                transition={{ duration: duree.micro, ease: ease.sortie }}
                className="group flex cursor-pointer items-center gap-2.5 rounded-bouton bg-rve-green px-6 py-3.5 text-[1.1875rem] font-bold text-white shadow-lg shadow-black/25 transition-colors duration-150 hover:bg-rve-green-ink active:bg-rve-green-deep"
              >
                <span>Découvrir le réseau</span>
                <ArrowDown className="h-[1.125rem] w-[1.125rem] transition-transform duration-150 group-hover:translate-y-0.5" />
              </motion.button>

              <motion.button
                onClick={onActionsClick}
                whileTap={pression}
                transition={{ duration: duree.micro, ease: ease.sortie }}
                className="group flex cursor-pointer items-center gap-2 rounded-bouton border-[1.5px] border-white/40 px-6 py-3.5 text-[1.1875rem] font-bold text-white transition-colors duration-150 hover:bg-white/15"
              >
                <span>Voir nos actions</span>
                <ArrowRight className="h-[1.125rem] w-[1.125rem] transition-transform duration-150 group-hover:translate-x-0.5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Contrôles — n'existent qu'à partir de deux slides.

            La pagination montre la photographie de chaque slide en miniature
            plutôt qu'une puce abstraite : on sait ainsi vers quoi on va, et
            non simplement qu'il existe un ailleurs. */}
        {plusieurs && (
          <div className="absolute inset-x-0 bottom-7 z-20 mx-auto flex w-full max-w-[1240px] flex-wrap items-end justify-between gap-5 px-6 sm:px-8 lg:px-10">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => aller(index - 1)}
                aria-label="Slide précédent"
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-bouton border-[1.5px] border-white/45 text-white backdrop-blur-sm transition-colors duration-150 hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => aller(index + 1)}
                aria-label="Slide suivant"
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-bouton border-[1.5px] border-white/45 text-white backdrop-blur-sm transition-colors duration-150 hover:bg-white/20"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <ol className="flex items-center gap-3">
              {SLIDES.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => aller(i)}
                    aria-label={`Aller au slide ${i + 1} sur ${SLIDES.length} : ${s.titre}`}
                    aria-current={i === index ? 'true' : undefined}
                    className={`group block cursor-pointer overflow-hidden rounded-carte transition-[box-shadow,opacity,transform] duration-200 ease-[cubic-bezier(0.2,0,0,1)] ${
                      i === index
                        ? 'opacity-100 shadow-[0_0_0_2.5px_var(--color-rve-yellow)]'
                        : 'opacity-60 shadow-[0_0_0_1.5px_rgba(255,255,255,0.5)] hover:-translate-y-0.5 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={s.image}
                      alt=""
                      width={84}
                      height={54}
                      loading="lazy"
                      className="h-[2.75rem] w-[4.25rem] object-cover sm:h-[3.375rem] sm:w-[5.25rem]"
                      style={{ objectPosition: s.cadrage }}
                    />
                  </button>
                </li>
              ))}
            </ol>

            {/* Le changement de slide est annoncé sans voler le focus. */}
            <p className="sr-only" aria-live="polite">
              {`Slide ${index + 1} sur ${SLIDES.length} : ${slide.titre}`}
            </p>
          </div>
        )}
      </div>

      {/* ---------- Repères, sur fond plein ---------- */}
      <div className="border-b border-line bg-surface-sunken">
        <div className="mx-auto w-full max-w-[1240px] px-6 py-10 sm:px-8 lg:px-10">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4">
            {[
              ['9', 'Organisations membres', 'OSC féminines fédérées', 'var(--color-rve-green)'],
              ['6', 'Domaines d’intervention', 'Droits, santé, climat, leadership', 'var(--color-rve-yellow)'],
              ['2025', 'Année de création', 'Naissance de la coalition', 'var(--color-rve-red)'],
              ['1', 'Voix collective', 'Un plaidoyer porté ensemble', 'var(--color-rve-lime)'],
            ].map(([figure, label, detail, couleur]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd>
                  <Pastille couleur={couleur} className="mb-3 h-2.5 w-2.5" />
                  <span className="block font-display text-4xl font-extrabold tabular-nums leading-none text-ink">
                    {/^\d+$/.test(figure) ? (
                      <Compteur valeur={Number(figure)} />
                    ) : (
                      figure
                    )}
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-ink">
                    {label}
                  </span>
                  <span className="mt-0.5 block text-[0.8125rem] text-ink-muted">
                    {detail}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-x-10 gap-y-5 border-t border-line pt-7">
            <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-3">
              {/* Pile horizontale de marques.

                  Le motif vient des files d'avatars : il fonctionne là-bas
                  parce qu'un visage reste reconnaissable à 40 px. Un logo,
                  surtout un logotype portant du texte, ne l'est pas. Une
                  première version à 44 px les réduisait à des taches.

                  Le recouvrement est serré : chaque pastille mord largement
                  sur la précédente, ce qui donne la lecture d'une pile et non
                  d'une rangée espacée. C'est le liseré blanc qui rend
                  l'empilement lisible — il trace le bord du disque du dessus
                  sur celui du dessous. L'ordre est inversé pour que la
                  première du rang passe devant, et non derrière. */}
              <ul
                className="flex items-center"
                aria-label="Quelques organisations membres du réseau"
              >
                {[
                  ['fjad.jpg', 'FJAD'],
                  ['fran.jpg', 'Fondation Reine Adjignon Natabou'],
                  ['fadec.jpg', 'FADeC'],
                  ['wopas.png', 'Women and Power Association'],
                  ['gjfa.jpg', 'GJFA'],
                ].map(([file, name], i) => (
                  <li
                    key={file}
                    className="relative -ml-3 first:ml-0"
                    style={{ zIndex: 10 - i }}
                  >
                    <img
                      src={`/assets/logos/${file}`}
                      alt={name}
                      width={36}
                      height={36}
                      loading="lazy"
                      title={name}
                      className="block h-9 w-9 rounded-full border border-line bg-surface object-contain p-0.5 ring-[2.5px] ring-white transition-transform duration-150 hover:-translate-y-1"
                    />
                  </li>
                ))}
              </ul>
              <p className="text-[0.9375rem] text-ink-soft">
                Soutenu par{' '}
                <span className="font-semibold text-ink">Speak Up Africa</span>
              </p>
            </div>

            <button
              onClick={onOpenJoin}
              className="cursor-pointer text-[0.9375rem] font-semibold text-rve-green-ink underline decoration-rve-green/40 underline-offset-4 transition-colors hover:text-rve-green hover:decoration-rve-green"
            >
              Découvrir comment adhérer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
