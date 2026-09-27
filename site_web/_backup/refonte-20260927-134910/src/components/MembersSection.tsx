import React, { useState } from 'react';
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

  const filteredMembers = MEMBER_ORGANIZATIONS.filter((m) => {
    if (filter === 'fondateurs') return m.category === 'Membre Fondateur' || m.category === 'Organisation Membre';
    if (filter === 'partenaires') return m.category === 'Partenaire Stratégique';
    return true;
  });

  return (
    <section id="membres" className="py-20 lg:py-28 bg-[#FCFCFD] border-b border-stone-100">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#109030] tracking-wider uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#109030]" />
              <span>Coalition & Écosystème Partenarial</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#303030] tracking-tight leading-tight">
              Des organisations membres unies pour amplifier leur impact
            </h2>
            <p className="mt-4 text-base text-stone-600 leading-relaxed">
              Le RVE-Bénin fédère la richesse et la complémentarité de la société civile féminine béninoise avec l’appui de partenaires techniques et financiers de premier ordre.
            </p>
          </div>

          {/* Interactive filter controls (allowed functional buttons in zero-pill discipline) */}
          <div className="flex items-center p-1 bg-stone-100 rounded-xl">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Toutes ({MEMBER_ORGANIZATIONS.length})
            </button>
            <button
              onClick={() => setFilter('fondateurs')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                filter === 'fondateurs'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              OSC Membres (10)
            </button>
            <button
              onClick={() => setFilter('partenaires')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                filter === 'partenaires'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Partenaires
            </button>
          </div>
        </div>

        {/* Members & Partners Grid - Clean containers, well spaced, generous breathing room */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => onSelectMember(member)}
              className="p-7 rounded-2xl bg-white border border-stone-200/90 hover:border-stone-300 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Logo Frame: Clean white surface with generous padding */}
                <div className="h-20 w-full flex items-center justify-center p-3 mb-6 bg-stone-50/60 rounded-xl border border-stone-100 group-hover:bg-white group-hover:border-stone-200 transition-colors">
                  {member.logo}
                </div>

                {/* Metadata kicker */}
                <div className="flex items-center gap-2 text-xs text-stone-400 mb-1.5 font-medium">
                  <span className="text-[#109030] font-semibold">{member.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{member.shortName}</span>
                </div>

                {/* Organization Full Name */}
                <h3 className="text-base font-bold text-[#303030] group-hover:text-[#109030] transition-colors leading-snug mb-3">
                  {member.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4 line-clamp-3">
                  {member.description}
                </p>
              </div>

              {/* Bottom focus area */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500 truncate max-w-[200px]" title={member.focus}>
                  {member.focus}
                </span>
                <span className="font-semibold text-[#109030] shrink-0 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Fiche
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout: Adhérer au réseau */}
        <div className="mt-14 border-l-4 border-[#109030] bg-[#173523] p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
              Appel aux Organisations Féminines du Bénin
            </span>
            <h4 className="text-lg sm:text-xl font-bold">
              Votre organisation partage nos valeurs et nos combats ?
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
              Le RVE-Bénin accueille les associations, ONG et fondations féminines exerçant activement sur le territoire national béninois.
            </p>
          </div>

          <button
            onClick={onOpenJoin}
            className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#109030] hover:bg-[#0c7326] active:bg-[#09571d] rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Demande d'adhésion</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
