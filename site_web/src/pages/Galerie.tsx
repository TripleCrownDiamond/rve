import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PageBody, PageHeader } from '../components/PageHeader';
import { PageAnimee } from '../components/PageAnimee';
import { TitreSection } from '../components/ui';
import { Cadence, CadenceItem, Reveal } from '../components/Reveal';
import { Lien } from '../router';
import { useContenu } from '../data/contenu';
import { CHEMIN_MINIATURE, CHEMIN_PHOTO, type Album, type Photo } from '../data/galerie';
import { ArrowRight, Camera, ChevronLeft, ChevronRight, MapPin, X } from 'lucide-react';

/* ------------------------------------------------------------------ *
 * Visionneuse
 * ------------------------------------------------------------------ */

/**
 * Vue plein écran d'une photographie.
 *
 * Elle capture les flèches et Échap, et rend le focus à la vignette d'où
 * elle a été ouverte : sans cela, fermer la visionneuse au clavier renvoie
 * en haut du document et oblige à reparcourir toute la grille.
 */
const Visionneuse: React.FC<{
  photos: Photo[];
  index: number;
  onFermer: () => void;
  onNaviguer: (i: number) => void;
}> = ({ photos, index, onFermer, onNaviguer }) => {
  const photo = photos[index];
  const fermeture = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    fermeture.current?.focus();
    const auClavier = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onFermer();
      if (e.key === 'ArrowRight') onNaviguer((index + 1) % photos.length);
      if (e.key === 'ArrowLeft') onNaviguer((index - 1 + photos.length) % photos.length);
    };
    document.addEventListener('keydown', auClavier);
    const debordement = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', auClavier);
      document.body.style.overflow = debordement;
    };
  }, [index, photos.length, onFermer, onNaviguer]);

  const commande =
    'flex h-12 w-12 cursor-pointer items-center justify-center rounded-bouton bg-white/10 text-white transition-colors duration-150 hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.legende}
      className="fixed inset-0 z-[70] flex flex-col bg-night-deep/96 p-4 sm:p-6"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-bold tabular-nums text-white/70">
          {index + 1} / {photos.length}
        </p>
        <button ref={fermeture} type="button" onClick={onFermer} aria-label="Fermer la visionneuse" className={commande}>
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center gap-3 py-4 sm:gap-5">
        <button type="button" onClick={() => onNaviguer((index - 1 + photos.length) % photos.length)} aria-label="Photographie précédente" className={commande}>
          <ChevronLeft className="h-6 w-6" aria-hidden="true" />
        </button>
        <img
          src={CHEMIN_PHOTO(photo.id)}
          alt={photo.legende}
          className="mx-auto max-h-full min-h-0 w-auto max-w-full flex-1 object-contain"
        />
        <button type="button" onClick={() => onNaviguer((index + 1) % photos.length)} aria-label="Photographie suivante" className={commande}>
          <ChevronRight className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <p className="mx-auto max-w-[70ch] text-center text-sm leading-relaxed text-white/85">
        {photo.legende}
      </p>
    </div>
  );
};

/* ------------------------------------------------------------------ *
 * Grille
 * ------------------------------------------------------------------ */

/**
 * Grille en colonnes de hauteurs libres.
 *
 * Les photographies n'ont pas toutes le même format. Une grille à cases
 * égales les recadrerait toutes au même rapport, ce qui coupe les plans de
 * groupe exactement là où se trouvent les visages. Les colonnes CSS
 * respectent le format d'origine ; le ratio connu réserve la place avant le
 * chargement, pour que la page ne saute pas.
 */
const GrillePhotos: React.FC<{ photos: Photo[]; onOuvrir: (i: number) => void }> = ({
  photos,
  onOuvrir,
}) => (
  <Cadence seuil={0.02} className="columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
    {photos.map((p, i) => (
      <CadenceItem key={p.id} className="break-inside-avoid">
        <button
          type="button"
          onClick={() => onOuvrir(i)}
          className="group relative block w-full cursor-pointer overflow-hidden rounded-carte bg-surface-sunken focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rve-green"
        >
          <img
            src={CHEMIN_MINIATURE(p.id)}
            alt={p.legende}
            loading="lazy"
            style={{ aspectRatio: p.ratio }}
            className="w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
          />
          <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-rve-green/92 p-3 text-left text-xs leading-snug text-white transition-transform duration-200 group-hover:translate-y-0 group-focus-visible:translate-y-0">
            {p.legende}
          </span>
        </button>
      </CadenceItem>
    ))}
  </Cadence>
);

