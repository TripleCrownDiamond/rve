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
  url: string;
}

export const RESOURCES: ResourceItem[] = [
  { id: 'statuts-rve', title: 'Statuts du RVE-Bénin', category: 'Publication', year: '2026', format: 'PDF', size: '381 Ko', pages: 13, description: 'Statuts mis en conformité et adoptés en assemblée générale extraordinaire le 29 avril 2026.', url: '/assets/documents/statuts-rve-benin.pdf' },
  { id: 'reglement-rve', title: 'Règlement intérieur du RVE-Bénin', category: 'Publication', year: '2026', format: 'PDF', size: '292 Ko', pages: 6, description: 'Règlement intérieur mis en conformité et adopté en assemblée générale extraordinaire le 29 avril 2026.', url: '/assets/documents/reglement-interieur-rve-benin.pdf' },
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
    <section id="ressources" className="py-20 lg:py-28 bg-surface-sunken border-b border-line-soft">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-rve-green tracking-wider uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-rve-green" />
              <span>Centre de Ressources & Publications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight leading-tight">
              Savoirs partagés, données probantes et outils de plaidoyer
            </h2>
            <p className="mt-4 text-base max-w-[62ch] text-ink-soft leading-relaxed">
              Consultez les documents institutionnels disponibles au téléchargement.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une publication..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-line rounded-xl focus:outline-none focus:border-rve-green focus:ring-2 focus:ring-rve-green/10 text-ink transition-colors"
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
                  ? 'bg-night-deep text-white shadow-xs'
                  : 'bg-surface-sunken text-ink-soft hover:text-ink hover:bg-surface-rest/80'
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
              className="p-6 rounded-2xl bg-white border border-line/90 hover:border-line hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Unboxed metadata kicker */}
                <div className="flex items-center gap-2 text-xs text-ink-muted mb-2 font-medium">
                  <span className="text-rve-green font-semibold">{res.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{res.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{res.pages} pages</span>
                </div>

                <h3 className="text-base font-bold text-ink group-hover:text-rve-green transition-colors leading-snug mb-3">
                  {res.title}
                </h3>

                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed mb-6 line-clamp-2">
                  {res.description}
                </p>
              </div>

              {/* Bottom Download Affordance */}
              <div className="pt-4 border-t border-line-soft flex items-center justify-between text-xs">
                <span className="text-ink-muted font-mono">
                  {res.format} · {res.size}
                </span>

                <button
                  onClick={() => onDownloadResource(res)}
                  className="px-3 py-1.5 font-semibold text-rve-green hover:text-white hover:bg-rve-green rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer border border-rve-green/20"
                >
                  <ArrowDownToLine className="w-3.5 h-3.5" />
                  <span>Consulter</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="p-12 text-center bg-surface-raised rounded-2xl border border-dashed border-line">
            <p className="text-ink-muted text-sm">
              Aucun document ne correspond à votre recherche « {searchQuery} ».
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
