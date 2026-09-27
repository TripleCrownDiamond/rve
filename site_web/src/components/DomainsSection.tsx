import React, { useState } from 'react';
import { Anneau, Flottante, Tache } from './Decor';
import { Reveal } from './Reveal';
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
    icon: <Users2 className="w-6 h-6 text-rve-green" />,
    accentColor: 'var(--color-rve-green)',
    borderColor: 'hover:border-rve-green/50',
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
    icon: <HeartPulse className="w-6 h-6 text-rve-red" />,
    accentColor: 'var(--color-rve-red)',
    borderColor: 'hover:border-rve-red/50',
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
    icon: <Leaf className="w-6 h-6 text-rve-green" />,
    accentColor: 'var(--color-rve-green)',
    borderColor: 'hover:border-rve-green/50',
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
    icon: <GraduationCap className="w-6 h-6 text-rve-yellow" />,
    accentColor: 'var(--color-rve-yellow)',
    borderColor: 'hover:border-rve-yellow/50',
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
    icon: <TrendingUp className="w-6 h-6 text-rve-red" />,
    accentColor: 'var(--color-rve-red)',
    borderColor: 'hover:border-rve-red/50',
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
    icon: <FlaskConical className="w-6 h-6 text-rve-green" />,
    accentColor: 'var(--color-rve-green)',
    borderColor: 'hover:border-rve-green/50',
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
    <section id="domaines" className="relative overflow-hidden bg-surface pt-10 pb-20 lg:pt-12 lg:pb-28">
      <Flottante derive={16} duree={22} rotation={4} className="pointer-events-none absolute -left-24 bottom-24">
        <Tache couleur="var(--color-rve-yellow)" className="h-64 w-64 opacity-[0.09]" />
      </Flottante>
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        {/* Charte §29 : « H1 en haut, six blocs icône-titre-texte en grille
            3 × 2, vague légère en pied. Aucun autre élément. » Le sur-titre
            en capitales et la note latérale sur les ODD tombent donc. */}
        <Reveal as="header" className="mb-16 max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            6 piliers essentiels pour une transformation systémique
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Une approche globale et transversale pour répondre avec précision aux défis structurels auxquels sont confrontées les femmes et les filles béninoises.
          </p>
        </Reveal>

        {/* 6 Cards Grid (3x2 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DOMAINS.map((domain) => (
            <button
              key={domain.id}
              type="button"
              onClick={() => onSelectDomain(domain)}
              className="group flex cursor-pointer flex-col justify-between rounded-carte border border-line bg-surface p-7 text-left transition-[box-shadow,transform] duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-1 hover:shadow-lg active:scale-[0.99] sm:p-8"
            >
              <div>
                {/* Pastille d'icone. Pas de marqueur numerote : les six
                    domaines sont simultanes, pas une sequence. Rayon interieur
                    (4 px) + marge = rayon exterieur (8 px). */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[4px] border border-line bg-surface-sunken">
                  {domain.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-ink group-hover:text-rve-green transition-colors leading-snug mb-3">
                  {domain.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-ink-soft leading-relaxed line-clamp-2 mb-6">
                  {domain.shortDesc}
                </p>
              </div>

              {/* Bottom Metadata & Affordance */}
              {/* L'alignement ODD et le detail complet vivent dans la fiche,
                  au clic : la carte n'en garde que l'amorce. */}
              <span className="inline-flex items-center gap-1 text-[0.8125rem] font-semibold text-rve-green-ink">
                Explorer
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
              </span>
            </button>
          ))}
        </div>
      </div>

    </section>
  );
};
