import React, { useCallback, useEffect, useState } from 'react';

/**
 * Routeur minimal, fondé sur le fragment d'URL.
 *
 * Pourquoi pas `react-router` : son installation échoue ici sur un conflit
 * de dépendances entre React 19 et TypeScript 7. Forcer la résolution
 * mettrait `node_modules` dans un état incertain pour une maquette dont le
 * besoin de routage tient en quarante lignes.
 *
 * Le fragment (`/#/domaines/3`) a un second mérite : il n'exige aucune
 * réécriture côté serveur, donc la maquette s'ouvre depuis n'importe quel
 * hébergement statique, y compris un simple dossier partagé.
 *
 * Le jour où le site passe sous WordPress, ces chemins deviennent des URL
 * réelles sans que l'arborescence bouge.
 */

export interface Route {
  /** Segments du chemin, sans le « # ». `/domaines/3` → ['domaines','3'] */
  segments: string[];
  /** Chemin complet, normalisé, tel qu'il sert de clé de comparaison. */
  chemin: string;
}

function lire(): Route {
  const brut = window.location.hash.replace(/^#\/?/, '');
  const segments = brut.split('/').filter(Boolean);
  return { segments, chemin: '/' + segments.join('/') };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(lire);

  useEffect(() => {
    const auChangement = () => setRoute(lire());
    window.addEventListener('hashchange', auChangement);
    return () => window.removeEventListener('hashchange', auChangement);
  }, []);

  return route;
}

/** Navigue vers un chemin et remonte en haut de la nouvelle page. */
export function naviguer(chemin: string) {
  const cible = chemin.startsWith('/') ? chemin : `/${chemin}`;
  window.location.hash = cible === '/' ? '/' : cible;
  // Une nouvelle page commence en haut : conserver le défilement de la
  // précédente ferait atterrir le visiteur au milieu d'un contenu qu'il
  // n'a pas encore vu.
  window.scrollTo({ top: 0, behavior: 'auto' });
}

interface LienProps {
  vers: string;
  children: React.ReactNode;
  className?: string;
  'aria-current'?: React.AriaAttributes['aria-current'];
  onClick?: () => void;
  title?: string;
  'aria-label'?: string;
}

/**
 * Lien interne. Reste une vraie balise `<a>` avec un `href` : le clic
 * milieu, « ouvrir dans un nouvel onglet » et la lecture par les
 * technologies d'assistance continuent de fonctionner.
 */
export const Lien: React.FC<LienProps> = ({
  vers,
  children,
  className = '',
  onClick,
  ...reste
}) => {
  const href = `#${vers.startsWith('/') ? vers : `/${vers}`}`;

  const auClic = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // On laisse le navigateur faire son travail pour les clics enrichis.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      onClick?.();
      naviguer(vers);
    },
    [vers, onClick],
  );

  return (
    <a href={href} onClick={auClic} className={className} {...reste}>
      {children}
    </a>
  );
};
