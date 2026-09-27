import React from 'react';
import { HeroBackground } from './HeroBackground.tsx';
import { ArrowDown, ArrowRight } from 'lucide-react';

interface HeroProps {
  onDiscoverClick: () => void;
  onActionsClick: () => void;
  onOpenJoin: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onDiscoverClick,
  onActionsClick,
  onOpenJoin,
}) => {
  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-[96vh] flex items-center pt-28 pb-16 lg:py-36 overflow-hidden bg-night-deep">
      {/* 1. Full-width background image & overlay scrims */}
      <HeroBackground />

      {/* 2. Centered content container with strict margins (max-w-[1240px], 32px desktop padding, 20-24px mobile) */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-10 flex flex-col justify-center">
        {/* Unified vertical axis alignment for all hero content */}
        <div className="max-w-3xl flex flex-col items-start text-left">
          {/* Eyebrow / petit label (unboxed clean typography with subtle color dot) */}
          <div className="inline-flex items-center gap-2.5 mb-5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-rve-lime">
            <span className="w-2 h-2 rounded-full bg-rve-green ring-4 ring-rve-green/20" />
            <span>Réseau Voix EssentiELLES Bénin</span>
            <span className="text-white/40 font-normal">|</span>
            <span className="text-rve-yellow font-medium normal-case tracking-normal">Coalition Nationale des OSC Féminines</span>
          </div>

          {/* Titre principal (H1) - strong, memorable, 2-3 lines max */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6"
            style={{ textWrap: 'balance' }}
          >
            Des voix de femmes pour un{' '}
            <span className="text-rve-lime">Bénin plus inclusif</span>
          </h1>

          {/* Texte d'introduction - clear, 2-4 lines, high legibility */}
          <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-normal mb-8 max-w-2xl">
            Le Réseau Voix EssentiELLES Bénin fédère neuf organisations féminines de la société civile autour des droits, de la santé, du leadership et de l’autonomisation des femmes et des filles.
          </p>

          {/* Boutons CTA: 1 primaire bien visible, 1 secondaire élégant */}
          <div className="flex flex-wrap items-center gap-4 mb-12 sm:mb-16">
            <button
              onClick={onDiscoverClick}
              className="px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-rve-green-ink hover:bg-rve-green active:bg-rve-green-deep rounded-xl transition-all shadow-lg shadow-rve-green/25 flex items-center gap-2.5 group cursor-pointer"
            >
              <span>Découvrir le réseau</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </button>

            <button
              onClick={onActionsClick}
              className="px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/15 active:bg-white/20 border border-white/25 rounded-xl transition-all backdrop-blur-sm flex items-center gap-2 group cursor-pointer"
            >
              <span>Nos actions</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Bloc stats: 4 métriques confirmées réunies dans une barre élégante et respirante */}
        <div className="w-full pt-8 border-t border-white/15">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {/* Stat 1 */}
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums">
                  9
                </span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-white/90 mt-1">
                Organisations membres

              </span>
              <span className="text-[11px] text-white/75 mt-0.5">
                OSC féminines fédérées
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums">
                  6
                </span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-white/90 mt-1">
                Domaines d’intervention
              </span>
              <span className="text-[11px] text-white/75 mt-0.5">
                Droits, santé, climat, leadership
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums">
                  2025
                </span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-white/90 mt-1">
                Année de création
              </span>
              <span className="text-[11px] text-white/75 mt-0.5">
                Impulsion historique
              </span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums">
                  3
                </span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-white/90 mt-1">
                Collèges d’action
              </span>
              <span className="text-[11px] text-white/75 mt-0.5">
                Santé, droits et inclusion
              </span>
            </div>
          </div>
        </div>

        {/* Social Proof: un réseau porté par des OSC engagées */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Avatars groupés des organisations membres */}
            <div className="flex -space-x-2 overflow-hidden" aria-label="Organisations membres du réseau">
              {[
                ['fjad.jpg', 'FJAD'],
                ['fran.jpg', 'Fondation Reine Adjignon Natabou'],
                ['fadec.jpg', 'FADeC'],
                ['wopas.png', 'Women and Power Association'],
                ['gjfa.jpg', 'GJFA'],
              ].map(([file, name]) => (
                <img
                  key={file}
                  src={`/assets/logos/${file}`}
                  alt={name}
                  className="inline-block h-9 w-9 rounded-full border-2 border-white bg-white object-contain"
                  loading="lazy"
                />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-white/90 font-medium">
              Un réseau de <span className="text-white font-semibold">9 organisations membres</span>, soutenu par <span className="text-rve-yellow font-semibold">Speak Up Africa</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenJoin}
              className="text-xs font-medium text-white/90 hover:text-white transition-colors underline decoration-white/30 underline-offset-4 cursor-pointer"
            >
              Découvrir comment adhérer à la dynamique &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
