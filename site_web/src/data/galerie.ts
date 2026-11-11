/**
 * Galerie photo du réseau.
 *
 * Les légendes décrivent ce que montre l'image, sans nommer personne : les
 * autorisations de droit à l'image n'ont pas été collectées nom par nom, et
 * une identification erronée sur un site public se corrige mal.
 *
 * Le ratio est enregistré avec chaque photo pour que la grille réserve la
 * bonne hauteur avant le chargement — sans quoi la page saute au fur et à
 * mesure que les images arrivent, ce qui est exactement ce qu'on ne veut pas
 * sur une connexion mobile lente.
 */

export interface Photo {
  /** Nom de fichier, sans extension. Sert aussi d'identifiant d'ancre. */
  id: string;
  legende: string;
  ratio: number;
}

export interface Album {
  id: string;
  titre: string;
  lieu: string;
  /** Date lisible ; vide tant qu'elle n'est pas confirmée par le réseau. */
  date: string;
  resume: string;
  couverture: string;
  photos: Photo[];
}

export const ALBUMS: Album[] = [
  {
    id: 'renforcement-capacites-2026',
    titre: 'Renforcement de capacités des organisations membres',
    lieu: 'Cotonou',
    date: '8 et 9 octobre 2026',
    resume:
      'Deux journées de travail consacrées aux compétences organisationnelles, techniques et stratégiques des organisations membres, conformément à l’article 10 des statuts.',
    couverture: 'IMG_4811',
    photos: [
      { id: 'IMG_4811', legende: 'Échanges entre participantes pendant une pause des travaux', ratio: 1.83 },
      { id: 'IMG_4797', legende: 'Prise de parole en plénière', ratio: 1.22 },
      { id: 'IMG_4755', legende: 'Séquence de formation consacrée aux types de leadership', ratio: 1.691 },
      { id: 'IMG_4809', legende: 'Deux participantes confrontent leurs notes', ratio: 1.828 },
      { id: 'IMG_4761', legende: 'Une participante intervient dans la discussion', ratio: 1.83 },
      { id: 'IMG_4763', legende: 'Participante en tenue de cérémonie pendant la session', ratio: 1.653 },
      { id: 'IMG_4771', legende: 'Travail en binôme sur les supports de l’atelier', ratio: 1.83 },
      { id: 'IMG_4777', legende: 'Groupe de travail autour d’une table', ratio: 1.83 },
      { id: 'IMG_4784', legende: 'Participantes pendant les travaux de groupe', ratio: 1.83 },
      { id: 'IMG_4800', legende: 'Échanges debout entre organisations membres', ratio: 1.828 },
      { id: 'IMG_4806', legende: 'Portrait d’une participante en tenue traditionnelle', ratio: 1.54 },
      { id: 'IMG_4808', legende: 'Travail à deux sur un document de l’atelier', ratio: 1.797 },
      { id: 'IMG_4825', legende: 'Table de travail collective', ratio: 1.83 },
      { id: 'IMG_4827', legende: 'Discussion en petit groupe', ratio: 1.83 },
      { id: 'IMG_4829', legende: 'Intervention d’une participante', ratio: 1.689 },
      { id: 'IMG_4831', legende: 'Concentration pendant les travaux', ratio: 1.689 },
    ],
  },
  {
    id: 'clm-2026',
    titre: 'Formation au suivi communautaire (Community-Led Monitoring)',
    lieu: 'Bénin',
    date: '25 et 26 septembre 2026',
    resume:
      'Formation consacrée à l’analyse des données communautaires et à la redevabilité, au bénéfice des organisations membres et de leurs relais de terrain.',
    couverture: 'clm-32',
    photos: [
      { id: 'clm-32', legende: 'Participantes devant le visuel de la formation', ratio: 1.671 },
      { id: 'clm-35', legende: 'Participantes à l’issue d’une session', ratio: 1.671 },
      { id: 'clm-01', legende: 'Ouverture des travaux', ratio: 1.699 },
      { id: 'clm-11', legende: 'Une autorité traditionnelle participe à la formation', ratio: 0.849 },
      { id: 'clm-36', legende: 'Portrait devant le kakémono de la formation', ratio: 1.671 },
      { id: 'clm-38', legende: 'Groupe de participantes après la session', ratio: 1.667 },
      { id: 'clm-04', legende: 'Travaux de groupe sur les outils de suivi', ratio: 1.671 },
      { id: 'clm-06', legende: 'Échange entre deux participantes', ratio: 1.671 },
      { id: 'clm-09', legende: 'À la table d’honneur pendant l’ouverture', ratio: 1.667 },
      { id: 'clm-42', legende: 'Une participante pendant les exercices pratiques', ratio: 1.671 },
      { id: 'clm-44', legende: 'Suivi attentif de la présentation', ratio: 1.671 },
      { id: 'clm-47', legende: 'Deux participantes pendant la formation', ratio: 1.671 },
    ],
  },
  {
    id: 'ateliers-rencontres',
    titre: 'Ateliers et rencontres du réseau',
    lieu: 'Bénin',
    date: '',
    resume:
      'Sessions de travail, concertations et rencontres institutionnelles réunissant les organisations membres.',
    couverture: 'wa-32',
    photos: [
      { id: 'wa-32', legende: 'Photo de groupe devant les supports du réseau', ratio: 1.573 },
      { id: 'wa-31', legende: 'Les participantes à l’issue de la rencontre', ratio: 1.501 },
      { id: 'wa-09', legende: 'Séance de travail en salle', ratio: 1.564 },
      { id: 'wa-22', legende: 'Panel devant le visuel Voix EssentiELLES', ratio: 1.501 },
      { id: 'wa-03', legende: 'Session de travail sur les outils du réseau', ratio: 1.501 },
      { id: 'wa-07', legende: 'Participante en tenue de cérémonie', ratio: 1.417 },
      { id: 'wa-10', legende: 'Une participante pendant l’atelier', ratio: 1.501 },
      { id: 'wa-13', legende: 'Travail sur ordinateur pendant la session', ratio: 1.43 },
      { id: 'wa-18', legende: 'Participante pendant les échanges', ratio: 1.411 },
      { id: 'wa-24', legende: 'Concentration pendant la restitution', ratio: 1.501 },
    ],
  },
];

export const CHEMIN_PHOTO = (id: string) => `/assets/img/galerie/${id}.jpg`;
export const CHEMIN_MINIATURE = (id: string) => `/assets/img/galerie/${id}-mini.jpg`;

export const TOUTES_PHOTOS = ALBUMS.flatMap((a) =>
  a.photos.map((p) => ({ ...p, album: a.id, albumTitre: a.titre })),
);
