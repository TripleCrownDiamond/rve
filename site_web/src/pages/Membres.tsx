import React, { useState } from 'react';
import { MEMBER_ORGANIZATIONS } from '../components/MemberLogos';
import { PageHeader, PageBody } from '../components/PageHeader';
import { PageIntrouvable } from './Domaines';
import { Arc } from '../components/Decor';
import {
  Bouton,
  Carte,
  CarteCorps,
  CartePied,
  Encadre,
  Grille,
  TitreSection,
} from '../components/ui';
import { Lien } from '../router';

const FILTRES = [
  { cle: 'tous', label: 'Toutes' },
  { cle: 'membres', label: 'Organisations membres' },
  { cle: 'partenaires', label: 'Partenaires' },
] as const;

/** Grille de marques. Le logo est le sujet ; le nom vit dans la fiche. */
export const PageMembres: React.FC = () => {
  const [filtre, setFiltre] = useState<(typeof FILTRES)[number]['cle']>('tous');

  const liste = MEMBER_ORGANIZATIONS.filter((m) => {
    if (filtre === 'partenaires') return m.category === 'Partenaire Stratégique';
    if (filtre === 'membres') return m.category !== 'Partenaire Stratégique';
    return true;
  });

  const compte = (cle: string) =>
    cle === 'tous'
      ? MEMBER_ORGANIZATIONS.length
      : cle === 'partenaires'
        ? MEMBER_ORGANIZATIONS.filter((m) => m.category === 'Partenaire Stratégique').length
        : MEMBER_ORGANIZATIONS.filter((m) => m.category !== 'Partenaire Stratégique').length;

  return (
    <>
      <PageHeader
        titre="Les organisations du réseau"
        amorce="Neuf organisations féminines de la société civile béninoise, réparties en trois collèges thématiques, et les partenaires qui les appuient."
        image="/assets/img/pleniere-parakou.jpg"
        cadrage="40% 45%"
        fil={[{ label: 'Membres' }]}
      />

      <PageBody className="relative">
        <Arc className="absolute -right-16 top-20 h-28 w-64 opacity-[0.07]" />

        <div className="relative mb-10 flex flex-wrap items-center gap-2">
          {FILTRES.map((f) => (
            <button
              key={f.cle}
              type="button"
              onClick={() => setFiltre(f.cle)}
              aria-pressed={filtre === f.cle}
              className={`cursor-pointer rounded-bouton border px-4 py-2 text-[0.8125rem] font-semibold transition-colors duration-150 ${
                filtre === f.cle
                  ? 'border-rve-green bg-rve-green/8 text-rve-green-ink'
                  : 'border-line text-ink-soft hover:bg-surface-sunken hover:text-ink'
              }`}
            >
              {`${f.label} (${compte(f.cle)})`}
            </button>
          ))}
        </div>

        {/* Rangées centrées plutôt qu'une grille à colonnes fixes : le
            filtre fait varier le compte, et une grille rigide laisserait
            des cellules orphelines dans un angle à chaque changement. */}
        <ul className="flex flex-wrap justify-center gap-4 sm:gap-5">
          {liste.map((org) => (
            <li key={org.id}>
              <Lien
                vers={`/membres/${org.id}`}
                title={org.name}
                aria-label={`${org.name} — voir la fiche`}
                className="group flex h-28 w-[calc(50vw-2.5rem)] min-w-[9.5rem] max-w-[12rem] cursor-pointer items-center justify-center rounded-carte border border-line bg-surface px-5 transition-[border-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 hover:border-rve-green/40 hover:shadow-md sm:h-32 sm:w-44 sm:px-6 lg:w-48 [&_img]:opacity-55 [&_img]:mix-blend-multiply [&_img]:brightness-[var(--densite,1)] [&_img]:grayscale [&_img]:transition-[filter,opacity] [&_img]:duration-200 hover:[&_img]:opacity-100 hover:[&_img]:brightness-100 hover:[&_img]:grayscale-0"
              >
                {org.logo}
              </Lien>
            </li>
          ))}
        </ul>
      </PageBody>
    </>
  );
};

/** Fiche d'une organisation. */
export const PageMembre: React.FC<{ id: string }> = ({ id }) => {
  const org = MEMBER_ORGANIZATIONS.find((m) => m.id === id);
  if (!org) return <PageIntrouvable quoi="Cette organisation" retour="/membres" />;

  const autres = MEMBER_ORGANIZATIONS.filter((m) => m.id !== id).slice(0, 3);

  return (
    <>
      <PageHeader
        titre={org.name}
        image="/assets/img/atelier-ecriture.jpg"
        cadrage="45% 40%"
        fil={[{ label: 'Membres', vers: '/membres' }, { label: org.shortName }]}
        meta={[org.category]}
      />

      <PageBody>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="max-w-[62ch] text-lg leading-relaxed text-ink">
              {org.description}
            </p>

            <TitreSection niveau={3} titre="Champ d’intervention" className="mt-14" />
            <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">
              {org.focus}
            </p>

            <Bouton vers="/membres" icone="fleche" ton="secondaire" className="mt-10">
              Voir toutes les organisations
            </Bouton>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            {/* La marque en grand, en couleur : sur sa propre fiche, une
                organisation n'a plus à se fondre dans un ensemble. */}
            <div className="flex h-44 items-center justify-center rounded-carte border border-line bg-surface p-8">
              {org.logo}
            </div>

            <Encadre titre="Statut dans le réseau" className="mt-6">
              <p className="text-[0.9375rem] text-ink">{org.category}</p>
            </Encadre>
          </aside>
        </div>

        <div className="mt-20 border-t border-line pt-12">
          <TitreSection niveau={3} titre="Autres organisations membres" />
          <Grille className="mt-8">
            {autres.map((m) => (
              <Carte key={m.id} vers={`/membres/${m.id}`}>
                <CarteCorps>
                  <span className="flex h-20 items-center justify-start">
                    {m.logo}
                  </span>
                  <span className="mt-4 font-display text-[0.9375rem] font-bold leading-snug text-ink">
                    {m.name}
                  </span>
                  <CartePied>Voir la fiche</CartePied>
                </CarteCorps>
              </Carte>
            ))}
          </Grille>
        </div>
      </PageBody>
    </>
  );
};
