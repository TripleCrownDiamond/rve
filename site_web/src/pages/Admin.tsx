import React, { useState } from 'react';
import {
  Briefcase,
  ChevronLeft,
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Newspaper,
  Plus,
  Search,
  Settings,
  Users2,
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { ARTICLES } from '../components/ActionsSection';
import { RESOURCES } from '../components/ResourcesSection';
import { MEMBER_ORGANIZATIONS } from '../components/MemberLogos';
import { OPPORTUNITES } from './Opportunites';
import { Lien, naviguer } from '../router';

/**
 * Espace d'administration — maquette.
 *
 * Aucun serveur : les tableaux lisent les mêmes données que le site
 * public, et les actions (publier, modifier, supprimer) sont inertes.
 * L'écran sert à montrer la structure de gestion, pas à la faire tourner.
 *
 * Il vit en dehors de la coquille publique : ni en-tête ni pied de page du
 * site, une barre latérale à la place. Une interface de gestion et un site
 * institutionnel n'ont ni la même densité ni le même public, et les
 * mélanger donne un tableau de bord qui se croit encore une page d'accueil.
 */

type Rubrique =
  | 'tableau'
  | 'articles'
  | 'ressources'
  | 'membres'
  | 'opportunites'
  | 'commentaires'
  | 'medias'
  | 'reglages';

type Profil = 'secretariat' | 'organisation';

/**
 * Le menu dépend du profil.
 *
 * Une organisation membre gère sa fiche, ses publications et ses annonces.
 * Elle n'a pas à voir l'annuaire des autres organisations, la modération
 * globale des commentaires ni les réglages du site : ce ne sont pas ses
 * contenus, et les afficher en lecture seule encombrerait son espace sans
 * rien lui permettre.
 */
const TOUS: Profil[] = ['secretariat', 'organisation'];
const ADMIN: Profil[] = ['secretariat'];

const MENU: {
  cle: Rubrique;
  label: string;
  icone: React.ElementType;
  profils: Profil[];
}[] = [
  { cle: 'tableau', label: 'Tableau de bord', icone: LayoutDashboard, profils: TOUS },
  { cle: 'articles', label: 'Articles', icone: Newspaper, profils: TOUS },
  { cle: 'ressources', label: 'Ressources', icone: FileText, profils: TOUS },
  { cle: 'membres', label: 'Organisations', icone: Users2, profils: ADMIN },
  { cle: 'opportunites', label: 'Opportunités', icone: Briefcase, profils: TOUS },
  { cle: 'commentaires', label: 'Commentaires', icone: MessageCircle, profils: ADMIN },
  { cle: 'medias', label: 'Médiathèque', icone: ImageIcon, profils: TOUS },
  { cle: 'reglages', label: 'Réglages', icone: Settings, profils: ADMIN },
];

/* ------------------------------------------------------------------ *
 * Briques de l'interface de gestion
 * ------------------------------------------------------------------ */

const Statistique: React.FC<{
  label: string;
  valeur: string | number;
  detail: string;
}> = ({ label, valeur, detail }) => (
  <div className="rounded-carte border border-line bg-surface p-5">
    <p className="text-[0.8125rem] text-ink-muted">{label}</p>
    <p className="mt-2 font-display text-3xl font-extrabold tabular-nums leading-none text-ink">
      {valeur}
    </p>
    <p className="mt-2 text-[0.8125rem] text-ink-muted">{detail}</p>
  </div>
);

const Etat: React.FC<{ ton: 'publie' | 'brouillon' | 'attente' }> = ({ ton }) => {
  const styles = {
    publie: 'bg-rve-green/10 text-rve-green-ink',
    brouillon: 'bg-surface-sunken text-ink-muted',
    attente: 'bg-rve-yellow/20 text-rve-yellow-ink',
  };
  const libelles = {
    publie: 'Publié',
    brouillon: 'Brouillon',
    attente: 'En attente',
  };
  return (
    <span
      className={`inline-block rounded-bouton px-2.5 py-1 text-[0.75rem] font-semibold ${styles[ton]}`}
    >
      {libelles[ton]}
    </span>
  );
};

const Tableau: React.FC<{
  colonnes: string[];
  children: React.ReactNode;
}> = ({ colonnes, children }) => (
  <div className="overflow-x-auto rounded-carte border border-line bg-surface">
    <table className="w-full min-w-[42rem] text-left text-sm">
      <thead>
        <tr className="border-b border-line">
          {colonnes.map((c) => (
            <th
              key={c}
              scope="col"
              className="px-5 py-3.5 text-[0.8125rem] font-semibold text-ink-muted"
            >
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-line-soft">{children}</tbody>
    </table>
  </div>
);

const EnTeteRubrique: React.FC<{
  titre: string;
  compte?: string;
  action?: string;
}> = ({ titre, compte, action }) => (
  <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
    <div>
      <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink">
        {titre}
      </h1>
      {compte && <p className="mt-1 text-[0.875rem] text-ink-muted">{compte}</p>}
    </div>
    {action && (
      <button
        type="button"
        className="inline-flex cursor-pointer items-center gap-2 rounded-bouton bg-rve-green px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-rve-green-ink"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        {action}
      </button>
    )}
  </div>
);

/* ------------------------------------------------------------------ *
 * Rubriques
 * ------------------------------------------------------------------ */

const TableauDeBord: React.FC = () => (
  <>
    <EnTeteRubrique
      titre="Tableau de bord"
      compte="Vue d’ensemble des contenus du site"
    />
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Statistique
        label="Articles"
        valeur={ARTICLES.length}
        detail="Publiés sur le site"
      />
      <Statistique
        label="Ressources"
        valeur={RESOURCES.length}
        detail="Documents en ligne"
      />
      <Statistique
        label="Organisations"
        valeur={MEMBER_ORGANIZATIONS.length}
        detail="Membres et partenaires"
      />
      <Statistique
        label="Opportunités"
        valeur={OPPORTUNITES.filter((o) => !o.close).length}
        detail={`${OPPORTUNITES.length} au total`}
      />
    </div>

    <h2 className="mt-10 mb-4 font-display text-lg font-bold text-ink">
      Derniers articles
    </h2>
    <Tableau colonnes={['Titre', 'Rubrique', 'Date', 'État']}>
      {ARTICLES.slice(0, 5).map((a, i) => (
        <tr key={a.id} className="transition-colors duration-150 hover:bg-surface-sunken">
          <td className="max-w-[24rem] px-5 py-3.5">
            <span className="line-clamp-1 font-medium text-ink">{a.title}</span>
          </td>
          <td className="px-5 py-3.5 text-ink-soft">{a.category}</td>
          <td className="px-5 py-3.5 whitespace-nowrap text-ink-muted">{a.date}</td>
          <td className="px-5 py-3.5">
            <Etat ton={i === 0 ? 'publie' : i === 1 ? 'brouillon' : 'publie'} />
          </td>
        </tr>
      ))}
    </Tableau>
  </>
);

const RubriqueArticles: React.FC = () => (
  <>
    <EnTeteRubrique
      titre="Articles"
      compte={`${ARTICLES.length} articles`}
      action="Nouvel article"
    />
    <Tableau colonnes={['Titre', 'Rubrique', 'Autrice', 'Date', 'État']}>
      {ARTICLES.map((a, i) => (
        <tr key={a.id} className="transition-colors duration-150 hover:bg-surface-sunken">
          <td className="max-w-[22rem] px-5 py-3.5">
            <span className="line-clamp-1 font-medium text-ink">{a.title}</span>
          </td>
          <td className="px-5 py-3.5 text-ink-soft">{a.category}</td>
          <td className="px-5 py-3.5 text-ink-soft">{a.author}</td>
          <td className="px-5 py-3.5 whitespace-nowrap text-ink-muted">{a.date}</td>
          <td className="px-5 py-3.5">
            <Etat ton={i % 4 === 1 ? 'brouillon' : 'publie'} />
          </td>
        </tr>
      ))}
    </Tableau>
  </>
);

const RubriqueRessources: React.FC = () => (
  <>
    <EnTeteRubrique
      titre="Ressources"
      compte={`${RESOURCES.length} documents`}
      action="Déposer un document"
    />
    <Tableau colonnes={['Titre', 'Catégorie', 'Année', 'Poids', 'État']}>
      {RESOURCES.map((r) => (
        <tr key={r.id} className="transition-colors duration-150 hover:bg-surface-sunken">
          <td className="max-w-[24rem] px-5 py-3.5">
            <span className="line-clamp-1 font-medium text-ink">{r.title}</span>
          </td>
          <td className="px-5 py-3.5 text-ink-soft">{r.category}</td>
          <td className="px-5 py-3.5 text-ink-muted">{r.year}</td>
          <td className="px-5 py-3.5 whitespace-nowrap text-ink-muted">
            {r.format} · {r.size}
          </td>
          <td className="px-5 py-3.5">
            <Etat ton="publie" />
          </td>
        </tr>
      ))}
    </Tableau>
  </>
);

const RubriqueMembres: React.FC = () => (
  <>
    <EnTeteRubrique
      titre="Organisations"
      compte={`${MEMBER_ORGANIZATIONS.length} fiches`}
      action="Ajouter une organisation"
    />
    <Tableau colonnes={['Organisation', 'Statut', 'Domaine', 'État']}>
      {MEMBER_ORGANIZATIONS.map((m) => (
        <tr key={m.id} className="transition-colors duration-150 hover:bg-surface-sunken">
          <td className="px-5 py-3.5">
            <span className="flex items-center gap-3">
              <span className="flex h-9 w-14 shrink-0 items-center justify-center [&_img]:max-h-8">
                {m.logo}
              </span>
              <span className="line-clamp-1 font-medium text-ink">{m.name}</span>
            </span>
          </td>
          <td className="px-5 py-3.5 whitespace-nowrap text-ink-soft">{m.category}</td>
          <td className="max-w-[16rem] px-5 py-3.5">
            <span className="line-clamp-1 text-ink-muted">{m.focus}</span>
          </td>
          <td className="px-5 py-3.5">
            <Etat ton="publie" />
          </td>
        </tr>
      ))}
    </Tableau>
  </>
);

const RubriqueOpportunites: React.FC = () => (
  <>
    <EnTeteRubrique
      titre="Opportunités"
      compte={`${OPPORTUNITES.length} annonces`}
      action="Publier une annonce"
    />
    <Tableau colonnes={['Intitulé', 'Type', 'Lieu', 'Échéance', 'État']}>
      {OPPORTUNITES.map((o) => (
        <tr key={o.id} className="transition-colors duration-150 hover:bg-surface-sunken">
          <td className="max-w-[22rem] px-5 py-3.5">
            <span className="line-clamp-1 font-medium text-ink">{o.titre}</span>
          </td>
          <td className="px-5 py-3.5 whitespace-nowrap text-ink-soft">{o.type}</td>
          <td className="px-5 py-3.5 text-ink-muted">{o.lieu}</td>
          <td className="px-5 py-3.5 whitespace-nowrap text-ink-muted">{o.echeance}</td>
          <td className="px-5 py-3.5">
            <Etat ton={o.close ? 'brouillon' : 'publie'} />
          </td>
        </tr>
      ))}
    </Tableau>
  </>
);

const RubriqueCommentaires: React.FC = () => {
  const exemples = [
    {
      auteur: 'Adjovi Sossou',
      article: 'Assemblée Générale et dynamisation de la coalition',
      date: 'il y a 3 jours',
      etat: 'attente' as const,
      texte:
        'La question de l’accès aux soins en zone rurale mériterait une session dédiée.',
    },
    {
      auteur: 'Rachidatou B.',
      article: 'Atelier technique de co-construction',
      date: 'il y a 5 jours',
      etat: 'publie' as const,
      texte: 'Merci pour ce compte rendu, très utile pour nos équipes.',
    },
  ];

  return (
    <>
      <EnTeteRubrique
        titre="Commentaires"
        compte="1 commentaire en attente de relecture"
      />
      <div className="flex flex-col gap-4">
        {exemples.map((c) => (
          <div
            key={c.auteur}
            className="rounded-carte border border-line bg-surface p-5"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-display text-[0.9375rem] font-bold text-ink">
                {c.auteur}
              </span>
              <span className="text-[0.8125rem] text-ink-muted">{c.date}</span>
              <span className="ml-auto">
                <Etat ton={c.etat} />
              </span>
            </div>
            <p className="mt-1 text-[0.8125rem] text-ink-muted">
              sur « {c.article} »
            </p>
            <p className="mt-3 max-w-[64ch] leading-relaxed text-ink-soft">
              {c.texte}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Publier', 'Répondre', 'Masquer'].map((a) => (
                <button
                  key={a}
                  type="button"
                  className="cursor-pointer rounded-bouton border border-line px-3.5 py-1.5 text-[0.8125rem] font-semibold text-ink-soft transition-colors duration-150 hover:bg-surface-sunken hover:text-ink"
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const RubriqueMedias: React.FC = () => {
  const images = [
    'pleniere-parakou.jpg',
    'atelier-ecriture.jpg',
    'participante-table.jpg',
    'hero-reseau.jpg',
  ];
  return (
    <>
      <EnTeteRubrique
        titre="Médiathèque"
        compte={`${images.length} fichiers`}
        action="Téléverser"
      />
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((f) => (
          <figure
            key={f}
            className="overflow-hidden rounded-carte border border-line bg-surface"
          >
            <img
              src={`/assets/img/${f}`}
              alt=""
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="truncate border-t border-line-soft px-4 py-2.5 text-[0.8125rem] text-ink-muted">
              {f}
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
};

const RubriqueReglages: React.FC = () => (
  <>
    <EnTeteRubrique titre="Réglages" compte="Paramètres généraux du site" />
    <div className="rounded-carte border border-line bg-surface p-6">
      <dl className="flex flex-col gap-5 text-sm">
        {[
          ['Nom du site', 'Réseau Voix EssentiELLES Bénin'],
          ['Adresse de contact', 'rvoixessentiellesbenin@gmail.com'],
          ['Siège', 'Cotonou, République du Bénin'],
          ['Langue', 'Français'],
        ].map(([k, v]) => (
          <div
            key={k}
            className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line-soft pb-4 last:border-0 last:pb-0"
          >
            <dt className="text-ink-muted">{k}</dt>
            <dd className="font-medium text-ink">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  </>
);

/* ------------------------------------------------------------------ *
 * Coquille de l'espace d'administration
 * ------------------------------------------------------------------ */

export const PageAdmin: React.FC = () => {
  const [rubrique, setRubrique] = useState<Rubrique>('tableau');

  let session: string | null = null;
  let profil: Profil = 'secretariat';
  try {
    session = window.sessionStorage.getItem('rve:session');
    if (window.sessionStorage.getItem('rve:profil') === 'organisation') {
      profil = 'organisation';
    }
  } catch {
    session = null;
  }

  const menu = MENU.filter((m) => m.profils.includes(profil));
  const estOrganisation = profil === 'organisation';

  // Si la rubrique courante n'est pas ouverte à ce profil, on retombe sur
  // le tableau de bord plutôt que d'afficher un écran vide.
  const rubriqueVisible: Rubrique = menu.some((m) => m.cle === rubrique)
    ? rubrique
    : 'tableau';

  const deconnecter = () => {
    try {
      window.sessionStorage.removeItem('rve:session');
    } catch {
      // Rien à nettoyer si le stockage est indisponible.
    }
    naviguer('/connexion');
  };

  const contenu = {
    tableau: <TableauDeBord />,
    articles: <RubriqueArticles />,
    ressources: <RubriqueRessources />,
    membres: <RubriqueMembres />,
    opportunites: <RubriqueOpportunites />,
    commentaires: <RubriqueCommentaires />,
    medias: <RubriqueMedias />,
    reglages: <RubriqueReglages />,
  }[rubriqueVisible];

  return (
    <div className="flex min-h-screen bg-surface-sunken">
      {/* Barre latérale. Sur fond sombre, le texte utilise les tokens
          vérifiés contre --color-night, pas les gris de la palette claire. */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-night lg:flex">
        <div className="px-6 py-6">
          <Lien vers="/" aria-label="Retour au site">
            <Logo variant="white" size="sm" />
          </Lien>
        </div>

        <nav className="flex-1 px-3 py-2">
          <ul className="flex flex-col gap-0.5">
            {menu.map(({ cle, label, icone: Icone }) => (
              <li key={cle}>
                <button
                  type="button"
                  onClick={() => setRubrique(cle)}
                  aria-current={rubriqueVisible === cle ? 'page' : undefined}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-bouton px-3 py-2.5 text-left text-sm font-medium transition-colors duration-150 ${
                    rubriqueVisible === cle
                      ? 'bg-rve-green text-white'
                      : 'text-on-night-soft hover:bg-white/8 hover:text-on-night'
                  }`}
                >
                  <Icone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/10 p-3">
          <Lien
            vers="/"
            className="flex items-center gap-3 rounded-bouton px-3 py-2.5 text-sm font-medium text-on-night-soft transition-colors duration-150 hover:bg-white/8 hover:text-on-night"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Retour au site
          </Lien>
          <button
            type="button"
            onClick={deconnecter}
            className="flex w-full cursor-pointer items-center gap-3 rounded-bouton px-3 py-2.5 text-left text-sm font-medium text-on-night-soft transition-colors duration-150 hover:bg-white/8 hover:text-on-night"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Déconnexion
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex flex-wrap items-center gap-4 border-b border-line bg-surface px-6 py-3.5">
          <div className="relative min-w-0 flex-1 sm:max-w-sm">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Rechercher un contenu…"
              aria-label="Rechercher un contenu"
              className="h-11 w-full rounded-bouton border border-ink-faint bg-surface pl-10 pr-4 text-sm text-ink transition-[border-color] duration-150 placeholder:text-ink-muted focus:border-[1.5px] focus:border-rve-green focus:outline-none"
            />
          </div>

          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-right sm:block">
              <span className="block text-[0.8125rem] font-semibold text-ink">
                {session || (estOrganisation ? 'Organisation membre' : 'Secrétariat exécutif')}
              </span>
              <span className="block text-[0.75rem] text-ink-muted">
                {estOrganisation ? 'Organisation membre' : 'Secrétariat exécutif'}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-rve-green font-display text-sm font-bold text-white"
            >
              {(session || 'SE').slice(0, 2).toUpperCase()}
            </span>
          </div>
        </header>

        {/* Navigation repliée en onglets sous 1024 px : une barre latérale
            fixe mangerait la moitié d'un écran de téléphone. */}
        <div className="overflow-x-auto border-b border-line bg-surface px-4 lg:hidden">
          <ul className="flex min-w-max gap-1 py-2">
            {menu.map(({ cle, label, icone: Icone }) => (
              <li key={cle}>
                <button
                  type="button"
                  onClick={() => setRubrique(cle)}
                  aria-current={rubriqueVisible === cle ? 'page' : undefined}
                  className={`flex cursor-pointer items-center gap-2 rounded-bouton px-3 py-2 text-[0.8125rem] font-medium whitespace-nowrap transition-colors duration-150 ${
                    rubriqueVisible === cle
                      ? 'bg-rve-green text-white'
                      : 'text-ink-soft hover:bg-surface-sunken'
                  }`}
                >
                  <Icone className="h-4 w-4" aria-hidden="true" />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <main className="flex-1 p-6 lg:p-8">
          {contenu}

          <p className="mt-10 rounded-carte border border-line bg-surface p-4 text-[0.8125rem] leading-relaxed text-ink-soft">
            {estOrganisation
              ? 'Profil « organisation membre » : cet espace se limite à ses propres contenus. L’annuaire des organisations, la modération des commentaires et les réglages du site restent au secrétariat exécutif.'
              : 'Profil « secrétariat exécutif » : administration complète du site.'}{' '}
            Maquette sans serveur : les actions de gestion sont inertes. Elles
            seront branchées avec la base de données.
          </p>
        </main>
      </div>
    </div>
  );
};
