import React, { useState } from 'react';
import { AlertCircle, Eye, EyeOff, Lock } from 'lucide-react';
import { Logo } from '../components/Logo';
import { Bouton, Champ } from '../components/ui';
import { Lien, naviguer } from '../router';
import { Vague } from '../components/Vague';

/**
 * Connexion à l'espace membre.
 *
 * Deux profils passent par cette même porte :
 *  · le secrétariat exécutif, qui administre l'ensemble du site ;
 *  · les organisations membres, qui gèrent leur propre fiche, leurs
 *    publications et leurs annonces.
 *
 * C'est le compte qui détermine ce qu'on voit derrière, pas un écran de
 * connexion différent : une organisation n'a pas à savoir qu'il existe
 * une autre porte, et le secrétariat n'a pas à en choisir une.
 *
 * Faute de serveur, la maquette propose ici de choisir le profil à
 * simuler. Ce sélecteur disparaîtra quand les comptes existeront : le
 * rôle viendra alors du compte.
 *
 * Aucune inscription : les accès sont créés par le secrétariat exécutif.
 *
 * Point à tenir quand le serveur arrivera : l'écran ne doit jamais dire
 * si c'est l'identifiant ou le mot de passe qui est faux. Distinguer les
 * deux permet de découvrir quels comptes existent.
 */
export const PageConnexion: React.FC = () => {
  const [identifiant, setIdentifiant] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [visible, setVisible] = useState(false);
  const [erreur, setErreur] = useState('');
  const [profil, setProfil] = useState<'secretariat' | 'organisation'>(
    'secretariat',
  );

  const soumettre = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifiant.trim() || !motDePasse) {
      setErreur('Renseignez votre identifiant et votre mot de passe.');
      return;
    }
    try {
      window.sessionStorage.setItem('rve:session', identifiant.trim());
      window.sessionStorage.setItem('rve:profil', profil);
    } catch {
      // Stockage indisponible : la session ne durera que cette page.
    }
    naviguer('/admin');
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Colonne de gauche : l'identité, pour que l'écran ne ressemble pas
          à un formulaire d'authentification générique. */}
      <div className="relative hidden overflow-hidden bg-rve-green lg:block">
        <img
          src="/assets/img/pleniere-parakou.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          style={{ objectPosition: '55% 40%' }}
        />
        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          <Lien vers="/" aria-label="Retour à l’accueil">
            <Logo variant="white" size="md" />
          </Lien>
          <div>
            <p className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-tight text-white">
              Espace membre
            </p>
            <p className="mt-4 max-w-[38ch] leading-relaxed text-white/80">
              Le secrétariat exécutif y administre le site. Chaque organisation
              membre y gère sa fiche, ses publications et ses annonces.
            </p>
          </div>
        </div>
        <Vague
          termine="var(--color-rve-green)"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 w-full rotate-180 opacity-0"
        />
      </div>

      <div className="flex items-center justify-center bg-surface px-6 py-16 sm:px-12">
        <div className="w-full max-w-[26rem]">
          <div className="lg:hidden">
            <Lien vers="/" aria-label="Retour à l’accueil">
              <Logo size="sm" />
            </Lien>
          </div>

          <h1 className="mt-10 font-display text-3xl font-extrabold tracking-tight text-ink lg:mt-0">
            Connexion
          </h1>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Secrétariat exécutif et organisations membres.
          </p>

          <form onSubmit={soumettre} className="mt-10 flex flex-col gap-5">
            <Champ
              label="Identifiant ou adresse email"
              obligatoire
              type="text"
              autoComplete="username"
              value={identifiant}
              onChange={(e) => {
                setIdentifiant(e.target.value);
                setErreur('');
              }}
              placeholder="prenom.nom@rve-benin.org"
            />

            <div className="relative">
              <Champ
                label="Mot de passe"
                obligatoire
                type={visible ? 'text' : 'password'}
                autoComplete="current-password"
                value={motDePasse}
                onChange={(e) => {
                  setMotDePasse(e.target.value);
                  setErreur('');
                }}
                placeholder="••••••••"
                className="[&_input]:pr-12"
              />
              <button
                type="button"
                onClick={() => setVisible(!visible)}
                aria-label={
                  visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'
                }
                className="absolute bottom-0 right-0 flex h-11 w-11 cursor-pointer items-center justify-center text-ink-muted transition-colors duration-150 hover:text-ink"
              >
                {visible ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>

            {erreur && (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-bouton bg-rve-red/8 p-3 text-[0.875rem] text-rve-red-ink"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {erreur}
              </p>
            )}

            {/* Sélecteur propre à la maquette : sans comptes, il n'existe
                aucun moyen de deviner le profil. Il disparaîtra quand le
                rôle viendra du compte lui-même. */}
            <fieldset className="rounded-carte border border-line bg-surface-sunken p-4">
              <legend className="px-1.5 text-[0.8125rem] font-semibold text-ink">
                Profil à simuler
              </legend>
              <div className="mt-1 flex flex-col gap-2.5">
                {[
                  {
                    cle: 'secretariat' as const,
                    label: 'Secrétariat exécutif',
                    detail: 'Administration complète du site',
                  },
                  {
                    cle: 'organisation' as const,
                    label: 'Organisation membre',
                    detail: 'Sa fiche, ses publications, ses annonces',
                  },
                ].map((p) => (
                  <label
                    key={p.cle}
                    className="flex cursor-pointer items-start gap-3 text-[0.875rem]"
                  >
                    <input
                      type="radio"
                      name="profil"
                      value={p.cle}
                      checked={profil === p.cle}
                      onChange={() => setProfil(p.cle)}
                      className="mt-0.5 h-4 w-4 cursor-pointer accent-rve-green"
                    />
                    <span>
                      <span className="block font-semibold text-ink">
                        {p.label}
                      </span>
                      <span className="block text-[0.8125rem] text-ink-muted">
                        {p.detail}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-[0.875rem] text-ink-soft">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer accent-rve-green"
                />
                Rester connectée
              </label>
              <a
                href="#/connexion"
                className="text-[0.875rem] font-semibold text-rve-green-ink underline decoration-rve-green/40 underline-offset-4 transition-colors duration-150 hover:decoration-rve-green"
              >
                Mot de passe oublié
              </a>
            </div>

            <Bouton type="submit" taille="lg" icone="fleche" className="mt-2 w-full">
              Se connecter
            </Bouton>
          </form>

          {/* La maquette dit ce qu'elle est : tout couple saisi ouvre le
              tableau de bord, il n'y a rien à valider derrière. */}
          <p className="mt-8 flex items-start gap-2 rounded-carte border border-line bg-surface-sunken p-4 text-[0.8125rem] leading-relaxed text-ink-soft">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" aria-hidden="true" />
            Maquette sans serveur : n’importe quel identifiant ouvre l’espace
            correspondant au profil choisi. L’authentification réelle sera
            branchée avec la base de données.
          </p>

          <p className="mt-6 text-center text-[0.875rem] text-ink-muted">
            L’accès est créé par le secrétariat exécutif.{' '}
            <Lien
              vers="/"
              className="font-semibold text-rve-green-ink underline decoration-rve-green/40 underline-offset-4"
            >
              Retour au site
            </Lien>
          </p>
        </div>
      </div>
    </div>
  );
};
