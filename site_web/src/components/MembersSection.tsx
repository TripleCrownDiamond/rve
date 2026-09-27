import React, { useState } from 'react';
import { Arc, Flottante, Semis } from './Decor';
import { MEMBER_ORGANIZATIONS, MemberOrg } from './MemberLogos.tsx';
import { ArrowRight } from 'lucide-react';

interface MembersSectionProps {
  onOpenJoin: () => void;
  onSelectMember: (member: MemberOrg) => void;
}

export const MembersSection: React.FC<MembersSectionProps> = ({
  onOpenJoin,
  onSelectMember,
}) => {
  const [filter, setFilter] = useState<'all' | 'fondateurs' | 'partenaires'>('all');

  const nbOsc = MEMBER_ORGANIZATIONS.filter(
    (m) => m.category !== 'Partenaire Stratégique',
  ).length;
  const nbPartenaires = MEMBER_ORGANIZATIONS.length - nbOsc;

  const filteredMembers = MEMBER_ORGANIZATIONS.filter((m) => {
    if (filter === 'fondateurs') return m.category === 'Membre Fondateur' || m.category === 'Organisation Membre';
    if (filter === 'partenaires') return m.category === 'Partenaire Stratégique';
    return true;
  });

  return (
    <section id="membres" className="relative overflow-hidden bg-surface-sunken py-20 lg:py-28">
      <Flottante derive={12} duree={17} retard={1.5} className="pointer-events-none absolute -right-16 top-24">
        <Arc className="h-32 w-64 opacity-[0.08] lg:w-80" />
      </Flottante>
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              Des organisations membres unies pour amplifier leur impact
            </h2>
            <p className="mt-4 text-base max-w-[62ch] text-ink-soft leading-relaxed">
              Le RVE-Bénin fédère la richesse et la complémentarité de la société civile féminine béninoise avec l’appui de partenaires techniques et financiers de premier ordre.
            </p>
          </div>

          {/* Interactive filter controls (allowed functional buttons in zero-pill discipline) */}
          <div className="flex items-center p-1 bg-surface-sunken rounded-xl">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-ink shadow-xs'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              Toutes ({MEMBER_ORGANIZATIONS.length})
            </button>
            <button
              onClick={() => setFilter('fondateurs')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                filter === 'fondateurs'
                  ? 'bg-white text-ink shadow-xs'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              {`Organisations membres (${nbOsc})`}
            </button>
            <button
              onClick={() => setFilter('partenaires')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                filter === 'partenaires'
                  ? 'bg-white text-ink shadow-xs'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              {`Partenaires (${nbPartenaires})`}
            </button>
          </div>
        </div>

        {/* Marques en rangées centrées, chacune dans son propre cadre.

            Pas de grille rigide : le filtre fait varier le nombre affiché
            (10, 9 ou 1) et un nombre de colonnes fixe laisserait à chaque
            fois des cellules orphelines dans un angle. Des rangées qui se
            remplissent puis se centrent restent nettes quel que soit le
            compte, et donnent naturellement un nombre de logos différent
            par ligne.

            Gris équilibrés : `grayscale` seul rend certaines marques presque
            blanches et d'autres très sombres, parce que leurs luminosités
            d'origine n'ont rien à voir. Le `contrast` les resserre vers un
            gris moyen commun, et `multiply` fait disparaître le fond blanc
            des logos livrés en JPEG, qui sinon dessinent un rectangle clair
            dans leur cadre. La couleur revient au survol. */}
        <ul className="flex flex-wrap justify-center gap-4 sm:gap-5">
          {filteredMembers.map((member) => (
            <li key={member.id}>
              <button
                type="button"
                onClick={() => onSelectMember(member)}
                title={member.name}
                aria-label={`${member.name} — voir la fiche`}
                className="group flex h-28 w-[9.25rem] cursor-pointer items-center justify-center rounded-carte border border-line bg-surface px-5 transition-[border-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 hover:border-rve-green/40 hover:shadow-md sm:h-32 sm:w-44 sm:px-6 lg:w-48 [&_img]:opacity-55 [&_img]:mix-blend-multiply [&_img]:brightness-[var(--densite,1)] [&_img]:grayscale [&_img]:transition-[filter,opacity] [&_img]:duration-200 hover:[&_img]:opacity-100 hover:[&_img]:brightness-100 hover:[&_img]:grayscale-0"
              >
                {member.logo}
              </button>
            </li>
          ))}
        </ul>

        {/* Bottom Callout: Adhérer au réseau */}
        <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-carte bg-forest p-8 text-white sm:flex-row">
          <div>
            <span className="text-xs font-semibold text-rve-lime uppercase tracking-wider block mb-1">
              Appel aux Organisations Féminines du Bénin
            </span>
            <h4 className="text-lg sm:text-xl font-bold">
              Votre organisation partage nos valeurs et nos combats ?
            </h4>
            <p className="text-xs sm:text-sm text-ink-faint mt-1 max-w-xl">
              Le RVE-Bénin accueille les associations, ONG et fondations féminines exerçant activement sur le territoire national béninois.
            </p>
          </div>

          <button
            onClick={onOpenJoin}
            className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-rve-green hover:bg-rve-green-ink active:bg-rve-green-deep rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Demande d'adhésion</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
