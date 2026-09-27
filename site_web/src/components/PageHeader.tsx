import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Lien } from '../router';
import { Vague } from './Vague';

/**
 * Bandeau d'ouverture des pages internes.
 *
 * Une page interne ne peut pas s'ouvrir sur un titre posé dans le vide :
 * le visiteur arrive d'un lien et a besoin de savoir immédiatement où il
 * est. D'où la photographie pleine largeur, le voile, le fil d'Ariane et
 * le titre, dans cet ordre de lecture.
 *
 * Le voile est à 62 % : la charte §04 impose au moins 40 % dès qu'un texte
 * se pose sur une photographie, et le titre est ici en grand corps blanc
 * sur des images de terrain dont la luminosité varie beaucoup.
 *
 * La vague ferme le bandeau, comme elle ferme l'aplat vert de l'accueil.
 * Elle n'est pas animée ici : le tracé progressif reste réservé au pivot
 * de la page d'accueil, faute de quoi il cesserait d'être un moment.
 */

export interface FilAriane {
  label: string;
  vers?: string;
}

interface PageHeaderProps {
  titre: string;
  amorce?: string;
  image: string;
  cadrage?: string;
  fil?: FilAriane[];
  /** Métadonnées d'un article : date, catégorie, autrice. */
  meta?: string[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  titre,
  amorce,
  image,
  cadrage = '50% 40%',
  fil = [],
  meta = [],
}) => {
  return (
    <header className="relative overflow-hidden bg-night-deep">
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: cadrage }}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-night-deep/62" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-night-deep/70 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 pt-36 pb-28 sm:px-8 sm:pt-40 sm:pb-32 lg:px-10">
        {fil.length > 0 && (
          <nav aria-label="Fil d’Ariane" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-white/70">
              <li>
                <Lien
                  vers="/"
                  className="transition-colors duration-150 hover:text-white"
                >
                  Accueil
                </Lien>
              </li>
              {fil.map((etape) => (
                <li key={etape.label} className="flex items-center gap-1.5">
                  <ChevronRight
                    className="h-3.5 w-3.5 text-white/40"
                    aria-hidden="true"
                  />
                  {etape.vers ? (
                    <Lien
                      vers={etape.vers}
                      className="transition-colors duration-150 hover:text-white"
                    >
                      {etape.label}
                    </Lien>
                  ) : (
                    <span className="text-white" aria-current="page">
                      {etape.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <h1 className="max-w-[20ch] font-display text-[clamp(2rem,4.6vw,3.5rem)] font-extrabold leading-[1.06] tracking-tight text-white">
          {titre}
        </h1>

        {meta.length > 0 && (
          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9375rem] text-white/75">
            {meta.map((m, i) => (
              <React.Fragment key={m}>
                {i > 0 && (
                  <span aria-hidden="true" className="text-white/35">
                    ·
                  </span>
                )}
                <span>{m}</span>
              </React.Fragment>
            ))}
          </p>
        )}

        {amorce && (
          <p className="mt-6 max-w-[58ch] text-[1.0625rem] leading-relaxed text-white/85">
            {amorce}
          </p>
        )}
      </div>

      <Vague
        termine="var(--color-surface)"
        className="pointer-events-none absolute inset-x-0 -bottom-px block h-16 w-full rotate-180 sm:h-20"
      />
    </header>
  );
};

/** Coquille commune aux pages internes : largeur, gouttières, respiration. */
export const PageBody: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div
    className={`mx-auto w-full max-w-[1240px] px-6 py-20 sm:px-8 lg:px-10 lg:py-24 ${className}`}
  >
    {children}
  </div>
);
