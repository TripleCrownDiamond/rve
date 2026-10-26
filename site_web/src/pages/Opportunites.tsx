import React, { useState } from 'react';
import { Briefcase, Calendar, FileText, MapPin, Clock } from 'lucide-react';
import { PageHeader, PageBody } from '../components/PageHeader';
import { PageIntrouvable } from './Domaines';
import { Lignes } from '../components/Decor';
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

/**
 * Opportunités — carrières, appels d'offres et appels à candidatures.
 *
 * Les trois vivent sur une même page plutôt que sur trois pages séparées :
 * ce sont les mêmes lecteurs (candidates, prestataires, consultantes), le
 * même geste (consulter une échéance, postuler) et le même rythme de
 * publication. Trois rubriques distinctes en donneraient deux vides la
 * plupart du temps, ce qui est le meilleur moyen de faire croire qu'il ne
 * se passe rien.
 *
 * Le contenu ci-dessous est un jeu d'exemples destiné à la maquette. Le
 * réseau remplacera ces entrées par ses publications réelles.
 */

export type TypeOpportunite =
  | 'Offre d’emploi'
  | 'Appel d’offres'
  | 'Appel à candidatures'
  | 'Stage';

export interface Opportunite {
  id: string;
  titre: string;
  type: TypeOpportunite;
  resume: string;
  lieu: string;
  contrat: string;
  publie: string;
  echeance: string;
  /** Vraie si la date limite est passée : la carte le dit au lieu de mentir. */
  close?: boolean;
  missions: string[];
  profil: string[];
}

export const OPPORTUNITES: Opportunite[] = [];

const ICONES: Record<TypeOpportunite, React.ElementType> = {
  'Offre d’emploi': Briefcase,
  'Appel d’offres': FileText,
  'Appel à candidatures': Calendar,
  Stage: Clock,
};

const TYPES = ['Toutes', ...new Set(OPPORTUNITES.map((o) => o.type))];

export const PageOpportunites: React.FC = () => {
  const [type, setType] = useState('Toutes');
  const liste =
    type === 'Toutes' ? OPPORTUNITES : OPPORTUNITES.filter((o) => o.type === type);

  return (
    <>
      <PageHeader
        titre="Opportunités"
        amorce="Postes à pourvoir, appels d’offres et appels à candidatures ouverts au sein du réseau et de ses organisations membres."
        image="/assets/img/atelier-ecriture.jpg"
        cadrage="50% 40%"
        fil={[{ label: 'Opportunités' }]}
      />

      <PageBody className="relative">
        <Lignes className="absolute -right-10 top-16 h-56 w-56 opacity-[0.06]" />

        <div className="relative mb-10 flex flex-wrap items-center gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              aria-pressed={type === t}
              className={`cursor-pointer rounded-bouton border px-4 py-2 text-[0.8125rem] font-semibold transition-colors duration-150 ${
                type === t
                  ? 'border-rve-green bg-rve-green/8 text-rve-green-ink'
                  : 'border-line text-ink-soft hover:bg-surface-sunken hover:text-ink'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {liste.length === 0 && <div className="relative rounded-carte border border-line bg-surface p-8"><h2 className="font-display text-xl font-bold text-ink">Aucune opportunité publiée actuellement</h2><p className="mt-3 max-w-[60ch] text-ink-soft">Les appels validés par le réseau et ses organisations membres paraîtront ici avec leurs conditions et dates limites.</p></div>}
        <Grille colonnes={2} className="relative">
          {liste.map((o) => {
            const Icone = ICONES[o.type];
            return (
              <Carte key={o.id} vers={`/opportunites/${o.id}`}>
                <CarteCorps>
                  <span className="mb-5 flex items-center justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-[4px] border border-line bg-surface-sunken">
                      <Icone className="h-5 w-5 text-rve-green" aria-hidden="true" />
                    </span>
                    {/* Une échéance dépassée est annoncée, pas masquée :
                        laisser croire qu'une candidature est ouverte fait
                        perdre du temps à la personne qui la prépare. */}
                    <span
                      className={`rounded-bouton px-2.5 py-1 text-[0.75rem] font-semibold ${
                        o.close
                          ? 'bg-surface-sunken text-ink-muted'
                          : 'bg-rve-green/10 text-rve-green-ink'
                      }`}
                    >
                      {o.close ? 'Clôturé' : 'Ouvert'}
                    </span>
                  </span>

                  <Etiquette>{o.type}</Etiquette>
                  <span className="mt-2 font-display text-lg font-bold leading-snug text-ink">
                    {o.titre}
                  </span>
                  <span className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                    {o.resume}
                  </span>
                  <Meta
                    items={[o.lieu, o.contrat, `Jusqu’au ${o.echeance}`]}
                    className="mt-5"
                  />
                  <CartePied>Voir l’annonce</CartePied>
                </CarteCorps>
              </Carte>
            );
          })}
        </Grille>
      </PageBody>
    </>
  );
};

export const PageOpportunite: React.FC<{ id: string }> = ({ id }) => {
  const o = OPPORTUNITES.find((x) => x.id === id);
  if (!o) return <PageIntrouvable quoi="Cette annonce" retour="/opportunites" />;

  return (
    <>
      <PageHeader
        titre={o.titre}
        image="/assets/img/participante-table.jpg"
        fil={[{ label: 'Opportunités', vers: '/opportunites' }, { label: o.type }]}
        meta={[o.lieu, o.contrat, o.close ? 'Clôturé' : `Jusqu’au ${o.echeance}`]}
      />

      <PageBody>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="max-w-[62ch] text-lg leading-relaxed text-ink">
              {o.resume}
            </p>

            <TitreSection niveau={3} titre="Missions" className="mt-12" />
            <ListeCoches items={o.missions} className="mt-6" />

            <TitreSection niveau={3} titre="Profil recherché" className="mt-12" />
            <ListeCoches items={o.profil} className="mt-6" />
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <Encadre titre="L’annonce">
              <dl className="flex flex-col gap-3 text-[0.875rem]">
                {[
                  ['Type', o.type],
                  ['Lieu', o.lieu],
                  ['Conditions', o.contrat],
                  ['Publiée le', o.publie],
                  ['Date limite', o.echeance],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4">
                    <dt className="shrink-0 text-ink-muted">{k}</dt>
                    <dd className="text-right font-medium text-ink">{v}</dd>
                  </div>
                ))}
              </dl>

              {o.close ? (
                <p className="mt-6 flex items-start gap-2 rounded-bouton bg-surface-sunken p-3 text-[0.8125rem] leading-relaxed text-ink-soft">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  Les candidatures sont closes. Les prochaines annonces
                  paraîtront sur cette page.
                </p>
              ) : (
                <Bouton icone="fleche" className="mt-6 w-full">
                  Déposer une candidature
                </Bouton>
              )}
            </Encadre>
          </aside>
        </div>
      </PageBody>
    </>
  );
};
