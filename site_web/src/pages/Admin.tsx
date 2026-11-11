import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  Camera,
  FileText,
  Handshake,
  Images,
  LayoutDashboard,
  Network,
  Plus,
  RotateCcw,
  Settings2,
  Trash2,
  Users2,
} from 'lucide-react';
import { Lien, naviguer } from '../router';
import { Champ, ChampSelect, ChampTexte, RangeeChamps } from '../components/ui';
import {
  contenuModifie,
  ecrireContenu,
  reinitialiserContenu,
  useContenu,
  type Diapositive,
} from '../data/contenu';
import { CATEGORIES_DOCUMENTS, type CategorieDocument } from '../data/documents';
import { CHEMIN_MINIATURE } from '../data/galerie';
import { TYPES_PARTENAIRES, type TypePartenaire } from '../data/partenaires';
import { MEMBER_ORGANIZATIONS } from '../components/MemberLogos';
import { Logo } from '../components/Logo';

/**
 * Console d'administration.
 *
 * Elle pilote la couche `data/contenu`, qui a la forme exacte des tables
 * prévues au cahier des charges (PHP/Laravel, MySQL). Tant que l'API
 * n'existe pas, les modifications sont conservées dans le navigateur :
 * c'est une maquette fonctionnelle, pas une publication. Le bandeau en haut
 * de la console le dit, afin que personne ne croie avoir mis le site à jour
 * pour les visiteurs.
 *
 * Il n'y a volontairement aucun écran de connexion. Une authentification
 * qui accepte n'importe quel mot de passe ne protège rien ; elle donne
 * seulement l'illusion d'une sécurité. L'accès réel sera posé en même temps
 * que le back-end.
 */

type Section =
  | 'tableau-de-bord'
  | 'general'
  | 'carrousel'
  | 'galerie'
  | 'documents'
  | 'partenaires'
  | 'equipe'
  | 'membres';

const RUBRIQUES: { id: Section; label: string; icone: React.ElementType }[] = [
  { id: 'tableau-de-bord', label: 'Tableau de bord', icone: LayoutDashboard },
  { id: 'general', label: 'Informations générales', icone: Settings2 },
  { id: 'carrousel', label: 'Carrousel d’accueil', icone: Images },
  { id: 'galerie', label: 'Galerie photo', icone: Camera },
  { id: 'documents', label: 'Documents', icone: FileText },
  { id: 'partenaires', label: 'Partenaires', icone: Handshake },
  { id: 'equipe', label: 'Équipe et organigramme', icone: Network },
  { id: 'membres', label: 'Organisations membres', icone: Building2 },
];

/* ------------------------------------------------------------------ *
 * Primitives de la console
 * ------------------------------------------------------------------ */

const Entete: React.FC<{ titre: string; amorce: string; children?: React.ReactNode }> = ({
  titre,
  amorce,
  children,
}) => (
  <div className="mb-8 flex flex-wrap items-start justify-between gap-4 border-b border-line pb-6">
    <div>
      <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink">{titre}</h1>
      <p className="mt-1.5 max-w-[66ch] text-sm leading-relaxed text-ink-soft">{amorce}</p>
    </div>
    {children}
  </div>
);

const Bloc: React.FC<{ titre?: string; children: React.ReactNode; className?: string }> = ({
  titre,
  children,
  className = '',
}) => (
  <section className={`rounded-carte border border-line bg-white p-6 ${className}`}>
    {titre && <h2 className="mb-5 font-display text-base font-bold text-ink">{titre}</h2>}
    {children}
  </section>
);

