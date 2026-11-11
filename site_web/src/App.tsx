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
import { PageGalerie, PageAlbum } from './pages/Galerie.tsx';
import { PageEquipe, PagePersonne } from './pages/Equipe.tsx';
import { PageOrganigramme } from './pages/Organigramme.tsx';
import { PagePartenaires } from './pages/Partenaires.tsx';
import { PageDon } from './pages/Don.tsx';
import { PageAdmin } from './pages/Admin.tsx';
import { PageProjets } from './pages/Projets.tsx';
import { PageAdhesion } from './pages/Adhesion.tsx';
import { PageAgenda } from './pages/Agenda.tsx';

import { ActionArticle } from './components/ActionsSection.tsx';
import { DomainItem } from './components/DomainsSection.tsx';
import {
  ContactModal,
  ArticleModal,
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
  const [article, setArticle] = useState<ActionArticle | null>(null);
  const [domaine, setDomaine] = useState<DomainItem | null>(null);

  const ouvrirContact = (sujet?: string) => {
    setSujetContact(sujet || 'Renseignement général');
    setContactOuvert(true);
  };

  // Le site proposait trois portes d'entrée côte à côte — « Contact »,
  // « Rejoindre le réseau », « Demande d'adhésion » — vers deux formulaires
  // différents. Le réseau en a demandé une seule : tout passe désormais par
  // le formulaire de contact, dont seul le sujet change.

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
            onSelectArticle={setArticle}
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
      case 'agenda':
        return <PageAgenda />;
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
      case 'partenaires':
        return <PagePartenaires />;
      case 'galerie':
        return id ? <PageAlbum id={id} /> : <PageGalerie />;
      case 'equipe':
        return id ? <PagePersonne id={id} /> : <PageEquipe />;
      case 'organigramme':
        return <PageOrganigramme />;
      case 'don':
        return <PageDon />;
      case 'contact':
        return <PageContact />;
      case 'adhesion':
        return <PageAdhesion />;
      case 'confidentialite':
        return <PageConfidentialite />;
      default:
        return <PageIntrouvable quoi="Cette page" retour="/" />;
    }
  })();

  // L'espace d'administration n'a ni en-tête ni pied de page du site : ce
  // n'est pas une page publique, et l'y enfermer donnerait une console qui
  // se croit encore une page d'accueil.
  if (section === 'admin' || section === 'connexion') {
    return <PageAdmin section={id} />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface font-body text-ink selection:bg-rve-green/20 selection:text-rve-green-deep">
      <ProgressionLecture />
      <Navbar onOpenContact={ouvrirContact} />

      <main className="flex-1">{page}</main>

      <Footer onOpenContact={ouvrirContact} />

      <ContactModal
        isOpen={contactOuvert}
        onClose={() => setContactOuvert(false)}
        defaultSubject={sujetContact}
      />
      <ArticleModal article={article} onClose={() => setArticle(null)} />
      <DomainDetailModal
        domain={domaine}
        onClose={() => setDomaine(null)}
        onOpenContact={ouvrirContact}
      />
    </div>
  );
}
