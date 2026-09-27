import React from 'react';
import { Anneau, Flottante } from './Decor';
import { Reveal } from './Reveal';
import { Camera, MapPin, Users } from 'lucide-react';

interface MomentItem {
  id: string;
  title: string;
  context: string;
  participants: string;
  date: string;
  location: string;
  tag: string;
  description: string;
  image: string;
}

export const MOMENTS: MomentItem[] = [
  {
    id: 'ag-natabou',
    title: 'Assemblée Générale & Alliance avec les Autorités Coutumières',
    context: 'Délégation nationale RVE-Bénin & Sa Majesté Reine Adjignon Natabou',
    participants: '14 leaders d’OSC féminines, Reines traditionnelles & Représentants institutionnels',
    date: 'Août 2025',
    location: 'Salle de conférence de Cotonou',
    tag: 'Gouvernance & Patrimoine',
    description: 'Moment solennel réunissant le leadership traditionnel béninois et les organisations féminines modernes pour sceller un pacte national de protection des droits des filles et des femmes.',
    image: '/assets/img/hero-reseau.jpg',
  },
  {
    id: 'fjad-workshop',
    title: 'Session Technique de Plaidoyer & Harmonisation des Outils',
    context: 'Atelier de modélisation avec les délégations de la FJAD et de Voix EssentiELLES',
    participants: 'Équipes de recherche, juristes communautaires et chargées de plaidoyer',
    date: 'Août 2025',
    location: 'Centre de formation, Abomey-Calavi',
    tag: 'Renforcement de capacités',
    description: 'Séance de co-construction des modules de sensibilisation juridique et d’accompagnement des jeunes survivantes de violences basées sur le genre.',
    image: '/assets/img/atelier-ecriture.jpg',
  },
  {
    id: 'bwaa-collaboration',
    title: 'Laboratoire d’Indicateurs & Recherche Action',
    context: 'Groupe de travail technique animé par le Bénin Women Alumni Association (BWAA)',
    participants: 'Chercheuses, alumni de programmes d’excellence et coordinatrices de terrain',
    date: 'Août 2025',
    location: 'Hub d’innovation sociale, Cotonou',
    tag: 'Recherche & Données',
    description: 'Élaboration du premier tableau de bord national mesurant l’accès effectif des femmes aux soins de santé maternelle et à la couverture sanitaire universelle.',
    image: '/assets/img/pleniere-parakou.jpg',
  },
];

export const MomentsSection: React.FC = () => {
  return (
    <section className="overflow-hidden py-20 lg:py-28 bg-white border-b border-line-soft">
      <div className="relative max-w-[1240px] mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <Flottante derive={14} duree={20} rotation={-6} className="pointer-events-none absolute -right-14 top-10">
          <Anneau className="h-44 w-44 opacity-[0.07]" />
        </Flottante>
        <Reveal as="header" className="mb-12 max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            Une dynamique vivante, ancrée dans le terrain béninois
          </h2>
          <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-ink-soft">
            De la concertation stratégique aux ateliers opérationnels, la
            réalité des femmes qui animent le réseau.
          </p>
        </Reveal>

        {/* 3 Interactive Documentary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {MOMENTS.map((moment) => (
            <article
              key={moment.id}
              className="flex h-full flex-col overflow-hidden rounded-carte border border-line bg-surface"
            >
              {/* La photographie occupe la carte : c'est elle qui porte la
                  section, pas la légende. Seuls la date et le lieu restent
                  posés dessus, sur un voile conforme au §04. */}
              <div className="relative aspect-[4/3] overflow-hidden bg-forest">
                <img
                  src={moment.image}
                  alt={moment.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night/85 to-transparent" />
                <p className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-4 text-[0.8125rem] font-medium text-white">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="truncate">{moment.location}</span>
                  <span aria-hidden="true" className="text-white/50">·</span>
                  <span className="shrink-0 text-white/80">{moment.date}</span>
                </p>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-base font-bold leading-snug text-ink">
                  {moment.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                  {moment.description}
                </p>
                {/* Poussé en bas : les trois cartes alignent leur pied quelle
                    que soit la longueur du texte au-dessus. */}
                <p className="mt-auto flex items-center gap-2 pt-5 text-[0.8125rem] text-ink-muted">
                  <Users className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="truncate">{moment.participants}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
