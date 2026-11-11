import React from 'react';
import { PageBody, PageHeader } from '../components/PageHeader';
import { PageAnimee } from '../components/PageAnimee';
import { TitreSection } from '../components/ui';
import { Reveal, Cadence, CadenceItem } from '../components/Reveal';
import { Lien } from '../router';
import { useContenu } from '../data/contenu';
import { ArrowRight, Users2 } from 'lucide-react';

/**
 * Organigramme du réseau.
 *
 * Trois rangs, parce que les statuts en définissent trois : l'Assemblée
 * Générale décide, le Conseil d'Administration et le Conseil d'Orientation
 * et de Surveillance exercent deux pouvoirs distincts au même niveau — l'un
 * dirige, l'autre contrôle — et le Secrétariat Exécutif met en œuvre.
 *
 * Les liaisons sont dessinées en bordures CSS plutôt qu'en SVG : un tracé
 * SVG impose des coordonnées fixes, qui se décalent dès qu'un intitulé
 * passe sur deux lignes ou que la largeur change. Ici la liaison suit
 * naturellement la mise en page, y compris sur téléphone où les rangs
 * s'empilent.
 */

const TEINTES: Record<string, { aplat: string; texte: string; bordure: string; fond: string }> = {
  ag: { aplat: 'bg-rve-green', texte: 'text-rve-green-ink', bordure: 'border-rve-green', fond: 'bg-rve-green/8' },
  ca: { aplat: 'bg-rve-red', texte: 'text-rve-red-ink', bordure: 'border-rve-red', fond: 'bg-rve-red/8' },
  cos: { aplat: 'bg-rve-yellow', texte: 'text-rve-yellow-ink', bordure: 'border-rve-yellow', fond: 'bg-rve-yellow/12' },
  se: { aplat: 'bg-rve-lime', texte: 'text-rve-green-deep', bordure: 'border-rve-lime', fond: 'bg-rve-lime/12' },
};

const Liaison: React.FC = () => (
  <div aria-hidden="true" className="mx-auto h-8 w-0.5 bg-line sm:h-10" />
);

export const PageOrganigramme: React.FC = () => {
  const organes = useContenu('organes');
  const parId = (id: string) => organes.find((o) => o.id === id);
  const ag = parId('ag');
  const ca = parId('ca');
  const cos = parId('cos');
  const se = parId('se');

  const Bloc: React.FC<{ id: string; large?: boolean }> = ({ id, large = false }) => {
    const organe = parId(id);
    if (!organe) return null;
    const t = TEINTES[id];
    return (
      <article className={`overflow-hidden rounded-carte border-2 ${t.bordure} bg-white ${large ? '' : 'h-full'}`}>
        <header data-scroll="left" className={`flex items-center gap-2.5 px-5 py-3 ${t.aplat}`}>
          <span className="rounded-[3px] bg-white/25 px-1.5 py-0.5 text-[0.6875rem] font-extrabold text-white">
            {organe.sigle}
          </span>
          <h2 className="font-display text-sm font-bold leading-snug text-white sm:text-base">
            {organe.titre}
          </h2>
        </header>
        <div className="p-5">
          <p className={`text-xs font-bold uppercase tracking-wider ${t.texte}`}>{organe.role}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{organe.description}</p>

          {organe.postes.length > 0 ? (
            <ul className="mt-4 flex flex-col gap-2">
              {organe.postes.map((poste) => (
                <li key={poste.id} className={`rounded-[4px] ${t.fond} px-3 py-2`}>
                  <p className="text-[0.8125rem] font-bold leading-snug text-ink">{poste.intitule}</p>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    {poste.titulaire || 'Titulaire à communiquer'}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className={`mt-4 flex items-center gap-2 rounded-[4px] ${t.fond} px-3 py-2.5 text-[0.8125rem] font-semibold text-ink`}>
              <Users2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              {organe.composition}
            </p>
          )}

          <p className="mt-4 border-t border-line pt-3 text-xs text-ink-muted">{organe.rythme}</p>
        </div>
      </article>
    );
  };

  return (
    <>
      <PageHeader
        titre="Organigramme"
        amorce="Qui décide, qui contrôle, qui exécute. Les quatre organes du réseau et leur articulation, tels que les fixent les statuts."
        image="/assets/img/hero/wa-09.jpg"
        cadrage="50% 40%"
        fil={[{ label: 'Le réseau', vers: '/reseau' }, { label: 'Organigramme' }]}
      />
      <PageAnimee>
      <PageBody>
        {ag && (
          <Reveal className="mx-auto max-w-2xl">
            <Bloc id="ag" large />
          </Reveal>
        )}

        <Liaison />

        <Reveal>
          <p className="mx-auto mb-4 max-w-md rounded-bouton bg-surface-sunken px-4 py-2 text-center text-xs font-bold uppercase tracking-wider text-ink-soft">
            Élus par l’Assemblée Générale
          </p>
        </Reveal>

        <Cadence className="grid gap-6 lg:grid-cols-2">
          {ca && (
            <CadenceItem>
              <Bloc id="ca" />
            </CadenceItem>
          )}
          {cos && (
            <CadenceItem>
              <Bloc id="cos" />
            </CadenceItem>
          )}
        </Cadence>

        <Liaison />

        <Reveal>
          <p className="mx-auto mb-4 max-w-md rounded-bouton bg-surface-sunken px-4 py-2 text-center text-xs font-bold uppercase tracking-wider text-ink-soft">
            Met en œuvre les décisions
          </p>
        </Reveal>

        {se && (
          <Reveal className="mx-auto max-w-2xl">
            <Bloc id="se" large />
          </Reveal>
        )}

        <Reveal className="mt-16 border-t border-line pt-10">
          <TitreSection
            niveau={2}
            titre="Et les organisations membres ?"
            amorce="Les organisations membres composent l’Assemblée Générale. C’est par elle que passent les décisions qui engagent le réseau : chaque organisation y dispose d’une voix."
            className="[&_h2]:text-2xl"
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <Lien vers="/membres" className="inline-flex items-center gap-2 rounded-bouton bg-rve-green px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-rve-green-ink">
              Les organisations membres <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Lien>
            <Lien vers="/equipe" className="inline-flex items-center gap-2 rounded-bouton border border-line bg-white px-5 py-3 text-sm font-bold text-ink-soft transition-colors hover:border-rve-green hover:text-rve-green-ink">
              Les personnes du réseau
            </Lien>
          </div>
        </Reveal>
      </PageBody>
      </PageAnimee>
    </>
  );
};
