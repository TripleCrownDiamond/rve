import React from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Lien } from '../router';

/**
 * Primitives d'interface du site.
 *
 * Elles existent pour que les valeurs de la charte soient posées une fois
 * et une seule : rayon 6 px sur les boutons et 8 px sur les cartes (§43),
 * survol « ombre et translation −4 px » (§43), animations de 150 à 250 ms
 * (§44), et aucune couleur hors des variables CSS (§44, interdit).
 *
 * Écrire ces réglages à la main dans chaque page reviendrait à les voir
 * diverger dès la troisième : c'est déjà ce qui était arrivé aux 458
 * couleurs codées en dur qu'il a fallu reprendre.
 *
 * Chaque composant reste ouvert à `className` pour les ajustements de
 * mise en page, mais ses décisions de marque ne sont pas surchargeables
 * depuis l'extérieur.
 */

/* ------------------------------------------------------------------ *
 * Bouton
 * ------------------------------------------------------------------ */

type Ton = 'primaire' | 'secondaire' | 'fantome' | 'clair';
type Taille = 'md' | 'lg';

const TONS: Record<Ton, string> = {
  // §43 : fond #109030, texte blanc. Le libellé est en grand corps gras,
  // seuil où le couple blanc/vert (4,16:1) est conforme.
  primaire:
    'bg-rve-green text-white hover:bg-rve-green-ink active:bg-rve-green-deep shadow-sm',
  // §43 : contour 1,5 px vert, texte vert, survol fond vert à 8 %.
  secondaire:
    'border-[1.5px] border-rve-green text-rve-green-ink hover:bg-rve-green/8',
  fantome: 'text-ink-soft hover:text-ink hover:bg-surface-sunken',
  // Sur photographie ou aplat sombre.
  clair: 'border-[1.5px] border-white/45 text-white hover:bg-white/15',
};

const TAILLES: Record<Taille, string> = {
  md: 'px-5 py-2.5 text-sm font-semibold',
  lg: 'px-6 py-3.5 text-[1.1875rem] font-bold',
};

interface BoutonProps {
  ton?: Ton;
  taille?: Taille;
  vers?: string;
  onClick?: () => void;
  children: React.ReactNode;
  icone?: 'fleche' | 'externe' | 'aucune';
  className?: string;
  type?: 'button' | 'submit';
  'aria-label'?: string;
}

export const Bouton: React.FC<BoutonProps> = ({
  ton = 'primaire',
  taille = 'md',
  vers,
  onClick,
  children,
  icone = 'aucune',
  className = '',
  type = 'button',
  ...reste
}) => {
  const classes = `group inline-flex cursor-pointer items-center justify-center gap-2 rounded-bouton whitespace-nowrap transition-colors duration-150 ${TONS[ton]} ${TAILLES[taille]} ${className}`;

  const contenu = (
    <>
      <span>{children}</span>
      {icone === 'fleche' && (
        <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
      )}
      {icone === 'externe' && (
        <ArrowUpRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </>
  );

  if (vers) {
    return (
      <Lien vers={vers} className={classes} onClick={onClick} {...reste}>
        {contenu}
      </Lien>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...reste}>
      {contenu}
    </button>
  );
};

/* ------------------------------------------------------------------ *
 * Carte
 * ------------------------------------------------------------------ */

interface CarteProps {
  /** Rend la carte cliquable et la dote du relief de survol (§43). */
  vers?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  /** Fond sourd, pour les encadrés latéraux. */
  sourde?: boolean;
  title?: string;
  'aria-label'?: string;
}

export const Carte: React.FC<CarteProps> = ({
  vers,
  onClick,
  children,
  className = '',
  sourde = false,
  ...reste
}) => {
  const base = `flex h-full flex-col rounded-carte border border-line ${
    sourde ? 'bg-surface-sunken' : 'bg-surface'
  }`;
  // §43 : « Survol : ombre et translation −4 px ». Seuls `transform` et
  // `box-shadow` sont animés, jamais une propriété de mise en page.
  const interactif =
    'group cursor-pointer text-left transition-[box-shadow,transform] duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-1 hover:shadow-lg active:scale-[0.99]';

  const classes = `${base} ${vers || onClick ? interactif : ''} ${className}`;

  if (vers) {
    return (
      <Lien vers={vers} className={classes} {...reste}>
        {children}
      </Lien>
    );
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes} {...reste}>
        {children}
      </button>
    );
  }
  return (
    <div className={classes} {...reste}>
      {children}
    </div>
  );
};

