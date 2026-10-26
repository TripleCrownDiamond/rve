import React from 'react';
import { CalendarDays, MapPin } from 'lucide-react';
import { PageHeader, PageBody } from '../components/PageHeader';
import { Lien } from '../router';

/** Les prochaines dates ne sont publiées qu'après confirmation du réseau. */
export const PageAgenda: React.FC = () => (
  <>
    <PageHeader
      titre="Agenda du réseau"
      amorce="Retrouvez ici les rencontres et activités annoncées par le RVE-Bénin. Une date n’apparaît que lorsqu’elle est confirmée."
      image="/assets/img/pleniere-parakou.jpg"
      fil={[{ label: 'Agenda' }]}
    />
    <PageBody>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.7fr)]">
        <div>
          <div className="flex items-center gap-3 border-b border-line pb-5">
            <CalendarDays className="h-6 w-6 text-rve-green" aria-hidden="true" />
            <h2 className="font-display text-2xl font-bold text-ink">Prochains rendez-vous</h2>
          </div>
          <div className="mt-7 rounded-carte border border-line bg-surface-sunken p-8">
            <p className="font-display text-xl font-bold text-ink">Aucun rendez-vous confirmé pour le moment</p>
            <p className="mt-3 max-w-[56ch] leading-relaxed text-ink-soft">Le Secrétariat exécutif publiera ici les dates, les lieux et les modalités de participation dès qu’une activité sera validée.</p>
            <Lien vers="/contact" className="mt-6 inline-flex font-semibold text-rve-green-ink underline">Contacter le réseau</Lien>
          </div>
          <h2 className="mt-14 font-display text-2xl font-bold text-ink">Activité passée</h2>
          <article className="mt-6 grid overflow-hidden rounded-carte border border-line bg-surface sm:grid-cols-[9rem_1fr]">
            <div className="flex flex-col justify-center bg-rve-green p-6 text-white"><span className="font-display text-4xl font-extrabold">19</span><span className="mt-1 font-semibold">juin 2026</span></div>
            <div className="p-6"><p className="flex items-center gap-2 text-sm text-ink-muted"><MapPin className="h-4 w-4" aria-hidden="true" />Parakou, Bénin</p><h3 className="mt-2 font-display text-lg font-bold text-ink">Atelier sur une information inclusive des filles et femmes handicapées</h3><p className="mt-3 text-sm leading-relaxed text-ink-soft">Le réseau a participé à l’atelier organisé par la FJAD pour les professionnels des médias.</p><Lien vers="/actions/atelier-medias-handicap-parakou" className="mt-4 inline-flex font-semibold text-rve-green-ink underline">Lire le compte rendu</Lien></div>
          </article>
        </div>
        <aside className="rounded-carte border border-line bg-surface p-7 lg:self-start">
          <h2 className="font-display text-xl font-bold text-ink">Publier une activité</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">Les organisations membres peuvent transmettre au Secrétariat exécutif le titre, la date, le lieu et les modalités de participation de leurs activités à annoncer. Le réseau vérifie ces informations avant publication.</p>
          <Lien vers="/contact" className="mt-6 inline-flex rounded-bouton bg-rve-green px-5 py-3 text-sm font-bold text-white hover:bg-rve-green-ink">Proposer une annonce</Lien>
        </aside>
      </div>
    </PageBody>
  </>
);
