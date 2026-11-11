/**
 * Organigramme et personnes du réseau.
 *
 * Deux ensembles distincts, qu'il ne faut pas confondre :
 *
 *  · ORGANES    — les quatre organes statutaires et les postes qui les
 *                 composent (articles 20 à 32). Les postes existent, leurs
 *                 titulaires ne sont pas encore communiqués : `titulaire`
 *                 reste vide et l'interface l'affiche comme tel. Inventer un
 *                 nom sur un site public serait une faute, pas un remplissage.
 *
 *  · PERSONNES  — les points focaux des organisations membres, repris de la
 *                 fiche de collecte. Ceux-là sont documentés.
 */

export interface Poste {
  id: string;
  intitule: string;
  /** Vide tant que le réseau n'a pas communiqué le nom. */
  titulaire: string;
  mission: string;
}

export interface Organe {
  id: string;
  sigle: string;
  titre: string;
  rang: 1 | 2 | 3;
  role: string;
  description: string;
  rythme: string;
  composition: string;
  attributions: string[];
  postes: Poste[];
}

export const ORGANES: Organe[] = [
  {
    id: 'ag',
    sigle: 'AG',
    titre: 'Assemblée Générale',
    rang: 1,
    role: 'Instance suprême',
    description:
      'Composée de tous les membres, elle définit la politique générale du réseau, élit le Conseil d’Administration et se prononce sur les rapports d’activités et financiers.',
    rythme: 'Une session ordinaire par an, convoquée par la Présidente',
    composition: 'L’ensemble des membres du réseau',
    attributions: [
      'Définir la politique générale du réseau',
      'Élire les membres du Conseil d’Administration',
      'Élire deux conseillères ou conseillers d’orientation et de surveillance',
      'Voter le budget et approuver le programme d’activités',
      'Modifier les statuts et le règlement intérieur',
      'Attribuer la qualité de membre d’honneur',
    ],
    postes: [],
  },
  {
    id: 'ca',
    sigle: 'CA',
    titre: 'Conseil d’Administration',
    rang: 2,
    role: 'Direction et suivi',
    description:
      'Cinq membres élues par l’Assemblée Générale pour deux ans renouvelables. Le Conseil suit les décisions de l’Assemblée, propose les orientations et lui soumet le programme annuel et le budget.',
    rythme: 'Une session ordinaire par trimestre',
    composition: 'Cinq membres élues pour un mandat de deux ans renouvelable',
    attributions: [
      'Suivre l’exécution des décisions de l’Assemblée Générale',
      'Soumettre le programme annuel d’activités et le budget',
      'Gérer les biens du réseau et les opérations bancaires',
      'Créer les commissions et groupes de travail nécessaires',
      'Représenter le réseau auprès des pouvoirs publics',
    ],
    postes: [
      { id: 'presidente', intitule: 'Présidente', titulaire: '', mission: 'Garante de la bonne marche du réseau, elle le représente dans tous les actes de la vie civile, convoque et préside les sessions, et ordonne les dépenses.' },
      { id: 'vice-presidente', intitule: 'Vice-Présidente chargée du partenariat et de la mobilisation de ressources', titulaire: '', mission: 'Elle supplée la Présidente, assure la mobilisation de ressources externes, développe les partenariats et mène la veille sur les opportunités.' },
      { id: 'secretaire-generale', intitule: 'Secrétaire Générale', titulaire: '', mission: 'Dépositaire des archives, elle tient la correspondance, prépare l’ordre du jour avec la Présidente et présente le rapport d’activités à l’Assemblée Générale.' },
      { id: 'tresoriere-generale', intitule: 'Trésorière Générale', titulaire: '', mission: 'Chargée de la collecte et de la supervision des fonds, elle présente le rapport financier au Conseil d’Administration et à l’Assemblée Générale.' },
      { id: 'tresoriere-adjointe', intitule: 'Trésorière Générale Adjointe', titulaire: '', mission: 'Elle accompagne et supplée la Trésorière Générale dans ses attributions.' },
    ],
  },
  {
    id: 'cos',
    sigle: 'COS',
    titre: 'Conseil d’Orientation et de Surveillance',
    rang: 2,
    role: 'Contrôle de gestion',
    description:
      'Deux personnes bénévoles élues par l’Assemblée Générale vérifient la sincérité et la régularité des procédures, des caisses et des bilans. Leur quitus conditionne l’adoption du rapport financier.',
    rythme: 'Contrôle possible à toute époque de l’année',
    composition: 'Deux conseillères ou conseillers bénévoles, mandat de deux ans renouvelable une fois',
    attributions: [
      'Vérifier la régularité des manuels de procédures',
      'Contrôler les caisses, les valeurs et les bilans',
      'Rendre compte régulièrement à l’Assemblée Générale',
      'Délivrer le quitus préalable au rapport financier',
    ],
    postes: [
      { id: 'cos-1', intitule: 'Conseillère ou conseiller d’orientation et de surveillance', titulaire: '', mission: 'Contrôle bénévole de la régularité des procédures et des comptes.' },
      { id: 'cos-2', intitule: 'Conseillère ou conseiller d’orientation et de surveillance', titulaire: '', mission: 'Contrôle bénévole de la régularité des procédures et des comptes.' },
    ],
  },
  {
    id: 'se',
    sigle: 'SE',
    titre: 'Secrétariat Exécutif',
    rang: 3,
    role: 'Cœur opérationnel',
    description:
      'Il met en œuvre au quotidien les orientations de l’Assemblée Générale et du Conseil d’Administration, coordonne les activités et assure la gestion administrative. Il peut être hébergé par une organisation membre désignée par le Conseil d’Administration.',
    rythme: 'Activité courante',
    composition: 'Une Secrétaire Exécutive, un poste communication et plaidoyer, un poste administratif, financier et logistique',
    attributions: [
      'Coordonner l’ensemble des activités du programme annuel',
      'Gérer les ressources humaines, financières et matérielles',
      'Faciliter la relation entre les organes, les partenaires et les équipes de terrain',
      'Rendre compte des actions menées',
    ],
    postes: [
      { id: 'secretaire-executive', intitule: 'Secrétaire Exécutive', titulaire: '', mission: 'Elle planifie, coordonne, supervise et rend compte de l’ensemble des actions du programme annuel, et fait le lien entre gouvernance, partenaires et terrain.' },
      { id: 'communication', intitule: 'Chargé·e de communication et plaidoyer', titulaire: '', mission: 'Production et diffusion des contenus du réseau, appui aux actions de plaidoyer.' },
      { id: 'administration', intitule: 'Assistant·e administratif·ve, financier·e et logistique', titulaire: '', mission: 'Gestion administrative courante, suivi financier et organisation logistique des activités.' },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Personnes des organisations membres
 * ------------------------------------------------------------------ */

export interface Personne {
  id: string;
  nom: string;
  fonction: string;
  /** Identifiant de l'organisation dans MEMBER_ORGANIZATIONS. */
  organisation: string;
  /** Portrait ; vide tant que l'organisation n'en a pas transmis. */
  portrait?: string;
  bio?: string;
  email?: string;
}

/**
 * Points focaux transmis par les organisations dans la fiche de collecte.
 * Trois organisations n'ont pas encore répondu : elles n'ont pas de fiche
 * ici plutôt qu'une fiche vide.
 */
export const PERSONNES: Personne[] = [
  { id: 'benedicta-aloakinnou', nom: 'Bénédicta ALOAKINNOU', fonction: 'Présidente', organisation: 'fjad' },
  { id: 'reine-adjignon-natabou', nom: 'Sa Majesté Reine GUINLITODJI ADJIGNON NATABOU', fonction: 'Présidente', organisation: 'fran' },
  { id: 'pauline-conde', nom: 'Pauline CONDE', fonction: 'Directrice exécutive', organisation: 'fadec' },
  { id: 'odry-agbessi', nom: 'Dr Odry F. AGBESSI', fonction: 'Présidente', organisation: 'via-me' },
  { id: 'anne-ella-mahoukpo', nom: 'Anne Ella MAHOUKPO', fonction: 'Coordonnatrice', organisation: 'gjfa' },
  { id: 'alice-gougbe', nom: 'Alice GOUGBE', fonction: 'Présidente', organisation: 'bwaa' },
];

export const personnesDe = (organisation: string) =>
  PERSONNES.filter((p) => p.organisation === organisation);
