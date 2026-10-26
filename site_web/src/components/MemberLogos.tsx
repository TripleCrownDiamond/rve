import React, { useEffect, useRef, useState } from 'react';

/**
 * Niveau d'encre visé, commun à tous les logos au repos (0 = noir, 255 = blanc).
 * Mesuré comme la luminance moyenne des pixels non blancs.
 */
const ENCRE_CIBLE = 168;

/**
 * Normalise la densité d'un logo.
 *
 * Un `grayscale` uniforme ne suffit pas : les marques n'ont pas la même
 * luminosité d'origine, et la grille passe alors de presque blanc à très
 * sombre d'une tuile à l'autre. Mesure faite sur les dix logos du réseau :
 * l'encre allait de 128 à 207, soit 79 niveaux d'écart.
 *
 * Chaque logo est donc mesuré une fois au chargement, puis corrigé par sa
 * propre luminosité pour rejoindre la cible commune. Le facteur reste borné
 * pour qu'une marque extrême ne parte pas en blanc délavé ou en noir bouché.
 *
 * La tuile n'ajoute aucun contraste fixe par-dessus : appliqué après, il
 * ré-écarterait les valeurs autour de 128 et annulerait la normalisation.
 *
 * L'égalisation principale ne vient d'ailleurs pas d'ici mais de l'opacité
 * appliquée sur la tuile : comprimer chaque logo vers le blanc du fond
 * rapproche les tonalités par construction, un logo sombre s'éclaircissant
 * beaucoup et un logo déjà clair presque pas. Cette mesure-ci ne sert qu'à
 * rattraper les extrêmes, d'où des bornes resserrées.
 */
function useDensiteNormalisee(src: string) {
  const ref = useRef<HTMLImageElement>(null);
  const [luminosite, setLuminosite] = useState(1);

  useEffect(() => {
    const img = ref.current;
    if (!img) return;

    const mesurer = () => {
      if (!img.naturalWidth) return;
      try {
        const c = document.createElement('canvas');
        c.width = 64;
        c.height = 64;
        const x = c.getContext('2d', { willReadFrequently: true });
        if (!x) return;
        x.filter = 'grayscale(1)';
        x.fillStyle = '#fff';
        x.fillRect(0, 0, 64, 64);
        const r = Math.min(64 / img.naturalWidth, 64 / img.naturalHeight);
        const w = img.naturalWidth * r;
        const h = img.naturalHeight * r;
        x.drawImage(img, (64 - w) / 2, (64 - h) / 2, w, h);
        const d = x.getImageData(0, 0, 64, 64).data;
        let somme = 0;
        let n = 0;
        for (let i = 0; i < d.length; i += 4) {
          const L = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
          if (L < 250) {
            somme += L;
            n += 1;
          }
        }
        if (!n) return;
        const encre = somme / n;
        setLuminosite(Math.min(1.3, Math.max(0.78, ENCRE_CIBLE / encre)));
      } catch {
        // Canvas indisponible ou image non lisible : on garde la valeur neutre.
      }
    };

    if (img.complete) mesurer();
    else img.addEventListener('load', mesurer, { once: true });
  }, [src]);

  return { ref, luminosite };
}

export interface MemberOrg {
  id: string;
  name: string;
  shortName: string;
  category: 'Membre Fondateur' | 'Organisation Membre' | 'Partenaire Stratégique';
  description: string;
  focus: string;
  zone?: string;
  address?: string;
  email?: string;
  phone?: string;
  website?: string;
  socials?: { label: string; url: string }[];
  contactPerson?: string;
  contactRole?: string;
  profileComplete?: boolean;
  logo: React.ReactNode;
}

const LocalLogo = ({ src, alt }: { src: string; alt: string }) => {
  const { ref, luminosite } = useDensiteNormalisee(src);
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading="lazy"
      className="max-h-24 w-full object-contain"
      style={{ '--densite': luminosite } as React.CSSProperties}
    />
  );
};

