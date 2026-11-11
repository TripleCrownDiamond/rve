/**
 * Partenaires du réseau.
 *
 * À ne pas confondre avec les organisations membres : le cahier des charges
 * distingue explicitement les deux, et la page « Partenaires » présente les
 * partenaires techniques, financiers et institutionnels — ceux qui appuient
 * le réseau sans en être membres.
 *
 * Un seul partenariat est documenté à ce jour. Les autres seront ajoutés
 * depuis l'espace d'administration : une page de logos empruntés ferait
 * exactement ce que le réseau reproche aux sites de façade.
 */

export type TypePartenaire = 'Technique' | 'Financier' | 'Institutionnel';

export interface Partenaire {
  id: string;
  nom: string;
  type: TypePartenaire;
  logo?: string;
  description: string;
  /** Nature concrète de l'appui, pas une formule de politesse. */
  appui: string;
  siteWeb?: string;
  depuis?: string;
}

export const PARTENAIRES: Partenaire[] = [
  {
    id: 'speak-up-africa',
    nom: 'Speak Up Africa',
    type: 'Technique',
    logo: '/assets/logos/speakup-africa.png',
    description:
      'Organisation panafricaine de plaidoyer et de communication stratégique basée à Dakar, qui conduit le programme Voix EssentiELLES.',
    appui:
      'Appui au réseau dans le cadre du programme Voix EssentiELLES : renforcement des capacités des organisations membres, accompagnement du plaidoyer et soutien aux activités.',
    siteWeb: 'https://www.speakupafrica.org/fr/program/voix-essentielles/',
  },
];

export const TYPES_PARTENAIRES: { type: TypePartenaire; titre: string; texte: string }[] = [
  {
    type: 'Technique',
    titre: 'Partenaires techniques',
    texte:
      'Organisations qui apportent une expertise, une méthode ou un accompagnement aux organisations membres.',
  },
  {
    type: 'Financier',
    titre: 'Partenaires financiers',
    texte:
      'Bailleurs et fonds qui soutiennent les activités du réseau et les initiatives locales de ses membres.',
  },
  {
    type: 'Institutionnel',
    titre: 'Partenaires institutionnels',
    texte:
      'Administrations, collectivités et institutions avec lesquelles le réseau collabore dans le cadre de son plaidoyer.',
  },
];
