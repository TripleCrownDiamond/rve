/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { DomainsSection, DomainItem } from './components/DomainsSection.tsx';
import { MomentsSection } from './components/MomentsSection.tsx';
import { ActionsSection, ActionArticle } from './components/ActionsSection.tsx';
import { VisionValuesSection } from './components/VisionValuesSection.tsx';
import { MembersSection } from './components/MembersSection.tsx';
import { MemberOrg } from './components/MemberLogos.tsx';
import { GovernanceSection } from './components/GovernanceSection.tsx';
import { ResourcesSection, ResourceItem } from './components/ResourcesSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import {
  ContactModal,
  JoinModal,
  ArticleModal,
  ResourceModal,
  MemberDetailModal,
  DomainDetailModal,
} from './components/Modals.tsx';

export default function App() {
  // Modal states
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState('Renseignement général');
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ActionArticle | null>(null);
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [selectedMember, setSelectedMember] = useState<MemberOrg | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<DomainItem | null>(null);

  // Handlers
  const handleOpenContact = (subject?: string) => {
    setContactSubject(subject || 'Renseignement général');
    setContactModalOpen(true);
  };

  const handleOpenJoin = () => {
    setJoinModalOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#303030] flex flex-col font-sans selection:bg-[#109030]/20 selection:text-[#109030]">
      {/* 1. Top Navigation Bar (Contract strictly met) */}
      <Navbar
        onOpenContact={handleOpenContact}
        onOpenJoin={handleOpenJoin}
      />

      <main className="flex-1">
        {/* 2. Full-Width Hero with Background Image & Superimposed Typography */}
        <Hero
          onDiscoverClick={() => scrollToSection('a-propos')}
          onActionsClick={() => scrollToSection('actions')}
          onOpenJoin={handleOpenJoin}
        />

        {/* 3. À propos du réseau (Editorial & Strategic Vision) */}
        <AboutSection
          onOpenJoin={handleOpenJoin}
        />

        {/* 4. Les 6 Domaines d’intervention */}
        <DomainsSection
          onSelectDomain={(domain) => setSelectedDomain(domain)}
        />

        {/* 5. Ancrage & Réalités du Réseau (Documentary photos & moments) */}
        <MomentsSection />

        {/* 6. Nos actions / Actualités récentes */}
        <ActionsSection
          onSelectArticle={(article) => setSelectedArticle(article)}
        />

        {/* 7. Vision 2030 & Les 6 Valeurs Cardinales */}
        <VisionValuesSection />

        {/* 8. Organisations Membres & Partenaires Stratégiques */}
        <MembersSection
          onOpenJoin={handleOpenJoin}
          onSelectMember={(member) => setSelectedMember(member)}
        />

        {/* 9. Gouvernance Institutionnelle (AG, CA, COS, SE) */}
        <GovernanceSection />

        {/* 10. Centre de Ressources & Publications */}
        <ResourcesSection
          onDownloadResource={(res) => setSelectedResource(res)}
        />

        {/* 11. CTA Final Institutional Callout */}
        <ContactSection
          onOpenContact={handleOpenContact}
          onOpenJoin={handleOpenJoin}
        />
      </main>

      {/* 12. Institutional Dark Footer with White Transparent Logo */}
      <Footer
        onOpenContact={handleOpenContact}
        onOpenJoin={handleOpenJoin}
      />

      {/* Interactive Modals */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        defaultSubject={contactSubject}
      />

      <JoinModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <ResourceModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
      />

      <MemberDetailModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
        onContact={handleOpenContact}
      />

      <DomainDetailModal
        domain={selectedDomain}
        onClose={() => setSelectedDomain(null)}
        onOpenContact={handleOpenContact}
      />
    </div>
  );
}
