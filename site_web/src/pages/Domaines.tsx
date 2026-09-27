import React from 'react';
import { DOMAINS } from '../components/DomainsSection';
import { PageHeader, PageBody } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { Tache } from '../components/Decor';
import {
  Bouton,
  Carte,
  CarteCorps,
  CartePied,
  Encadre,
  Grille,
  ListeCoches,
  TitreSection,
} from '../components/ui';

/**
 * Page « blocs » des domaines d'intervention.
 *
 * L'accueil n'en garde qu'une amorce ; le détail de ce que le réseau fait
 * dans chaque domaine vit ici. C'est ce transfert qui permet d'alléger
 * l'accueil sans rien perdre.
 */
export const PageDomaines: React.FC = () => (
  <>
    <PageHeader
      titre="Six domaines, une même exigence"
      amorce="Le réseau intervient là où les droits des femmes et des filles se jouent concrètement : la décision publique, la santé, l’école, le revenu, le climat et la preuve."
      image="/assets/img/pleniere-parakou.jpg"
      cadrage="58% 44%"
      fil={[{ label: 'Domaines' }]}
    />

    <PageBody className="relative">
      <Tache
        couleur="var(--color-rve-yellow)"
        className="absolute -left-28 top-32 h-64 w-64 opacity-[0.08]"
      />

      <Grille className="relative">
        {DOMAINS.map((domaine) => (
          <Carte key={domaine.id} vers={`/domaines/${domaine.id}`}>
            <CarteCorps>
              <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-[4px] border border-line bg-surface-sunken">
                {domaine.icon}
              </span>
              <span className="font-display text-lg font-bold leading-snug text-ink transition-colors duration-150 group-hover:text-rve-green-ink">
                {domaine.title}
              </span>
              <span className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                {domaine.shortDesc}
              </span>
              <CartePied>Explorer ce domaine</CartePied>
            </CarteCorps>
          </Carte>
        ))}
      </Grille>
    </PageBody>
  </>
);

/** Page d'un domaine. */
export const PageDomaine: React.FC<{ id: string }> = ({ id }) => {
  const domaine = DOMAINS.find((d) => String(d.id) === id);
  if (!domaine) return <PageIntrouvable quoi="Ce domaine" retour="/domaines" />;

  const suivant =
    DOMAINS[(DOMAINS.findIndex((d) => d.id === domaine.id) + 1) % DOMAINS.length];

  return (
    <>
      <PageHeader
        titre={domaine.title}
        image="/assets/img/atelier-ecriture.jpg"
        cadrage="50% 38%"
        fil={[{ label: 'Domaines', vers: '/domaines' }, { label: domaine.title }]}
        meta={[domaine.sdgGoal]}
      />

      <PageBody>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="max-w-[62ch] text-lg leading-relaxed text-ink">
                {domaine.shortDesc}
              </p>
              <p className="mt-6 max-w-[62ch] leading-relaxed text-ink-soft">
                {domaine.fullDesc}
              </p>
            </Reveal>

            <TitreSection
              niveau={3}
              titre="Ce que fait le réseau"
              className="mt-14"
            />
            <ListeCoches items={domaine.keyActions} className="mt-6" />
          </div>

          {/* Colonne latérale : elle situe la page, elle ne la répète pas. */}
          <aside className="lg:col-span-4 lg:col-start-9">
            <Encadre titre="Cadre de référence">
              <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
                {domaine.sdgGoal}
              </p>
              <span
                className="mt-6 block h-1 w-16 rounded-full"
                style={{ background: domaine.accentColor }}
                aria-hidden="true"
              />
            </Encadre>

            <Carte vers={`/domaines/${suivant.id}`} className="mt-6">
              <CarteCorps>
                <span className="text-[0.8125rem] text-ink-muted">
                  Domaine suivant
                </span>
                <span className="mt-1 font-display text-[0.9375rem] font-bold leading-snug text-ink transition-colors duration-150 group-hover:text-rve-green-ink">
                  {suivant.title}
                </span>
                <CartePied>Ouvrir</CartePied>
              </CarteCorps>
            </Carte>
          </aside>
        </div>
      </PageBody>
    </>
  );
};

/** Écran d'absence, partagé par toutes les pages de détail. */
export const PageIntrouvable: React.FC<{ quoi: string; retour: string }> = ({
  quoi,
  retour,
}) => (
  <PageBody className="pt-40 text-center">
    <h1 className="font-display text-3xl font-extrabold text-ink">
      {quoi} n’existe pas
    </h1>
    <p className="mx-auto mt-4 max-w-[48ch] leading-relaxed text-ink-soft">
      Le lien est peut-être ancien, ou la page a changé d’adresse.
    </p>
    <Bouton vers={retour} taille="lg" icone="fleche" className="mt-8">
      Revenir à la liste
    </Bouton>
  </PageBody>
);
