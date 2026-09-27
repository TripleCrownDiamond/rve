import React from 'react';
import { Hero } from '../components/Hero.tsx';
import { AboutSection } from '../components/AboutSection.tsx';
import { CollegesSection } from '../components/CollegesSection.tsx';
import { DomainsSection, DomainItem } from '../components/DomainsSection.tsx';
import { MomentsSection } from '../components/MomentsSection.tsx';
import { ActionsSection, ActionArticle } from '../components/ActionsSection.tsx';
import { VisionValuesSection } from '../components/VisionValuesSection.tsx';
import { MembersSection } from '../components/MembersSection.tsx';
import { MemberOrg } from '../components/MemberLogos.tsx';
import { GovernanceSection } from '../components/GovernanceSection.tsx';
import { ResourcesSection, ResourceItem } from '../components/ResourcesSection.tsx';
import { ContactSection } from '../components/ContactSection.tsx';

interface AccueilProps {
  onOpenContact: (subject?: string) => void;
  onOpenJoin: () => void;
  onSelectArticle: (a: ActionArticle) => void;
  onSelectResource: (r: ResourceItem) => void;
  onSelectMember: (m: MemberOrg) => void;
  onSelectDomain: (d: DomainItem) => void;
}

/**
 * Page d'accueil.
 *
 * Elle présente chaque sujet et renvoie vers la page qui le traite. Le
 * détail vit désormais dans les pages internes : c'est ce qui permet à
 * l'accueil de rester parcourable au lieu d'essayer de tout dire.
 */
export const Accueil: React.FC<AccueilProps> = ({
  onOpenContact,
  onOpenJoin,
  onSelectArticle,
  onSelectResource,
  onSelectMember,
  onSelectDomain,
}) => {
  const versSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero
        onDiscoverClick={() => versSection('a-propos')}
        onActionsClick={() => versSection('actions')}
        onOpenJoin={onOpenJoin}
      />
      <AboutSection onOpenJoin={onOpenJoin} />
      <CollegesSection />
      <DomainsSection onSelectDomain={onSelectDomain} />
      <MomentsSection />
      <ActionsSection onSelectArticle={onSelectArticle} />
      <VisionValuesSection />
      <MembersSection onOpenJoin={onOpenJoin} onSelectMember={onSelectMember} />
      <GovernanceSection />
      <ResourcesSection onDownloadResource={onSelectResource} />
      <ContactSection onOpenContact={onOpenContact} onOpenJoin={onOpenJoin} />
    </>
  );
};