export const MEMBER_ORGANIZATIONS: MemberOrg[] = [
  {
    id: 'fjad',
    name: 'Fondation des Jeunes Amazones pour le Développement',
    shortName: 'FJAD',
    category: 'Organisation Membre',
    description: 'Association féministe engagée contre les inégalités de genre et les violences faites aux femmes et aux filles. Elle mène des campagnes de sensibilisation, des actions de plaidoyer et des services de protection.',
    focus: 'Droits des femmes et des filles, DSSR, lutte contre les violences, leadership, réinsertion et résilience climatique',
    zone: 'Bénin, principalement les quatre départements du Nord', address: 'Parakou, Albarika, Carrefour Kilombo', email: 'fjadamazone@gmail.com', phone: '+229 01 58 20 11 12', website: 'https://fjadamazones.org/', profileComplete: true,
    socials: [{ label: 'Facebook', url: 'https://www.facebook.com/share/1PEYHR5ab5/' }, { label: 'LinkedIn', url: 'https://www.linkedin.com/company/fjadbenin/' }, { label: 'TikTok', url: 'https://www.tiktok.com/@fjad.amazones' }, { label: 'YouTube', url: 'https://www.youtube.com/@fjadamazones' }, { label: 'X', url: 'https://x.com/FjadAmazones' }], contactPerson: 'Bénédicta ALOAKINNOU', contactRole: 'Présidente',
    logo: <LocalLogo src="/assets/logos/fjad.jpg" alt="Logo FJAD" />,
  },
  {
    id: 'fran',
    name: 'Fondation Reine ADJIGNON NATABOU',
    shortName: 'FRAN',
    category: 'Organisation Membre',
    description: 'Créée en 2016 et basée à Toviklin, la Fondation œuvre pour l’autonomisation des femmes et des filles ainsi que pour l’épanouissement des jeunes et des personnes vulnérables.',
    focus: 'Autonomisation, santé communautaire et leadership féminin', zone: 'Couffo et Zou', address: 'Toviklin, arrondissement Avédjin, quartier Natabouhoué, palais Guinli', email: 'fondationreineadjignon@gmail.com', phone: '+229 01 61 32 83 83', profileComplete: true, contactPerson: 'Sa Majesté Reine GUINLITODJI ADJIGNON NATABOU', contactRole: 'Présidente',
    logo: <LocalLogo src="/assets/logos/fran.jpg" alt="Logo Fondation Reine Adjignon Natabou" />,
  },
  {
    id: 'fadec',
    name: 'Femmes Actrices de Développement Communautaire (FADeC ONG)',
    shortName: 'FADeC ONG',
    category: 'Organisation Membre',
    description: 'Créée en 2006 par les médiatrices EDUCOM, FADeC ONG agit pour la réduction de la pauvreté et la participation des femmes au développement communautaire.',
    focus: 'DSSR, nutrition, protection, droits socioéconomiques, climat et droits humains', zone: 'Ouémé, Atlantique, Couffo, Zou, Collines et Donga', address: 'Cotonou, Fifadji, 9e arrondissement', email: 'fadec02@yahoo.fr', phone: '+229 01 97 64 15 59', website: 'https://www.fadec-benin-ong.org', profileComplete: true, contactPerson: 'Pauline CONDE', contactRole: 'Directrice exécutive',
    logo: <LocalLogo src="/assets/logos/fadec.jpg" alt="Logo FADeC" />,
  },
  {
    id: 'via-me',
    name: 'Volontaires Itinérants Actifs pour le Mieux-Être (VIA-ME)',
    shortName: 'VIA-ME',
    category: 'Organisation Membre',
    description: 'Association de jeunes qui sensibilise, forme et éduque à l’engagement civique et au volontariat. Ses interventions couvrent notamment la santé, l’environnement et l’autonomisation des femmes.',
    focus: 'Santé, engagement civique, volontariat, genre et autonomisation', zone: 'Ensemble du territoire national', address: 'Cotonou, Zogbo, Yenawa', email: 'viameoffice@gmail.com', phone: '+229 01 60 95 80 80', website: 'https://viame-association.org/', profileComplete: true, contactPerson: 'Dr Odry F. AGBESSI', contactRole: 'Présidente', socials: [{ label: 'Facebook', url: 'https://www.facebook.com/viame229' }, { label: 'Instagram', url: 'https://www.instagram.com/viame229/' }, { label: 'X', url: 'https://x.com/ViaMe8' }],
    logo: <LocalLogo src="/assets/logos/via-me.png" alt="Logo VIA-ME" />,
  },
  {
    id: 'wopa',
    name: 'Women & Power Association Benin',
    shortName: 'WOPA',
    category: 'Organisation Membre',
    description: 'La fiche de présentation de cette organisation est en cours de collecte.',
    focus: 'À renseigner par l’organisation', email: 'wopasbenin@gmail.com',
    logo: <LocalLogo src="/assets/logos/wopas.png" alt="Logo Women and Power Association" />,
  },
  {
    id: 'gjfa',
    name: 'Groupe de Jeunes Filles et Femmes Autonomes (GJFA ONG)',
    shortName: 'GJFA',
    category: 'Organisation Membre',
    description: 'Organisation béninoise créée en 2018 pour défendre les droits des femmes et accompagner les jeunes filles, notamment en milieu rural, vers une participation autonome et équitable à la vie de leur communauté.',
    focus: 'DSSR, lutte contre les violences, leadership, autonomisation socioéconomique et environnement', zone: 'Mono et Couffo', address: 'Houéyogbé, Zoungbonou (Mono)', email: 'gjfa2018@gmail.com', phone: '+229 01 96 00 43 58', website: 'https://www.gjfabenin.org/', profileComplete: true, contactPerson: 'Anne Ella MAHOUKPO', contactRole: 'Coordonnatrice', socials: [{ label: 'Facebook', url: 'https://www.facebook.com/share/1HSW46NvbL/' }, { label: 'LinkedIn', url: 'https://www.linkedin.com/company/gjfa/' }, { label: 'X', url: 'https://x.com/gjfa_ong' }],
    logo: <LocalLogo src="/assets/logos/gjfa.jpg" alt="Logo GJFA" />,
  },
  {
    id: 'bwaa',
    name: 'Benin Women Alumni Association',
    shortName: 'BWAA',
    category: 'Organisation Membre',
    description: 'Organisation à but non lucratif créée en 2017, réunissant des femmes béninoises de plusieurs générations. Elle agit par la formation, le plaidoyer, le mentorat et la mobilisation communautaire.',
    focus: 'Leadership féminin, lutte contre les VBG, entrepreneuriat, formation et mentorat', zone: 'Zou, Abomey-Calavi et Cotonou', address: 'Cotonou, Zogbo', email: 'us.beninwomenalumni@gmail.com', phone: '+229 01 51 78 13 11', website: 'https://us-bwaa.org', profileComplete: true, contactPerson: 'Alice GOUGBE', contactRole: 'Présidente', socials: [{ label: 'Facebook', url: 'https://www.facebook.com/share/1GqFVCzhq1/' }, { label: 'TikTok', url: 'https://www.tiktok.com/@beninwomenalumni' }, { label: 'X', url: 'https://x.com/beninwomen' }],
    logo: <LocalLogo src="/assets/logos/bwaa.jpg" alt="Logo BWAA" />,
  },
  {
    id: 'frh',
    name: 'Fondation Reine HANGBE',
    shortName: 'FRH',
    category: 'Organisation Membre',
    description: 'La fiche de présentation de cette organisation est en cours de collecte.',
    focus: 'À renseigner par l’organisation', email: 'reinehangbefondation@gmail.com',
    logo: <LocalLogo src="/assets/logos/frh.jpg" alt="Logo Fondation Reine Hangbe" />,
  },
  {
    id: 'icone360',
    name: 'ICONE 360 ONG',
    shortName: 'Icône 360',
    category: 'Organisation Membre',
    description: 'La fiche de présentation de cette organisation est en cours de collecte.',
    focus: 'À renseigner par l’organisation', email: 'ongicone360@gmail.com',
    logo: <LocalLogo src="/assets/logos/icone360.jpg" alt="Logo Icône 360" />,
  },
  {
    id: 'sua',
    name: 'Speak Up Africa',
    shortName: 'Speak Up Africa',
    category: 'Partenaire Stratégique',
    description: 'Speak Up Africa accompagne le programme Voix EssentiELLES, dans le cadre duquel le réseau bénéficie d’un appui.',
    focus: 'Programme Voix EssentiELLES', website: 'https://www.speakupafrica.org/fr/program/voix-essentielles/', profileComplete: true,
    logo: <LocalLogo src="/assets/logos/speakup-africa.png" alt="Logo Speak Up Africa" />,
  },
];
