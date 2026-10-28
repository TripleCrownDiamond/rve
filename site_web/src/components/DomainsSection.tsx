import React from 'react';
import { Cadence, CadenceItem, Reveal } from './Reveal';
import { Lien } from '../router';
import { 
  Users2, 
  HeartPulse, 
  Leaf, 
  GraduationCap, 
  TrendingUp, 
  FlaskConical, 
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
    <section id="domaines" className="bg-surface-raised py-20 lg:py-28">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        {/* Les six domaines sont visibles sur l’accueil ; leur développement
            complet reste disponible sur les pages dédiées. */}
        <Reveal as="header" className="mb-16 max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            Les domaines d’action du réseau
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Le RVE-Bénin agit sur les droits, la santé, le climat, l’éducation, l’autonomie économique et la production de données.
          </p>
        </Reveal>

        {/* Chaque domaine est accessible directement depuis l’accueil. */}
        <Cadence className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {DOMAINS.map((domain) => (
            <CadenceItem key={domain.id}>
            <button
              type="button"
              onClick={() => onSelectDomain(domain)}
              className="group flex h-full w-full cursor-pointer flex-col items-start text-left"
            >
              <div>
                <div className="mb-5 inline-flex transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-110">
                  {domain.icon}
                </div>
                <h3 className="mb-3 text-lg font-bold leading-snug text-ink transition-colors group-hover:text-rve-green">
                  {domain.title}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-ink-soft">
                  {domain.shortDesc}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-[0.8125rem] font-semibold text-rve-green-ink underline decoration-rve-green/40 underline-offset-4 group-hover:decoration-rve-green">
                Explorer
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
              </span>
            </button>
            </CadenceItem>
          ))}
        </Cadence>
        <Lien vers="/domaines" className="mt-8 inline-flex items-center gap-2 font-semibold text-rve-green-ink underline-offset-4 hover:underline">
          Explorer tous les domaines en détail <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Lien>
      </div>

    </section>
  );
};
