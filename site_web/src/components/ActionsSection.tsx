import React from 'react';
import { Flottante, Semis } from './Decor';
import { Reveal } from './Reveal';
import {
  Bouton,
  Carte,
  CarteCorps,
  CartePied,
  CarteVisuel,
  Etiquette,
  Grille,
  Meta,
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
    id: 'assemblee-constitutive-rve',
    title: 'Assemblée Générale et dynamisation de la coalition : Les voix féminines unies pour le plaidoyer national',
    excerpt: 'Réunies à Cotonou avec la participation active de Sa Majesté Reine Adjignon Natabou, de la FJAD, de BWAA, de WOPA et des organisations membres, les déléguées ont posé les jalons de la feuille de route 2025-2027.',
    fullContent: `Dans une ferveur solidaire et fraternelle, les représentantes des neuf organisations fondatrices du Réseau Voix EssentiELLES Bénin se sont réunies à Cotonou pour structurer leur action commune en faveur des droits des femmes et des filles.

Cette rencontre a été marquée par une convergence inédite entre autorités coutumières patrimoniales — incarnées avec dignité par Sa Majesté Reine Adjignon Natabou — et leaders de la société civile contemporaine. Ensemble, elles ont validé la charte de gouvernance, élu le Conseil d’Administration et arrêté les axes prioritaires du plaidoyer national.

« Notre force réside dans cette capacité à réunir l’histoire et le présent de la femme béninoise, des cours royales d’Abomey aux amphithéâtres universitaires et aux coopératives de pêcheuses du lac Ahémé », a souligné la Présidente du Conseil d’Administration.

Les priorités immédiates retenues portent sur le renforcement du dialogue avec le Ministère des Affaires Sociales et de la Microfinance, l’élargissement de la Couverture Sanitaire Universelle aux femmes du secteur informel et l’intensification de la veille citoyenne contre les violences basées sur le genre.`,
    date: '13 Août 2025',
    category: 'Gouvernance & Plaidoyer',
    readTime: '4 min de lecture',
    isMain: true,
    author: 'Secrétariat Exécutif RVE-Bénin',
    location: 'Cotonou, Bénin',
    imageUrl: ACTION_IMAGES['assemblee-constitutive-rve'],
  },
  {
    id: 'atelier-strategique-fjad-bwaa',
    title: 'Atelier technique de co-construction : Vers un plaidoyer commun pour la santé reproductive et l’éducation',
    excerpt: 'Séance de travail intensif entre les équipes techniques de la FJAD, de BWAA et des partenaires experts pour modéliser des indicateurs d’impact communautaire.',
    fullContent: `Durant trois jours d'échanges méthodologiques, les membres du groupe de travail Santé & Droits ont croisé leurs données de terrain avec les standards internationaux de l'OMS et de l'Union Africaine.

L'objectif : doter le RVE-Bénin d’un argumentaire chiffré et indiscutable à présenter lors des prochaines assises budgétaires de l'Assemblée Nationale du Bénin. Les travaux ont notamment permis d'identifier 14 communes prioritaires nécessitant un appui urgent en cliniques mobiles pour le dépistage précoce des cancers féminins.`,
    date: '11 Août 2025',
    category: 'Santé Publique',
    readTime: '3 min de lecture',
    author: 'Commission Santé & Recherche',
    location: 'Abomey-Calavi, Bénin',
    imageUrl: ACTION_IMAGES['atelier-strategique-fjad-bwaa'],
  },
  {
    id: 'partenariat-speak-up-africa',
    title: 'Synergie d’impact avec Speak Up Africa : Catalyser le leadership féminin dans la santé mondiale',
    excerpt: 'Renforcement du partenariat stratégique pour accompagner le déploiement opérationnel des initiatives communautaires portées par les femmes.',
    fullContent: `Grâce à l’accompagnement technique et financier de Speak Up Africa, initiative régionale phare pour la santé et le développement durable, le Réseau Voix EssentiELLES Bénin consolide sa structure et sa visibilité institutionnelle.

Ce partenariat permet d'accélérer les formations en gestion de projets, en communication d'influence et en suivi-évaluation pour l’ensemble des coordinatrices d’OSC membres, faisant du RVE-Bénin un interlocuteur de confiance pour les partenaires techniques et financiers internationaux.`,
    date: '28 Juillet 2025',
    category: 'Partenariats Stratégiques',
    readTime: '3 min de lecture',
    author: 'Direction des Relations Extérieures',
    location: 'Cotonou & Dakar',
    imageUrl: ACTION_IMAGES['partenariat-speak-up-africa'],
  },
  {
    id: 'microfinance-cooperatives-rurales',
    title: 'Autonomisation financière : Déploiement d’un guichet solidaire pour 500 artisanes et transformatrices',
    excerpt: 'Partenariat tripartite entre le réseau, les institutions de microfinance et les coopératives locales de transformation agro-alimentaire dans l’Ouémé et le Zou.',
    fullContent: `Face au défi de l’accès au crédit pour les femmes du secteur rural, le RVE-Bénin a finalisé un accord-cadre facilitant des lignes de micro-crédits à taux préférentiel associées à un coaching en gestion financière élémentaire et transition numérique.`,
    date: '15 Juillet 2025',
    category: 'Autonomisation Économique',
    readTime: '2 min de lecture',
    author: 'Pôle Entrepreneuriat',
    location: 'Porto-Novo & Bohicon',
    imageUrl: ACTION_IMAGES['microfinance-cooperatives-rurales'],
  },
];

