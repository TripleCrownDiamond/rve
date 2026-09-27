import React, { useState } from 'react';
import { Search, ArrowDownToLine } from 'lucide-react';

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Rapport' | 'Guide' | 'Note de plaidoyer' | 'Publication';
  year: string;
  format: string;
  size: string;
  description: string;
  pages: number;
}

export const RESOURCES: ResourceItem[] = [
  {
    id: 'rapport-annuel-2025',
    title: 'Rapport Annuel d’Activité & Bilan d’Étape 2025',
    category: 'Rapport',
    year: '2025',
    format: 'PDF',
    size: '3.4 Mo',
    description: 'Document institutionnel récapitulant les réalisations, les avancées du plaidoyer en santé et droits des femmes, et les états financiers audités du réseau.',
    pages: 48,
  },
  {
    id: 'guide-plaidoyer-vbg',
    title: 'Guide Pratique de Plaidoyer Juridique contre les VBG au Bénin',
    category: 'Guide',
    year: '2025',
    format: 'PDF',
    size: '2.1 Mo',
    description: 'Manuel de référence pour les activistes locales et juristes communautaires sur la mise en œuvre de la loi 2021-11 portant dispositions spéciales de répression des infractions commises à raison du sexe.',
    pages: 36,
  },
  {
    id: 'note-politique-csu',
    title: 'Note d’Orientation Stratégique : Intégration du Genre dans la Couverture Sanitaire Universelle',
    category: 'Note de plaidoyer',
    year: '2025',
    format: 'PDF',
    size: '1.2 Mo',
    description: 'Recommandations formulées à l’attention du Ministère de la Santé et des parlementaires pour la prise en charge intégrale des soins obstétricaux et néonataux d’urgence.',
    pages: 18,
  },
  {
    id: 'etude-femmes-climat-benin',
    title: 'Étude d’Impact : Résilience Climatique & Autonomie Économique des Femmes Rurales au Bénin',
    category: 'Publication',
    year: '2025',
    format: 'PDF',
    size: '4.8 Mo',
    description: 'Enquête de terrain menée auprès de 1 200 exploitantes agricoles dans les départements de l’Alibori, des Collines et du Couffo.',
    pages: 64,
  },
  {
    id: 'charte-ethique-rve',
    title: 'Charte Éthique & Statuts Réglementaires du RVE-Bénin',
    category: 'Rapport',
    year: '2025',
    format: 'PDF',
    size: '850 Ko',
    description: 'Texte fondamental régissant l’adhésion, les droits et devoirs des organisations membres, ainsi que le code de conduite en matière de transparence.',
    pages: 24,
  },
  {
    id: 'fiche-mentorat-jeunes-filles',
    title: 'Cahier de Mentorat : Éveil au Leadership & Parcours d’Excellence pour Filles',
    category: 'Guide',
    year: '2025',
    format: 'PDF',
    size: '1.9 Mo',
    description: 'Outil pédagogique conçu par la FJAD et la commission Éducation pour l’animation de cercles de mentorat dans les collèges et universités.',
    pages: 30,
  },
];

interface ResourcesSectionProps {
  onDownloadResource: (resource: ResourceItem) => void;
}

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({ onDownloadResource }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['Tous', 'Rapport', 'Guide', 'Note de plaidoyer', 'Publication'];

  const filteredResources = RESOURCES.filter((res) => {
    const matchesCat = selectedCategory === 'Tous' || res.category === selectedCategory;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="ressources" className="py-20 lg:py-28 bg-[#FCFCFD] border-b border-stone-100">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#109030] tracking-wider uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#109030]" />
              <span>Centre de Ressources & Publications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#303030] tracking-tight leading-tight">
              Savoirs partagés, données probantes et outils de plaidoyer
            </h2>
            <p className="mt-4 text-base text-stone-600 leading-relaxed">
              Consultez et téléchargez gratuitement les études, manuels méthodologiques, rapports d'activité et notes de positionnement du RVE-Bénin.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une publication..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#109030] focus:ring-2 focus:ring-[#109030]/10 text-stone-800 transition-colors"
            />
          </div>
        </div>

        {/* Category Filters (Clean tab bar) */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="p-6 rounded-2xl bg-white border border-stone-200/90 hover:border-stone-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Unboxed metadata kicker */}
                <div className="flex items-center gap-2 text-xs text-stone-400 mb-2 font-medium">
                  <span className="text-[#109030] font-semibold">{res.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{res.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{res.pages} pages</span>
                </div>

                <h3 className="text-base font-bold text-[#303030] group-hover:text-[#109030] transition-colors leading-snug mb-3">
                  {res.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 line-clamp-3">
                  {res.description}
                </p>
              </div>

              {/* Bottom Download Affordance */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-400 font-mono">
                  {res.format} · {res.size}
                </span>

                <button
                  onClick={() => onDownloadResource(res)}
                  className="px-3 py-1.5 font-semibold text-[#109030] hover:text-white hover:bg-[#109030] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer border border-[#109030]/20"
                >
                  <ArrowDownToLine className="w-3.5 h-3.5" />
                  <span>Consulter</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="p-12 text-center bg-stone-50 rounded-2xl border border-dashed border-stone-200">
            <p className="text-stone-500 text-sm">
              Aucun document ne correspond à votre recherche « {searchQuery} ».
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
