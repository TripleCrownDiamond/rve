import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { cadence, duree, ease } from '../motion';
import { useGsapIcons } from '../hooks/useGsapIcons';
import { useContenu } from '../data/contenu';
import { Lien } from '../router';

const arriveeHero = {
  cache: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: duree.entree, ease: ease.sortie } },
};

interface HeroProps {
  onDiscoverClick: () => void;
  onOpenContact: (sujet?: string) => void;
}

/**
 * Bandeau d'ouverture.
 *
 * Trois partis pris, demandés par le réseau après la première proposition :
 *
 *  · Aucun voile sur la photographie. Le texte vit dans un aplat posé
 *    dessous, pas par-dessus les visages. C'est aussi ce qu'impose la charte
 *    (§11 : les femmes au premier plan, jamais en décor) : une photo lisible
 *    vaut mieux qu'une photo assombrie pour faire passer du texte.
 *
 *  · Peu de mots. Une ligne de contexte, un titre, une phrase. Le reste du
 *    site est là pour le détail.
 *
 *  · Un enchaînement en fondu, sans glissement. Un carrousel qui déplace ses
 *    images attire l'œil sur le mouvement ; ici l'image doit simplement
 *    remplacer la précédente sans qu'on s'en aperçoive.
 */
export const Hero: React.FC<HeroProps> = ({ onDiscoverClick, onOpenContact }) => {
  const sectionRef = useRef<HTMLElement>(null);
  useGsapIcons(sectionRef);
  const mouvementReduit = useReducedMotion();
  const diapositives = useContenu('diapositives');
  const [index, setIndex] = useState(0);
  const [pauseManuelle, setPauseManuelle] = useState(false);
  const [interaction, setInteraction] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const vue = diapositives[Math.min(index, diapositives.length - 1)];

  useEffect(() => {
    // Seule la vue suivante est préchargée.
    //
    // Les six l'étaient d'un bloc au chargement de la page : environ 1,7 Mo
    // avant que le visiteur ait fait quoi que ce soit, sur un site consulté
    // en grande partie depuis des téléphones sur réseau mobile. Charger la
    // suivante suffit à ce que le fondu ne tombe jamais sur une image vide,
    // puisqu'il reste six secondes pour l'obtenir.
    const suivante = diapositives[(index + 1) % diapositives.length];
    if (!suivante) return;
    const i = new Image();
    i.src = suivante.image;
  }, [index, diapositives]);

  useEffect(() => {
    const suivre = () => setPageVisible(document.visibilityState === 'visible');
    suivre();
    document.addEventListener('visibilitychange', suivre);
    return () => document.removeEventListener('visibilitychange', suivre);
  }, []);

  useEffect(() => {
    if (mouvementReduit || pauseManuelle || interaction || !pageVisible) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % diapositives.length), 6000);
    return () => window.clearTimeout(t);
  }, [index, mouvementReduit, pauseManuelle, interaction, pageVisible, diapositives.length]);

  const avancer = (sens: -1 | 1) =>
    setIndex((i) => (i + sens + diapositives.length) % diapositives.length);

  const commandes =
    'flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-bouton text-ink-soft transition-colors duration-150 hover:bg-rve-green hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rve-green';

  return (
    <section ref={sectionRef} className="bg-surface">
      <div
        className="relative mt-[82px] bg-surface-sunken"
        role="region"
        aria-roledescription="carrousel"
        aria-label="Photographies du Réseau Voix EssentiELLES Bénin"
      >
        <div className="relative aspect-[16/9] max-h-[600px] w-full overflow-hidden">
          <AnimatePresence initial={false} mode="sync">
            <motion.img
              key={vue.image}
              src={vue.image}
              alt={vue.titre}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: vue.cadrage }}
              initial={mouvementReduit ? false : { opacity: 0 }}
              animate={
                mouvementReduit
                  ? { opacity: 1 }
                  : { opacity: 1, scale: [1.04, 1], transition: { opacity: { duration: 0.4, ease: 'linear' }, scale: { duration: 6.4, ease: 'linear' } } }
              }
              exit={mouvementReduit ? undefined : { opacity: 0, transition: { duration: 0.4, ease: 'linear' } }}
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
          </AnimatePresence>
        </div>

        {/* Filet tricolore repris du logo : il sépare la photographie de
            l'aplat sans ajouter une bordure grise de plus. */}
        <div aria-hidden="true" className="flex h-1.5">
          <span className="w-1/2 bg-rve-green" />
          <span className="w-1/4 bg-rve-yellow" />
          <span className="w-1/4 bg-rve-red" />
        </div>

        <div className="bg-rve-green px-6 py-7 text-white sm:px-8 lg:px-10">
          <motion.div
            className="mx-auto flex max-w-[1240px] flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
            variants={{ cache: {}, visible: { transition: { delayChildren: 0.12, staggerChildren: cadence.normal } } }}
            initial={mouvementReduit ? false : 'cache'}
            animate="visible"
          >
            <div className="max-w-[720px]">
              <motion.p variants={arriveeHero} className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-rve-yellow">
                {vue.mention}
              </motion.p>
              <motion.h1 variants={arriveeHero} className="font-display text-[clamp(1.9rem,3.6vw,3.1rem)] font-extrabold leading-[1.1] tracking-tight">
                Porter les voix des femmes et des filles
              </motion.h1>
              <motion.p variants={arriveeHero} className="mt-3 max-w-[56ch] text-sm leading-relaxed text-white/90 sm:text-base">
                Des organisations féminines béninoises réunies en réseau pour les droits, la santé, le leadership et l’autonomisation des femmes, des filles et des enfants.
              </motion.p>
            </div>
            <motion.div variants={arriveeHero} className="flex w-full shrink-0 flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
              <button onClick={onDiscoverClick} data-gsap-glow="var(--color-rve-yellow)" className="rve-gsap-icon group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-bouton bg-rve-yellow px-5 py-3 text-sm font-bold text-rve-green-deep sm:w-auto transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-white">
                Découvrir le réseau <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <Lien vers="/don" className="inline-flex w-full items-center justify-center rounded-bouton border-2 border-white/70 px-5 py-[0.6875rem] text-sm font-bold text-white sm:w-auto transition-colors duration-150 hover:bg-white hover:text-rve-green-ink">
                Faire un don
              </Lien>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Pagination par vignettes, sous l'aplat : au-dessus de la photo elle
          recouvrirait les visages, ce que tout le reste du bandeau évite. */}
      <div className="border-b border-line-soft bg-white">
        <div
          className="mx-auto flex max-w-[1240px] items-center gap-3 px-6 py-3 sm:px-8 lg:px-10"
          onMouseEnter={() => setInteraction(true)}
          onMouseLeave={() => setInteraction(false)}
          onFocusCapture={() => setInteraction(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setInteraction(false);
          }}
        >
          <button type="button" onClick={() => avancer(-1)} aria-label="Photographie précédente" className={commandes}>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <ul className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto" aria-label="Choisir une photographie">
            {diapositives.map((d, i) => (
              <li key={d.id}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={d.titre}
                  aria-current={i === index ? 'true' : undefined}
                  className={`block h-11 w-[4.5rem] shrink-0 cursor-pointer overflow-hidden rounded-[4px] border-2 transition-[border-color,opacity] duration-150 sm:h-12 sm:w-20 ${
                    i === index
                      ? 'border-rve-green opacity-100'
                      : 'border-transparent opacity-55 hover:opacity-100'
                  }`}
                >
                  <img src={d.vignette ?? d.image} alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: d.cadrage }} />
                </button>
              </li>
            ))}
          </ul>

          <span className="shrink-0 text-xs font-bold tabular-nums text-ink-muted" aria-live="off">
            {index + 1} / {diapositives.length}
          </span>
          <button type="button" onClick={() => avancer(1)} aria-label="Photographie suivante" className={commandes}>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
          {!mouvementReduit && (
            <button type="button" onClick={() => setPauseManuelle((p) => !p)} aria-label={pauseManuelle ? 'Reprendre le défilement' : 'Mettre le défilement en pause'} className={commandes}>
              {pauseManuelle ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
            </button>
          )}
        </div>
      </div>

      <div className="bg-surface-honey">
        <div className="mx-auto max-w-[1240px] px-6 py-10 sm:px-8 lg:px-10">
          {/* Cette bande comptait les membres, les domaines et les organes.
              Le réseau ne souhaite pas chiffrer ce qui peut grandir : elle
              nomme désormais, au lieu de compter. Le filet coloré en tête de
              chaque entrée garde le rythme que les chiffres donnaient. */}
          <dl className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4">
            {[
              ['Organisations membres', 'Organisations féminines de la société civile béninoise', 'bg-rve-red'],
              ['Domaines d’intervention', 'Genre, santé, climat, éducation, économie, recherche', 'bg-rve-green'],
              ['Organes de gouvernance', 'Assemblée, Conseil, Surveillance, Secrétariat', 'bg-rve-yellow'],
              ['Réseau d’associations', 'Constitué sous le régime de la loi du 1ᵉʳ juillet 1901', 'bg-rve-red'],
            ].map(([label, detail, teinte]) => (
              <div key={label}>
                <dt className="font-display text-base font-bold leading-snug text-ink">
                  <span aria-hidden="true" className={`mb-3 block h-1.5 w-10 rounded-full ${teinte}`} />
                  {label}
                </dt>
                <dd className="mt-1 text-[0.8125rem] leading-relaxed text-ink-muted">{detail}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-rve-yellow-ink/20 pt-6">
            <p className="text-sm text-ink-soft">
              Avec le soutien de <strong className="text-ink">Speak Up Africa</strong>
            </p>
            <button onClick={() => onOpenContact('Collaboration')} className="cursor-pointer text-sm font-bold text-rve-green-ink underline underline-offset-4 hover:text-rve-green">
              Contacter le réseau
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
