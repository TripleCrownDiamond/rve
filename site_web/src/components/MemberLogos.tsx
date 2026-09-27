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
      className="max-h-16 w-full object-contain"
      style={{ '--densite': luminosite } as React.CSSProperties}
    />
  );
};

export const MEMBER_ORGANIZATIONS: MemberOrg[] = [
  {
    id: 'fjad',
    name: 'Fondation des Jeunes Amazones pour le Développement',
    shortName: 'FJAD',
    category: 'Membre Fondateur',
    description: "Organisation pionnière mobilisée pour l'éveil citoyen, la défense des droits fondamentaux des filles et l'autonomie des jeunes femmes béninoises.",
    focus: 'Droits des filles, leadership jeune, éveil citoyen',
    logo: <LocalLogo src="/assets/logos/fjad.jpg" alt="Logo FJAD" />,
  },
  {
    id: 'fran',
    name: 'Fondation Reine ADJIGNON NATABOU',
    shortName: 'FRAN',
    category: 'Membre Fondateur',
    description: 'Institution valorisant le leadership féminin d’inspiration patrimoniale et royale, la protection des orphelins, la paix et la médiation sociale.',
    focus: 'Leadership traditionnel, médiation, protection sociale',
    logo: <LocalLogo src="/assets/logos/fran.jpg" alt="Logo Fondation Reine Adjignon Natabou" />,
  },
  {
    id: 'fadec',
    name: 'FADeC ONG',
    shortName: 'FADeC ONG',
    category: 'Organisation Membre',
    description: 'Acteur de premier plan dans le renforcement des capacités communautaires, la santé reproductive, le développement local et la solidarité.',
    focus: 'Santé communautaire, développement local, inclusion',
    logo: <LocalLogo src="/assets/logos/fadec.jpg" alt="Logo FADeC" />,
  },
  {
    id: 'via-me',
    name: 'Volontaires Itinérants Actifs pour le Mieux-Être',
    shortName: 'VIA-ME',
    category: 'Organisation Membre',
    description: 'Réseau de volontaires de terrain déployant des cliniques mobiles, un soutien psychosocial et des actions de santé de proximité.',
    focus: 'Cliniques itinérantes, accès aux soins, bien-être social',
    logo: <LocalLogo src="/assets/logos/via-me.png" alt="Logo VIA-ME" />,
  },
  {
    id: 'wopa',
    name: 'Women & Power Association',
    shortName: 'WOPA',
    category: 'Organisation Membre',
    description: 'Mouvement voué au renforcement du pouvoir d’action politique et économique des femmes, au mentorat d’excellence et aux carrières publiques.',
    focus: 'Pouvoir d’action féminin, carrières, mentorat',
    logo: <LocalLogo src="/assets/logos/wopas.png" alt="Logo Women and Power Association" />,
  },
  {
    id: 'gjfa',
    name: 'Groupe de Jeunes Filles & Femmes Autonomes',
    shortName: 'GJFA',
    category: 'Organisation Membre',
    description: 'Collectif dynamique focalisé sur l’autonomisation financière, les micro-entreprises féminines et la formation professionnelle qualifiante.',
    focus: 'Autonomisation financière, formation professionnelle',
    logo: <LocalLogo src="/assets/logos/gjfa.jpg" alt="Logo GJFA" />,
  },
  {
    id: 'bwaa',
    name: 'Benin Women Alumni Association',
    shortName: 'BWAA',
    category: 'Organisation Membre',
    description: 'Réseau réunissant des lauréates et alumni de programmes internationaux pour catalyser l’innovation sociale, la recherche et l’impact.',
    focus: 'Réseau d’excellence, innovation, programmes internationaux',
    logo: <LocalLogo src="/assets/logos/bwaa.jpg" alt="Logo BWAA" />,
  },
  {
    id: 'frh',
    name: 'Fondation Reine HANGBE',
    shortName: 'FRH',
    category: 'Organisation Membre',
    description: 'Structure inspirée par l’héritage historique de la Reine Hangbé du Danxomè, valorisant le matrimoine, la culture et l’émancipation féminine.',
    focus: 'Histoire & Matrimoine, émancipation culturelle',
    logo: <LocalLogo src="/assets/logos/frh.jpg" alt="Logo Fondation Reine Hangbe" />,
  },
  {
    id: 'icone360',
    name: 'Icône 360',
    shortName: 'Icône 360',
    category: 'Organisation Membre',
    description: 'Agence et laboratoire d’idées spécialisé dans la communication d’impact, le plaidoyer numérique et la valorisation médiatique des femmes leaders.',
    focus: 'Communication de plaidoyer, médias, visibilité',
    logo: <LocalLogo src="/assets/logos/icone360.jpg" alt="Logo Icône 360" />,
  },
  {
    id: 'sua',
    name: 'Speak Up Africa',
    shortName: 'Speak Up Africa',
    category: 'Partenaire Stratégique',
    description: 'Organisation d’action et de plaidoyer panafricaine catalyseur de l’initiative Voix EssentiELLES, appuyant la santé publique et le leadership.',
    focus: 'Plaidoyer panafricain, santé globale, appui institutionnel',
    logo: <LocalLogo src="/assets/logos/speakup-africa.png" alt="Logo Speak Up Africa" />,
  },
];