interface ActionsSectionProps {
  onSelectArticle: (article: ActionArticle) => void;
}

export const ActionsSection: React.FC<ActionsSectionProps> = ({
  onSelectArticle,
}) => {
  const [une, ...suite] = [
    ARTICLES.find((a) => a.isMain) || ARTICLES[0],
    ...ARTICLES.filter((a) => !(a.isMain || a === ARTICLES[0])),
  ];

  return (
    <section id="actions" className="overflow-hidden bg-surface-sunken py-20 lg:py-28">
      <div className="relative mx-auto w-full max-w-[1240px] px-6 sm:px-8">
        <Flottante derive={11} duree={18} retard={0.8} className="pointer-events-none absolute -left-12 top-24">
          <Semis className="h-32 w-44 opacity-[0.1]" />
        </Flottante>
        <Reveal as="header" className="mb-14 max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            L’impact en mouvement sur le terrain et auprès des institutions
          </h2>
          <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-ink-soft">
            Initiatives, ateliers stratégiques et missions de plaidoyer portés
            par les organisations membres.
          </p>
        </Reveal>

        {/* Deux rangées autonomes, au lieu de deux colonnes de hauteurs
            différentes. C'est ce qui produisait le vide : la colonne des
            articles secondaires dépassait l'article à la une, qui s'arrêtait
            en laissant un trou sous lui. Une rangée ne peut pas creuser de
            vide sous sa voisine. */}
        <Carte
          onClick={() => onSelectArticle(une)}
          className="overflow-hidden lg:grid lg:grid-cols-2"
        >
          {/* Ratio fixe : la photographie n'est plus étirée pour rattraper
              la hauteur d'une colonne voisine. */}
          <CarteVisuel
            src={une.imageUrl}
            ratio="aspect-[16/11] lg:aspect-auto lg:h-full"
          />
          <CarteCorps className="justify-center lg:p-10">
            <Etiquette>{une.category}</Etiquette>
            <span className="mt-3 font-display text-[clamp(1.25rem,2.2vw,1.75rem)] font-extrabold leading-tight text-ink">
              {une.title}
            </span>
            <span className="mt-4 line-clamp-3 leading-relaxed text-ink-soft">
              {une.excerpt}
            </span>
            <Meta
              items={[une.date, une.location, une.readTime]}
              className="mt-6"
            />
            <CartePied>Lire l’article</CartePied>
          </CarteCorps>
        </Carte>

        <Grille className="mt-8">
          {suite.slice(0, 3).map((article) => (
            <Carte key={article.id} onClick={() => onSelectArticle(article)}>
              <CarteVisuel src={article.imageUrl} />
              <CarteCorps>
                <Etiquette>{article.category}</Etiquette>
                <span className="mt-2 font-display text-base font-bold leading-snug text-ink">
                  {article.title}
                </span>
                <span className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                  {article.excerpt}
                </span>
                <Meta items={[article.date, article.readTime]} className="mt-auto pt-5" />
              </CarteCorps>
            </Carte>
          ))}
        </Grille>

        <div className="mt-12 flex justify-center">
          <Bouton vers="/actions" ton="secondaire" icone="fleche">
            Toutes les actualités
          </Bouton>
        </div>
      </div>
    </section>
  );
};
