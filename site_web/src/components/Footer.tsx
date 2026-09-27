import React from 'react';
import { Lien } from '../router';
import { Logo } from './Logo.tsx';
import { Mail, Phone, MapPin, UserRound } from 'lucide-react';

interface FooterProps {
  onOpenContact: (subject?: string) => void;
  onOpenJoin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onOpenJoin }) => {
  return (
    <footer className="bg-night text-on-night-muted pt-16 pb-12 border-t border-night">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-night/80">
          {/* Col 1: Logo & Presentation Text (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* White transparent official logo - NO artificial white box */}
            <div className="inline-block">
              <Logo variant="white" size="lg" />
            </div>

            <p className="text-xs sm:text-sm text-on-night-soft leading-relaxed max-w-md">
              Le Réseau Voix EssentiELLES Bénin (RVE-Bénin) est une coalition d’organisations féminines de la société civile béninoise engagées pour la défense des droits, la santé, le leadership et l’autonomisation économique des femmes et des filles.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-on-night-soft">Coalition appuyée par</span>
              <span className="text-xs font-semibold text-white">Speak Up Africa</span>
              <span className="text-ink-soft">·</span>
              <span className="text-xs text-rve-green font-semibold">République du Bénin</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-on-night-soft">
              <li>
                <a href="#a-propos" className="hover:text-white transition-colors">
                  À propos du réseau
                </a>
              </li>
              <li>
                <a href="#domaines" className="hover:text-white transition-colors">
                  6 Domaines d’intervention
                </a>
              </li>
              <li>
                <a href="#actions" className="hover:text-white transition-colors">
                  Actions & Actualités
                </a>
              </li>
              <li>
                <a href="#membres" className="hover:text-white transition-colors">
                  Organisations membres
                </a>
              </li>
              <li>
                <a href="#gouvernance" className="hover:text-white transition-colors">
                  Gouvernance & Statuts
                </a>
              </li>
              <li>
                <a href="#ressources" className="hover:text-white transition-colors">
                  Rapports & Guides
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Domaines Stratégiques (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Domaines
            </h4>
            <ul className="space-y-2 text-xs text-on-night-soft">
              <li>Genre & Démocratie</li>
              <li>Santé & CSU</li>
              <li>Justice Climatique</li>
              <li>Éducation des Filles</li>
              <li>Autonomisation & Microfinance</li>
              <li>Données & Baromètres</li>
            </ul>
          </div>

          {/* Col 4: Contact & Siège (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Siège & Contact
            </h4>
            <div className="space-y-3 text-xs text-on-night-soft">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rve-lime shrink-0 mt-0.5" />
                <span>Agla Akplomey, 13ᵉ arrondissement de Cotonou</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-rve-lime shrink-0" />
                <a href="mailto:rvoixessentiellesbenin@gmail.com" className="break-all hover:text-white transition-colors">
                  rvoixessentiellesbenin@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-rve-lime shrink-0" />
                <a href="tel:+2290152634545" className="hover:text-white transition-colors">+229 01 52 63 45 45</a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenContact('Demande d’information')}
                className="w-full py-2.5 px-3 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg transition-colors cursor-pointer text-center"
              >
                Écrire au Secrétariat Exécutif
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-night-soft">
          <div>
            &copy; {new Date().getFullYear()} Réseau Voix EssentiELLES Bénin (RVE-Bénin). Tous droits réservés.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenContact('Mentions légales')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Mentions Légales & Statuts
            </button>
            <span aria-hidden="true" className="text-on-night-muted">·</span>
            <button
              onClick={() => onOpenContact('Politique de confidentialité')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Protection des Données
            </button>
            <span aria-hidden="true" className="text-on-night-muted">·</span>
            <Lien
              vers="/connexion"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
              Espace membre
            </Lien>
            <span aria-hidden="true" className="text-on-night-muted">·</span>
            <span className="font-medium text-rve-lime">Bénin</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
