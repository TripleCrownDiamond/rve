import React, { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo.tsx';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CalendarDays,
  ChevronDown,
  FileText,
  Handshake,
  HeartHandshake,
  Images,
  Landmark,
  Menu,
  Network,
  Newspaper,
  Target,
  UserRound,
  Users2,
  X,
} from 'lucide-react';
import { Lien, useRoute } from '../router';

interface NavbarProps {
  onOpenContact: (subject?: string) => void;
}

/**
 * Navigation principale.
 *
 * Sept entrées de premier niveau demandaient au visiteur de lire toute la
 * barre avant de choisir. Elles sont regroupées en trois familles, chacune
 * répondant à une question : qui est ce réseau, ce qu'il fait, ce qu'il met
 * à disposition. Un menu à trois entrées se parcourt d'un coup d'œil.
 *
 * Chaque enfant porte une ligne de détail : dans un déroulant, un libellé
 * seul oblige souvent à cliquer pour savoir ce qu'on va trouver.
 */

interface Entree {
  label: string;
  vers: string;
  detail: string;
  icone: React.ElementType;
}

interface Encart {
  titre: string;
  texte: string;
  vers: string;
  action: string;
  image: string;
}

interface Famille {
  label: string;
  vers: string;
  enfants: Entree[];
  /** Colonne de droite du méga menu : une porte d'entrée, pas un lien de plus. */
  encart?: Encart;
}

