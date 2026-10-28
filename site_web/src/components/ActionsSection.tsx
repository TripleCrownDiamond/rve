import React from 'react';
import { Flottante, Semis } from './Decor';
import { Reveal } from './Reveal';
import {
  Bouton,
} from './ui';
import { ArrowRight } from 'lucide-react';

const ACTION_IMAGES: Record<string, string> = {
  'assemblee-constitutive-rve': '/assets/img/hero-reseau.jpg',
  'atelier-strategique-fjad-bwaa': '/assets/img/atelier-ecriture.jpg',
  'partenariat-speak-up-africa': '/assets/img/pleniere-parakou.jpg',
  'microfinance-cooperatives-rurales': '/assets/img/participante-table.jpg',
};

export interface ActionArticle {
  id: string;
  title: string;
  excerpt: string;
  fullContent: string;
  date: string;
  category: string;
  readTime: string;
  isMain?: boolean;
  author: string;
  location: string;
  imageUrl?: string;
  badgeAccent?: string;
}

export const ARTICLES: ActionArticle[] = [
  {
    id: 'participation-gc8-fonds-mondial',
    title: 'Le RVE-Bénin participe au processus GC8 du Fonds mondial',
    excerpt: 'De mars à juin 2026, le réseau a pris part aux dialogues pays, consultations communautaires et ateliers techniques liés à la demande de financement GC8.',
    fullContent: `Le RVE-Bénin a participé à plus d'une dizaine de réunions stratégiques, dialogues pays, consultations communautaires et ateliers techniques entre mars et juin 2026.

Le réseau a contribué à l'identification des priorités communautaires et à l'intégration des enjeux de genre, de droits humains et d'accès équitable aux services de santé dans la demande nationale. Il a rédigé une note stratégique de plaidoyer et proposé des interventions sur le renforcement des capacités, les systèmes communautaires et la lutte contre les discriminations.

Cette participation a renforcé les compétences des membres sur les mécanismes du Fonds mondial et les relations du réseau avec les acteurs nationaux de la santé.`,
    date: 'Juin 2026', category: 'Santé et plaidoyer', readTime: '2 min de lecture', isMain: true, author: 'RVE-Bénin', location: 'Bénin', imageUrl: '/assets/img/hero-reseau.jpg',
  },
  {
    id: 'atelier-medias-handicap-parakou',
    title: 'À Parakou, un plaidoyer pour une information inclusive sur le handicap',
    excerpt: 'Le 19 juin 2026, le réseau a participé à un atelier de la FJAD destiné aux professionnels des médias sur la stigmatisation des filles et des femmes handicapées.',
    fullContent: `La Fondation des Jeunes Amazones pour le Développement (FJAD), membre du réseau, a organisé à Parakou une session d'information et de plaidoyer pour les professionnels des médias dans le cadre du projet Handi’Women DSSR, soutenu par Speak Up Africa à travers Voix EssentiELLES – Phase 2.

Le RVE-Bénin, représenté par Mme BIO SANNAN S. Zalia (FADeC ONG), a réaffirmé son engagement pour les droits des femmes et filles handicapées. Les échanges ont porté sur les formes de stigmatisation et le rôle des médias dans une information responsable, inclusive et respectueuse des droits humains.`,
    date: '19 juin 2026', category: 'Inclusion', readTime: '2 min de lecture', author: 'RVE-Bénin', location: 'Parakou, Bénin', imageUrl: '/assets/img/pleniere-parakou.jpg',
  },
];

interface ActionsSectionProps {
  onSelectArticle: (article: ActionArticle) => void;
}

export const ActionsSection: React.FC<ActionsSectionProps> = ({
  onSelectArticle,
}) => {
  return (
    <section id="actions" className="overflow-hidden bg-surface-sunken py-20 lg:py-28">
      <div className="relative mx-auto w-full max-w-[1240px] px-6 sm:px-8">
        <Flottante derive={11} duree={18} retard={0.8} className="pointer-events-none absolute -left-12 top-24">
          <Semis className="h-32 w-44 opacity-[0.1]" />
        </Flottante>
        <Reveal as="header" className="mb-14 max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            Actualités du réseau
          </h2>
          <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-ink-soft">
            Retrouvez les actions documentées du RVE-Bénin et de ses organisations membres.
          </p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-2">
          {ARTICLES.slice(0, 2).map((article) => (
            <Reveal key={article.id} className="h-full">
            <button type="button" onClick={() => onSelectArticle(article)} className="group flex h-full w-full cursor-pointer flex-col text-left">
              <span className="block aspect-[16/9] w-full overflow-hidden">
                <img src={article.imageUrl} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]" />
              </span>
              <span className="mt-5 text-xs font-bold uppercase tracking-[0.1em] text-rve-red-ink">{article.category} · {article.date}</span>
              <span className="mt-3 font-display text-xl font-bold leading-snug text-ink group-hover:text-rve-green-ink">
                  {article.title}
              </span>
              <span className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                  {article.excerpt}
              </span>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-rve-green-ink underline underline-offset-4">Lire l’article <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
            </button>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Bouton vers="/actions" ton="secondaire" icone="fleche">
            Toutes les actualités
          </Bouton>
        </div>
      </div>
    </section>
  );
};
