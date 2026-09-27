import React, { useState } from 'react';
import { Download, FileText } from 'lucide-react';
import { RESOURCES } from '../components/ResourcesSection';
import { GOVERNANCE_BODIES } from '../components/GovernanceSection';
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
  const categories = ['Toutes', ...new Set(RESOURCES.map((r) => r.category))];
  const [categorie, setCategorie] = useState('Toutes');
  const liste =
    categorie === 'Toutes'
      ? RESOURCES
      : RESOURCES.filter((r) => r.category === categorie);

  return (
    <>
      <PageHeader
        titre="Ressources et publications"
        amorce="Rapports, guides de plaidoyer et notes d’orientation produits par le réseau et ses organisations membres."
        image="/assets/img/atelier-ecriture.jpg"
        cadrage="50% 42%"
        fil={[{ label: 'Ressources' }]}
      />

      <PageBody className="relative">
        <Lignes className="absolute -right-12 top-16 h-56 w-56 opacity-[0.06]" />

        <div className="relative mb-10 flex flex-wrap items-center gap-2">
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

        <Grille colonnes={2} className="relative">
          {liste.map((res) => (
            <Carte key={res.id} vers={`/ressources/${res.id}`}>
              <CarteCorps>
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-[4px] border border-line bg-surface-sunken">
                  <FileText className="h-5 w-5 text-rve-green" aria-hidden="true" />
                </span>
                <Etiquette>{res.category}</Etiquette>
                <span className="mt-2 font-display text-lg font-bold leading-snug text-ink">
                  {res.title}
                </span>
                <span className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                  {res.description}
                </span>
                <Meta
                  items={[res.year, `${res.pages} pages`, `${res.format} · ${res.size}`]}
                  className="mt-5"
                />
                <CartePied>Consulter</CartePied>
              </CarteCorps>
            </Carte>
          ))}
        </Grille>
      </PageBody>
    </>
  );
};

export const PageRessource: React.FC<{ id: string }> = ({ id }) => {
  const res = RESOURCES.find((r) => r.id === id);
  if (!res) return <PageIntrouvable quoi="Cette ressource" retour="/ressources" />;

  return (
    <>
      <PageHeader
        titre={res.title}
        image="/assets/img/participante-table.jpg"
        fil={[{ label: 'Ressources', vers: '/ressources' }, { label: res.category }]}
        meta={[res.year, `${res.pages} pages`]}
      />

      <PageBody>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <p className="max-w-[64ch] text-lg leading-relaxed text-ink">
              {res.description}
            </p>
          </div>

          <aside className="lg:col-span-3 lg:col-start-10">
            <Encadre titre="Le document">
              <dl className="flex flex-col gap-3 text-[0.875rem]">
                {[
                  ['Catégorie', res.category],
                  ['Année', res.year],
                  ['Pages', String(res.pages)],
                  ['Format', `${res.format} · ${res.size}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4">
                    <dt className="text-ink-muted">{k}</dt>
                    <dd className="font-medium text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <Bouton icone="fleche" className="mt-6 w-full">
                <span className="inline-flex items-center gap-2">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Télécharger
                </span>
              </Bouton>
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

export const PageGouvernance: React.FC = () => (
  <>
    <PageHeader
      titre="Une gouvernance démocratique et redevable"
      amorce="Quatre organes, des mandats distincts, des comptes rendus systématiques : la structure qui permet à neuf organisations de décider ensemble."
      image="/assets/img/pleniere-parakou.jpg"
      cadrage="50% 40%"
      fil={[{ label: 'Gouvernance' }]}
    />

    <PageBody className="relative">
      <Tache
        couleur="var(--color-rve-green)"
        className="absolute -left-24 top-40 h-56 w-56 opacity-[0.07]"
      />

      <div className="relative flex flex-col gap-8">
        {GOVERNANCE_BODIES.map((organe) => (
          <div
            key={organe.title}
            className="grid gap-8 rounded-carte border border-line bg-surface p-7 sm:p-9 lg:grid-cols-12 lg:gap-12"
          >
            <div className="lg:col-span-7">
              <Etiquette>{organe.role}</Etiquette>
              <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink">
                {organe.title}
              </h2>
              <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">
                {organe.desc}
              </p>
              <ListeCoches items={organe.powers} className="mt-8" />
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <Encadre titre="Fonctionnement">
                <dl className="flex flex-col gap-4 text-[0.875rem]">
                  <div>
                    <dt className="text-ink-muted">Périodicité</dt>
                    <dd className="mt-0.5 font-medium text-ink">
                      {organe.frequency}
                    </dd>
                  </div>
                  <div className="border-t border-line-soft pt-3">
                    <dt className="text-ink-muted">Composition</dt>
                    <dd className="mt-0.5 font-medium text-ink">
                      {organe.composition}
                    </dd>
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

/* ================================================================== *
 * Le réseau (à propos)
 * ================================================================== */

export const PageReseau: React.FC = () => (
  <>
    <PageHeader
      titre="Neuf organisations qui cessent de travailler chacune de son côté"
      amorce="Le RVE-Bénin réunit des organisations féminines qui intervenaient séparément sur les mêmes terrains. Elles préparent désormais leurs positions ensemble et les portent d’une seule voix."
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
