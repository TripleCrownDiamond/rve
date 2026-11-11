import React from 'react';
import { PageBody, PageHeader } from '../components/PageHeader';
import { PageAnimee } from '../components/PageAnimee';
import { TitreSection } from '../components/ui';
import { Cadence, CadenceItem, Reveal } from '../components/Reveal';
import { Lien } from '../router';
import { useContenu } from '../data/contenu';
import { TYPES_PARTENAIRES } from '../data/partenaires';
import { ArrowUpRight, Banknote, Building2, Handshake } from 'lucide-react';

/**
 * Partenaires du réseau.
 *
 * À ne pas confondre avec les organisations membres : les membres
 * composent le réseau, les partenaires l'appuient sans en faire partie.
 * La page le dit explicitement en ouverture, parce que c'est la confusion
 * la plus fréquente sur les sites de réseaux associatifs.
 *
 * Les familles vides sont affichées quand même, avec leur définition : la
 * page décrit ce que le réseau cherche, et pas seulement ce qu'il a déjà.
 */

const ICONES = { Technique: Handshake, Financier: Banknote, Institutionnel: Building2 };
const TEINTES = {
  Technique: 'bg-rve-green',
  Financier: 'bg-rve-yellow',
  Institutionnel: 'bg-rve-red',
} as const;

export const PagePartenaires: React.FC = () => {
  const partenaires = useContenu('partenaires');

  return (
    <>
      <PageHeader
        titre="Nos partenaires"
        amorce="Les organisations techniques, financières et institutionnelles qui appuient le réseau. Elles sont distinctes des organisations membres, qui le composent."
        image="/assets/img/hero/clm-35.jpg"
        cadrage="50% 35%"
        fil={[{ label: 'S’engager' }, { label: 'Partenaires' }]}
      />
      <PageAnimee>
      <PageBody>
        {TYPES_PARTENAIRES.map((famille) => {
          const liste = partenaires.filter((p) => p.type === famille.type);
          const Icone = ICONES[famille.type];
          return (
            <section key={famille.type} className="mb-16 last:mb-0" aria-labelledby={`fam-${famille.type}`}>
              <div className="flex items-start gap-4 border-b-2 border-line pb-4">
                <span data-scroll="scale" className={`rve-gsap-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-carte ${TEINTES[famille.type]} text-white`}>
                  <Icone className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 id={`fam-${famille.type}`} className="font-display text-xl font-bold text-ink">
                    {famille.titre}
                  </h2>
                  <p className="mt-1 max-w-[62ch] text-sm leading-relaxed text-ink-soft">{famille.texte}</p>
                </div>
              </div>

              {liste.length > 0 ? (
                <Cadence className="mt-6 grid gap-6 lg:grid-cols-2" as="ul">
                  {liste.map((p) => (
                    <CadenceItem key={p.id} as="li">
                      <article className="flex h-full flex-col rounded-carte border border-line bg-white p-6">
                        <div className="flex items-start gap-5">
                          {p.logo && (
                            <span className="flex h-16 w-28 shrink-0 items-center justify-center rounded-[4px] border border-line-soft bg-white p-2">
                              <img src={p.logo} alt={`Logo ${p.nom}`} loading="lazy" className="max-h-full max-w-full object-contain" />
                            </span>
                          )}
                          <div className="min-w-0">
                            <h3 className="font-display text-base font-bold leading-snug text-ink">{p.nom}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.description}</p>
                          </div>
                        </div>
                        <div className="mt-5 flex-1 rounded-[4px] bg-surface-rest p-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-rve-green-deep">Nature de l’appui</p>
                          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{p.appui}</p>
                        </div>
                        {p.siteWeb && (
                          <a
                            href={p.siteWeb}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-rve-green-ink hover:underline"
                          >
                            Site de {p.nom}
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </a>
                        )}
                      </article>
                    </CadenceItem>
                  ))}
                </Cadence>
              ) : (
                <p className="mt-6 rounded-carte border border-dashed border-line bg-surface-raised p-6 text-sm leading-relaxed text-ink-muted">
                  Aucun partenariat de cette nature n’est encore formalisé. Le réseau est ouvert aux organisations
                  qui souhaitent soutenir ses actions dans ce cadre.
                </p>
              )}
            </section>
          );
        })}

        <Reveal className="mt-16 overflow-hidden rounded-carte bg-rve-green">
          <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <TitreSection
                niveau={2}
                titre="Devenir partenaire du réseau"
                amorce="Le réseau établit des alliances avec les institutions étatiques, les collectivités locales, les partenaires techniques et financiers, les instituts de recherche, le secteur privé et les médias."
                className="[&_h2]:text-white [&_h2]:text-2xl [&_p]:text-white/90"
              />
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Lien vers="/contact" className="inline-flex items-center rounded-bouton bg-rve-yellow px-5 py-3 text-sm font-bold text-rve-green-deep transition-colors hover:bg-white">
                Contacter le réseau
              </Lien>
              <Lien vers="/partenariats" className="inline-flex items-center rounded-bouton border-2 border-white/70 px-5 py-[0.6875rem] text-sm font-bold text-white transition-colors hover:bg-white hover:text-rve-green-ink">
                Formes de collaboration
              </Lien>
            </div>
          </div>
        </Reveal>
      </PageBody>
      </PageAnimee>
    </>
  );
};
