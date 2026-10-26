import React from 'react';
import { PageHeader, PageBody } from '../components/PageHeader';
import { ContactForm } from '../components/ContactForm';
import { Lien } from '../router';

export const PageAdhesion: React.FC = () => (
  <>
    <PageHeader titre="Rejoindre le réseau" amorce="Votre organisation souhaite contribuer aux priorités du RVE-Bénin ? Présentez son action au Secrétariat exécutif." image="/assets/img/pleniere-parakou.jpg" fil={[{ label: 'Adhésion' }]} />
    <PageBody>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
        <ContactForm typeInitial="Adhésion" titre="Présenter votre organisation" />
        <aside className="rounded-carte border border-line bg-surface-sunken p-7 lg:self-start">
          <h2 className="font-display text-xl font-bold text-ink">Préparer votre demande</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">Décrivez les domaines d’intervention de votre organisation, les territoires où elle agit et la contribution qu’elle souhaite apporter au réseau. Le Secrétariat exécutif vous indiquera ensuite la procédure applicable.</p>
          <p className="mt-5 leading-relaxed text-ink-soft">Vous pouvez consulter les <Lien vers="/ressources" className="font-semibold text-rve-green-ink underline">documents du réseau</Lien> avant de prendre contact.</p>
        </aside>
      </div>
    </PageBody>
  </>
);
