import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Lien } from '../router';
import { Reveal } from './Reveal';
import { useContenu } from '../data/contenu';

/**
 * Les partenaires sur l'accueil.
 *
 * Ils étaient tirés de l'annuaire des organisations membres, via une
 * catégorie « Partenaire Stratégique ». Cela mélangeait deux choses que le
 * cahier des charges sépare : les membres composent le réseau, les
 * partenaires l'appuient de l'extérieur. La section lit maintenant la liste
 * des partenaires, et renvoie vers leur page.
 */
export const PartenairesSection: React.FC = () => {
  const partenaires = useContenu('partenaires');

  if (partenaires.length === 0) return null;

  return (
    <section aria-labelledby="partenaires-accueil-titre" className="bg-rve-red-ink py-16 text-white sm:py-20">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        <Reveal as="header" className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-rve-yellow">
              Appuis techniques, financiers et institutionnels
            </p>
            <h2 id="partenaires-accueil-titre" className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              Les partenaires du réseau
            </h2>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-white/90">
              Distincts des organisations membres, ils soutiennent le réseau sans en faire partie.
            </p>
          </div>
          <Lien vers="/partenaires" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-white underline decoration-white/70 underline-offset-4 hover:decoration-white">
            Tous les partenaires <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Lien>
        </Reveal>

        <ul className="mt-10 max-w-[1000px] space-y-8">
          {partenaires.map((partenaire) => (
            <Reveal as="li" key={partenaire.id}>
              <Lien
                vers="/partenaires"
                className="group grid items-center gap-6 transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-white sm:grid-cols-[200px_minmax(0,1fr)]"
                aria-label={`En savoir plus sur ${partenaire.nom}`}
              >
                <span data-scroll="left" className="flex h-24 w-44 items-center justify-start bg-white px-5">
                  {partenaire.logo ? (
                    <img src={partenaire.logo} alt={`Logo ${partenaire.nom}`} loading="lazy" className="max-h-16 max-w-44 object-contain" />
                  ) : (
                    <span className="font-display text-sm font-bold text-ink">{partenaire.nom}</span>
                  )}
                </span>
                <span className="flex flex-col">
                  <span className="inline-flex w-fit rounded-[3px] bg-rve-yellow px-2 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wider text-rve-green-deep">
                    Partenaire {partenaire.type.toLowerCase()}
                  </span>
                  <span className="mt-2 font-display text-lg font-bold text-white">{partenaire.nom}</span>
                  <span className="mt-2 text-sm leading-relaxed text-white/90">{partenaire.description}</span>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-white/70 underline-offset-4">
                    Voir la nature de l’appui
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
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
