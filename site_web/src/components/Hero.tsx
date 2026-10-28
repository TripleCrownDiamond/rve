import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Compteur } from './Motion';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onDiscoverClick: () => void;
  onActionsClick: () => void;
  onOpenJoin: () => void;
}

/** La photo collective ouvre la page ; le texte se place sous les visages. */
export const Hero: React.FC<HeroProps> = ({ onDiscoverClick, onActionsClick, onOpenJoin }) => {
  const mouvementReduit = useReducedMotion();

  return (
    <section className="bg-surface">
      <div className="relative mt-20 overflow-hidden bg-rve-green-deep sm:mt-24">
        <div className="relative h-[42vw] min-h-[250px] max-h-[590px] w-full overflow-hidden sm:h-[43vw]">
          <motion.img
            src="/assets/img/hero-reseau.jpg"
            alt="Photo collective des membres du Réseau Voix EssentiELLES Bénin"
            className="h-full w-full object-cover object-[center_35%]"
            initial={mouvementReduit ? false : { scale: 1.035, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.2, 0, 0, 1] }}
            fetchPriority="high"
          />
        </div>
        <div className="bg-rve-green px-6 py-7 text-white sm:px-8 lg:px-10">
          <motion.div
            className="mx-auto flex max-w-[1240px] flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
            initial={mouvementReduit ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            <div className="max-w-[740px]">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-white/80">Réseau Voix EssentiELLES Bénin</p>
              <h1 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold leading-[1.12] tracking-tight">
                Des voix de femmes pour un Bénin plus inclusif
              </h1>
              <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-white/90 sm:text-base">
                Neuf organisations féminines unissent leurs actions pour les droits, la santé, le leadership et l’autonomie des femmes et des filles.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <button onClick={onDiscoverClick} className="inline-flex cursor-pointer items-center gap-2 bg-rve-yellow px-5 py-3 text-sm font-bold text-rve-green-deep transition-colors hover:bg-white">
                Découvrir le réseau <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button onClick={onActionsClick} className="cursor-pointer px-2 py-3 text-sm font-bold text-white underline decoration-white/60 underline-offset-4 hover:decoration-white">
                Voir nos actions
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-surface-rest">
        <div className="mx-auto max-w-[1240px] px-6 py-10 sm:px-8 lg:px-10">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4">
            {[
              ['9', 'Organisations membres', 'OSC féminines fédérées'],
              ['6', 'Domaines d’intervention', 'Droits, santé, climat, leadership'],
              ['2025', 'Année de création', 'Naissance de la coalition'],
              ['1', 'Voix collective', 'Un plaidoyer porté ensemble'],
            ].map(([figure, label, detail]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="block font-display text-4xl font-extrabold tabular-nums leading-none text-rve-green-deep">
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