/* ------------------------------------------------------------------ *
 * Pages
 * ------------------------------------------------------------------ */

const CouleursAlbum = ['bg-rve-green', 'bg-rve-red', 'bg-rve-yellow'];

export const PageGalerie: React.FC = () => {
  const albums = useContenu('albums');

  return (
    <>
      <PageHeader
        titre="Galerie photo"
        amorce="Les formations, ateliers et rencontres du réseau, classés par activité."
        image="/assets/img/hero/clm-32.jpg"
        cadrage="50% 35%"
        fil={[{ label: 'Ressources', vers: '/ressources' }, { label: 'Galerie' }]}
      />
      <PageAnimee>
      <PageBody>
        <Cadence className="grid gap-8 lg:grid-cols-3">
          {albums.map((album, i) => (
            <CadenceItem key={album.id}>
              <Lien
                vers={`/galerie/${album.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-carte border border-line bg-white transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="relative block aspect-[4/3] overflow-hidden bg-surface-sunken">
                  <img
                    src={CHEMIN_PHOTO(album.couverture)}
                    alt=""
                    aria-hidden="true"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span data-scroll="scale" className={`rve-gsap-icon absolute left-0 top-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white ${CouleursAlbum[i % 3]}`}>
                    <Camera className="h-3.5 w-3.5" aria-hidden="true" />
                    Album
                  </span>
                </span>
                <span className="flex flex-1 flex-col p-5">
                  <span className="font-display text-lg font-bold leading-snug text-ink group-hover:text-rve-green-ink">
                    {album.titre}
                  </span>
                  <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-ink-muted">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {album.lieu}
                    </span>
                    {album.date && <span>{album.date}</span>}
                  </span>
                  <span className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{album.resume}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-rve-green-ink">
                    Ouvrir l’album
                    <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </span>
              </Lien>
            </CadenceItem>
          ))}
        </Cadence>
      </PageBody>
      </PageAnimee>
    </>
  );
};

export const PageAlbum: React.FC<{ id: string }> = ({ id }) => {
  const albums = useContenu('albums');
  const album = albums.find((a) => a.id === id);
  const [ouverte, setOuverte] = useState<number | null>(null);
  const fermer = useCallback(() => setOuverte(null), []);

  if (!album) return <AlbumIntrouvable />;

  return (
    <>
      <PageHeader
        titre={album.titre}
        amorce={album.resume}
        image={CHEMIN_PHOTO(album.couverture)}
        cadrage="50% 35%"
        fil={[
          { label: 'Ressources', vers: '/ressources' },
          { label: 'Galerie', vers: '/galerie' },
          { label: album.titre },
        ]}
        meta={[album.lieu, album.date].filter(Boolean)}
      />
      <PageAnimee>
      <PageBody>
        <GrillePhotos photos={album.photos} onOuvrir={setOuverte} />

        <Reveal className="mt-14 border-t border-line pt-8">
          <Lien vers="/galerie" className="inline-flex items-center gap-2 text-sm font-bold text-rve-green-ink hover:underline">
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Tous les albums
          </Lien>
        </Reveal>
      </PageBody>
      </PageAnimee>

      {ouverte !== null && (
        <Visionneuse photos={album.photos} index={ouverte} onFermer={fermer} onNaviguer={setOuverte} />
      )}
    </>
  );
};

const AlbumIntrouvable: React.FC = () => (
  <>
    <PageHeader titre="Album introuvable" image="/assets/img/hero/wa-32.jpg" fil={[{ label: 'Galerie', vers: '/galerie' }]} />
    <PageBody>
      <TitreSection titre="Cet album n’existe pas" amorce="Il a pu être retiré ou renommé." />
      <Lien vers="/galerie" className="mt-6 inline-flex rounded-bouton bg-rve-green px-5 py-3 text-sm font-bold text-white hover:bg-rve-green-ink">
        Revenir à la galerie
      </Lien>
    </PageBody>
  </>
);
