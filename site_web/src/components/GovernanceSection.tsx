import React, { useState } from 'react';
import { Anneau, Flottante } from './Decor';
import { 
  Users, 
  ShieldCheck, 
  Scale, 
  Briefcase, 
  FileCheck, 
  CheckCircle, 
  Building 
} from 'lucide-react';

export const GOVERNANCE_BODIES = [
  {
    id: 'ag',
    shortName: 'AG',
    title: 'Assemblée Générale',
    role: 'Instance Suprême de Délibération',
    desc: 'Réunit l’ensemble des organisations membres à jour de leurs cotisations. Elle définit les orientations stratégiques générales, approuve les bilans moraux et financiers, et élit les membres des organes de direction.',
    frequency: 'Annuelle en session ordinaire (ou extraordinaire sur convocation)',
    composition: 'Déléguées plénipotentiaires des 9 OSC membres fondatrices et adhérentes',
    powers: [
      'Adoption et révision des statuts et du règlement intérieur',
      'Élection et renouvellement des membres du Conseil d’Administration',
      'Quitus sur les rapports d’audit et l’exercice budgétaire annuel',
    ],
  },
  {
    id: 'ca',
    shortName: 'CA',
    title: 'Conseil d’Administration',
    role: 'Organe de Direction Stratégique',
    desc: 'Mandaté par l’Assemblée Générale, le CA impulse la politique globale du réseau, supervise l’action du Secrétariat Exécutif, valide les partenariats stratégiques et veille au rayonnement national et sous-régional.',
    frequency: 'Trimestrielle',
    composition: 'Présidence, Vice-Présidence, Secrétariat Général, Trésorerie Générale, Responsables de pôles',
    powers: [
      'Validation du plan de travail annuel et du budget prévisionnel',
      'Recrutement et évaluation de la coordination exécutive',
      'Représentation institutionnelle auprès des ministères et institutions partenaires',
    ],
  },
  {
    id: 'cos',
    shortName: 'COS',
    title: 'Conseil d’Orientation et de Surveillance',
    role: 'Vigie Éthique, Conformité & Sagesse',
    desc: 'Composé de personnalités d’autorité morale, d’anciennes ministres, de reines traditionnelles et de juristes émérites. Il garantit le respect scrupuleux de l’éthique, des valeurs de sororité et arbitre les différends éventuels.',
    frequency: 'Semestrielle et à la demande',
    composition: 'Sages, autorités royales et patrimoniales, figures historiques des droits humains au Bénin',
    powers: [
      'Veille déontologique et conformité avec les valeurs fondamentales',
      'Avis consultatifs sur les orientations sociétales majeures',
      'Médiation et conciliation préventive interne',
    ],
  },
  {
    id: 'se',
    shortName: 'SE',
    title: 'Secrétariat Exécutif',
    role: 'Bras Opérationnel & Gestion de Programmes',
    desc: 'Équipe permanente de professionnelles chargées de la mise en œuvre quotidienne des projets, de la gestion administrative et financière, de la recherche d’opportunités et de la communication du réseau.',
    frequency: 'Activité permanente et continue',
    composition: 'Secrétaire Exécutive, Chargée de Plaidoyer & Droits, Responsable Santé & Projets, Responsable Administratif & Financier',
    powers: [
      'Exécution opérationnelle des conventions de subvention et projets',
      'Animation du dialogue technique quotidien avec les points focaux des OSC',
      'Production des rapports périodiques d’activités et de suivi financier',
    ],
  },
];

export const GovernanceSection: React.FC = () => {
  const [selectedBody, setSelectedBody] = useState<string>('ag');

  const activeBody = GOVERNANCE_BODIES.find((b) => b.id === selectedBody) || GOVERNANCE_BODIES[0];

  return (
    <section id="gouvernance" className="relative overflow-hidden bg-surface py-20 lg:py-28">
      <div className="relative mx-auto max-w-[1240px] px-6 sm:px-8">
        <Flottante derive={13} duree={18} retard={1.2} className="pointer-events-none absolute -left-16 bottom-32">
          <Anneau couleur="var(--color-rve-lime)" className="h-48 w-48 opacity-[0.09]" />
        </Flottante>

        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-rve-green tracking-wider uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-rve-green" />
            <span>Architecture Institutionnelle</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight leading-tight">
            Une gouvernance rigoureuse, démocratique et transparente
          </h2>
          <p className="mt-4 text-base max-w-[62ch] text-ink-soft leading-relaxed">
            Pour mériter la confiance de nos communautés et de nos partenaires de développement, le RVE-Bénin a établi une séparation claire entre orientation, surveillance et exécution.
          </p>
        </div>

        {/* 4 Organ Blocks Tab Bar / Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-1.5 bg-surface-sunken rounded-carte mb-8">
          {GOVERNANCE_BODIES.map((body) => (
            <button
              key={body.id}
              onClick={() => setSelectedBody(body.id)}
              className={`p-3.5 sm:p-4 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                selectedBody === body.id
                  ? 'bg-white shadow-xs text-ink border border-line/80'
                  : 'text-ink-soft hover:text-ink hover:bg-surface-rest/60'
              }`}
            >
              <span className="text-[11px] font-mono font-bold uppercase text-rve-green">
                {body.shortName}
              </span>
              <span className="text-xs sm:text-sm font-bold truncate mt-1">
                {body.title}
              </span>
            </button>
          ))}
        </div>

        {/* Active Governance Body Detail Card */}
        <div className="rounded-carte border border-line bg-surface-raised p-8 sm:p-10 lg:p-12 shadow-xs">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left 7 cols: Role, Description & Powers */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-semibold text-rve-green block mb-1">
                  {activeBody.role}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                  {activeBody.title}
                </h3>
              </div>

              <p className="text-ink-soft leading-relaxed text-sm sm:text-base">
                {activeBody.desc}
              </p>

              <div>
                <h4 className="text-xs font-bold text-ink-muted mb-3">
                  Attributions & Compétences Clés
                </h4>
                <ul className="space-y-2.5">
                  {activeBody.powers.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-ink">
                      <CheckCircle className="w-4 h-4 text-rve-green shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right 5 cols: Operational Specifications */}
            <div className="flex h-full flex-col gap-5 rounded-carte border border-line bg-surface p-6 sm:p-7 lg:col-span-5">
              <h4 className="text-xs font-bold text-ink-muted pb-3 border-b border-line-soft">
                Fiche de Fonctionnement
              </h4>

              <div>
                <span className="text-xs text-ink-muted block mb-0.5">Périodicité des sessions</span>
                <p className="text-xs sm:text-sm font-semibold text-ink">
                  {activeBody.frequency}
                </p>
              </div>

              <div className="pt-2 border-t border-line-soft">
                <span className="text-xs text-ink-muted block mb-0.5">Composition & Sièges</span>
                <p className="text-xs sm:text-sm font-semibold text-ink">
                  {activeBody.composition}
                </p>
              </div>

              <div className="pt-2 border-t border-line-soft">
                <span className="text-xs text-ink-muted block mb-0.5">Principes directeurs</span>
                <p className="text-xs sm:text-sm font-medium text-ink">
                  Transparence documentaire, procès-verbaux systématiques, audits financiers indépendants et collégialité.
                </p>
              </div>

              <div className="mt-auto" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
