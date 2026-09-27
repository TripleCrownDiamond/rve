import React, { useEffect, useState } from 'react';
import {
  Bookmark,
  Check,
  Heart,
  Link2,
  MessageCircle,
  Send,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { duree, ease, pression } from '../motion';
import { Bouton, ChampTexte, TitreSection } from './ui';

/**
 * Actions sociales et commentaires d'un article.
 *
 * Aucun serveur derrière : le « j'aime » et le favori sont conservés dans
 * le navigateur de la lectrice, et les commentaires ne vivent que le temps
 * de la session. La maquette montre donc les états réels de l'interface
 * (aimé, enregistré, commentaire envoyé) sans prétendre qu'ils sont
 * partagés avec qui que ce soit.
 *
 * Le stockage local peut échouer — navigation privée, cookies bloqués,
 * capture de vignette — d'où les `try` autour de chaque accès : la page
 * doit s'afficher correctement même quand il est indisponible.
 */

function lireLocal(cle: string): boolean {
  try {
    return window.localStorage.getItem(cle) === '1';
  } catch {
    return false;
  }
}

function ecrireLocal(cle: string, valeur: boolean) {
  try {
    if (valeur) window.localStorage.setItem(cle, '1');
    else window.localStorage.removeItem(cle);
  } catch {
    // Stockage indisponible : l'état reste valable pour la session.
  }
}

interface ActionsProps {
  id: string;
  titre: string;
  /** Nombre affiché avant l'éventuel « j'aime » de la lectrice. */
  jaimeBase?: number;
  nbCommentaires?: number;
  className?: string;
}

export const ActionsArticle: React.FC<ActionsProps> = ({
  id,
  titre,
  jaimeBase = 0,
  nbCommentaires = 0,
  className = '',
}) => {
  const mouvementReduit = useReducedMotion();
  const [aime, setAime] = useState(false);
  const [enregistre, setEnregistre] = useState(false);
  const [lienCopie, setLienCopie] = useState(false);

  useEffect(() => {
    setAime(lireLocal(`rve:aime:${id}`));
    setEnregistre(lireLocal(`rve:favori:${id}`));
  }, [id]);

  const basculerJaime = () => {
    const v = !aime;
    setAime(v);
    ecrireLocal(`rve:aime:${id}`, v);
  };

  const basculerFavori = () => {
    const v = !enregistre;
    setEnregistre(v);
    ecrireLocal(`rve:favori:${id}`, v);
  };

  const copierLien = async () => {
    const url = `${window.location.origin}/#/actions/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setLienCopie(true);
      window.setTimeout(() => setLienCopie(false), 2200);
    } catch {
      // Presse-papiers refusé : on ouvre le partage natif en repli.
      partagerNatif(url);
    }
  };

  const partagerNatif = async (url?: string) => {
    const lien = url || `${window.location.origin}/#/actions/${id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: titre, url: lien });
      } catch {
        // Partage annulé par la lectrice : rien à signaler.
      }
    } else {
      copierLien();
    }
  };

  const bouton =
    'inline-flex cursor-pointer items-center gap-2 rounded-bouton border px-4 py-2.5 text-[0.875rem] font-semibold transition-colors duration-150';

  return (
    <div className={`flex flex-wrap items-center gap-3 border-y border-line py-5 ${className}`}>
      <motion.button
        type="button"
        onClick={basculerJaime}
        whileTap={mouvementReduit ? undefined : pression}
        transition={{ duration: duree.micro, ease: ease.sortie }}
        aria-pressed={aime}
        className={`${bouton} ${
          aime
            ? 'border-rve-red bg-rve-red/8 text-rve-red-ink'
            : 'border-line text-ink-soft hover:bg-surface-sunken hover:text-ink'
        }`}
      >
        {/* L'icône passe du contour au plein : l'état ne repose pas sur la
            seule couleur, qu'une personne daltonienne ne distinguerait pas. */}
        <Heart
          className="h-4 w-4"
          fill={aime ? 'currentColor' : 'none'}
          aria-hidden="true"
        />
        <span className="tabular-nums">{jaimeBase + (aime ? 1 : 0)}</span>
        <span className="sr-only">
          {aime ? 'Retirer mon j’aime' : 'J’aime cet article'}
        </span>
      </motion.button>

      <motion.button
        type="button"
        onClick={basculerFavori}
        whileTap={mouvementReduit ? undefined : pression}
        transition={{ duration: duree.micro, ease: ease.sortie }}
        aria-pressed={enregistre}
        className={`${bouton} ${
          enregistre
            ? 'border-rve-green bg-rve-green/8 text-rve-green-ink'
            : 'border-line text-ink-soft hover:bg-surface-sunken hover:text-ink'
        }`}
      >
        <Bookmark
          className="h-4 w-4"
          fill={enregistre ? 'currentColor' : 'none'}
          aria-hidden="true"
        />
        {enregistre ? 'Enregistré' : 'Enregistrer'}
      </motion.button>

      <button
        type="button"
        onClick={() => partagerNatif()}
        className={`${bouton} border-line text-ink-soft hover:bg-surface-sunken hover:text-ink`}
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        Partager
      </button>

      <button
        type="button"
        onClick={copierLien}
        className={`${bouton} border-line text-ink-soft hover:bg-surface-sunken hover:text-ink`}
      >
        {lienCopie ? (
          <Check className="h-4 w-4 text-rve-green" aria-hidden="true" />
        ) : (
          <Link2 className="h-4 w-4" aria-hidden="true" />
        )}
        {lienCopie ? 'Lien copié' : 'Copier le lien'}
      </button>

      <a
        href="#commentaires"
        className={`${bouton} ml-auto border-line text-ink-soft hover:bg-surface-sunken hover:text-ink`}
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        <span className="tabular-nums">{nbCommentaires}</span>
        <span>commentaire{nbCommentaires > 1 ? 's' : ''}</span>
      </a>
    </div>
  );
};

