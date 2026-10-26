import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MEMBER_ORGANIZATIONS } from './MemberLogos';
import { Lien } from '../router';

/** Partenaires dont l'identité et le rôle sont documentés dans l'annuaire. */
export const PartenairesSection: React.FC = () => {
  const partenaires = MEMBER_ORGANIZATIONS.filter(
    (organisation) => organisation.category === 'Partenaire Stratégique',
  );

  if (partenaires.length === 0) return null;

  return (
    <section aria-labelledby="partenaires-accueil-titre" className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        <div className="flex flex-col gap-5 border-t border-line pt-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-rve-green-ink">
              Partenariats
            </p>
            <h2 id="partenaires-accueil-titre" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              Les partenaires du Réseau
            </h2>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">
              Découvrez les organisations dont l’appui au Réseau est documenté.
            </p>
          </div>
          <Lien vers="/partenariats" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-rve-green-ink underline decoration-rve-green/40 underline-offset-4 hover:decoration-rve-green">
            Découvrir les partenariats <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Lien>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partenaires.map((partenaire) => (
            <li key={partenaire.id}>
              <Lien
                vers={`/membres/${partenaire.id}`}
                className="group flex h-full flex-col rounded-carte border border-line bg-white p-6 transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-rve-green/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-rve-green"
                aria-label={`Découvrir ${partenaire.name}`}
              >
                <span className="flex h-20 w-full items-center justify-start [&_img]:max-h-20 [&_img]:max-w-44 [&_img]:object-contain">
                  {partenaire.logo}
                </span>
                <span className="mt-6 font-display text-lg font-bold text-ink">{partenaire.name}</span>
                <span className="mt-2 text-sm leading-relaxed text-ink-soft">{partenaire.description}</span>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-rve-green-ink">
                  Voir la fiche <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </Lien>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
