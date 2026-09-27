import React, { useState } from 'react';
import { Target, HeartHandshake, Scale, Shield, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onOpenJoin: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenJoin }) => {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'approche'>('mission');

  return (
    <section id="a-propos" className="py-20 lg:py-28 bg-[#FCFCFD] border-b border-stone-100">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#109030] tracking-wider uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#109030]" />
            <span>À propos du Réseau Voix EssentiELLES Bénin</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#303030] tracking-tight leading-tight">
            Fédérer les énergies féminines pour transformer les réalités béninoises
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed">
            Né d’une volonté commune d’amplifier la voix des femmes et des filles, le RVE-Bénin constitue une plateforme unifiée d’action, d’apprentissage collectif et d’influence politique.
          </p>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Interactive Strategic Narrative */}
          <div className="lg:col-span-7 space-y-8">
            {/* Segmented control for tabs */}
            <div className="flex items-center p-1 bg-stone-100 rounded-xl w-fit">
              <button
                onClick={() => setActiveTab('mission')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'mission'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Notre Mission
              </button>
              <button
                onClick={() => setActiveTab('vision')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'vision'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Notre Vision
              </button>
              <button
                onClick={() => setActiveTab('approche')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'approche'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Notre Démarche
              </button>
            </div>

            {/* Tab 1: Mission */}
            {activeTab === 'mission' && (
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                <blockquote className="text-xl sm:text-2xl font-serif text-stone-800 leading-snug italic border-l-4 border-[#109030] pl-6 py-1">
                  « Fédérer les organisations féminines de la société civile autour d’actions concertées pour promouvoir les droits des femmes, des filles et des enfants, renforcer les capacités des membres, développer des partenariats stratégiques et porter un plaidoyer collectif. »
                </blockquote>
                <p className="text-stone-600 leading-relaxed text-base">
                  Le réseau rompt avec le travail en silos des organisations pour bâtir une force de frappe solidaire capable d’interagir avec les ministères sectoriels, les bailleurs internationaux, les autorités traditionnelles et les assemblées locales.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-xs">
                    <span className="text-xs font-bold text-[#109030] block mb-1">01. Concertation permanente</span>
                    <p className="text-xs text-stone-600">Harmonisation des agendas d'intervention et mutualisation des ressources entre OSC.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-xs">
                    <span className="text-xs font-bold text-[#F8C000] block mb-1">02. Plaidoyer éclairé</span>
                    <p className="text-xs text-stone-600">Formulation de recommandations appuyées sur des données de terrain rigoureuses.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Vision */}
            {activeTab === 'vision' && (
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                <blockquote className="text-xl sm:text-2xl font-serif text-stone-800 leading-snug italic border-l-4 border-[#F8C000] pl-6 py-1">
                  « Un Bénin où toutes les femmes et les filles jouissent pleinement de leurs droits, accèdent équitablement à la santé, à l’éducation et aux opportunités de développement, et participent pleinement aux décisions qui façonnent leur vie et leur communauté. »
                </blockquote>
                <p className="text-stone-600 leading-relaxed text-base">
                  Nous envisageons une société où le leadership féminin est reconnu comme un levier fondamental de prospérité démocratique et économique, depuis les villages du Nord jusqu’aux centres urbains du Sud Bénin.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-xs">
                    <span className="text-xs font-bold text-[#109030] block mb-1">Équité d'accès</span>
                    <p className="text-xs text-stone-600">Zéro disparité géographique ou économique dans l'accès aux droits fondamentaux.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-xs">
                    <span className="text-xs font-bold text-[#E82830] block mb-1">Voix décisionnelle</span>
                    <p className="text-xs text-stone-600">Représentation active dans les instances délibératives nationales et communales.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Démarche */}
            {activeTab === 'approche' && (
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                <p className="text-stone-700 leading-relaxed text-base">
                  Notre démarche repose sur une articulation étroite entre ancrage communautaire de proximité et plaidoyer institutionnel de haut niveau. Chaque prise de parole s’appuie sur les réalités quotidiennes vécues par les femmes béninoises.
                </p>
                <ul className="space-y-3.5">
                  {[
                    "Alliance entre le leadership coutumier / patrimonial et le militantisme moderne",
                    "Renforcement technique des capacités de gestion et de recherche des OSC membres",
                    "Production d’évidences et de notes d'orientation stratégique pour les décideurs",
                    "Redevabilité mutuelle et gouvernance transparente conforme aux standards internationaux",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-stone-700">
                      <CheckCircle2 className="w-5 h-5 text-[#109030] shrink-0 mt-0.5" />
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
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#303030] hover:bg-[#1E1E1E] rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Adhérer aux principes du RVE-Bénin</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Narrative Card & Community Anchor */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-md">
              {/* Card Header with Beninese Cultural Graphic Banner */}
              <div className="relative flex h-48 flex-col justify-end overflow-hidden bg-[#173523] p-6 text-white">
                <img
                  src="/assets/img/participante-table.jpg"
                  alt="Membre du réseau lors d'une réunion de travail"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#101814]/55" />
                <div className="absolute right-4 top-4 flex items-center gap-1.5 bg-[#173523] px-3 py-1 text-[11px] font-medium text-amber-300">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Cadre Fédérateur</span>
                </div>
                <div className="relative z-10">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-emerald-300">
                    Force du Collectif
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    Une alliance plurielle & intergénérationnelle
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 space-y-5">
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Le RVE-Bénin rassemble des fondations royales comme la <strong>Fondation Reine ADJIGNON NATABOU</strong> et la <strong>Fondation Reine HANGBE</strong>, des collectifs de jeunes amazones comme la <strong>FJAD</strong>, des réseaux d’alumni (<strong>BWAA</strong>), ainsi que des OSC de santé et d’autonomisation financière (<strong>VIA-ME</strong>, <strong>FADeC</strong>, <strong>WOPA</strong>, <strong>GJFA</strong>).
                </p>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span>Siège de coordination</span>
                  <span className="font-semibold text-stone-800">Cotonou, République du Bénin</span>
                </div>
                <div className="border-t border-stone-100 pt-3 flex items-center justify-between text-xs text-stone-500">
                  <span>Rayonnement</span>
                  <span className="font-semibold text-[#109030]">National · 12 Départements</span>
                </div>
              </div>
            </div>

            {/* Curatorial Quote Box */}
            <div className="p-5 border-l-4 border-amber-500 bg-amber-50 flex items-start gap-4">
              <span className="text-2xl text-amber-700 font-serif leading-none mt-1">«</span>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                Seules, nous intervenons dans nos communautés. Ensemble, nous devenons une voix incontournable pour les politiques publiques nationales et régionales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