/** Visuel d'en-tête de carte, au ratio choisi. */
export const CarteVisuel: React.FC<{
  src?: string;
  alt?: string;
  ratio?: string;
  className?: string;
}> = ({ src, alt = '', ratio = 'aspect-[4/3]', className = '' }) => (
  <span
    className={`relative block w-full overflow-hidden bg-forest ${ratio} ${className}`}
  >
    {src && (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
    )}
  </span>
);

/** Corps de carte. `pousse` aligne le pied de toutes les cartes d'une rangée. */
export const CarteCorps: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <span className={`flex flex-1 flex-col p-6 sm:p-7 ${className}`}>
    {children}
  </span>
);

/** Pied de carte, poussé en bas : les rangées s'alignent quel que soit le texte. */
export const CartePied: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <span
    className={`mt-auto flex items-center gap-1.5 pt-5 text-[0.8125rem] font-semibold text-rve-green-ink ${className}`}
  >
    {children}
    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
  </span>
);

/* ------------------------------------------------------------------ *
 * Mise en page
 * ------------------------------------------------------------------ */

/** Grille responsive. La charte §29 admet des grilles de trois ou six blocs. */
export const Grille: React.FC<{
  colonnes?: 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
}> = ({ colonnes = 3, children, className = '' }) => {
  const cols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }[colonnes];
  return (
    <div className={`grid gap-6 sm:gap-8 ${cols} ${className}`}>{children}</div>
  );
};

/** En-tête de section : un titre, une amorce courte, rien d'autre (§29). */
export const TitreSection: React.FC<{
  titre: string;
  amorce?: string;
  niveau?: 2 | 3;
  className?: string;
}> = ({ titre, amorce, niveau = 2, className = '' }) => {
  const H = niveau === 2 ? 'h2' : 'h3';
  return (
    <div className={className}>
      {React.createElement(
        H,
        {
          className:
            niveau === 2
              ? 'font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl'
              : 'font-display text-xl font-bold text-ink',
        },
        titre,
      )}
      {amorce && (
        <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-ink-soft">
          {amorce}
        </p>
      )}
    </div>
  );
};

/** Encadré latéral : situe la page sans répéter son contenu. */
export const Encadre: React.FC<{
  titre: string;
  children: React.ReactNode;
  className?: string;
}> = ({ titre, children, className = '' }) => (
  <div className={`rounded-carte border border-line bg-surface-sunken p-6 sm:p-7 ${className}`}>
    <h2 className="font-display text-sm font-bold text-ink">{titre}</h2>
    <div className="mt-4">{children}</div>
  </div>
);

/** Liste à coches, pour des énumérations d'actions ou d'attributions. */
export const ListeCoches: React.FC<{
  items: readonly string[];
  className?: string;
}> = ({ items, className = '' }) => (
  <ul className={`flex flex-col gap-4 ${className}`}>
    {items.map((item) => (
      <li key={item} className="flex items-start gap-3.5">
        <CheckCircle2
          className="mt-0.5 h-5 w-5 shrink-0 text-rve-green"
          aria-hidden="true"
        />
        <span className="text-[0.9375rem] leading-relaxed text-ink">{item}</span>
      </li>
    ))}
  </ul>
);

/** Étiquette de catégorie. Pas de capitales : §29 les exclut du gabarit. */
export const Etiquette: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <span
    className={`text-[0.8125rem] font-semibold text-rve-green-ink ${className}`}
  >
    {children}
  </span>
);