/* ------------------------------------------------------------------ *
 * Commentaires
 * ------------------------------------------------------------------ */

interface Commentaire {
  id: string;
  auteur: string;
  organisation?: string;
  date: string;
  texte: string;
  /** Une réponse du réseau est signalée comme telle. */
  duReseau?: boolean;
}

const EXEMPLES: Commentaire[] = [
  {
    id: 'c1',
    auteur: 'Adjovi Sossou',
    organisation: 'Coordinatrice départementale, Mono',
    date: 'il y a 3 jours',
    texte:
      'La question de l’accès aux soins en zone rurale mériterait une session dédiée lors de la prochaine concertation. Nous avons des données de terrain à partager.',
  },
  {
    id: 'c2',
    auteur: 'Secrétariat exécutif',
    organisation: 'RVE-Bénin',
    date: 'il y a 2 jours',
    duReseau: true,
    texte:
      'Merci pour cette proposition. Elle est transmise au collège Santé, qui prépare l’ordre du jour de la prochaine rencontre.',
  },
];

export const Commentaires: React.FC<{ articleId: string }> = ({ articleId }) => {
  const [liste, setListe] = useState<Commentaire[]>(EXEMPLES);
  const [texte, setTexte] = useState('');
  const [envoye, setEnvoye] = useState(false);

  const envoyer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!texte.trim()) return;
    setListe([
      ...liste,
      {
        id: `local-${Date.now()}`,
        auteur: 'Vous',
        date: 'à l’instant',
        texte: texte.trim(),
      },
    ]);
    setTexte('');
    setEnvoye(true);
    window.setTimeout(() => setEnvoye(false), 4000);
  };

  return (
    <section id="commentaires" className="mt-16 border-t border-line pt-12">
      <TitreSection
        niveau={3}
        titre={`Commentaires (${liste.length})`}
        amorce="Les échanges sont relus par le secrétariat exécutif avant publication."
      />

      <ul className="mt-8 flex flex-col gap-6">
        {liste.map((c) => (
          <li
            key={c.id}
            className={`rounded-carte border p-6 ${
              c.duReseau
                ? 'border-rve-green/30 bg-rve-green/5'
                : 'border-line bg-surface'
            }`}
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-[0.9375rem] font-bold text-ink">
                {c.auteur}
              </span>
              {c.duReseau && (
                <span className="rounded-bouton bg-rve-green px-2 py-0.5 text-[0.6875rem] font-semibold text-white">
                  Réseau
                </span>
              )}
              {c.organisation && (
                <span className="text-[0.8125rem] text-ink-muted">
                  {c.organisation}
                </span>
              )}
              <span className="ml-auto text-[0.8125rem] text-ink-muted">
                {c.date}
              </span>
            </div>
            <p className="mt-3 max-w-[64ch] leading-relaxed text-ink-soft">
              {c.texte}
            </p>
          </li>
        ))}
      </ul>

      <form onSubmit={envoyer} className="mt-10">
        <ChampTexte
          label="Votre commentaire"
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
          placeholder="Posez une question ou apportez un élément de terrain…"
          rows={4}
        />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          {/* Dit franchement ce que fait la maquette, plutôt que de laisser
              croire que le message part quelque part. */}
          <p className="text-[0.8125rem] text-ink-muted">
            {envoye
              ? 'Commentaire ajouté à cette page. Il n’est pas encore transmis : la maquette n’a pas de serveur.'
              : 'Maquette sans serveur : votre message reste sur cet écran.'}
          </p>
          <Bouton type="submit" icone="fleche">
            Publier
          </Bouton>
        </div>
      </form>
    </section>
  );
};
