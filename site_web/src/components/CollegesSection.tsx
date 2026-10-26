import React, { useEffect, useRef, useState } from 'react';
import { Vague } from './Vague';
import { MEMBER_ORGANIZATIONS } from './MemberLogos';
import { Lien } from '../router';

/** Les neuf membres sont visibles sur l’accueil ; leurs fiches restent dans l’annuaire. */
export const CollegesSection: React.FC = () => {
  const membres = MEMBER_ORGANIZATIONS.filter((m) => m.category !== 'Partenaire Stratégique');
  const [membreSelectionne, setMembreSelectionne] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const membreActif = membres.find((m) => m.id === membreSelectionne);

  useEffect(() => {
    if (membreSelectionne) detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [membreSelectionne]);

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
                <button
                  type="button"
                  onClick={() => setMembreSelectionne(m.id)}
                  aria-label={`Afficher les informations de ${m.name}`}
                  aria-expanded={membreSelectionne === m.id}
                  className="group relative flex min-h-40 w-full cursor-pointer flex-col items-start justify-between overflow-hidden rounded-carte bg-white/12 p-3 text-left text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white sm:p-4"
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
                </button>
              </li>
            ))}
          </ul>
          {membreActif && (
            <div ref={detailRef} role="region" aria-labelledby="membre-detail-titre" className="rounded-carte bg-white p-6 text-ink sm:p-8 lg:col-span-2">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div className="max-w-[70ch]">
                  <p className="text-xs font-bold uppercase tracking-wider text-rve-green-ink">Organisation membre</p>
                  <h3 id="membre-detail-titre" className="mt-2 font-display text-xl font-bold leading-snug sm:text-2xl">{membreActif.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{membreActif.description}</p>
                </div>
                <span className="flex h-20 w-28 items-center justify-center rounded-carte border border-line p-3 [&_img]:max-h-16">{membreActif.logo}</span>
              </div>
              {membreActif.profileComplete && (
                <div className="mt-6 grid gap-5 border-t border-line pt-5 text-sm sm:grid-cols-2">
                  <div><p className="font-bold text-ink">Domaines d’action</p><p className="mt-1 text-ink-soft">{membreActif.focus}</p></div>
                  {membreActif.zone && <div><p className="font-bold text-ink">Zone d’intervention</p><p className="mt-1 text-ink-soft">{membreActif.zone}</p></div>}
                </div>
              )}
              <Lien vers={`/membres/${membreActif.id}`} className="mt-6 inline-flex rounded-bouton bg-rve-green px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-rve-green-ink focus-visible:outline-2 focus-visible:outline-rve-green-ink">Voir la fiche complète →</Lien>
            </div>
          )}
        </div>
      </div>
      <Vague termine="var(--color-rve-green)" className="pointer-events-none -ml-12 -mt-px -mb-px block h-24 w-[calc(100%+6rem)] max-w-none sm:h-28 lg:h-32" />
    </section>
  );
};
