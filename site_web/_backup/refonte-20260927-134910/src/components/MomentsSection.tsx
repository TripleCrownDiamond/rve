import React from 'react';
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
    <section className="py-20 lg:py-28 bg-white border-b border-stone-100">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#109030] tracking-wider uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#109030]" />
              <span>Ancrage & Réalités du Réseau</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#303030] tracking-tight leading-tight">
              Une dynamique vivante, ancrée dans le terrain béninois
            </h2>
            <p className="mt-4 text-base text-stone-600 leading-relaxed">
              De la concertation stratégique aux ateliers opérationnels, découvrez la réalité des femmes qui animent le Réseau Voix EssentiELLES Bénin.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <Camera className="w-4 h-4 text-[#109030]" />
            <span>Archives photographiques certifiées RVE-Bénin</span>
          </div>
        </div>

        {/* 3 Interactive Documentary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {MOMENTS.map((moment) => (
            <article key={moment.id} className="flex flex-col border-t border-stone-200 pt-5">
              <div>
                {/* Visual Header Representation */}
                <div className="relative mb-6 flex h-48 flex-col justify-between overflow-hidden bg-[#173523] p-5 text-white">
                  <img src={moment.image} alt={moment.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-[#101814]/55" />
                  <div className="relative z-10 flex items-center justify-between text-[11px] font-semibold">
                    <span className="text-amber-300 uppercase tracking-wider">{moment.tag}</span>
                    <span className="text-stone-300">{moment.date}</span>
                  </div>

                  <div className="relative z-10">
                    <span className="text-[10px] text-stone-400 block uppercase tracking-wider">Contexte</span>
                    <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                      {moment.context}
                    </h4>
                  </div>
                </div>

                {/* Main Card Content */}
                <h3 className="text-base font-bold text-[#303030] leading-snug mb-3">
                  {moment.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  {moment.description}
                </p>
              </div>

              {/* Footer specs */}
              <div className="pt-4 border-t border-stone-200/60 space-y-2 text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">{moment.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">{moment.participants}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
