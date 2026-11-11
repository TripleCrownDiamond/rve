/**
 * Documents publiables.
 *
 * Les statuts et le règlement intérieur ont été retirés du site : ce sont
 * des pièces de gouvernance interne, utiles pour renseigner les contenus du
 * site mais pas destinées au téléchargement public. Les fichiers eux-mêmes
 * ont été supprimés de `public/`, afin qu'aucune URL devinée ne les serve.
 *
 * Restent ici les documents que le réseau choisit de diffuser : rapports
 * d'activités, études, guides, notes de plaidoyer, communiqués.
 */

export type CategorieDocument =
  | 'Rapport'
  | 'Étude'
  | 'Guide'
  | 'Note de plaidoyer'
  | 'Communiqué';

export interface DocumentPublic {
  id: string;
  titre: string;
  categorie: CategorieDocument;
  annee: string;
  format: string;
  poids: string;
  pages?: number;
  description: string;
  url: string;
}

export const CATEGORIES_DOCUMENTS: CategorieDocument[] = [
  'Rapport',
  'Étude',
  'Guide',
  'Note de plaidoyer',
  'Communiqué',
];

/** Aucun document n'a encore été validé pour la diffusion publique. */
export const DOCUMENTS: DocumentPublic[] = [];
