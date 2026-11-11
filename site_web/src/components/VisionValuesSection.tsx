import React from 'react';
import { Flottante, Tache } from './Decor';
import { 
  Scale, 
  Crown, 
  Heart, 
  Lightbulb, 
  Handshake, 
  Eye, 
  Quote 
} from 'lucide-react';

export const VALUES = [
  {
    id: 'equite',
    title: 'Équité',
    desc: 'Garantir une égalité réelle des chances et un traitement juste pour chaque femme, adolescente et fille, sans discrimination sociale, géographique ou économique.',
    icon: <Scale className="w-5 h-5 text-rve-green" />,
    accent: 'var(--color-rve-green)',
  },
  {
    id: 'leadership',
    title: 'Leadership féminin',
    desc: 'Valoriser l’audace, l’expertise et la capacité d’influence des femmes béninoises dans les instances décisionnelles politiques, économiques et communautaires.',
    icon: <Crown className="w-5 h-5 text-rve-yellow" />,
    accent: 'var(--color-rve-yellow)',
  },
  {
    id: 'sororite',
    title: 'Solidarité et sororité',
    desc: 'Cultiver l’entraide inconditionnelle, l’écoute bienveillante et l’union fraternelle entre toutes les organisations membres pour décupler notre résonance.',
    icon: <Heart className="w-5 h-5 text-rve-red" />,
    accent: 'var(--color-rve-red)',
  },
  {
    id: 'innovation',
    title: 'Innovation et excellence',
    desc: 'Adopter des approches créatives, s’appuyer sur la rigueur méthodologique, les données probantes et viser l’impact mesurable le plus élevé.',
    icon: <Lightbulb className="w-5 h-5 text-rve-green" />,
    accent: 'var(--color-rve-green)',
  },
  {
    id: 'partenariat',
    title: 'Partenariat et collaboration',
    desc: 'Bâtir des alliances constructives avec l’État, les partenaires techniques et financiers, le secteur privé et la société civile internationale.',
    icon: <Handshake className="w-5 h-5 text-rve-yellow" />,
    accent: 'var(--color-rve-yellow)',
  },
  {
    id: 'redevabilite',
    title: 'Redevabilité et transparence',
    desc: 'Incarner une gouvernance exemplaire, rendre compte avec clarté à nos communautés bénéficiaires et honorer les engagements pris envers nos partenaires.',
    icon: <Eye className="w-5 h-5 text-ink" />,
    accent: 'var(--color-ink)',
  },
];

export const VisionValuesSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-surface py-20 lg:py-28">
      <div className="relative mx-auto max-w-[1240px] px-6 sm:px-8">
        <Flottante derive={15} duree={21} rotation={5} className="pointer-events-none absolute -right-20 top-28">
          <Tache couleur="var(--color-rve-red)" className="h-56 w-56 opacity-[0.07]" />
        </Flottante>

        {/* Top Narrative: The Vision as an Institutional Manifesto */}
        <div className="rounded-3xl bg-surface-raised border border-line p-8 sm:p-12 lg:p-16 mb-20 relative overflow-hidden">
          {/* Subtle watermark quote icon */}
          <div className="absolute right-6 -bottom-6 opacity-5 pointer-events-none">
            <Quote className="w-64 h-64 text-ink" />
          </div>

          <div className="max-w-3xl relative z-10">
            <div className="flex items-center gap-2 text-xs font-semibold text-rve-green tracking-wider uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-rve-green" />
              <span>La vision du réseau</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight leading-tight mb-6">
              « Un Bénin où toutes les femmes et les filles jouissent pleinement de leurs droits, accèdent équitablement à la santé, à l’éducation et aux opportunités de développement, et participent pleinement aux décisions qui façonnent leur vie et leur communauté. »
            </h2>

            <p className="pt-6 border-t border-line text-xs sm:text-sm text-ink-soft font-medium">
              Cette vision guide les actions et le plaidoyer du RVE-Bénin.
            </p>
          </div>
        </div>

        {/* Section Heading for Core Values */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-rve-green tracking-wider uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-rve-green" />
            <span>Nos Principes Directeurs</span>
          </div>
          <h3 className="text-3xl font-extrabold text-ink tracking-tight">
            Les 6 valeurs cardinales du réseau
          </h3>
          <p className="mt-3 text-base text-ink-soft">
            Elles cimentent notre cohésion interne et guident chacune de nos prises de parole auprès des citoyens et des gouvernants.
          </p>
        </div>

        {/* Les six valeurs de l'article 8.
            Elles portaient un repère « VALEUR 01 » à « 06 ». Numéroter n'a de
            sens que pour une séquence ; six valeurs n'en sont pas une, et le
            repère laissait croire à un ordre d'importance. Il est remplacé
            par un bandeau de couleur, qui distingue sans classer. */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {VALUES.map((val, idx) => {
            const teinte = ['bg-rve-green', 'bg-rve-yellow', 'bg-rve-red'][idx % 3];
            return (
              <div
                key={val.id}
                data-scroll="up"
                className="group overflow-hidden rounded-2xl border border-line/80 bg-surface-raised transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-line hover:shadow-md"
              >
                <span className={`block h-1.5 w-full ${teinte}`} aria-hidden="true" />
                <div className="p-7">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-line/80 bg-white shadow-2xs transition-transform duration-200 group-hover:scale-110">
                    {val.icon}
                  </div>
                  <h4 className="mb-2.5 text-lg font-bold text-ink">{val.title}</h4>
                  <p className="text-sm leading-relaxed text-ink-soft">{val.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
