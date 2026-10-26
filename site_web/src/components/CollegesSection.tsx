import React from 'react';
import { Vague } from './Vague';
import { MEMBER_ORGANIZATIONS } from './MemberLogos';
import { Lien } from '../router';

/** L’accueil donne un aperçu ; les neuf fiches restent dans l’annuaire. */
export const CollegesSection: React.FC = () => {
  const membres = MEMBER_ORGANIZATIONS.filter((m) => m.category !== 'Partenaire Stratégique');
  return (
    <section id="colleges" aria-labelledby="membres-titre" className="overflow-hidden bg-surface">
      <div className="bg-rve-green">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-6 pt-16 pb-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-center lg:pt-20 lg:pb-12">
          <div>
            <p className="font-display text-[clamp(5.5rem,14vw,10rem)] font-extrabold leading-none text-white">9</p>
            <h2 id="membres-titre" className="mt-2 max-w-[20ch] font-display text-3xl font-bold leading-tight text-white">organisations membres, une voix collective</h2>
            <p className="mt-4 max-w-[48ch] leading-relaxed text-white/90">Le réseau réunit des organisations féminines aux expériences et aux territoires complémentaires.</p>
            <Lien vers="/membres" className="mt-6 inline-flex rounded-bouton border border-white px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-rve-green-ink">Découvrir les neuf organisations</Lien>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Aperçu des organisations membres">
            {membres.slice(0, 4).map((m) => <li key={m.id}><Lien vers={`/membres/${m.id}`} className="flex min-h-32 flex-col items-start justify-between rounded-carte bg-white/12 p-4 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-1.5 [&_img]:max-h-10">{m.logo}</span><span className="mt-4 text-sm font-semibold leading-snug">{m.shortName}</span></Lien></li>)}
          </ul>
        </div>
      </div>
      <Vague termine="var(--color-rve-green)" className="pointer-events-none -ml-12 -mt-px -mb-px block h-24 w-[calc(100%+6rem)] max-w-none sm:h-28 lg:h-32" />
    </section>
  );
};
