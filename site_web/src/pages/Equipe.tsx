import React from 'react';
import { PageBody, PageHeader } from '../components/PageHeader';
import { PageAnimee } from '../components/PageAnimee';
import { TitreSection, Encadre, ListeCoches } from '../components/ui';
import { Cadence, CadenceItem, Reveal } from '../components/Reveal';
import { Lien } from '../router';
import { useContenu } from '../data/contenu';
import { MEMBER_ORGANIZATIONS } from '../components/MemberLogos';
import { ArrowRight, Building2, ChevronLeft, Mail, UserRound } from 'lucide-react';

/* ------------------------------------------------------------------ *
 * Équipe
 * ------------------------------------------------------------------ */

/**
 * Les personnes du réseau.
 *
 * Deux ensembles cohabitent et ne doivent pas être confondus : les postes
 * statutaires, qui existent même sans titulaire désigné publiquement, et
 * les points focaux des organisations membres, qui sont des personnes
 * identifiées. Un poste sans titulaire est affiché comme tel plutôt que
 * masqué : c'est l'organigramme réel du réseau, pas une page vitrine.
 */
export const PageEquipe: React.FC = () => {
  const organes = useContenu('organes');
  const personnes = useContenu('personnes');
  const avecPostes = organes.filter((o) => o.postes.length > 0);

  return (
    <>
      <PageHeader
        titre="L’équipe du réseau"
        amorce="Les postes statutaires du réseau et les personnes qui représentent chaque organisation membre."
        image="/assets/img/hero/IMG_4809.jpg"
        cadrage="50% 35%"
        fil={[{ label: 'Le réseau', vers: '/reseau' }, { label: 'Équipe' }]}
      />
      <PageAnimee>
      <PageBody>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
          <div>
            <TitreSection
              titre="Les postes statutaires"
              amorce="Le Conseil d’Administration, le Conseil d’Orientation et de Surveillance et le Secrétariat Exécutif sont définis par les statuts. Les titulaires sont désignés par l’Assemblée Générale."
            />

            {avecPostes.map((organe) => (
              <section key={organe.id} className="mt-12" aria-labelledby={`organe-${organe.id}`}>
                <div className="flex flex-wrap items-baseline gap-3 border-b-2 border-rve-green/25 pb-3">
                  <span className="rounded-[4px] bg-rve-green px-2 py-0.5 text-xs font-bold text-white">
                    {organe.sigle}
                  </span>
                  <h3 id={`organe-${organe.id}`} className="font-display text-xl font-bold text-ink">
                    {organe.titre}
                  </h3>
                  <span className="text-sm text-ink-muted">{organe.role}</span>
                </div>

                <Cadence className="mt-5 grid gap-4 sm:grid-cols-2" as="ul">
                  {organe.postes.map((poste) => (
                    <CadenceItem key={organe.id + poste.id} as="li">
                      <article className="flex h-full flex-col rounded-carte border border-line bg-white p-5">
                        <div className="flex items-start gap-3">
                          <span className="rve-gsap-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-rest text-rve-green-deep">
                            <UserRound className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <div className="min-w-0">
                            <p className="font-display text-sm font-bold leading-snug text-ink">
                              {poste.intitule}
                            </p>
                            {poste.titulaire ? (
                              <p className="mt-1 text-sm font-semibold text-rve-green-ink">{poste.titulaire}</p>
                            ) : (
                              <p className="mt-1 text-xs font-semibold text-ink-muted">
                                Titulaire à communiquer par le réseau
                              </p>
                            )}
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{poste.mission}</p>
                      </article>
                    </CadenceItem>
                  ))}
                </Cadence>
              </section>
            ))}

            <section className="mt-16" aria-labelledby="points-focaux">
              <TitreSection
                niveau={2}
                titre="Les points focaux des organisations membres"
                amorce="Chaque organisation désigne la personne qui la représente auprès du réseau."
                className="[&_h2]:text-2xl"
              />
              <Cadence className="mt-8 grid gap-4 sm:grid-cols-2" as="ul">
                {personnes.map((p) => {
                  const org = MEMBER_ORGANIZATIONS.find((o) => o.id === p.organisation);
                  return (
                    <CadenceItem key={p.id} as="li">
                      <Lien
                        vers={`/equipe/${p.id}`}
                        className="group flex h-full items-start gap-4 rounded-carte border border-line bg-white p-5 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rve-green/10 font-display text-base font-extrabold text-rve-green-deep">
                          {initiales(p.nom)}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-display text-sm font-bold leading-snug text-ink group-hover:text-rve-green-ink">
                            {p.nom}
                          </span>
                          <span className="mt-0.5 block text-sm text-ink-soft">{p.fonction}</span>
                          {org && (
                            <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted">
                              <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                              {org.shortName}
                            </span>
                          )}
                        </span>
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-rve-green opacity-0 transition-[opacity,transform] duration-150 group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                      </Lien>
                    </CadenceItem>
                  );
                })}
              </Cadence>
              <p className="mt-5 text-sm text-ink-muted">
                Trois organisations n’ont pas encore transmis leur point focal. Leur fiche sera publiée dès réception.
              </p>
            </section>
          </div>

          <aside className="lg:pt-2">
            <Encadre titre="Voir aussi">
              <ListeCoches
                items={[
                  'L’organigramme complet du réseau',
                  'Les quatre organes de gouvernance',
                  'Les organisations membres',
                ]}
              />
              <div className="mt-5 flex flex-col gap-2">
                <Lien vers="/organigramme" className="inline-flex items-center gap-1.5 text-sm font-bold text-rve-green-ink hover:underline">
                  Organigramme <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Lien>
                <Lien vers="/gouvernance" className="inline-flex items-center gap-1.5 text-sm font-bold text-rve-green-ink hover:underline">
                  Gouvernance <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Lien>
                <Lien vers="/membres" className="inline-flex items-center gap-1.5 text-sm font-bold text-rve-green-ink hover:underline">
                  Organisations membres <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Lien>
              </div>
            </Encadre>
          </aside>
        </div>
      </PageBody>
      </PageAnimee>
    </>
  );
};

