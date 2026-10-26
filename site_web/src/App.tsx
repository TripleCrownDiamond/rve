/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { useRoute } from './router';
import { ProgressionLecture } from './components/Motion.tsx';

import { Accueil } from './pages/Accueil.tsx';
import { PageDomaines, PageDomaine, PageIntrouvable } from './pages/Domaines.tsx';
import { PageActions, PageAction } from './pages/Actions.tsx';
import { PageMembres, PageMembre } from './pages/Membres.tsx';
import {
  PageRessources,
  PageRessource,
  PageGouvernance,
  PageReseau,
} from './pages/Divers.tsx';
import { PageOpportunites, PageOpportunite } from './pages/Opportunites.tsx';
import { PagePartenariats } from './pages/Partenariats.tsx';
import { PageContact, PageConfidentialite } from './pages/Contact.tsx';
import { PageProjets } from './pages/Projets.tsx';
import { PageAdhesion } from './pages/Adhesion.tsx';
import { PageHeader, PageBody } from './components/PageHeader.tsx';
import { Lien } from './router';

import { ActionArticle } from './components/ActionsSection.tsx';
import { ResourceItem } from './components/ResourcesSection.tsx';
import { MemberOrg } from './components/MemberLogos.tsx';
import { DomainItem } from './components/DomainsSection.tsx';
import {
  ContactModal,
  JoinModal,
  ArticleModal,
  ResourceModal,
  MemberDetailModal,
  DomainDetailModal,
} from './components/Modals.tsx';

/**
 * Coquille de l'application : en-tête, page courante, pied de page et
 * fenêtres modales.
 *
 * La navigation passe par le fragment d'URL (voir `src/router.tsx`). Les
 * modales restent montées au niveau de la coquille parce qu'elles sont
 * ouvrables depuis l'en-tête, donc depuis n'importe quelle page.
 */
export default function App() {
  const { segments } = useRoute();
  const [section, id] = segments;

  const [contactOuvert, setContactOuvert] = useState(false);
  const [sujetContact, setSujetContact] = useState('Renseignement général');
  const [adhesionOuverte, setAdhesionOuverte] = useState(false);
  const [article, setArticle] = useState<ActionArticle | null>(null);
  const [ressource, setRessource] = useState<ResourceItem | null>(null);
  const [membre, setMembre] = useState<MemberOrg | null>(null);
  const [domaine, setDomaine] = useState<DomainItem | null>(null);

  const ouvrirContact = (sujet?: string) => {
    setSujetContact(sujet || 'Renseignement général');
    setContactOuvert(true);
  };
  const ouvrirAdhesion = () => setAdhesionOuverte(true);

  // L'espace d'administration et la connexion n'ont ni l'en-tête ni le
  // pied de page du site : ce ne sont pas des pages du site public, et les
  // y enfermer donnerait un tableau de bord qui se croit encore une page
  // d'accueil.
  // Aucune authentification côté serveur n'est disponible sur ce site statique.
  // L'ancienne maquette acceptait tout mot de passe et ne doit pas être publiée.

  const page = (() => {
    switch (section) {
      case undefined:
        return (
          <Accueil
            onOpenContact={ouvrirContact}
            onOpenJoin={ouvrirAdhesion}
            onSelectArticle={setArticle}
            onSelectResource={setRessource}
            onSelectMember={setMembre}
            onSelectDomain={setDomaine}
          />
        );
      case 'reseau':
        return <PageReseau />;
      case 'domaines':
        return id ? <PageDomaine id={id} /> : <PageDomaines />;
      case 'actions':
        return id ? <PageAction id={id} /> : <PageActions />;
      case 'projets':
        return <PageProjets />;
      case 'membres':
        return id ? <PageMembre id={id} /> : <PageMembres />;
      case 'gouvernance':
        return <PageGouvernance />;
      case 'ressources':
        return id ? <PageRessource id={id} /> : <PageRessources />;
      case 'opportunites':
        return id ? <PageOpportunite id={id} /> : <PageOpportunites />;
      case 'partenariats':
        return <PagePartenariats />;
      case 'contact':
        return <PageContact />;
      case 'adhesion':
        return <PageAdhesion />;
      case 'connexion':
      case 'admin':
        return <><PageHeader titre="Espace membre en préparation" amorce="L’accès aux comptes des organisations sera ouvert lorsque l’authentification sera mise en service." image="/assets/img/atelier-ecriture.jpg" fil={[{ label: 'Espace membre' }]} /><PageBody><div className="max-w-2xl rounded-carte border border-line bg-surface p-8"><p className="leading-relaxed text-ink-soft">Pour demander une mise à jour de votre fiche ou transmettre une information au réseau, contactez le Secrétariat exécutif.</p><Lien vers="/contact" className="mt-6 inline-flex rounded-bouton bg-rve-green px-5 py-3 text-sm font-bold text-white hover:bg-rve-green-ink">Contacter le Secrétariat exécutif</Lien></div></PageBody></>;
      case 'confidentialite':
        return <PageConfidentialite />;
      default:
        return <PageIntrouvable quoi="Cette page" retour="/" />;
    }
  })();

  return (
    <div className="flex min-h-screen flex-col bg-surface font-body text-ink selection:bg-rve-green/20 selection:text-rve-green-deep">
      <ProgressionLecture />
      <Navbar onOpenContact={ouvrirContact} onOpenJoin={ouvrirAdhesion} />

      <main className="flex-1">{page}</main>

      <Footer onOpenContact={ouvrirContact} onOpenJoin={ouvrirAdhesion} />

      <ContactModal
        isOpen={contactOuvert}
        onClose={() => setContactOuvert(false)}
        defaultSubject={sujetContact}
      />
      <JoinModal
        isOpen={adhesionOuverte}
        onClose={() => setAdhesionOuverte(false)}
      />
      <ArticleModal article={article} onClose={() => setArticle(null)} />
      <ResourceModal resource={ressource} onClose={() => setRessource(null)} />
      <MemberDetailModal
        member={membre}
        onClose={() => setMembre(null)}
        onContact={ouvrirContact}
      />
      <DomainDetailModal
        domain={domaine}
        onClose={() => setDomaine(null)}
        onOpenContact={ouvrirContact}
      />
    </div>
  );
}
