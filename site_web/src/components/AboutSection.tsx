import React, { useState } from 'react';
import { Flottante, Lignes, Semis } from './Decor';
import { Target, HeartHandshake, Scale, Shield, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onOpenJoin: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenJoin }) => {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'approche'>('mission');

  return (
    <section id="a-propos" className="relative overflow-hidden bg-surface-sunken py-20 lg:py-28">
      <Flottante derive={18} duree={19} className="pointer-events-none absolute -right-10 top-16">
        <Lignes className="h-56 w-56 opacity-[0.07] lg:h-72 lg:w-72" />
      </Flottante>
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            Neuf organisations qui cessent de travailler chacune de son côté
          </h2>
          <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-ink-soft sm:text-lg">
            Le RVE-Bénin réunit des organisations féminines qui intervenaient
            séparément sur les mêmes terrains. Elles préparent désormais leurs
            positions ensemble et les portent d’une seule voix.
          </p>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Interactive Strategic Narrative */}
          <div className="lg:col-span-7 space-y-8">
            {/* Segmented control for tabs */}
            <div className="flex items-center p-1 bg-surface-sunken rounded-carte w-fit">
              <button
                onClick={() => setActiveTab('mission')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'mission'
                    ? 'bg-white text-ink shadow-sm'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                Notre Mission
              </button>
              <button
                onClick={() => setActiveTab('vision')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'vision'
                    ? 'bg-white text-ink shadow-sm'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                Notre Vision
              </button>
              <button
                onClick={() => setActiveTab('approche')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'approche'
                    ? 'bg-white text-ink shadow-sm'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                Notre Démarche
              </button>
            </div>

            {/* Tab 1: Mission */}
            {activeTab === 'mission' && (
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                <blockquote className="font-display text-xl leading-snug text-ink sm:text-2xl">
                  « Fédérer les organisations féminines de la société civile autour d’actions concertées pour promouvoir les droits des femmes, des filles et des enfants, renforcer les capacités des membres, développer des partenariats stratégiques et porter un plaidoyer collectif. »
                </blockquote>
                <p className="max-w-[62ch] text-base leading-relaxed text-ink-soft">
                  Cette position commune s’adresse aux ministères sectoriels, aux
                  bailleurs, aux autorités traditionnelles et aux assemblées locales.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-carte bg-white border border-line/80 shadow-xs">
                    <span className="text-xs font-bold text-rve-green block mb-1">Concertation permanente</span>
                    <p className="text-xs text-ink-soft">Harmonisation des agendas d'intervention et mutualisation des ressources entre OSC.</p>
                  </div>
                  <div className="p-4 rounded-carte bg-white border border-line/80 shadow-xs">
                    <span className="text-xs font-bold text-rve-yellow block mb-1">Plaidoyer éclairé</span>
                    <p className="text-xs text-ink-soft">Formulation de recommandations appuyées sur des données de terrain rigoureuses.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Vision */}
            {activeTab === 'vision' && (
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                <blockquote className="font-display text-xl leading-snug text-ink sm:text-2xl">
                  « Un Bénin où toutes les femmes et les filles jouissent pleinement de leurs droits, accèdent équitablement à la santé, à l’éducation et aux opportunités de développement, et participent pleinement aux décisions qui façonnent leur vie et leur communauté. »
                </blockquote>
                <p className="text-ink-soft leading-relaxed text-base">
                  Nous envisageons une société où le leadership féminin est reconnu comme un levier fondamental de prospérité démocratique et économique, depuis les villages du Nord jusqu’aux centres urbains du Sud Bénin.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-carte bg-white border border-line/80 shadow-xs">
                    <span className="text-xs font-bold text-rve-green block mb-1">Équité d'accès</span>
                    <p className="text-xs text-ink-soft">Zéro disparité géographique ou économique dans l'accès aux droits fondamentaux.</p>
                  </div>
                  <div className="p-4 rounded-carte bg-white border border-line/80 shadow-xs">
                    <span className="text-xs font-bold text-rve-red block mb-1">Voix décisionnelle</span>
                    <p className="text-xs text-ink-soft">Représentation active dans les instances délibératives nationales et communales.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Démarche */}
            {activeTab === 'approche' && (
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                <p className="text-ink leading-relaxed text-base">
                  Notre démarche repose sur une articulation étroite entre ancrage communautaire de proximité et plaidoyer institutionnel de haut niveau. Chaque prise de parole s’appuie sur les réalités quotidiennes vécues par les femmes béninoises.
                </p>
                <ul className="space-y-3.5">
                  {[
                    "Alliance entre le leadership coutumier / patrimonial et le militantisme moderne",
                    "Renforcement technique des capacités de gestion et de recherche des OSC membres",
                    "Production d’évidences et de notes d'orientation stratégique pour les décideurs",
                    "Redevabilité mutuelle et gouvernance transparente conforme aux standards internationaux",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-ink">
                      <CheckCircle2 className="w-5 h-5 text-rve-green shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Micro action */}
            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onOpenJoin}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-ink hover:bg-night-deep rounded-carte transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Adhérer aux principes du RVE-Bénin</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Colonne de droite : une image, une légende. Rien d'autre.

              Elle portait auparavant trois libellés superposés sur la photo
              (une pastille « Cadre fédérateur », un sur-titre, un titre), un
              paragraphe re-listant les huit organisations déjà présentées
              dans les collèges puis dans la grille de marques, et deux lignes
              de métadonnées. C'est ce cumul qui donnait la sensation de trop
              d'informations : la colonne disait une quatrième fois ce que la
              page dit déjà, au lieu de laisser la photographie parler.

              Le détail a sa place sur la page interne du réseau, pas ici. */}
          <div className="lg:col-span-5">
            <figure className="overflow-hidden rounded-carte border border-line bg-surface">
              <img
                src="/assets/img/participante-table.jpg"
                alt="Une membre du réseau lors d’une réunion de travail"
                width={720}
                height={900}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
                style={{ objectPosition: '55% 35%' }}
              />
              <figcaption className="flex items-center justify-between gap-4 border-t border-line-soft px-6 py-4 text-[0.8125rem]">
                <span className="text-ink-muted">Siège de coordination</span>
                <span className="font-semibold text-ink">Cotonou, Bénin</span>
              </figcaption>
            </figure>
          </div>

        </div>
      </div>
    </section>
  );
};