/** Métadonnées séparées par des points médians, jamais en capitales. */
export const Meta: React.FC<{
  items: (string | undefined)[];
  className?: string;
}> = ({ items, className = '' }) => {
  const propres = items.filter(Boolean) as string[];
  return (
    <p
      className={`flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.8125rem] text-ink-muted ${className}`}
    >
      {propres.map((m, i) => (
        <React.Fragment key={m}>
          {i > 0 && (
            <span aria-hidden="true" className="text-ink-faint">
              ·
            </span>
          )}
          <span>{m}</span>
        </React.Fragment>
      ))}
    </p>
  );
};

/* ------------------------------------------------------------------ *
 * Formulaires
 * ------------------------------------------------------------------ */

/**
 * Champ de formulaire — charte §43 : « Bordure 1 px #979797, hauteur
 * 44 px. Focus : bordure verte 1,5 px. »
 *
 * Le champ est une colonne flexible dont le contrôle est poussé en bas.
 * Sans cela, deux libellés de longueurs différentes sur une même rangée
 * (« Département principal » contre « Numéro d'enregistrement / Journal
 * Officiel », qui passe sur deux lignes) font démarrer leurs contrôles à
 * des hauteurs différentes : c'est l'origine des champs décalés.
 *
 * La bordure grise est ici admise : §18 interdit #979797 pour le texte
 * courant, pas pour un contour, et §43 la prescrit explicitement.
 */
const CONTROLE =
  'w-full rounded-bouton border border-ink-faint bg-surface px-3.5 text-sm text-ink transition-[border-color,box-shadow] duration-150 placeholder:text-ink-muted focus:border-[1.5px] focus:border-rve-green focus:outline-none';

interface ChampProps {
  label: string;
  obligatoire?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const Etiquettage: React.FC<ChampProps & { htmlFor?: string }> = ({
  label,
  obligatoire,
  children,
  className = '',
  htmlFor,
}) => (
  <div className={`flex h-full flex-col ${className}`}>
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-[0.8125rem] font-medium text-ink"
    >
      {label}
      {obligatoire && (
        <span className="text-rve-red-ink" aria-hidden="true">
          {' '}
          *
        </span>
      )}
    </label>
    {/* Poussé en bas : les contrôles d'une même rangée s'alignent même
        quand un libellé passe sur deux lignes. */}
    <div className="mt-auto">{children}</div>
  </div>
);

export const Champ: React.FC<
  ChampProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({ label, obligatoire, className, ...reste }) => {
  const id = React.useId();
  return (
    <Etiquettage
      label={label}
      obligatoire={obligatoire}
      className={className}
      htmlFor={id}
    >
      <input id={id} required={obligatoire} className={`h-11 ${CONTROLE}`} {...reste} />
    </Etiquettage>
  );
};

export const ChampSelect: React.FC<
  ChampProps & { options: readonly string[] } & React.SelectHTMLAttributes<HTMLSelectElement>
> = ({ label, obligatoire, options, className, ...reste }) => {
  const id = React.useId();
  return (
    <Etiquettage
      label={label}
      obligatoire={obligatoire}
      className={className}
      htmlFor={id}
    >
      <select id={id} required={obligatoire} className={`h-11 ${CONTROLE}`} {...reste}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Etiquettage>
  );
};

export const ChampTexte: React.FC<
  ChampProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ label, obligatoire, className, rows = 4, ...reste }) => {
  const id = React.useId();
  return (
    <Etiquettage
      label={label}
      obligatoire={obligatoire}
      className={className}
      htmlFor={id}
    >
      <textarea
        id={id}
        rows={rows}
        required={obligatoire}
        className={`resize-y py-3 ${CONTROLE}`}
        {...reste}
      />
    </Etiquettage>
  );
};

/** Rangée de champs. `items-stretch` maintient l'alignement des contrôles. */
export const RangeeChamps: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`grid items-stretch gap-4 sm:grid-cols-2 ${className}`}>
    {children}
  </div>
);
