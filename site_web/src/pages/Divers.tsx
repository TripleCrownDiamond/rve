import React, { useState } from 'react';
import { ArrowRight, Camera, Download, FileText } from 'lucide-react';
import { Lien } from '../router';
import { useContenu } from '../data/contenu';
import { CATEGORIES_DOCUMENTS } from '../data/documents';
import { CHEMIN_PHOTO } from '../data/galerie';
import { VALUES } from '../components/VisionValuesSection';
import { PageHeader, PageBody } from '../components/PageHeader';
import { PageIntrouvable } from './Domaines';
import { Lignes, Tache } from '../components/Decor';
import { CollegesSection } from '../components/CollegesSection';
import {
  Bouton,
  Carte,
  CarteCorps,
  CartePied,
  Encadre,
  Etiquette,
  Grille,
  ListeCoches,
  Meta,
  TitreSection,
} from '../components/ui';

/* ================================================================== *
 * Ressources
 * ================================================================== */

export const PageRessources: React.FC = () => {
  const albums = useContenu('albums');
  const documents = useContenu('documents');
  const [categorie, setCategorie] = useState<string>('Toutes');
  const categories = ['Toutes', ...CATEGORIES_DOCUMENTS];
  const liste = categorie === 'Toutes' ? documents : documents.filter((d) => d.categorie === categorie);

  return (
    <>
      <PageHeader
        titre="Ressources"
        amorce="La galerie photo des activités du réseau et les documents qu’il publie."
        image="/assets/img/hero/IMG_4809.jpg"
        cadrage="50% 38%"
        fil={[{ label: 'Ressources' }]}
      />

      <PageBody className="relative">
        <Lignes className="absolute -right-12 top-16 h-56 w-56 opacity-[0.06]" />

        {/* ---- Galerie ---- */}
        <section aria-labelledby="galerie-titre" className="relative">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <TitreSection
              titre="Galerie photo"
              amorce="Les formations, ateliers et rencontres du réseau, classés par activité."
            />
            <Lien vers="/galerie" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-rve-green-ink hover:underline">
              Toute la galerie <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Lien>
          </div>

          <Grille colonnes={3} className="mt-8">
            {albums.map((album, i) => (
              <Lien
                key={album.id}
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
                  <span className={`absolute left-0 top-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white ${['bg-rve-green', 'bg-rve-red', 'bg-rve-yellow'][i % 3]}`}>
                    <Camera className="h-3.5 w-3.5" aria-hidden="true" />
                    Album
                  </span>
                </span>
                <span className="flex flex-1 flex-col p-5">
                  <span className="font-display text-base font-bold leading-snug text-ink group-hover:text-rve-green-ink">
                    {album.titre}
                  </span>
                  {album.date && <span className="mt-1.5 block text-xs font-semibold text-ink-muted">{album.date}</span>}
                </span>
              </Lien>
            ))}
          </Grille>
        </section>

        {/* ---- Documents ---- */}
        <section aria-labelledby="documents-titre" className="relative mt-20 border-t border-line pt-16">
          <TitreSection
            titre="Documents et publications"
            amorce="Rapports d’activités, études, guides, notes de plaidoyer et communiqués publiés par le réseau."
          />

          {documents.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategorie(c)}
                  aria-pressed={categorie === c}
                  className={`cursor-pointer rounded-bouton border px-4 py-2 text-[0.8125rem] font-semibold transition-colors duration-150 ${
                    categorie === c
                      ? 'border-rve-green bg-rve-green/8 text-rve-green-ink'
                      : 'border-line text-ink-soft hover:bg-surface-sunken hover:text-ink'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          {liste.length > 0 ? (
            <Grille colonnes={2} className="mt-8">
              {liste.map((res) => (
                <Carte key={res.id} vers={`/ressources/${res.id}`}>
                  <CarteCorps>
                    <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-[4px] border border-line bg-surface-sunken">
                      <FileText className="h-5 w-5 text-rve-green" aria-hidden="true" />
                    </span>
                    <Etiquette>{res.categorie}</Etiquette>
                    <span className="mt-2 font-display text-lg font-bold leading-snug text-ink">{res.titre}</span>
                    <span className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-soft">{res.description}</span>
                    <Meta items={[res.annee, res.pages ? `${res.pages} pages` : '', `${res.format} · ${res.poids}`].filter(Boolean)} className="mt-5" />
                    <CartePied>Consulter</CartePied>
                  </CarteCorps>
                </Carte>
              ))}
            </Grille>
          ) : (
            /* Les statuts et le règlement intérieur figuraient ici. Ce sont
               des pièces de gouvernance interne : elles ont été retirées du
               site à la demande du réseau. */
            <div className="mt-8 rounded-carte border border-dashed border-line bg-surface-raised p-8">
              <p className="max-w-[62ch] leading-relaxed text-ink-soft">
                Aucun document n’est encore ouvert au téléchargement. Les rapports d’activités, études et notes de
                plaidoyer seront publiés ici au fur et à mesure de leur validation par le réseau.
              </p>
              <Lien vers="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-rve-green-ink hover:underline">
                Demander un document au Secrétariat Exécutif <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Lien>
            </div>
          )}
        </section>
      </PageBody>
    </>
  );
};

export const PageRessource: React.FC<{ id: string }> = ({ id }) => {
  const documents = useContenu('documents');
  const res = documents.find((r) => r.id === id);
  if (!res) return <PageIntrouvable quoi="Ce document" retour="/ressources" />;

  return (
    <>
      <PageHeader
        titre={res.titre}
        image="/assets/img/hero/wa-09.jpg"
        fil={[{ label: 'Ressources', vers: '/ressources' }, { label: res.categorie }]}
        meta={[res.annee, res.pages ? `${res.pages} pages` : ''].filter(Boolean)}
      />

      <PageBody>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <p className="max-w-[64ch] text-lg leading-relaxed text-ink">{res.description}</p>
          </div>

          <aside className="lg:col-span-3 lg:col-start-10">
            <Encadre titre="Le document">
              <dl className="flex flex-col gap-3 text-[0.875rem]">
                {[
                  ['Catégorie', res.categorie],
                  ['Année', res.annee],
                  ...(res.pages ? [['Pages', String(res.pages)]] : []),
                  ['Format', `${res.format} · ${res.poids}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4">
                    <dt className="text-ink-muted">{k}</dt>
                    <dd className="font-medium text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <a href={res.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-bouton bg-rve-green px-5 py-3 text-sm font-bold text-white hover:bg-rve-green-ink">
                <Download className="h-4 w-4" aria-hidden="true" />
                Télécharger
              </a>
            </Encadre>
          </aside>
        </div>
      </PageBody>
    </>
  );
};

/* ================================================================== *
 * Gouvernance
 * ================================================================== */

export const PageGouvernance: React.FC = () => {
  // Les organes sont décrits une seule fois, dans `data/equipe`. La page les
  // lit par la couche de contenu : une description de l'Assemblée Générale
  // recopiée à deux endroits finit toujours par diverger.
  const organes = useContenu('organes');

  return (
  <>
    <PageHeader
      titre="Une gouvernance démocratique et redevable"
      amorce="Quatre organes définis dans les statuts pour orienter, administrer, contrôler et coordonner le réseau."
      image="/assets/img/hero/wa-09.jpg"
      cadrage="50% 40%"
      fil={[{ label: 'Le réseau', vers: '/reseau' }, { label: 'Gouvernance' }]}
    />

    <PageBody className="relative">
      <Tache
        couleur="var(--color-rve-green)"
        className="absolute -left-24 top-40 h-56 w-56 opacity-[0.07]"
      />

      <div className="relative mb-10 flex flex-wrap gap-3">
        <Lien vers="/organigramme" className="inline-flex items-center gap-2 rounded-bouton bg-rve-green px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-rve-green-ink">
          Voir l’organigramme <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Lien>
        <Lien vers="/equipe" className="inline-flex items-center gap-2 rounded-bouton border border-line bg-white px-5 py-3 text-sm font-bold text-ink-soft transition-colors hover:border-rve-green hover:text-rve-green-ink">
          Les personnes du réseau
        </Lien>
      </div>

      <div className="relative flex flex-col gap-8">
        {organes.map((organe, i) => (
          <div
            key={organe.id}
            className="grid gap-8 overflow-hidden rounded-carte border border-line bg-surface p-7 sm:p-9 lg:grid-cols-12 lg:gap-12"
          >
            <span
              aria-hidden="true"
              className={`-mx-7 -mt-7 block h-1.5 sm:-mx-9 sm:-mt-9 lg:col-span-12 ${['bg-rve-green', 'bg-rve-red', 'bg-rve-yellow', 'bg-rve-lime'][i % 4]}`}
            />
            <div className="lg:col-span-7">
              <Etiquette>{organe.role}</Etiquette>
              <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink">
                {organe.sigle} — {organe.titre}
              </h2>
              <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">{organe.description}</p>
              <ListeCoches items={organe.attributions} className="mt-8" />
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <Encadre titre="Fonctionnement">
                <dl className="flex flex-col gap-4 text-[0.875rem]">
                  <div>
                    <dt className="text-ink-muted">Périodicité</dt>
                    <dd className="mt-0.5 font-medium text-ink">{organe.rythme}</dd>
                  </div>
                  <div className="border-t border-line-soft pt-3">
                    <dt className="text-ink-muted">Composition</dt>
                    <dd className="mt-0.5 font-medium text-ink">{organe.composition}</dd>
                  </div>
                </dl>
              </Encadre>
            </div>
          </div>
        ))}
      </div>
    </PageBody>
  </>
  );
};

/* ================================================================== *
 * Le réseau (à propos)
 * ================================================================== */

export const PageReseau: React.FC = () => (
  <>
    <PageHeader
      titre="Des organisations réunies pour agir ensemble"
      amorce="Créé en 2025, le RVE-Bénin fédère des organisations féminines pour mutualiser leurs ressources, renforcer leurs capacités et porter un plaidoyer collectif."
      image="/assets/img/participante-table.jpg"
      cadrage="55% 35%"
      fil={[{ label: 'Le réseau' }]}
    />

    <PageBody className="relative">
      <Lignes className="absolute -right-10 top-20 h-56 w-56 opacity-[0.06]" />

      <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <blockquote className="font-display text-xl leading-snug text-ink sm:text-2xl">
            « Fédérer les organisations féminines de la société civile autour
            d’actions concertées pour promouvoir les droits des femmes, des
            filles et des enfants, renforcer les capacités des membres,
            développer des partenariats stratégiques et porter un plaidoyer
            collectif. »
          </blockquote>
          <p className="mt-8 max-w-[62ch] leading-relaxed text-ink-soft">
            Cette position commune s’adresse aux ministères sectoriels, aux
            bailleurs, aux autorités traditionnelles et aux assemblées locales.
          </p>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <figure className="overflow-hidden rounded-carte border border-line bg-surface">
            <img
              src="/assets/img/atelier-ecriture.jpg"
              alt="Atelier de travail entre organisations membres"
              width={720}
              height={900}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <figcaption className="flex items-center justify-between gap-4 border-t border-line-soft px-6 py-4 text-[0.8125rem]">
              <span className="text-ink-muted">Siège de coordination</span>
              <span className="font-semibold text-ink">Cotonou, Bénin</span>
            </figcaption>
          </figure>
        </aside>
      </div>
    </PageBody>

    <CollegesSection />

    <PageBody>
      <TitreSection
        titre="Les valeurs qui engagent le réseau"
        amorce="Elles ne décorent pas la charte : elles fixent ce que les organisations membres se doivent les unes aux autres."
      />
      <Grille className="mt-12">
        {VALUES.map((valeur) => (
          <Carte key={valeur.title}>
            <CarteCorps>
              <span
                className="mb-5 block h-1 w-12 rounded-full"
                style={{ background: valeur.accent }}
                aria-hidden="true"
              />
              <h3 className="font-display text-lg font-bold text-ink">
                {valeur.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {valeur.desc}
              </p>
            </CarteCorps>
          </Carte>
        ))}
      </Grille>
    </PageBody>
  </>
);
