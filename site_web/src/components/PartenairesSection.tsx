import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MEMBER_ORGANIZATIONS } from './MemberLogos';
import { Lien } from '../router';
import { Reveal } from './Reveal';

/** Partenaires dont l'identité et le rôle sont documentés dans l'annuaire. */
export const PartenairesSection: React.FC = () => {
  const partenaires = MEMBER_ORGANIZATIONS.filter(
    (organisation) => organisation.category === 'Partenaire Stratégique',
  );

  if (partenaires.length === 0) return null;

  return (
    <section aria-labelledby="partenaires-accueil-titre" className="bg-rve-red-ink py-16 text-white sm:py-20">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        <Reveal as="header" className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-white/85">
              Partenariats
            </p>
            <h2 id="partenaires-accueil-titre" className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              Les partenaires du Réseau
            </h2>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-white/90">
              Découvrez les organisations dont l’appui au Réseau est documenté.
            </p>
          </div>
          <Lien vers="/partenariats" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-white underline decoration-white/70 underline-offset-4 hover:decoration-white">
            Découvrir les partenariats <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Lien>
        </Reveal>

        <ul className="mt-10 max-w-[1000px] space-y-8">
          {partenaires.map((partenaire) => (
            <Reveal as="li" key={partenaire.id}>
              <Lien
                vers={`/partenariats/${partenaire.id}`}
                className="group grid items-center gap-6 transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-white sm:grid-cols-[200px_minmax(0,1fr)]"
                aria-label={`Découvrir ${partenaire.name}`}
              >
                <span data-scroll="left" className="flex h-24 w-44 items-center justify-start bg-white px-5 [&_img]:max-h-16 [&_img]:max-w-44 [&_img]:object-contain">
                  {partenaire.logo}
                </span>
                <span className="flex flex-col">
                  <span className="font-display text-lg font-bold text-white">{partenaire.name}</span>
                  <span className="mt-2 text-sm leading-relaxed text-white/90">{partenaire.description}</span>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-white/70 underline-offset-4">
                    Voir la fiche <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </span>
              </Lien>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};
