import React, { useState } from 'react';
import { 
  Users2, 
  HeartPulse, 
  Leaf, 
  GraduationCap, 
  TrendingUp, 
  FlaskConical, 
  ChevronRight, 
  ArrowUpRight 
} from 'lucide-react';

export interface DomainItem {
  id: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: React.ReactNode;
  accentColor: string;
  borderColor: string;
  keyActions: string[];
  sdgGoal: string;
}

export const DOMAINS: DomainItem[] = [
  {
    id: 1,
    title: 'Genre, leadership et participation citoyenne',
    shortDesc: 'Promouvoir la parité politique, la présence des femmes dans les sphères de décision et l’éradication des violences basées sur le genre.',
    fullDesc: 'Le RVE-Bénin accompagne l’émergence d’une nouvelle génération de femmes leaders à travers des académies de leadership, le mentorat politique et le plaidoyer pour l’application rigoureuse du Code électoral et des lois réprimant les VBG.',
    icon: <Users2 className="w-6 h-6 text-[#109030]" />,
    accentColor: '#109030',
    borderColor: 'hover:border-[#109030]/50',
    keyActions: [
      'Académies du leadership féminin pour jeunes professionnelles et élues locales',
      'Observatoire citoyen de veille sur les Violences Basées sur le Genre (VBG)',
      'Plaidoyer pour l’égal accès aux postes de haute responsabilité institutionnelle',
    ],
    sdgGoal: 'ODD 5 · Égalité entre les sexes',
  },
  {
    id: 2,
    title: 'Santé et couverture sanitaire universelle',
    shortDesc: 'Garantir l’accès équitable aux soins de santé primaires, aux droits sexuels et reproductifs et à la protection sociale.',
    fullDesc: 'En synergie avec Speak Up Africa et les ministères sectoriels, le réseau intervient sur la gratuité des soins maternels, la sensibilisation au dépistage des cancers féminins et l’intégration communautaire dans la Couverture Sanitaire Universelle (CSU).',
    icon: <HeartPulse className="w-6 h-6 text-[#E82830]" />,
    accentColor: '#E82830',
    borderColor: 'hover:border-[#E82830]/50',
    keyActions: [
      'Campagnes mobiles de dépistage des cancers du col et du sein en zones rurales',
      'Plaidoyer pour la disponibilité des intrants contraceptifs et de santé reproductive',
      'Dialogue communautaire sur l’assurance maladie obligatoire et solidaire',
    ],
    sdgGoal: 'ODD 3 · Bonne santé et bien-être',
  },
  {
    id: 3,
    title: 'Changements climatiques & transition juste',
    shortDesc: 'Placer les femmes au cœur de la résilience écologique, de l’agro-écologie et des politiques de justice climatique au Bénin.',
    fullDesc: 'Les femmes rurales étant les premières touchées par la désertification et les inondations au Bénin, le réseau soutient l’accès au foncier sécurisé, la diffusion de foyers améliorés et la participation aux plans communaux d’adaptation.',
    icon: <Leaf className="w-6 h-6 text-[#109030]" />,
    accentColor: '#109030',
    borderColor: 'hover:border-[#109030]/50',
    keyActions: [
      'Appui aux coopératives féminines pour les pratiques agro-écologiques durables',
      'Sensibilisation aux énergies de cuisson propres et lutte contre la déforestation',
      'Participation aux Conférences Nationales et Internationales sur le Climat (COP)',
    ],
    sdgGoal: 'ODD 13 · Lutte contre les changements climatiques',
  },
  {
    id: 4,
    title: 'Éducation des filles et des femmes',
    shortDesc: 'Lutter contre le décrochage scolaire, promouvoir l’alphabétisation fonctionnelle et encourager les filières STEM pour les jeunes filles.',
    fullDesc: 'Nous militons pour le maintien des filles à l’école au-delà du premier cycle secondaire, l’octroi de bourses d’excellence et la réinsertion éducative des jeunes mères grâce à des centres d’apprentissage adaptés.',
    icon: <GraduationCap className="w-6 h-6 text-[#F8C000]" />,
    accentColor: '#F8C000',
    borderColor: 'hover:border-[#F8C000]/50',
    keyActions: [
      'Sensibilisation des parents et dignitaires contre les mariages précoces',
      'Bourses d’excellence et mentorat scientifique pour filles dans les séries STEM',
      'Programmes d’alphabétisation numérique et fonctionnelle en langues nationales',
    ],
    sdgGoal: 'ODD 4 · Éducation de qualité',
  },
  {
    id: 5,
    title: 'Autonomisation économique & entrepreneuriat',
    shortDesc: 'Développer l’inclusion financière, l’accès aux crédits adaptés, la structuration des coopératives et l’accès aux marchés.',
    fullDesc: 'Le RVE-Bénin accompagne les initiatives économiques féminines de la transformation agro-alimentaire à l’économie numérique, en facilitant l’intermédiation avec les institutions de microfinance et les fonds d’appui.',
    icon: <TrendingUp className="w-6 h-6 text-[#E82830]" />,
    accentColor: '#E82830',
    borderColor: 'hover:border-[#E82830]/50',
    keyActions: [
      'Mise en place de guichets d’incubation et d’accélération d’entreprises féminines',
      'Facilitation de l’accès au micro-crédit et aux plateformes de paiement mobile',
      'Foires régionales et valorisation du label des artisanes béninoises',
    ],
    sdgGoal: 'ODD 8 · Travail décent & croissance économique',
  },
  {
    id: 6,
    title: 'Recherche, données et innovation sociale',
    shortDesc: 'Produire des données probantes ventilées par genre pour éclairer le plaidoyer et documenter l’impact des politiques publiques.',
    fullDesc: 'Nous croyons en un militantisme appuyé sur la rigueur scientifique. Le réseau collabore avec des universitaires et des centres d’études pour produire des baromètres périodiques sur la condition féminine au Bénin.',
    icon: <FlaskConical className="w-6 h-6 text-[#109030]" />,
    accentColor: '#109030',
    borderColor: 'hover:border-[#109030]/50',
    keyActions: [
      'Baromètre annuel sur la participation des femmes aux sphères décisionnelles',
      'Études d’impact sur la santé de la reproduction et les barrières socioculturelles',
      'Laboratoire d’innovation sociale pour tester des solutions citoyennes de terrain',
    ],
    sdgGoal: 'ODD 9 · Industrie, innovation & infrastructure',
  },
];