const initiales = (nom: string) =>
  nom
    .replace(/^(Sa Majesté Reine|Dr|Mme|M\.)\s+/i, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((m) => m[0])
    .join('')
    .toUpperCase();

/* ------------------------------------------------------------------ *
 * Fiche personne
 * ------------------------------------------------------------------ */

export const PagePersonne: React.FC<{ id: string }> = ({ id }) => {
  const personnes = useContenu('personnes');
  const personne = personnes.find((p) => p.id === id);
  const org = personne && MEMBER_ORGANIZATIONS.find((o) => o.id === personne.organisation);

  if (!personne) {
    return (
      <>
        <PageHeader titre="Fiche introuvable" image="/assets/img/hero/IMG_4809.jpg" fil={[{ label: 'Équipe', vers: '/equipe' }]} />
        <PageBody>
          <TitreSection titre="Cette fiche n’existe pas" amorce="Elle a pu être retirée ou renommée." />
          <Lien vers="/equipe" className="mt-6 inline-flex rounded-bouton bg-rve-green px-5 py-3 text-sm font-bold text-white hover:bg-rve-green-ink">
            Revenir à l’équipe
          </Lien>
        </PageBody>
      </>
    );
  }

  return (
    <>
      <PageHeader
        titre={personne.nom}
        amorce={`${personne.fonction}${org ? ` — ${org.name}` : ''}`}
        image="/assets/img/hero/IMG_4809.jpg"
        cadrage="50% 35%"
        fil={[{ label: 'Le réseau', vers: '/reseau' }, { label: 'Équipe', vers: '/equipe' }, { label: personne.nom }]}
      />
      <PageAnimee>
      <PageBody>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
          <div>
            <div className="flex flex-wrap items-center gap-5 rounded-carte border border-line bg-white p-6">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-rve-green/10 font-display text-2xl font-extrabold text-rve-green-deep">
                {initiales(personne.nom)}
              </span>
              <div className="min-w-0">
                <h2 className="font-display text-xl font-bold leading-snug text-ink">{personne.nom}</h2>
                <p className="mt-1 text-sm font-semibold text-rve-green-ink">{personne.fonction}</p>
                {org && <p className="mt-0.5 text-sm text-ink-soft">{org.name}</p>}
              </div>
            </div>

            {personne.bio ? (
              <p className="mt-8 max-w-[68ch] leading-relaxed text-ink-soft">{personne.bio}</p>
            ) : (
              <p className="mt-8 max-w-[68ch] rounded-carte border border-dashed border-line bg-surface-raised p-5 text-sm leading-relaxed text-ink-muted">
                La notice de présentation de cette personne sera publiée dès que l’organisation l’aura transmise.
                En attendant, la fiche de son organisation présente ses domaines et ses zones d’intervention.
              </p>
            )}

            {org && (
              <section className="mt-10 rounded-carte border border-line bg-surface-raised p-6" aria-labelledby="son-organisation">
                <p className="text-xs font-bold uppercase tracking-wider text-rve-green-ink">Son organisation</p>
                <h3 id="son-organisation" className="mt-2 font-display text-lg font-bold text-ink">{org.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{org.description}</p>
                <Lien vers={`/membres/${org.id}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-rve-green-ink hover:underline">
                  Voir la fiche de l’organisation <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Lien>
              </section>
            )}

            <Reveal className="mt-12 border-t border-line pt-8">
              <Lien vers="/equipe" className="inline-flex items-center gap-2 text-sm font-bold text-rve-green-ink hover:underline">
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Toute l’équipe
              </Lien>
            </Reveal>
          </div>

          <aside>
            <Encadre titre="Contact">
              <p className="text-sm leading-relaxed text-ink-soft">
                Les demandes adressées aux représentantes des organisations membres passent par le Secrétariat Exécutif.
              </p>
              <Lien vers="/contact" className="mt-4 inline-flex items-center gap-2 rounded-bouton bg-rve-green px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-rve-green-ink">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Contacter le réseau
              </Lien>
            </Encadre>
          </aside>
        </div>
      </PageBody>
      </PageAnimee>
    </>
  );
};
