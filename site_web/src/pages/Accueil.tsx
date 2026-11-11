import React, { useRef } from 'react';
import { Hero } from '../components/Hero.tsx';
import { AboutSection } from '../components/AboutSection.tsx';
import { CollegesSection } from '../components/CollegesSection.tsx';
import { PartenairesSection } from '../components/PartenairesSection.tsx';
import { DomainsSection, DomainItem } from '../components/DomainsSection.tsx';
import { ActionsSection, ActionArticle } from '../components/ActionsSection.tsx';
import { GalerieSection } from '../components/GalerieSection.tsx';
import { ContactSection } from '../components/ContactSection.tsx';
import { useGsapScroll } from '../hooks/useGsapScroll';

interface AccueilProps {
  onOpenContact: (subject?: string) => void;
  onSelectArticle: (a: ActionArticle) => void;
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
  onSelectArticle,
  onSelectDomain,
}) => {
  const pageRef = useRef<HTMLDivElement>(null);
  useGsapScroll(pageRef);
  const versSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={pageRef}>
      <Hero
        onDiscoverClick={() => versSection('a-propos')}
        onOpenContact={onOpenContact}
      />
      <AboutSection onOpenContact={onOpenContact} />
      <CollegesSection />
      <PartenairesSection />
      <DomainsSection onSelectDomain={onSelectDomain} />
      <ActionsSection onSelectArticle={onSelectArticle} />
      <GalerieSection />
      <ContactSection onOpenContact={onOpenContact} />
    </div>
  );
};