interface DomainsSectionProps {
  onSelectDomain: (domain: DomainItem) => void;
}

export const DomainsSection: React.FC<DomainsSectionProps> = ({ onSelectDomain }) => {
  return (
    <section id="domaines" className="py-20 lg:py-28 bg-white border-b border-stone-100">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#109030] tracking-wider uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#109030]" />
              <span>Champs d'intervention stratégique</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#303030] tracking-tight leading-tight">
              6 piliers essentiels pour une transformation systémique
            </h2>
            <p className="mt-4 text-base text-stone-600 leading-relaxed">
              Une approche globale et transversale pour répondre avec précision aux défis structurels auxquels sont confrontées les femmes et les filles béninoises.
            </p>
          </div>

          <div className="text-xs text-stone-500 font-medium">
            <span>Cadre aligné sur les Objectifs de Développement Durable (ODD) et la Vision Bénin 2030</span>
          </div>
        </div>

        {/* 6 Cards Grid (3x2 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DOMAINS.map((domain) => (
            <div
              key={domain.id}
              onClick={() => onSelectDomain(domain)}
              className={`group flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-[#FAFAFA] hover:bg-white border border-stone-200/90 hover:border-stone-300 hover:shadow-lg transition-all duration-200 cursor-pointer ${domain.borderColor}`}
            >
              <div>
                {/* Top bar with Icon & Editorial Index */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white border border-stone-200/80 shadow-xs flex items-center justify-center transition-transform group-hover:scale-105">
                    {domain.icon}
                  </div>
                  <span className="text-xs font-bold text-stone-400 font-mono tracking-widest">
                    0{domain.id}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#303030] group-hover:text-[#109030] transition-colors leading-snug mb-3">
                  {domain.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-stone-600 leading-relaxed line-clamp-3 mb-6">
                  {domain.shortDesc}
                </p>
              </div>

              {/* Bottom Metadata & Affordance */}
              <div className="pt-5 border-t border-stone-200/60 flex items-center justify-between text-xs">
                <span className="text-stone-500 font-medium">{domain.sdgGoal}</span>
                <span className="inline-flex items-center gap-1 font-semibold text-[#109030] group-hover:translate-x-0.5 transition-transform">
                  Explorer
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
