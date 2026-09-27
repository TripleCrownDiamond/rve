import React from 'react';
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
    icon: <Scale className="w-5 h-5 text-[#109030]" />,
    accent: '#109030',
  },
  {
    id: 'leadership',
    title: 'Leadership féminin',
    desc: 'Valoriser l’audace, l’expertise et la capacité d’influence des femmes béninoises dans les instances décisionnelles politiques, économiques et communautaires.',
    icon: <Crown className="w-5 h-5 text-[#F8C000]" />,
    accent: '#F8C000',
  },
  {
    id: 'sororite',
    title: 'Solidarité & Sororité',
    desc: 'Cultiver l’entraide inconditionnelle, l’écoute bienveillante et l’union fraternelle entre toutes les organisations membres pour décupler notre résonance.',
    icon: <Heart className="w-5 h-5 text-[#E82830]" />,
    accent: '#E82830',
  },
  {
    id: 'innovation',
    title: 'Innovation & Excellence',
    desc: 'Adopter des approches créatives, s’appuyer sur la rigueur méthodologique, les données probantes et viser l’impact mesurable le plus élevé.',
    icon: <Lightbulb className="w-5 h-5 text-[#109030]" />,
    accent: '#109030',
  },
  {
    id: 'partenariat',
    title: 'Partenariat & Collaboration',
    desc: 'Bâtir des alliances constructives avec l’État, les partenaires techniques et financiers, le secteur privé et la société civile internationale.',
    icon: <Handshake className="w-5 h-5 text-[#F8C000]" />,
    accent: '#F8C000',
  },
  {
    id: 'redevabilite',
    title: 'Redevabilité & Transparence',
    desc: 'Incarner une gouvernance exemplaire, rendre compte avec clarté à nos communautés bénéficiaires et honorer les engagements pris envers nos partenaires.',
    icon: <Eye className="w-5 h-5 text-[#303030]" />,
    accent: '#303030',
  },
];

export const VisionValuesSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-stone-100">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        {/* Top Narrative: The Vision as an Institutional Manifesto */}
        <div className="rounded-3xl bg-[#FBF9F5] border border-[#EBE6DF] p-8 sm:p-12 lg:p-16 mb-20 relative overflow-hidden">
          {/* Subtle watermark quote icon */}
          <div className="absolute right-6 -bottom-6 opacity-5 pointer-events-none">
            <Quote className="w-64 h-64 text-[#303030]" />
          </div>

          <div className="max-w-3xl relative z-10">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#109030] tracking-wider uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#109030]" />
              <span>Manifeste & Vision 2030</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#303030] tracking-tight leading-tight mb-6">
              « Un Bénin où toutes les femmes et les filles jouissent pleinement de leurs droits, accèdent équitablement à la santé, à l’éducation et aux opportunités de développement, et participent pleinement aux décisions qui façonnent leur vie et leur communauté. »
            </h2>

            <div className="pt-6 border-t border-[#EBE6DF] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-stone-600 font-medium">
              <span className="text-[#109030] font-semibold">Adopté à l’unanimité des OSC membres</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Charte éthique et politique RVE-Bénin</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Cotonou, République du Bénin</span>
            </div>
          </div>
        </div>

        {/* Section Heading for Core Values */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#109030] tracking-wider uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#109030]" />
            <span>Nos Principes Directeurs</span>
          </div>
          <h3 className="text-3xl font-extrabold text-[#303030] tracking-tight">
            Les 6 valeurs cardinales du réseau
          </h3>
          <p className="mt-3 text-base text-stone-600">
            Elles cimentent notre cohésion interne et guident chacune de nos prises de parole auprès des citoyens et des gouvernants.
          </p>
        </div>

        {/* 6 Values Grid (3x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {VALUES.map((val, idx) => (
            <div
              key={val.id}
              className="p-7 rounded-2xl bg-[#FCFCFD] border border-stone-200/80 hover:border-stone-300 hover:shadow-xs transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-white border border-stone-200/80 flex items-center justify-center shadow-2xs">
                  {val.icon}
                </div>
                <span className="text-xs font-mono font-bold text-stone-400">
                  VALEUR 0{idx + 1}
                </span>
              </div>

              <h4 className="text-lg font-bold text-[#303030] mb-2.5">
                {val.title}
              </h4>

              <p className="text-sm text-stone-600 leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
