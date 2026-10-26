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
  { id: 'ag', shortName: 'AG', title: 'Assemblée Générale', role: 'Instance suprême', desc: 'Elle réunit les membres, définit la politique générale du réseau, élit le Conseil d’Administration et se prononce sur les rapports d’activités et financiers.', frequency: 'Une fois par an en session ordinaire', composition: 'Ensemble des membres du réseau', powers: ['Vote le budget et approuve le programme d’activités', 'Élit les membres du Conseil d’Administration', 'Modifie les statuts et le règlement intérieur selon les règles prévues'] },
  { id: 'ca', shortName: 'CA', title: 'Conseil d’Administration', role: 'Direction et suivi', desc: 'Il suit les décisions de l’Assemblée Générale, propose les orientations et soumet le programme annuel et le budget à son approbation.', frequency: 'Une fois par trimestre en session ordinaire', composition: 'Cinq membres élues pour un mandat de deux ans renouvelable', powers: ['Suit les décisions de l’Assemblée Générale', 'Soumet le programme et le budget annuels', 'Représente le réseau auprès des pouvoirs publics'] },
  { id: 'cos', shortName: 'COS', title: 'Conseil d’Orientation et de Surveillance', role: 'Contrôle de gestion', desc: 'Deux personnes bénévoles élues par l’Assemblée Générale vérifient la régularité des procédures et des éléments financiers et lui rendent compte.', frequency: 'Contrôle possible à toute époque de l’année', composition: 'Deux conseillères ou conseillers bénévoles', powers: ['Vérifie la régularité des procédures', 'Contrôle les caisses, valeurs et bilans', 'Rend compte à l’Assemblée Générale'] },
  { id: 'se', shortName: 'SE', title: 'Secrétariat Exécutif', role: 'Coordination opérationnelle', desc: 'Il met en œuvre au quotidien les décisions de l’Assemblée Générale et du Conseil d’Administration, coordonne les activités et prépare les rapports.', frequency: 'Activité courante', composition: 'À titre indicatif : Secrétaire Exécutive, communication et plaidoyer, assistance administrative, financière et logistique', powers: ['Coordonne les activités du réseau', 'Prépare les rapports et projets de budget', 'Assure la circulation de l’information interne et externe'] },
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