const FAMILLES: Famille[] = [
  {
    label: 'Le réseau',
    vers: '/reseau',
    enfants: [
      { label: 'Présentation', vers: '/reseau', detail: 'But, objectifs, valeurs', icone: BookOpen },
      { label: 'Organisations membres', vers: '/membres', detail: 'Les organisations membres du réseau', icone: Users2 },
      { label: 'Équipe', vers: '/equipe', detail: 'Postes statutaires et points focaux', icone: UserRound },
      { label: 'Organigramme', vers: '/organigramme', detail: 'Qui décide, qui contrôle, qui exécute', icone: Network },
      { label: 'Gouvernance', vers: '/gouvernance', detail: 'Les quatre organes statutaires', icone: Landmark },
    ],
    encart: {
      titre: 'Des organisations, une seule voix',
      texte: 'Les organisations membres mettent leurs expériences en commun.',
      vers: '/membres',
      action: 'Découvrir les membres',
      image: '/assets/img/hero/wa-32.jpg',
    },
  },
  {
    label: 'Nos actions',
    vers: '/domaines',
    enfants: [
      { label: 'Domaines d’intervention', vers: '/domaines', detail: 'Les six champs de travail', icone: Target },
      { label: 'Projets', vers: '/projets', detail: 'Les participations documentées du réseau', icone: Briefcase },
      { label: 'Actualités', vers: '/actions', detail: 'Articles et comptes rendus', icone: Newspaper },
      { label: 'Agenda', vers: '/agenda', detail: 'Activités et rendez-vous confirmés', icone: CalendarDays },
    ],
    encart: {
      titre: 'Renforcer, plaider, coordonner',
      texte: 'Les moyens d’action que les statuts assignent au réseau.',
      vers: '/actions',
      action: 'Voir les actions',
      image: '/assets/img/hero/IMG_4809.jpg',
    },
  },
  {
    label: 'Ressources',
    vers: '/ressources',
    enfants: [
      { label: 'Galerie photo', vers: '/galerie', detail: 'Rencontres, formations et ateliers en images', icone: Images },
      { label: 'Documents et publications', vers: '/ressources', detail: 'Rapports, études, notes de plaidoyer', icone: FileText },
    ],
    encart: {
      titre: 'La galerie du réseau',
      texte: 'Les photographies des activités menées avec les organisations membres.',
      vers: '/galerie',
      action: 'Ouvrir la galerie',
      image: '/assets/img/hero/clm-32.jpg',
    },
  },
  {
    label: 'S’engager',
    vers: '/partenaires',
    enfants: [
      { label: 'Partenaires', vers: '/partenaires', detail: 'Appuis techniques, financiers, institutionnels', icone: Handshake },
      { label: 'Formes de collaboration', vers: '/partenariats', detail: 'Quatre manières de travailler ensemble', icone: HeartHandshake },
      { label: 'Opportunités', vers: '/opportunites', detail: 'Emplois, appels d’offres, candidatures', icone: Briefcase },
      { label: 'Adhésion', vers: '/adhesion', detail: 'Présenter une organisation au réseau', icone: UserRound },
    ],
    encart: {
      titre: 'Soutenir le réseau',
      texte: 'Former, plaider, appuyer les initiatives locales des organisations membres.',
      vers: '/don',
      action: 'Faire un don',
      image: '/assets/img/hero/IMG_4811.jpg',
    },
  },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const { segments } = useRoute();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [deroulant, setDeroulant] = useState<string | null>(null);
  const barre = useRef<HTMLElement>(null);

  const racine = segments[0] ? `/${segments[0]}` : '/';
  const familleActive = (f: Famille) =>
    f.vers === racine || f.enfants.some((e) => e.vers === racine);

  useEffect(() => {
    setMenuOuvert(false);
    setDeroulant(null);
  }, [racine]);

  // Un déroulant ouvert se ferme au clic extérieur et à Échap : sans cela
  // il reste suspendu au-dessus de la page qu'on essaie de lire.
  useEffect(() => {
    if (!deroulant) return;
    const auClic = (e: MouseEvent) => {
      if (!barre.current?.contains(e.target as Node)) setDeroulant(null);
    };
    const auClavier = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDeroulant(null);
    };
    document.addEventListener('mousedown', auClic);
    document.addEventListener('keydown', auClavier);
    return () => {
      document.removeEventListener('mousedown', auClic);
      document.removeEventListener('keydown', auClavier);
    };
  }, [deroulant]);

  const familleOuverte = FAMILLES.find((f) => f.label === deroulant) || null;
  const opaque = true;

  return (
    <header
      ref={barre}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-200 ${
        opaque
          ? 'border-b-2 border-rve-green/25 bg-surface-raised/95 py-3 shadow-sm backdrop-blur-sm'
          : 'border-b border-transparent bg-transparent py-5'
      }`}
    >
      <div
        className="relative mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-6 sm:px-8"
        onMouseLeave={() => setDeroulant(null)}
      >
        <Lien
          vers="/"
          className="shrink-0 transition-opacity hover:opacity-90"
          aria-label="Accueil Réseau Voix EssentiELLES Bénin"
        >
          <Logo variant={opaque ? 'color' : 'white'} size="sm" />
        </Lien>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          {FAMILLES.map((famille) => {
            const ouvert = deroulant === famille.label;
            const actif = familleActive(famille);

            const classesEntree = `relative flex cursor-pointer items-center gap-1.5 rounded-bouton px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
              opaque
                ? actif
                  ? 'text-rve-green-ink'
                  : 'text-ink-soft hover:text-ink'
                : actif
                  ? 'text-white'
                  : 'text-white/75 hover:text-white'
            }`;
            const filet = (
              <span
                aria-hidden="true"
                className={`absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full transition-[opacity,transform] duration-200 ${
                  actif ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                } ${opaque ? 'bg-rve-green' : 'bg-white'}`}
              />
            );

            if (famille.enfants.length === 0) {
              return (
                <Lien
                  key={famille.label}
                  vers={famille.vers}
                  aria-current={actif ? 'page' : undefined}
                  className={classesEntree}
                >
                  {famille.label}
                  {filet}
                </Lien>
              );
            }

            return (
              <div
                key={famille.label}
                onMouseEnter={() => setDeroulant(famille.label)}
              >
                <button
                  type="button"
                  onClick={() => setDeroulant(famille.label)}
                  aria-expanded={ouvert}
                  aria-haspopup="true"
                  className={`relative flex cursor-pointer items-center gap-1.5 rounded-bouton px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
                    opaque
                      ? actif
                        ? 'text-rve-green-ink'
                        : 'text-ink-soft hover:text-ink'
                      : actif
                        ? 'text-white'
                        : 'text-white/75 hover:text-white'
                  }`}
                >
                  {famille.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${ouvert ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                  {/* Filet actif en plus de la couleur : la couleur seule ne
                      suffit pas à signaler un état. */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full transition-[opacity,transform] duration-200 ${
                      actif ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                    } ${opaque ? 'bg-rve-green' : 'bg-white'}`}
                  />
                </button>

              </div>
            );
          })}
        </nav>

        {/* Trois appels à l'action concurrents se disputaient cette place :
            « Contact », « Adhésion » et « Rejoindre le réseau », dont deux
            menaient au même formulaire. Il en reste un seul, plus le don,
            qui est une action d'une autre nature. */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <button
            onClick={() => onOpenContact()}
            className="cursor-pointer rounded-bouton border border-line px-4 py-2 text-xs font-bold whitespace-nowrap text-ink-soft transition-colors duration-150 hover:border-rve-green hover:bg-surface-sunken hover:text-rve-green-ink"
          >
            Contacter
          </button>
          <Lien
            vers="/don"
            className="flex cursor-pointer items-center gap-1.5 rounded-bouton bg-rve-red px-4 py-2 text-xs font-bold whitespace-nowrap text-white shadow-sm transition-colors duration-150 hover:bg-rve-red-ink"
          >
            <HeartHandshake className="h-3.5 w-3.5" aria-hidden="true" />
            Faire un don
          </Lien>
        </div>

        {/* Panneau rendu une seule fois et aligné sur le conteneur de
            l'en-tête. Centré sur son bouton, il débordait hors de l'écran
            pour la première et la dernière famille. */}
        {familleOuverte && familleOuverte.enfants.length > 0 && (
          <div className="absolute inset-x-0 top-full pt-3">
                    <div className="overflow-hidden rounded-carte border border-line bg-surface shadow-xl">
                      <div className="grid gap-0 md:grid-cols-5">
                        <div className="p-5 md:col-span-3 lg:p-7">
                          <div className="mb-4 flex items-center justify-between gap-4 border-b border-line pb-4">
                            <p className="font-display text-lg font-bold text-ink">{familleOuverte.label}</p>
                            <Lien vers={familleOuverte.vers} onClick={() => setDeroulant(null)} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-rve-green-ink hover:underline">
                              Vue d’ensemble <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Lien>
                          </div>
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {familleOuverte.enfants.map((enfant) => {
                            const Icone = enfant.icone;
                            const courant = racine === enfant.vers;
                            return (
                              <li key={enfant.vers + enfant.label}>
                                <Lien
                                  vers={enfant.vers}
                                  onClick={() => setDeroulant(null)}
                                  aria-current={courant ? 'page' : undefined}
                                  className={`group/item flex items-start gap-4 rounded-carte p-3.5 transition-colors duration-150 hover:bg-surface-sunken ${
                                    courant ? 'bg-surface-sunken' : ''
                                  }`}
                                >
                                  <span
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] border transition-colors duration-150 ${
                                      courant
                                        ? 'border-rve-green/30 bg-rve-green/10'
                                        : 'border-line bg-surface'
                                    }`}
                                  >
                                    <Icone
                                      className="h-[1.125rem] w-[1.125rem] text-rve-green"
                                      aria-hidden="true"
                                    />
                                  </span>
                                  <span className="min-w-0">
                                    <span
                                      className={`flex items-center gap-1.5 text-sm font-semibold ${
                                        courant ? 'text-rve-green-ink' : 'text-ink'
                                      }`}
                                    >
                                      {enfant.label}
                                      <ArrowRight
                                        className="h-3.5 w-3.5 opacity-0 transition-[opacity,transform] duration-150 group-hover/item:translate-x-0.5 group-hover/item:opacity-100"
                                        aria-hidden="true"
                                      />
                                    </span>
                                    <span className="mt-0.5 block text-[0.8125rem] leading-relaxed text-ink-muted">
                                      {enfant.detail}
                                    </span>
                                  </span>
                                </Lien>
                              </li>
                            );
                          })}
                        </ul>
                        </div>

                        {familleOuverte.encart && (
                          <Lien
                            vers={familleOuverte.encart.vers}
                            onClick={() => setDeroulant(null)}
                            className="group/encart relative flex min-h-[13rem] flex-col justify-end overflow-hidden bg-night-deep p-6 md:col-span-2"
                          >
                            <img
                              src={familleOuverte.encart.image}
                              alt=""
                              aria-hidden="true"
                              loading="lazy"
                              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover/encart:scale-105"
                            />
                            {/* Voile à 68 % : §04 impose au moins 40 % dès
                                qu'un texte se pose sur une photographie. */}
                            <span className="absolute inset-0 bg-night-deep/68" />
                            <span className="relative">
                              <span className="block font-display text-base font-bold leading-snug text-white">
                                {familleOuverte.encart.titre}
                              </span>
                              <span className="mt-2 block text-[0.8125rem] leading-relaxed text-white/80">
                                {familleOuverte.encart.texte}
                              </span>
                              <span className="mt-4 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-white">
                                {familleOuverte.encart.action}
                                <ArrowRight
                                  className="h-3.5 w-3.5 transition-transform duration-150 group-hover/encart:translate-x-0.5"
                                  aria-hidden="true"
                                />
                              </span>
                            </span>
                          </Lien>
                        )}
                      </div>
                    </div>
          </div>
        )}

        <button
          onClick={() => setMenuOuvert(!menuOuvert)}
          aria-expanded={menuOuvert}
          aria-label={menuOuvert ? 'Fermer le menu' : 'Ouvrir le menu'}
          className={`rounded-bouton p-2 transition-colors duration-150 lg:hidden ${
            opaque ? 'text-ink hover:bg-surface-sunken' : 'text-white hover:bg-white/15'
          }`}
        >
          {menuOuvert ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sur téléphone, les familles sont déroulées d'emblée : un accordéon
          ajouterait un geste pour atteindre des listes de deux à trois liens. */}
      {menuOuvert && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-line bg-surface px-6 py-6 shadow-xl lg:hidden">
          <div className="flex flex-col gap-7">
            {FAMILLES.map((famille) =>
              famille.enfants.length === 0 ? (
                <Lien
                  key={famille.label}
                  vers={famille.vers}
                  onClick={() => setMenuOuvert(false)}
                  aria-current={racine === famille.vers ? 'page' : undefined}
                  className={`font-display text-sm font-bold ${
                    racine === famille.vers ? 'text-rve-green-ink' : 'text-ink'
                  }`}
                >
                  {famille.label}
                </Lien>
              ) : (
              <div key={famille.label}>
                <p className="mb-2 font-display text-sm font-bold text-ink">
                  {famille.label}
                </p>
                <ul className="flex flex-col">
                  {famille.enfants.map((enfant) => {
                    const Icone = enfant.icone;
                    const courant = racine === enfant.vers;
                    return (
                      <li key={enfant.vers + enfant.label}>
                        <Lien
                          vers={enfant.vers}
                          onClick={() => setMenuOuvert(false)}
                          aria-current={courant ? 'page' : undefined}
                          className={`flex items-center gap-3 border-b border-line-soft py-3 text-[0.9375rem] ${
                            courant ? 'font-semibold text-rve-green-ink' : 'text-ink-soft'
                          }`}
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] border ${
                              courant
                                ? 'border-rve-green/30 bg-rve-green/10'
                                : 'border-line bg-surface-sunken'
                            }`}
                          >
                            <Icone className="h-4 w-4 text-rve-green" aria-hidden="true" />
                          </span>
                          {enfant.label}
                        </Lien>
                      </li>
                    );
                  })}
                </ul>
              </div>
              ),
            )}

            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMenuOuvert(false);
                  onOpenContact();
                }}
                className="w-full cursor-pointer rounded-bouton border border-line py-2.5 text-center text-sm font-bold text-ink-soft transition-colors duration-150 hover:bg-surface-sunken"
              >
                Contacter
              </button>
              <Lien
                vers="/don"
                onClick={() => setMenuOuvert(false)}
                className="flex w-full items-center justify-center gap-2 rounded-bouton bg-rve-red py-2.5 text-center text-sm font-bold text-white transition-colors duration-150 hover:bg-rve-red-ink"
              >
                <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                Faire un don
              </Lien>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
