import React from 'react';
import { ARTICLES } from '../components/ActionsSection';
import { PageHeader, PageBody } from '../components/PageHeader';
import { Lien } from '../router';

export const PageProjets: React.FC = () => (
  <>
    <PageHeader titre="Projets et participations" amorce="Deux engagements du réseau documentés en 2026, dans la santé et la défense des droits des femmes et des filles." image="/assets/img/pleniere-parakou.jpg" fil={[{ label: 'Projets' }]} />
    <PageBody>
      <div className="grid gap-6 md:grid-cols-2">
        {ARTICLES.map((article) => <article key={article.id} className="flex flex-col overflow-hidden rounded-carte border border-line bg-surface">
          <img src={article.imageUrl} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />
          <div className="flex flex-1 flex-col p-7">
            <p className="text-sm font-semibold text-rve-green-ink">{article.category} · {article.date}</p>
            <h2 className="mt-3 font-display text-xl font-bold leading-snug text-ink">{article.title}</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">{article.excerpt}</p>
            <Lien vers={`/actions/${article.id}`} className="mt-auto pt-7 font-semibold text-rve-green-ink underline">Lire le compte rendu</Lien>
          </div>
        </article>)}
      </div>
    </PageBody>
  </>
);
