/**
 * Identité du réseau — source unique.
 *
 * Tout ce fichier est repris mot pour mot des statuts mis en conformité
 * (AGE du 29 avril 2026). Le site employait auparavant un vocabulaire de
 * rédaction libre : « coalition », « collectif », formulations maison. Les
 * statuts ont leur propre lexique, et c'est celui que le réseau défend
 * devant ses partenaires et le ministère de l'intérieur. L'article d'origine
 * est indiqué en commentaire pour que toute réécriture puisse être vérifiée.
 *
 * ⚠ « coalition » est proscrit : les statuts qualifient le RVE-Bénin de
 * « réseau d'associations », forme juridique distincte.
 */

export const RESEAU = {
  nom: 'Réseau Voix EssentiELLES Bénin',
  sigle: 'RVE-Bénin',
  /** Art. 1 — forme juridique exacte. */
  forme: 'réseau d’associations à caractère social, apolitique et à but non lucratif',
  loi: 'Loi N° 2025-19 du 22 juillet 2025 relative aux associations et aux fondations en République du Bénin',
  /** Formule demandée par le réseau pour la signature de marque. */
  signature: 'Porter les voix des femmes et des filles',
  /** Art. 7 — but. Les enfants y figurent : le site les omettait. */
  but:
    'Promouvoir les droits humains, la santé, le leadership et l’autonomisation des femmes, des filles et des enfants, à travers des actions concertées de plaidoyer, de renforcement de capacités et d’inclusion éducative, sociale et économique.',
  anneeCreation: 2025,
  dureeAns: 99,
} as const;

export const CONTACT = {
  /** Art. 4 — siège. */
  adresse: 'Cotonou, 13ᵉ arrondissement, quartier Agla Akplomey',
  departement: 'Littoral, République du Bénin',
  postale: '02 BP 591, Cotonou',
  telephone: '+229 01 96 96 80 36',
  /** Forme composable d'un href tel: — pas d'espaces. */
  telephoneLien: 'tel:+2290196968036',
  email: 'rvoixessentiellesbenin@gmail.com',
} as const;

export interface Social {
  label: string;
  url: string;
  /** Nom de l'icône simple-icons rendue par le composant ReseauxSociaux. */
  cle: 'facebook' | 'linkedin' | 'instagram' | 'tiktok' | 'youtube';
}

/**
 * Seuls les comptes réellement ouverts figurent ici. Le cahier des charges
 * prévoit Instagram, TikTok et YouTube ; tant qu'ils ne sont pas créés, les
 * afficher enverrait les visiteurs sur des liens morts.
 */
export const SOCIAUX: Social[] = [
  { label: 'Facebook', cle: 'facebook', url: 'https://www.facebook.com/share/1HQzgGeRPy/' },
  { label: 'LinkedIn', cle: 'linkedin', url: 'https://lnkd.in/p/ep6YJmSK' },
];

/** Art. 5 — objectifs, resserrés pour la lecture à l'écran. */
export const OBJECTIFS = [
  {
    titre: 'Mutualiser les ressources',
    texte:
      'Identifier, mobiliser et mutualiser les ressources financières, techniques et humaines au profit des organisations membres pour amplifier leur capacité d’intervention.',
  },
  {
    titre: 'Renforcer les capacités',
    texte:
      'Accompagner les organisations membres dans le développement de leurs compétences organisationnelles, techniques et stratégiques, par la formation, l’assistance technique et le partage d’expertises.',
  },
  {
    titre: 'Coordonner les interventions',
    texte:
      'Faciliter la coordination des interventions, favoriser les partenariats stratégiques et créer des synergies multisectorielles pour éviter les doublons.',
  },
  {
    titre: 'Porter un plaidoyer collectif',
    texte:
      'Développer et mettre en œuvre des actions de plaidoyer collectif pour influencer les politiques publiques en faveur des droits des femmes, des filles et des enfants.',
  },
  {
    titre: 'Apprendre les unes des autres',
    texte:
      'Créer et animer des espaces de partage d’expériences, de bonnes pratiques et d’apprentissage mutuel entre les membres et avec le reste de la société civile.',
  },
] as const;

/** Art. 8 — valeurs fondamentales, libellés statutaires conservés. */
export const VALEURS = [
  {
    titre: 'Équité',
    texte:
      'L’égalité des chances pour toutes et tous, contre les inégalités sociales, économiques et de genre, en santé, en éducation et en accès aux droits.',
  },
  {
    titre: 'Leadership féminin',
    texte:
      'L’émergence d’un leadership féminin transformateur, inclusif et engagé, à tous les niveaux de la société.',
  },
  {
    titre: 'Solidarité et sororité',
    texte:
      'La solidarité avec les membres et les partenaires, la sororité entre femmes, filles et alliés, pour un mouvement collectif durable.',
  },
  {
    titre: 'Innovation et excellence',
    texte:
      'Des approches innovantes, participatives et fondées sur les preuves pour répondre aux défis liés au genre, à la santé et à l’éducation.',
  },
  {
    titre: 'Partenariat et collaboration',
    texte:
      'La force du travail en réseau, en synergie et en co-construction avec les institutions, les OSC, les médias et les partenaires techniques et financiers.',
  },
  {
    titre: 'Redevabilité et transparence',
    texte:
      'L’intégrité, la transparence et la responsabilité dans toutes les actions et décisions, et la redevabilité envers les partenaires et la communauté.',
  },
] as const;

/** Art. 10 — moyens d'action. */
export const MOYENS = [
  { titre: 'Plaidoyer communautaire et institutionnel', texte: 'Actions ciblées auprès des autorités publiques, des partenaires techniques et financiers, du secteur privé et des institutions nationales et internationales.' },
  { titre: 'Renforcement des capacités', texte: 'Formations, ateliers techniques, mentorat et coaching destinés aux organisations membres.' },
  { titre: 'Appui aux initiatives locales', texte: 'Soutien technique, logistique ou financier aux initiatives de plaidoyer des membres, dans leurs zones d’intervention.' },
  { titre: 'Partenariats stratégiques', texte: 'Alliances avec les institutions étatiques, les collectivités locales, les instituts de recherche, le secteur privé et les médias.' },
  { titre: 'Valorisation des bonnes pratiques', texte: 'Reconnaissance et mise en avant des innovations et des engagements exemplaires des organisations membres.' },
  { titre: 'Visibilité', texte: 'Amplification des actions de communication du réseau et de ses membres sur tous les canaux.' },
] as const;

/** Art. 11 à 14 — composition du réseau. */
export const CATEGORIES_MEMBRES = [
  { titre: 'Membres actives', texte: 'Organisations de femmes de la société civile légalement constituées au Bénin et dirigées par des femmes, dont la demande d’adhésion a été acceptée par le Conseil d’Administration.' },
  { titre: 'Membres sympathisantes', texte: 'Organisations et championnes intéressées par les activités du réseau, sans droit de vote, participant aux rencontres et aux événements.' },
  { titre: 'Membres d’honneur', texte: 'Personnes physiques ou morales reconnues pour leur contribution exceptionnelle à la promotion des droits des femmes et des filles, sur décision de l’Assemblée Générale.' },
] as const;
