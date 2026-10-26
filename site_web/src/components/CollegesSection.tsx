import React from 'react';
import { Vague } from './Vague';
import { MEMBER_ORGANIZATIONS } from './MemberLogos';
import { Lien } from '../router';

/** Les neuf membres, sans attribution thématique non documentée. */
export const CollegesSection: React.FC = () => {
  const membres = MEMBER_ORGANIZATIONS.filter((m) => m.category !== 'Partenaire Stratégique');
  return (
    <section id="colleges" aria-labelledby="membres-titre" className="bg-rve-green">
      <div className="mx-auto max-w-[1240px] px-6 pt-20 pb-14 sm:px-8 lg:pt-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-display text-[clamp(5.5rem,16vw,12rem)] font-extrabold leading-none text-white">9</p>
            <h2 id="membres-titre" className="mt-3 max-w-[18ch] font-display text-3xl font-bold leading-tight text-white">organisations féminines, une voix collective</h2>
            <p className="mt-5 max-w-[48ch] leading-relaxed text-white/90">Le réseau rassemble des organisations aux expériences et territoires complémentaires. Découvrez leurs activités et leurs coordonnées dans l’annuaire.</p>
            <Lien vers="/membres" className="mt-7 inline-flex rounded-bouton border border-white px-5 py-3 text-sm font-semibold text-white hover:bg-white hover:text-rve-green-ink">Explorer l’annuaire</Lien>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            {membres.map((m) => <li key={m.id}><Lien vers={`/membres/${m.id}`} className="flex h-full min-h-24 items-center gap-3 rounded-carte bg-white/10 p-4 text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white p-1.5 [&_img]:max-h-10">{m.logo}</span><span className="text-sm font-semibold leading-snug">{m.shortName}</span></Lien></li>)}
          </ul>
        </div>
      </div>
      <Vague dessine termine="var(--color-rve-green)" className="pointer-events-none -mt-px -mb-px block h-24 w-full sm:h-28 lg:h-32" />
    </section>
  );
};
