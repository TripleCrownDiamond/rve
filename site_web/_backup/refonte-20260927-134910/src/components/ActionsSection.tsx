import React from 'react';
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

export const ActionsSection: React.FC<ActionsSectionProps> = ({ onSelectArticle }) => {
  const mainArticle = ARTICLES.find((a) => a.isMain) || ARTICLES[0];
  const secondaryArticles = ARTICLES.filter((a) => !a.isMain);

  return (
    <section id="actions" className="py-20 lg:py-28 bg-[#FCFCFD] border-b border-stone-100">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#109030] tracking-wider uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#109030]" />
              <span>Actions & Actualités Récentes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#303030] tracking-tight leading-tight">
              L’impact en mouvement sur le terrain et auprès des institutions
            </h2>
            <p className="mt-4 text-base text-stone-600 leading-relaxed">
              Découvrez les dernières initiatives, ateliers stratégiques, missions de plaidoyer et avancées concrètes portées par les organisations membres du RVE-Bénin.
            </p>
          </div>

          <div className="text-xs text-stone-500 font-medium">
            <span>Mises à jour institutionnelles · République du Bénin</span>
          </div>
        </div>

        {/* Editorial Front-Page 3-Tier Salience (as recommended by the Institutional Skill) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Featured Article (Tier 1) - 7 cols on lg */}
          <button
            type="button"
            onClick={() => onSelectArticle(mainArticle)}
            className="lg:col-span-7 bg-white text-left border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            aria-label={`Lire l’article : ${mainArticle.title}`}
          >
            {/* Cover avec photographie documentaire locale */}
            <div className="relative h-64 sm:h-76 w-full overflow-hidden bg-[#14231E] p-6 sm:p-8 flex flex-col justify-between">
              <img
                src={mainArticle.imageUrl || ACTION_IMAGES['assemblee-constitutive-rve']}
                alt="Rencontre des organisations membres du RVE-Bénin"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#101814]/60" />

              {/* Top Meta Strip */}
              <div className="relative z-10 flex items-center justify-between text-xs text-emerald-200 font-medium">
                <span className="text-amber-300 font-semibold uppercase tracking-wider text-[11px]">
                  À la Une du Réseau
                </span>
                <span>{mainArticle.location}</span>
              </div>

              {/* Title inside visual card */}
              <div className="relative z-10 max-w-xl">
                <div className="flex items-center gap-2 text-xs text-stone-300 mb-2">
                  <span>{mainArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{mainArticle.date}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug group-hover:text-amber-200 transition-colors">
                  {mainArticle.title}
                </h3>
              </div>
            </div>

            {/* Content & Excerpt */}
            <div className="p-6 sm:p-8">
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-6">
                {mainArticle.excerpt}
              </p>

              {/* Footer Metadata & CTA */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <span>{mainArticle.author}</span>
                  <span aria-hidden="true">·</span>
                  <span>{mainArticle.readTime}</span>
                </div>
                <span className="font-semibold text-[#109030] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Lire l'article complet
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </button>

          {/* Secondary Articles (Tier 2) - 5 cols on lg */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {secondaryArticles.map((article) => (
              <button
                key={article.id}
                type="button"
                onClick={() => onSelectArticle(article)}
                className="p-6 text-left bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-stone-300 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {article.imageUrl && (
                    <img
                      src={article.imageUrl}
                      alt=""
                      className="mb-4 h-32 w-full object-cover"
                      loading="lazy"
                    />
                  )}
                  {/* Clean unboxed metadata with dot separators */}
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-2 font-medium">
                    <span className="text-[#109030] font-semibold">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h4 className="text-base font-bold text-[#303030] group-hover:text-[#109030] transition-colors leading-snug mb-2.5">
                    {article.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span>{article.location}</span>
                  <span className="font-semibold text-[#109030] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Consulter
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
