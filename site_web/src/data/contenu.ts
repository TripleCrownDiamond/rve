import { useSyncExternalStore } from 'react';
import { ALBUMS, type Album } from './galerie';
import { DOCUMENTS, type DocumentPublic } from './documents';
import { PARTENAIRES, type Partenaire } from './partenaires';
import { ORGANES, PERSONNES, type Organe, type Personne } from './equipe';
import { CONTACT, SOCIAUX, RESEAU, type Social } from './reseau';

/**
 * Couche de contenu éditable.
 *
 * Le cahier des charges prévoit un back-end PHP/Laravel sur MySQL. Il n'est
 * pas encore écrit : cette couche tient la même forme de données et les
 * conserve dans le navigateur, de sorte que le branchement sur l'API se
 * réduise à remplacer `charger` et `enregistrer`. Les composants du site, eux,
 * ne changeront pas — ils lisent déjà par `useContenu`.
 *
 * Deux conséquences qu'il faut assumer et dire clairement :
 *  · ce qui est modifié ici ne sort pas du navigateur de la personne qui
 *    l'a modifié ; ce n'est pas une publication ;
 *  · un vidage du cache remet les valeurs d'origine.
 * L'espace d'administration l'affiche, pour qu'il n'y ait aucun doute lors
 * de la démonstration au réseau.
 */

export interface Diapositive {
  id: string;
  image: string;
  /**
   * Version réduite, pour la bande de pagination.
   *
   * Sans elle, la bande affichait les six images plein format réduites à
   * 72 pixels par le navigateur : deux mégaoctets téléchargés pour six
   * vignettes, sur un site dont le public se connecte en grande partie
   * depuis un téléphone. Les vignettes pèsent 6 à 8 Ko.
   */
  vignette: string;
  /** Une ligne, pas un paragraphe : le texte se lit en passant. */
  titre: string;
  /** Lieu ou contexte, facultatif. */
  mention: string;
  /** Position de l'image dans son cadre, en CSS object-position. */
  cadrage: string;
}

export interface Contenu {
  identite: {
    signature: string;
    but: string;
  };
  contact: {
    adresse: string;
    departement: string;
    postale: string;
    telephone: string;
    email: string;
  };
  sociaux: Social[];
  diapositives: Diapositive[];
  albums: Album[];
  documents: DocumentPublic[];
  partenaires: Partenaire[];
  organes: Organe[];
  personnes: Personne[];
}

export const CONTENU_DEFAUT: Contenu = {
  identite: { signature: RESEAU.signature, but: RESEAU.but },
  contact: {
    adresse: CONTACT.adresse,
    departement: CONTACT.departement,
    postale: CONTACT.postale,
    telephone: CONTACT.telephone,
    email: CONTACT.email,
  },
  sociaux: [...SOCIAUX],
  diapositives: [
    { id: 'wa-32', image: '/assets/img/hero/wa-32.jpg', vignette: '/assets/img/hero/wa-32-vignette.jpg', titre: 'Des organisations, une seule voix', mention: 'Rencontre du réseau', cadrage: 'center 40%' },
    { id: 'IMG_4811', image: '/assets/img/hero/IMG_4811.jpg', vignette: '/assets/img/hero/IMG_4811-vignette.jpg', titre: 'La sororité comme méthode de travail', mention: 'Cotonou, octobre 2026', cadrage: 'center 35%' },
    { id: 'clm-32', image: '/assets/img/hero/clm-32.jpg', vignette: '/assets/img/hero/clm-32-vignette.jpg', titre: 'Former celles qui portent les voix', mention: 'Suivi communautaire, septembre 2026', cadrage: 'center 35%' },
    { id: 'wa-09', image: '/assets/img/hero/wa-09.jpg', vignette: '/assets/img/hero/wa-09-vignette.jpg', titre: 'Mutualiser plutôt que se disperser', mention: 'Atelier des organisations membres', cadrage: 'center 45%' },
    { id: 'IMG_4809', image: '/assets/img/hero/IMG_4809.jpg', vignette: '/assets/img/hero/IMG_4809-vignette.jpg', titre: 'Des compétences qui se partagent', mention: 'Renforcement de capacités', cadrage: 'center 40%' },
    { id: 'clm-35', image: '/assets/img/hero/clm-35.jpg', vignette: '/assets/img/hero/clm-35-vignette.jpg', titre: 'Analyser, alerter, obtenir des comptes', mention: 'Community-Led Monitoring', cadrage: 'center 32%' },
  ],
  albums: ALBUMS,
  documents: DOCUMENTS,
  partenaires: PARTENAIRES,
  organes: ORGANES,
  personnes: PERSONNES,
};

const CLE = 'rve-contenu-v1';

function charger(): Contenu {
  if (typeof window === 'undefined') return CONTENU_DEFAUT;
  try {
    const brut = window.localStorage.getItem(CLE);
    if (!brut) return CONTENU_DEFAUT;
    // Fusion superficielle : une clé ajoutée au code après une sauvegarde
    // doit apparaître, sans quoi le site perdrait une rubrique entière.
    return { ...CONTENU_DEFAUT, ...(JSON.parse(brut) as Partial<Contenu>) };
  } catch {
    return CONTENU_DEFAUT;
  }
}

let etat: Contenu = charger();
const abonnes = new Set<() => void>();

function diffuser() {
  abonnes.forEach((f) => f());
}

export function ecrireContenu<K extends keyof Contenu>(cle: K, valeur: Contenu[K]) {
  etat = { ...etat, [cle]: valeur };
  try {
    window.localStorage.setItem(CLE, JSON.stringify(etat));
  } catch {
    /* Navigation privée ou stockage plein : l'édition reste valable
       pour la session en cours, elle ne survit pas au rechargement. */
  }
  diffuser();
}

export function reinitialiserContenu() {
  etat = CONTENU_DEFAUT;
  try {
    window.localStorage.removeItem(CLE);
  } catch {
    /* rien à nettoyer */
  }
  diffuser();
}

/** Vrai si le contenu affiché a été modifié depuis l'espace d'administration. */
export function contenuModifie() {
  try {
    return window.localStorage.getItem(CLE) !== null;
  } catch {
    return false;
  }
}

function sabonner(f: () => void) {
  abonnes.add(f);
  return () => abonnes.delete(f);
}

export function useContenu<K extends keyof Contenu>(cle: K): Contenu[K] {
  return useSyncExternalStore(
    sabonner,
    () => etat[cle],
    () => CONTENU_DEFAUT[cle],
  );
}
