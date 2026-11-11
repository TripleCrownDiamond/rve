import React, { useMemo } from 'react';
import { ArrowUpRight, Camera } from 'lucide-react';
import { Lien } from '../router';
import { Cadence, CadenceItem, Reveal } from './Reveal';
import { useContenu } from '../data/contenu';
import { CHEMIN_MINIATURE, type Album, type Photo } from '../data/galerie';

interface PhotoChoisie extends Photo {
  album: string;
  albumTitre: string;
}

/**
 * Choisit les photographies de l'aperçu.
 *
 * Les albums sont parcourus en parallèle, pas l'un après l'autre : prendre
 * les cinq premières photos donnerait cinq vues de la même journée, alors que
 * l'accueil doit montrer que le réseau travaille sur plusieurs fronts. La
 * couverture de chaque album passe en tête, puisque c'est l'image que le
 * réseau a retenue pour le représenter.
 */
function choisir(albums: Album[], combien: number): PhotoChoisie[] {
  const files = albums.map((a) => {
    const couverture = a.photos.find((p) => p.id === a.couverture);
    const reste = a.photos.filter((p) => p.id !== a.couverture);
    return (couverture ? [couverture, ...reste] : reste).map((p) => ({
      ...p,
      album: a.id,
      albumTitre: a.titre,
    }));
  });

  const choix: PhotoChoisie[] = [];
  for (let rang = 0; choix.length < combien; rang += 1) {
    const avantTour = choix.length;
    for (const file of files) {
      const photo = file[rang];
      if (photo) choix.push(photo);
      if (choix.length === combien) return choix;
    }
    // Plus aucune file n'a de photo à ce rang : inutile de continuer.
    if (choix.length === avantTour) break;
  }
  return choix;
}

/**
 * Aperçu de la galerie sur la page d'accueil.
 *
 * La page d'accueil parlait du réseau sans le montrer : en dehors du bandeau
 * d'ouverture, elle n'avait pas une seule photographie. Cette section règle
 * cela sans dupliquer la galerie — cinq images, puis le lien vers les
 * trente-huit.
 *
 * Elle lit les albums du gestionnaire de contenu, et non une liste écrite
 * ici : ce que le réseau ajoutera à la galerie remontera sur l'accueil sans
 * qu'une seconde liste soit à tenir à jour.
 *
 * Le fond sombre est le vert de la charte poussé dans ses tons profonds. Une
 * photographie posée sur un fond clair perd ses noirs ; c'est aussi la seule
 * rupture sombre de la page, ce qui marque la séquence.
 */
export const GalerieSection: React.FC = () => {
  const albums = useContenu('albums');

  const apercu = useMemo(() => choisir(albums, 5), [albums]);

  if (apercu.length === 0) return null;

  return (
    <section
      id="galerie"
      aria-labelledby="galerie-accueil-titre"
      className="overflow-hidden bg-forest py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        <Reveal
          as="header"
          className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.16em] text-rve-yellow">
              <Camera className="h-4 w-4" aria-hidden="true" />
              Formations, ateliers et rencontres
            </p>
            <h2
              id="galerie-accueil-titre"
              className="mt-3 font-display text-3xl font-bold leading-tight text-on-night sm:text-4xl"
            >
              Le réseau au travail
            </h2>
            <p className="mt-4 max-w-[58ch] leading-relaxed text-on-night-soft">
              Les activités menées par les organisations membres, en images.
            </p>
          </div>
          <Lien
            vers="/galerie"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-on-night underline decoration-on-night-muted underline-offset-4 transition-colors duration-150 hover:decoration-on-night"
          >
            Voir plus d’images
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Lien>
        </Reveal>

        {/* La première image occupe deux colonnes et deux rangées ; les quatre
            suivantes comblent exactement le reste de la grille. */}
        <Cadence
          as="ul"
          seuil={0.05}
          className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4"
        >
          {apercu.map((photo, i) => (
            <CadenceItem
              as="li"
              key={photo.id}
              className={i === 0 ? 'col-span-2 row-span-2' : ''}
            >
              <Lien
                vers={`/galerie/${photo.album}`}
                aria-label={`${photo.legende} — album « ${photo.albumTitre} »`}
                className="group relative block h-full overflow-hidden rounded-carte focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rve-yellow"
              >
                <img
                  src={CHEMIN_MINIATURE(photo.id)}
                  alt={photo.legende}
                  loading="lazy"
                  decoding="async"
                  className="aspect-square h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.04]"
                />
                {/* Le dégradé ne sert pas de décor : il porte la légende, qui
                    serait illisible sur une photographie claire. */}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/85 to-transparent p-3 pt-10 text-[0.8125rem] leading-snug font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {photo.legende}
                </span>
              </Lien>
            </CadenceItem>
          ))}
        </Cadence>

        <Reveal as="ul" className="mt-6 flex flex-wrap gap-2">
          {albums.map((album) => (
            <li key={album.id}>
              <Lien
                vers={`/galerie/${album.id}`}
                className="inline-flex items-center gap-2 rounded-bouton border border-on-night-muted/40 px-4 py-2 text-[0.8125rem] font-semibold text-on-night-soft transition-colors duration-150 hover:border-rve-yellow hover:text-rve-yellow"
              >
                {album.titre}
                <ArrowUpRight className="h-4 w-4 shrink-0 text-rve-yellow" aria-hidden="true" />
              </Lien>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
};
