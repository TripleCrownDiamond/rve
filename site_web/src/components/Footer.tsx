import React from 'react';
import { Lien } from '../router';
import { Logo } from './Logo.tsx';
import { ReseauxSociaux } from './ReseauxSociaux.tsx';
import { Mail, Phone, MapPin, HeartHandshake } from 'lucide-react';
import { useContenu } from '../data/contenu';
import { CONTACT, RESEAU } from '../data/reseau';
import { DOMAINS } from './DomainsSection.tsx';

interface FooterProps {
  onOpenContact: (subject?: string) => void;
}

/**
 * Pied de page.
 *
 * Il décrivait le réseau comme « une coalition ». Les statuts parlent d'un
 * « réseau d'associations » : ce n'est pas une nuance de style, c'est la
 * forme juridique déclarée au ministère de l'intérieur, et le réseau a
 * demandé que le mot disparaisse du site.
 *
 * Les domaines listés ici viennent désormais de la même source que la page
 * qui les détaille : la liste manuelle avait divergé des six domaines de
 * l'article 9 (« Justice Climatique », « Données & Baromètres »).
 */
export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const contact = useContenu('contact');

  return (
    <footer className="border-t-8 border-rve-yellow bg-forest pt-16 pb-12 text-on-night-muted">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-night/80 pb-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-5 lg:col-span-5">
            <div className="inline-block">
              <Logo variant="white" size="lg" />
            </div>

            <p className="max-w-md text-xs leading-relaxed text-on-night-soft sm:text-sm">
              Le {RESEAU.nom} ({RESEAU.sigle}) est un {RESEAU.forme}, qui réunit organisations membres
              féminines de la société civile béninoise pour promouvoir les droits humains, la santé, le
              leadership et l’autonomisation des femmes, des filles et des enfants.
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1">
              <span className="text-xs text-on-night-soft">Avec le soutien de</span>
              <span className="text-xs font-semibold text-white">Speak Up Africa</span>
              <span aria-hidden="true" className="text-on-night-muted">·</span>
              <span className="text-xs font-semibold text-rve-lime">République du Bénin</span>
            </div>

            <ReseauxSociaux ton="sombre" />
          </div>

          <div className="space-y-4 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2.5 text-xs text-on-night-soft">
              {[
                ['/reseau', 'Le réseau'],
                ['/membres', 'Organisations membres'],
                ['/equipe', 'Équipe'],
                ['/organigramme', 'Organigramme'],
                ['/gouvernance', 'Gouvernance'],
                ['/domaines', 'Domaines d’intervention'],
                ['/actions', 'Actualités'],
                ['/galerie', 'Galerie photo'],
                ['/partenaires', 'Partenaires'],
              ].map(([vers, label]) => (
                <li key={vers}>
                  <Lien vers={vers} className="transition-colors hover:text-white">
                    {label}
                  </Lien>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Domaines d’intervention
            </h4>
            <ul className="space-y-2 text-xs text-on-night-soft">
              {DOMAINS.map((d) => (
                <li key={d.id}>
                  <Lien vers={`/domaines/${d.id}`} className="transition-colors hover:text-white">
                    {d.title}
                  </Lien>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Siège et contact</h4>
            <div className="space-y-3 text-xs text-on-night-soft">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rve-lime" aria-hidden="true" />
                <span>
                  {contact.adresse}
                  <br />
                  {contact.postale}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-rve-lime" aria-hidden="true" />
                <a href={`mailto:${contact.email}`} className="break-all transition-colors hover:text-white">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-rve-lime" aria-hidden="true" />
                <a href={CONTACT.telephoneLien} className="transition-colors hover:text-white">
                  {contact.telephone}
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <Lien
                vers="/don"
                className="flex w-full items-center justify-center gap-2 rounded-bouton bg-rve-red px-3 py-2.5 text-center text-xs font-bold text-white transition-colors hover:bg-rve-red-ink"
              >
                <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                Faire un don
              </Lien>
              <button
                onClick={() => onOpenContact('Demande d’information')}
                className="w-full cursor-pointer rounded-bouton border border-white/15 bg-white/10 px-3 py-2.5 text-center text-xs font-bold text-white transition-colors hover:bg-white/15"
              >
                Contacter
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-on-night-soft sm:flex-row">
          <div>
            © {new Date().getFullYear()} {RESEAU.nom} ({RESEAU.sigle}). Tous droits réservés.
          </div>

          <div className="flex items-center gap-5">
            <Lien vers="/adhesion" className="transition-colors hover:text-white">
              Adhésion
            </Lien>
            <span aria-hidden="true" className="text-on-night-muted">·</span>
            <Lien vers="/confidentialite" className="transition-colors hover:text-white">
              Confidentialité
            </Lien>
            <span aria-hidden="true" className="text-on-night-muted">·</span>
            <span className="font-medium text-rve-lime">Bénin</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
