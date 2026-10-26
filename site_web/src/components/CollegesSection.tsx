import React from 'react';
import { Vague } from './Vague';
import { MEMBER_ORGANIZATIONS } from './MemberLogos';
import { Lien } from '../router';

/** Les neuf membres sont visibles sur l’accueil ; leurs fiches restent dans l’annuaire. */
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
          <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3" aria-label="Les neuf organisations membres">
            {membres.map((m) => (
              <li key={m.id}>
                <Lien
                  vers={`/membres/${m.id}`}
                  aria-label={`Découvrir ${m.name} : ${m.profileComplete ? m.description : 'fiche de présentation à compléter'}`}
                  className="group relative flex min-h-40 flex-col items-start justify-between overflow-hidden rounded-carte bg-white/12 p-3 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white sm:p-4"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white p-1.5 [&_img]:max-h-9">{m.logo}</span>
                  <span className="mt-3 block w-full">
                    <span className="block text-xs font-semibold leading-snug sm:text-sm">{m.shortName}</span>
                    <span className="mt-1 line-clamp-2 text-[11px] leading-snug text-white/85 sm:hidden">{m.profileComplete ? m.focus : 'Présentation à compléter'}</span>
                  </span>
                  <span className="pointer-events-none absolute inset-0 hidden flex-col justify-center bg-white p-3 text-rve-green-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:flex sm:p-4" aria-hidden="true">
                    <span className="line-clamp-2 text-xs font-bold leading-snug">{m.name}</span>
                    <span className="mt-2 line-clamp-3 text-[11px] leading-snug text-ink-soft">{m.profileComplete ? m.description : 'La fiche de présentation de cette organisation est en cours de collecte.'}</span>
                    {m.zone && <span className="mt-2 line-clamp-1 text-[10px] font-semibold">{m.zone}</span>}
                  </span>
                </Lien>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Vague termine="var(--color-rve-green)" className="pointer-events-none -ml-12 -mt-px -mb-px block h-24 w-[calc(100%+6rem)] max-w-none sm:h-28 lg:h-32" />
    </section>
  );
};
