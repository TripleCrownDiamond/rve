import React from 'react';
import { Calendar, MapPin, User } from 'lucide-react';
import { ARTICLES } from '../components/ActionsSection';
import { PageHeader, PageBody } from '../components/PageHeader';
import { PageIntrouvable } from './Domaines';
import { Reveal } from '../components/Reveal';
import { Arc } from '../components/Decor';
import { ActionsArticle, Commentaires } from '../components/ArticleSocial';
import {
  Carte,
  CarteCorps,
  CartePied,
  CarteVisuel,
  Encadre,
  Etiquette,
  Grille,
  Meta,
  TitreSection,
} from '../components/ui';

/**
 * Index des actualités.
 *
 * Le premier article est traité en une : sur un fil d'actualité, tout
 * mettre au même poids oblige le lecteur à tout lire pour choisir. La
 * hiérarchie est le service rendu.
 */
export const PageActions: React.FC = () => {
  const [une, ...suite] = ARTICLES;

  return (
    <>
      <PageHeader
        titre="Actions et impact"
        amorce="Concertations, ateliers techniques, plaidoyer institutionnel : ce que le réseau fait, et avec qui."
        image="/assets/img/participante-table.jpg"
        cadrage="55% 35%"
        fil={[{ label: 'Actions & Impact' }]}
      />

      <PageBody className="relative">
        <Arc className="absolute -right-20 top-24 h-32 w-72 opacity-[0.07]" />

        {une && (
          <Reveal>
            <Carte vers={`/actions/${une.id}`} className="lg:grid lg:grid-cols-2">
              <CarteVisuel
                src={une.imageUrl}
                ratio="aspect-[16/10] lg:aspect-auto lg:h-full"
              />
              <CarteCorps className="justify-center lg:p-12">
                <Etiquette>{une.category}</Etiquette>
                <span className="mt-3 font-display text-[clamp(1.375rem,2.4vw,1.875rem)] font-extrabold leading-tight text-ink">
                  {une.title}
                </span>
                <span className="mt-4 line-clamp-3 leading-relaxed text-ink-soft">
                  {une.excerpt}
                </span>
                <Meta items={[une.date, une.readTime]} className="mt-6" />
                <CartePied>Lire l’article</CartePied>
              </CarteCorps>
            </Carte>
          </Reveal>
        )}

        <Grille className="mt-8">
          {suite.map((article) => (
            <Carte key={article.id} vers={`/actions/${article.id}`}>
              <CarteVisuel src={article.imageUrl} />
              <CarteCorps>
                <Etiquette>{article.category}</Etiquette>
                <span className="mt-2 font-display text-base font-bold leading-snug text-ink">
                  {article.title}
                </span>
                <span className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                  {article.excerpt}
                </span>
                <Meta items={[article.date]} className="mt-auto pt-5" />
              </CarteCorps>
            </Carte>
          ))}
        </Grille>
      </PageBody>
    </>
  );
};

/** Article seul. */
export const PageAction: React.FC<{ id: string }> = ({ id }) => {
  const article = ARTICLES.find((a) => a.id === id);
  if (!article) return <PageIntrouvable quoi="Cet article" retour="/actions" />;

  const autres = ARTICLES.filter((a) => a.id !== id).slice(0, 3);
  const reperes = [
    { icone: Calendar, label: 'Date', valeur: article.date },
    { icone: MapPin, label: 'Lieu', valeur: article.location },
    { icone: User, label: 'Publié par', valeur: article.author },
  ];

  return (
    <>
      <PageHeader
        titre={article.title}
        image={article.imageUrl || '/assets/img/pleniere-parakou.jpg'}
        fil={[
          { label: 'Actions & Impact', vers: '/actions' },
          { label: article.category },
        ]}
        meta={[article.date, article.readTime]}
      />

      <PageBody>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <article className="lg:col-span-8">
            {/* Chapeau distingué du corps par le corps de texte seul :
                la hiérarchie typographique suffit, sans fond ni cadre. */}
            <p className="max-w-[64ch] text-lg leading-relaxed text-ink">
              {article.excerpt}
            </p>

            <ActionsArticle
              id={article.id}
              titre={article.title}
              jaimeBase={24}
              nbCommentaires={2}
              className="mt-8"
            />

            <div className="mt-8 flex flex-col gap-6">
              {article.fullContent
                .split('\n')
                .map((p) => p.trim())
                .filter(Boolean)
                .map((paragraphe, i) => (
                  <p key={i} className="max-w-[64ch] leading-relaxed text-ink-soft">
                    {paragraphe}
                  </p>
                ))}
            </div>

            <Commentaires articleId={article.id} />
          </article>

          <aside className="lg:col-span-3 lg:col-start-10">
            <Encadre titre="Repères">
              <dl className="flex flex-col gap-4 text-[0.875rem]">
                {reperes.map(({ icone: Icone, label, valeur }) => (
                  <div key={label} className="flex items-start gap-2.5">
                    <Icone
                      className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="text-ink-muted">{label}</dt>
                      <dd className="font-medium text-ink">{valeur}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Encadre>
          </aside>
        </div>

        {autres.length > 0 && (
          <div className="mt-20 border-t border-line pt-12">
            <TitreSection niveau={3} titre="À lire ensuite" />
            <Grille className="mt-8">
              {autres.map((a) => (
                <Carte key={a.id} vers={`/actions/${a.id}`}>
                  <CarteCorps>
                    <Etiquette>{a.category}</Etiquette>
                    <span className="mt-2 font-display text-[0.9375rem] font-bold leading-snug text-ink">
                      {a.title}
                    </span>
                    <Meta items={[a.date]} className="mt-auto pt-4" />
                  </CarteCorps>
                </Carte>
              ))}
            </Grille>
          </div>
        )}
      </PageBody>
    </>
  );
};