const BoutonAction: React.FC<
  { ton?: 'principal' | 'discret' | 'danger' } & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ ton = 'principal', className = '', children, ...reste }) => {
  const tons = {
    principal: 'bg-rve-green text-white hover:bg-rve-green-ink',
    discret: 'border border-line bg-white text-ink-soft hover:border-rve-green hover:text-rve-green-ink',
    danger: 'border border-rve-red/40 bg-white text-rve-red-ink hover:bg-rve-red hover:text-white',
  }[ton];
  return (
    <button
      type="button"
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-bouton px-4 py-2.5 text-sm font-bold transition-colors duration-150 ${tons} ${className}`}
      {...reste}
    >
      {children}
    </button>
  );
};

/** Ligne dépliable : la liste reste lisible quand les fiches sont longues. */
const Pliable: React.FC<{
  titre: string;
  detail?: string;
  vignette?: string;
  children: React.ReactNode;
  onSupprimer?: () => void;
}> = ({ titre, detail, vignette, children, onSupprimer }) => {
  const [ouvert, setOuvert] = useState(false);
  return (
    <li className="overflow-hidden rounded-carte border border-line bg-white">
      <div className="flex items-center gap-3 p-3">
        {vignette && (
          <img src={vignette} alt="" aria-hidden="true" className="h-12 w-16 shrink-0 rounded-[4px] object-cover" />
        )}
        <button
          type="button"
          onClick={() => setOuvert((o) => !o)}
          aria-expanded={ouvert}
          className="min-w-0 flex-1 cursor-pointer text-left"
        >
          <span className="block truncate text-sm font-bold text-ink">{titre}</span>
          {detail && <span className="mt-0.5 block truncate text-xs text-ink-muted">{detail}</span>}
        </button>
        <span className="shrink-0 text-xs font-semibold text-rve-green-ink">
          {ouvert ? 'Replier' : 'Modifier'}
        </span>
        {onSupprimer && (
          <button
            type="button"
            onClick={onSupprimer}
            aria-label={`Supprimer ${titre}`}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-[4px] text-ink-muted transition-colors hover:bg-rve-red hover:text-white"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
      {ouvert && <div className="border-t border-line bg-surface-raised p-5">{children}</div>}
    </li>
  );
};

/* ------------------------------------------------------------------ *
 * Rubriques
 * ------------------------------------------------------------------ */

const TableauDeBord: React.FC = () => {
  const albums = useContenu('albums');
  const documents = useContenu('documents');
  const partenaires = useContenu('partenaires');
  const personnes = useContenu('personnes');
  const diapositives = useContenu('diapositives');
  const organes = useContenu('organes');
  const postes = organes.flatMap((o) => o.postes);
  const aPourvoir = postes.filter((p) => !p.titulaire).length;

  const chiffres = [
    { valeur: albums.reduce((n, a) => n + a.photos.length, 0), label: 'Photographies', detail: `${albums.length} albums`, vers: 'galerie' },
    { valeur: documents.length, label: 'Documents publiés', detail: 'Rapports, études, notes', vers: 'documents' },
    { valeur: MEMBER_ORGANIZATIONS.filter((m) => m.category !== 'Partenaire Stratégique').length, label: 'Organisations membres', detail: 'Annuaire du réseau', vers: 'membres' },
    { valeur: partenaires.length, label: 'Partenaires', detail: 'Techniques, financiers, institutionnels', vers: 'partenaires' },
    { valeur: diapositives.length, label: 'Vues du carrousel', detail: 'Bandeau d’accueil', vers: 'carrousel' },
    { valeur: personnes.length, label: 'Points focaux', detail: `${aPourvoir} postes statutaires sans titulaire`, vers: 'equipe' },
  ];

  return (
    <>
      <Entete
        titre="Tableau de bord"
        amorce="Vue d’ensemble des contenus que le réseau administre lui-même."
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {chiffres.map((c) => (
          <li key={c.label}>
            <button
              type="button"
              onClick={() => naviguer(`/admin/${c.vers}`)}
              className="flex w-full cursor-pointer flex-col rounded-carte border border-line bg-white p-5 text-left transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="font-display text-3xl font-extrabold tabular-nums leading-none text-rve-green-deep">
                {c.valeur}
              </span>
              <span className="mt-2 text-sm font-bold text-ink">{c.label}</span>
              <span className="mt-0.5 text-xs text-ink-muted">{c.detail}</span>
            </button>
          </li>
        ))}
      </ul>

      <Bloc titre="Ce que cette console fait, et ne fait pas" className="mt-8">
        <ul className="flex flex-col gap-3 text-sm leading-relaxed text-ink-soft">
          <li>
            <strong className="text-ink">Elle modifie réellement le site</strong> — chaque changement est visible
            immédiatement sur les pages publiques, dans ce navigateur.
          </li>
          <li>
            <strong className="text-ink">Elle ne publie pas encore</strong> — les modifications restent dans ce
            navigateur. Le back-end PHP/Laravel et la base MySQL prévus au cahier des charges rendront ces
            changements visibles pour tout le monde.
          </li>
          <li>
            <strong className="text-ink">Les organisations membres ne sont pas encore éditables</strong> — leurs
            fiches proviennent de la collecte et comportent des logos ; leur édition viendra avec la médiathèque.
          </li>
        </ul>
      </Bloc>
    </>
  );
};

const General: React.FC = () => {
  const contact = useContenu('contact');
  const identite = useContenu('identite');
  const sociaux = useContenu('sociaux');

  return (
    <>
      <Entete titre="Informations générales" amorce="Coordonnées du siège, signature de marque et comptes sociaux du réseau." />

      <div className="flex flex-col gap-6">
        <Bloc titre="Signature et but">
          <div className="flex flex-col gap-4">
            <Champ
              label="Signature de marque"
              value={identite.signature}
              onChange={(e) => ecrireContenu('identite', { ...identite, signature: e.target.value })}
            />
            <ChampTexte
              label="But du réseau (article 7 des statuts)"
              rows={3}
              value={identite.but}
              onChange={(e) => ecrireContenu('identite', { ...identite, but: e.target.value })}
            />
          </div>
        </Bloc>

        <Bloc titre="Coordonnées">
          <div className="flex flex-col gap-4">
            <RangeeChamps>
              <Champ
                label="Téléphone"
                value={contact.telephone}
                onChange={(e) => ecrireContenu('contact', { ...contact, telephone: e.target.value })}
              />
              <Champ
                label="Courriel"
                type="email"
                value={contact.email}
                onChange={(e) => ecrireContenu('contact', { ...contact, email: e.target.value })}
              />
            </RangeeChamps>
            <RangeeChamps>
              <Champ
                label="Adresse du siège"
                value={contact.adresse}
                onChange={(e) => ecrireContenu('contact', { ...contact, adresse: e.target.value })}
              />
              <Champ
                label="Adresse postale"
                value={contact.postale}
                onChange={(e) => ecrireContenu('contact', { ...contact, postale: e.target.value })}
              />
            </RangeeChamps>
          </div>
        </Bloc>

        <Bloc titre="Réseaux sociaux">
          <ul className="flex flex-col gap-3">
            {sociaux.map((s, i) => (
              <li key={s.cle} className="grid items-stretch gap-3 sm:grid-cols-[10rem_minmax(0,1fr)_auto]">
                <Champ
                  label="Plateforme"
                  value={s.label}
                  onChange={(e) => {
                    const copie = [...sociaux];
                    copie[i] = { ...s, label: e.target.value };
                    ecrireContenu('sociaux', copie);
                  }}
                />
                <Champ
                  label="Adresse du compte"
                  value={s.url}
                  onChange={(e) => {
                    const copie = [...sociaux];
                    copie[i] = { ...s, url: e.target.value };
                    ecrireContenu('sociaux', copie);
                  }}
                />
                <div className="flex items-end">
                  <BoutonAction
                    ton="danger"
                    onClick={() => ecrireContenu('sociaux', sociaux.filter((_, j) => j !== i))}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Retirer
                  </BoutonAction>
                </div>
              </li>
            ))}
          </ul>
          <BoutonAction
            className="mt-5"
            ton="discret"
            onClick={() =>
              ecrireContenu('sociaux', [...sociaux, { label: 'Instagram', cle: 'instagram', url: '' }])
            }
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Ajouter un compte
          </BoutonAction>
          <p className="mt-4 text-xs leading-relaxed text-ink-muted">
            Un compte sans adresse n’est pas affiché sur le site : un lien mort en pied de page coûte plus
            qu’une icône manquante.
          </p>
        </Bloc>
      </div>
    </>
  );
};

const Carrousel: React.FC = () => {
  const diapositives = useContenu('diapositives');
  const albums = useContenu('albums');
  const toutesPhotos = albums.flatMap((a) => a.photos.map((p) => p.id));

  const modifier = (i: number, champs: Partial<Diapositive>) => {
    const copie = [...diapositives];
    copie[i] = { ...copie[i], ...champs };
    ecrireContenu('diapositives', copie);
  };

  return (
    <>
      <Entete
        titre="Carrousel d’accueil"
        amorce="Les photographies du bandeau d’ouverture. Une ligne de contexte et un titre court par vue : le texte ne se pose pas sur la photo, il vit dans l’aplat en dessous."
      />

      <ul className="flex flex-col gap-3">
        {diapositives.map((d, i) => (
          <Pliable
            key={d.id + i}
            titre={d.titre}
            detail={d.mention}
            vignette={d.image}
            onSupprimer={
              diapositives.length > 1
                ? () => ecrireContenu('diapositives', diapositives.filter((_, j) => j !== i))
                : undefined
            }
          >
            <div className="flex flex-col gap-4">
              <RangeeChamps>
                <Champ label="Titre de la vue" value={d.titre} onChange={(e) => modifier(i, { titre: e.target.value })} />
                <Champ label="Ligne de contexte" value={d.mention} onChange={(e) => modifier(i, { mention: e.target.value })} />
              </RangeeChamps>
              <RangeeChamps>
                <Champ label="Chemin de l’image" value={d.image} onChange={(e) => modifier(i, { image: e.target.value })} />
                <Champ
                  label="Cadrage (position CSS)"
                  value={d.cadrage}
                  onChange={(e) => modifier(i, { cadrage: e.target.value })}
                />
              </RangeeChamps>
              <div className="flex flex-wrap gap-2">
                <BoutonAction
                  ton="discret"
                  disabled={i === 0}
                  className="disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={() => {
                    const c = [...diapositives];
                    [c[i - 1], c[i]] = [c[i], c[i - 1]];
                    ecrireContenu('diapositives', c);
                  }}
                >
                  Monter
                </BoutonAction>
                <BoutonAction
                  ton="discret"
                  disabled={i === diapositives.length - 1}
                  className="disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={() => {
                    const c = [...diapositives];
                    [c[i], c[i + 1]] = [c[i + 1], c[i]];
                    ecrireContenu('diapositives', c);
                  }}
                >
                  Descendre
                </BoutonAction>
              </div>
            </div>
          </Pliable>
        ))}
      </ul>

      <BoutonAction
        className="mt-5"
        onClick={() => {
          const source = toutesPhotos[0] ?? 'wa-32';
          ecrireContenu('diapositives', [
            ...diapositives,
            {
              id: `vue-${Date.now()}`,
              image: `/assets/img/galerie/${source}.jpg`,
              vignette: `/assets/img/galerie/${source}-mini.jpg`,
              titre: 'Nouveau titre',
              mention: 'Contexte',
              cadrage: 'center 40%',
            },
          ]);
        }}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        Ajouter une vue
      </BoutonAction>
    </>
  );
};

const GalerieAdmin: React.FC = () => {
  const albums = useContenu('albums');

  const modifierAlbum = (i: number, champs: Partial<(typeof albums)[number]>) => {
    const copie = [...albums];
    copie[i] = { ...copie[i], ...champs };
    ecrireContenu('albums', copie);
  };

  return (
    <>
      <Entete
        titre="Galerie photo"
        amorce="Les albums et leurs légendes. Les légendes décrivent la scène sans nommer les personnes : les autorisations de droit à l’image n’ont pas été collectées nom par nom."
      />

      <ul className="flex flex-col gap-3">
        {albums.map((album, i) => (
          <Pliable
            key={album.id}
            titre={album.titre}
            detail={`${album.photos.length} photographies${album.date ? ` · ${album.date}` : ''}`}
            vignette={CHEMIN_MINIATURE(album.couverture)}
          >
            <div className="flex flex-col gap-4">
              <Champ label="Titre de l’album" value={album.titre} onChange={(e) => modifierAlbum(i, { titre: e.target.value })} />
              <RangeeChamps>
                <Champ label="Lieu" value={album.lieu} onChange={(e) => modifierAlbum(i, { lieu: e.target.value })} />
                <Champ
                  label="Date (laisser vide si non confirmée)"
                  value={album.date}
                  onChange={(e) => modifierAlbum(i, { date: e.target.value })}
                />
              </RangeeChamps>
              <ChampTexte label="Résumé" rows={3} value={album.resume} onChange={(e) => modifierAlbum(i, { resume: e.target.value })} />

              <div>
                <p className="mb-3 text-[0.8125rem] font-medium text-ink">Légendes des photographies</p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {album.photos.map((photo, j) => (
                    <li key={photo.id} className="flex items-stretch gap-3 rounded-[4px] border border-line bg-white p-2">
                      <img src={CHEMIN_MINIATURE(photo.id)} alt="" aria-hidden="true" className="h-16 w-20 shrink-0 rounded-[3px] object-cover" />
                      <div className="min-w-0 flex-1">
                        <ChampTexte
                          label={`Photo ${j + 1}`}
                          rows={2}
                          value={photo.legende}
                          onChange={(e) => {
                            const photos = [...album.photos];
                            photos[j] = { ...photo, legende: e.target.value };
                            modifierAlbum(i, { photos });
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Pliable>
        ))}
      </ul>

      <Bloc titre="Ajouter des photographies" className="mt-6">
        <p className="text-sm leading-relaxed text-ink-soft">
          Le téléversement d’images demande un serveur de fichiers : il arrivera avec la médiathèque prévue au
          cahier des charges. En attendant, les photographies sont déposées dans le dossier des images du site
          et déclarées ici.
        </p>
      </Bloc>
    </>
  );
};

const DocumentsAdmin: React.FC = () => {
  const documents = useContenu('documents');

  const modifier = (i: number, champs: Partial<(typeof documents)[number]>) => {
    const copie = [...documents];
    copie[i] = { ...copie[i], ...champs };
    ecrireContenu('documents', copie);
  };

  return (
    <>
      <Entete
        titre="Documents et publications"
        amorce="Rapports, études, guides, notes de plaidoyer et communiqués ouverts au téléchargement."
      >
        <BoutonAction
          onClick={() =>
            ecrireContenu('documents', [
              ...documents,
              {
                id: `doc-${Date.now()}`,
                titre: 'Nouveau document',
                categorie: 'Rapport' as CategorieDocument,
                annee: String(new Date().getFullYear()),
                format: 'PDF',
                poids: '—',
                description: '',
                url: '',
              },
            ])
          }
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Ajouter
        </BoutonAction>
      </Entete>

      {documents.length === 0 ? (
        <Bloc>
          <p className="text-sm leading-relaxed text-ink-soft">
            Aucun document n’est publié. Les statuts et le règlement intérieur ont été retirés du site à la
            demande du réseau : ce sont des pièces de gouvernance interne, et les fichiers ne sont plus servis
            par le site.
          </p>
        </Bloc>
      ) : (
        <ul className="flex flex-col gap-3">
          {documents.map((d, i) => (
            <Pliable
              key={d.id}
              titre={d.titre}
              detail={`${d.categorie} · ${d.annee}`}
              onSupprimer={() => ecrireContenu('documents', documents.filter((_, j) => j !== i))}
            >
              <div className="flex flex-col gap-4">
                <Champ label="Titre" value={d.titre} onChange={(e) => modifier(i, { titre: e.target.value })} />
                <RangeeChamps>
                  <ChampSelect
                    label="Catégorie"
                    options={CATEGORIES_DOCUMENTS}
                    value={d.categorie}
                    onChange={(e) => modifier(i, { categorie: e.target.value as CategorieDocument })}
                  />
                  <Champ label="Année" value={d.annee} onChange={(e) => modifier(i, { annee: e.target.value })} />
                </RangeeChamps>
                <ChampTexte label="Description" rows={3} value={d.description} onChange={(e) => modifier(i, { description: e.target.value })} />
                <RangeeChamps>
                  <Champ label="Format" value={d.format} onChange={(e) => modifier(i, { format: e.target.value })} />
                  <Champ label="Poids du fichier" value={d.poids} onChange={(e) => modifier(i, { poids: e.target.value })} />
                </RangeeChamps>
                <Champ label="Adresse du fichier" value={d.url} onChange={(e) => modifier(i, { url: e.target.value })} />
              </div>
            </Pliable>
          ))}
        </ul>
      )}
    </>
  );
};

const PartenairesAdmin: React.FC = () => {
  const partenaires = useContenu('partenaires');

  const modifier = (i: number, champs: Partial<(typeof partenaires)[number]>) => {
    const copie = [...partenaires];
    copie[i] = { ...copie[i], ...champs };
    ecrireContenu('partenaires', copie);
  };

  return (
    <>
      <Entete
        titre="Partenaires"
        amorce="Les appuis techniques, financiers et institutionnels. À distinguer des organisations membres, qui composent le réseau."
      >
        <BoutonAction
          onClick={() =>
            ecrireContenu('partenaires', [
              ...partenaires,
              {
                id: `part-${Date.now()}`,
                nom: 'Nouveau partenaire',
                type: 'Technique' as TypePartenaire,
                description: '',
                appui: '',
              },
            ])
          }
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Ajouter
        </BoutonAction>
      </Entete>

      <ul className="flex flex-col gap-3">
        {partenaires.map((p, i) => (
          <Pliable
            key={p.id}
            titre={p.nom}
            detail={p.type}
            vignette={p.logo}
            onSupprimer={() => ecrireContenu('partenaires', partenaires.filter((_, j) => j !== i))}
          >
            <div className="flex flex-col gap-4">
              <RangeeChamps>
                <Champ label="Nom" value={p.nom} onChange={(e) => modifier(i, { nom: e.target.value })} />
                <ChampSelect
                  label="Type de partenariat"
                  options={TYPES_PARTENAIRES.map((t) => t.type)}
                  value={p.type}
                  onChange={(e) => modifier(i, { type: e.target.value as TypePartenaire })}
                />
              </RangeeChamps>
              <ChampTexte label="Présentation" rows={3} value={p.description} onChange={(e) => modifier(i, { description: e.target.value })} />
              <ChampTexte label="Nature de l’appui" rows={3} value={p.appui} onChange={(e) => modifier(i, { appui: e.target.value })} />
              <RangeeChamps>
                <Champ label="Site web" value={p.siteWeb ?? ''} onChange={(e) => modifier(i, { siteWeb: e.target.value })} />
                <Champ label="Chemin du logo" value={p.logo ?? ''} onChange={(e) => modifier(i, { logo: e.target.value })} />
              </RangeeChamps>
            </div>
          </Pliable>
        ))}
      </ul>
    </>
  );
};

const EquipeAdmin: React.FC = () => {
  const organes = useContenu('organes');
  const personnes = useContenu('personnes');

  return (
    <>
      <Entete
        titre="Équipe et organigramme"
        amorce="Les titulaires des postes statutaires et les points focaux des organisations membres. Un poste sans titulaire s’affiche comme tel sur le site plutôt que d’être masqué."
      />

      <div className="flex flex-col gap-6">
        {organes
          .filter((o) => o.postes.length > 0)
          .map((organe) => (
            <Bloc key={organe.id} titre={`${organe.sigle} — ${organe.titre}`}>
              <ul className="grid gap-4 sm:grid-cols-2">
                {organe.postes.map((poste, j) => (
                  <li key={poste.id}>
                    <Champ
                      label={poste.intitule}
                      placeholder="Nom de la titulaire"
                      value={poste.titulaire}
                      onChange={(e) => {
                        const copie = organes.map((o) =>
                          o.id === organe.id
                            ? {
                                ...o,
                                postes: o.postes.map((p, k) =>
                                  k === j ? { ...p, titulaire: e.target.value } : p,
                                ),
                              }
                            : o,
                        );
                        ecrireContenu('organes', copie);
                      }}
                    />
                  </li>
                ))}
              </ul>
            </Bloc>
          ))}

        <Bloc titre="Points focaux des organisations membres">
          <ul className="flex flex-col gap-3">
            {personnes.map((p, i) => (
              <Pliable
                key={p.id}
                titre={p.nom}
                detail={`${p.fonction} · ${MEMBER_ORGANIZATIONS.find((o) => o.id === p.organisation)?.shortName ?? p.organisation}`}
                onSupprimer={() => ecrireContenu('personnes', personnes.filter((_, j) => j !== i))}
              >
                <div className="flex flex-col gap-4">
                  <RangeeChamps>
                    <Champ
                      label="Nom"
                      value={p.nom}
                      onChange={(e) => {
                        const c = [...personnes];
                        c[i] = { ...p, nom: e.target.value };
                        ecrireContenu('personnes', c);
                      }}
                    />
                    <Champ
                      label="Fonction"
                      value={p.fonction}
                      onChange={(e) => {
                        const c = [...personnes];
                        c[i] = { ...p, fonction: e.target.value };
                        ecrireContenu('personnes', c);
                      }}
                    />
                  </RangeeChamps>
                  <ChampSelect
                    label="Organisation"
                    options={MEMBER_ORGANIZATIONS.filter((o) => o.category !== 'Partenaire Stratégique').map((o) => o.id)}
                    value={p.organisation}
                    onChange={(e) => {
                      const c = [...personnes];
                      c[i] = { ...p, organisation: e.target.value };
                      ecrireContenu('personnes', c);
                    }}
                  />
                  <ChampTexte
                    label="Notice de présentation"
                    rows={4}
                    value={p.bio ?? ''}
                    onChange={(e) => {
                      const c = [...personnes];
                      c[i] = { ...p, bio: e.target.value };
                      ecrireContenu('personnes', c);
                    }}
                  />
                </div>
              </Pliable>
            ))}
          </ul>
          <BoutonAction
            className="mt-5"
            ton="discret"
            onClick={() =>
              ecrireContenu('personnes', [
                ...personnes,
                { id: `pers-${Date.now()}`, nom: 'Nouvelle fiche', fonction: '', organisation: 'fjad' },
              ])
            }
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Ajouter une personne
          </BoutonAction>
        </Bloc>
      </div>
    </>
  );
};

const MembresAdmin: React.FC = () => (
  <>
    <Entete
      titre="Organisations membres"
      amorce="L’annuaire des neuf organisations du réseau, renseigné à partir de la fiche de collecte."
    />
    <Bloc className="mb-6">
      <p className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rve-yellow-ink" aria-hidden="true" />
        Ces fiches comportent des logos et des coordonnées vérifiées. Leur édition sera ouverte en même temps que
        la médiathèque, afin qu’un changement de logo ne laisse pas une fiche sans image.
      </p>
    </Bloc>
    <ul className="grid gap-3 sm:grid-cols-2">
      {MEMBER_ORGANIZATIONS.filter((m) => m.category !== 'Partenaire Stratégique').map((m) => (
        <li key={m.id} className="flex items-center gap-4 rounded-carte border border-line bg-white p-4">
          <span className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[4px] border border-line-soft bg-white p-1.5 [&_img]:max-h-10">
            {m.logo}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-ink">{m.shortName}</p>
            <p className="mt-0.5 truncate text-xs text-ink-muted">
              {m.profileComplete ? (m.zone ?? 'Fiche renseignée') : 'Fiche à compléter'}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </>
);

/* ------------------------------------------------------------------ *
 * Coquille
 * ------------------------------------------------------------------ */

export const PageAdmin: React.FC<{ section?: string }> = ({ section }) => {
  const courante = (RUBRIQUES.find((r) => r.id === section)?.id ?? 'tableau-de-bord') as Section;
  const modifie = contenuModifie();

  const contenu = {
    'tableau-de-bord': <TableauDeBord />,
    general: <General />,
    carrousel: <Carrousel />,
    galerie: <GalerieAdmin />,
    documents: <DocumentsAdmin />,
    partenaires: <PartenairesAdmin />,
    equipe: <EquipeAdmin />,
    membres: <MembresAdmin />,
  }[courante];

  return (
    <div className="min-h-screen bg-surface-raised font-body text-ink">
      <div className="flex items-center gap-3 bg-rve-yellow px-5 py-2.5 text-[0.8125rem] font-semibold text-rve-green-deep">
        <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
        <p className="flex-1">
          Maquette d’administration. Les modifications sont conservées dans ce navigateur et ne sont pas encore
          publiées pour les visiteurs.
        </p>
        {modifie && (
          <button
            type="button"
            onClick={() => reinitialiserContenu()}
            className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-[4px] bg-rve-green-deep px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-rve-green-ink"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Rétablir le contenu d’origine
          </button>
        )}
      </div>

      <div className="mx-auto flex max-w-[1500px] flex-col gap-0 lg:flex-row">
        <aside className="shrink-0 border-b border-line bg-white lg:min-h-[calc(100vh-2.75rem)] lg:w-72 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
            <Logo variant="color" size="sm" />
            <Lien
              vers="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-rve-green-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Le site
            </Lien>
          </div>
          <nav aria-label="Rubriques d’administration" className="p-3">
            <ul className="flex flex-col gap-1">
              {RUBRIQUES.map((r) => {
                const Icone = r.icone;
                const actif = r.id === courante;
                return (
                  <li key={r.id}>
                    <Lien
                      vers={r.id === 'tableau-de-bord' ? '/admin' : `/admin/${r.id}`}
                      aria-current={actif ? 'page' : undefined}
                      className={`flex items-center gap-3 rounded-bouton px-3 py-2.5 text-sm font-semibold transition-colors duration-150 ${
                        actif
                          ? 'bg-rve-green text-white'
                          : 'text-ink-soft hover:bg-surface-sunken hover:text-ink'
                      }`}
                    >
                      <Icone className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {r.label}
                    </Lien>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="border-t border-line p-5">
            <p className="flex items-start gap-2 text-xs leading-relaxed text-ink-muted">
              <Users2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              La gestion des comptes administrateurs sera posée avec le back-end.
            </p>
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-6 lg:p-10">{contenu}</main>
      </div>
    </div>
  );
};
