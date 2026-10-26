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
        amorce="Découvrez les neuf organisations membres du RVE-Bénin, leurs domaines d’action, leurs territoires et leurs coordonnées disponibles."
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

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {liste.map((org) => (
            <li key={org.id}>
              <Lien
                vers={`/membres/${org.id}`}
                title={org.name}
                aria-label={`${org.name} : ${org.profileComplete ? org.description : 'fiche de présentation à compléter'}. Voir la fiche`}
                className="group relative flex h-full min-h-64 flex-col items-start overflow-hidden rounded-carte border border-line bg-surface p-6 transition-[border-color,box-shadow] duration-200 hover:border-rve-green/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-rve-green"
              >
                <span className={`flex h-24 w-44 items-center justify-start overflow-hidden ${['fran', 'bwaa', 'frh'].includes(org.id) ? '[&_img]:h-full [&_img]:max-h-none [&_img]:object-cover' : '[&_img]:max-h-24'}`}>{org.logo}</span>
                <span className="mt-4 font-display text-lg font-bold leading-snug text-ink">{org.name}</span>
                <span className="mt-2 text-sm leading-relaxed text-ink-soft">{org.profileComplete ? org.focus : 'Profil à compléter'}</span>
                {org.zone && <span className="mt-auto pt-4 text-xs font-medium text-rve-green-ink">{org.zone}</span>}
                <span className="pointer-events-none absolute inset-0 hidden flex-col justify-center bg-rve-green p-6 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:flex" aria-hidden="true">
                  <span className="font-display text-base font-bold leading-snug">{org.name}</span>
                  <span className="mt-3 line-clamp-5 text-sm leading-relaxed text-white/90">{org.profileComplete ? org.description : 'La fiche de présentation de cette organisation est en cours de collecte.'}</span>
                  {org.zone && <span className="mt-4 text-xs font-semibold text-white">Zone : {org.zone}</span>}
                  <span className="mt-4 text-xs font-bold">Voir la fiche →</span>
                </span>
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

  const autres = MEMBER_ORGANIZATIONS.filter((m) => m.id !== id && m.category === org.category).slice(0, 3);

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

            {(org.zone || org.address) && <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {org.zone && <div><h3 className="font-semibold text-ink">Zone d’intervention</h3><p className="mt-2 text-ink-soft">{org.zone}</p></div>}
              {org.address && <div><h3 className="font-semibold text-ink">Siège</h3><p className="mt-2 text-ink-soft">{org.address}</p></div>}
            </div>}

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
            <Encadre titre="Contacter l’organisation" className="mt-6">
              <div className="flex flex-col gap-3 text-sm break-words">
                {org.email && <a className="text-rve-green-ink underline" href={`mailto:${org.email}`}>{org.email}</a>}
                {org.phone && <a className="text-rve-green-ink underline" href={`tel:${org.phone.replace(/[^+\d]/g, '')}`}>{org.phone}</a>}
                {org.website && <a className="text-rve-green-ink underline" href={org.website} target="_blank" rel="noopener noreferrer">Site officiel ↗</a>}
                {org.socials?.map((s) => <a key={s.label} className="text-rve-green-ink underline" href={s.url} target="_blank" rel="noopener noreferrer">{s.label} ↗</a>)}
                {org.contactPerson && <p className="border-t border-line pt-3 text-ink-soft">Contact : {org.contactPerson}{org.contactRole ? `, ${org.contactRole}` : ''}</p>}
              </div>
            </Encadre>
          </aside>
        </div>

        <div className="mt-20 border-t border-line pt-12">
          <TitreSection niveau={3} titre={org.category === 'Partenaire Stratégique' ? 'Autres partenaires' : 'Autres organisations membres'} />
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
