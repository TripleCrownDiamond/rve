import React, { useRef } from 'react';
import { Mail, Phone, MapPin, HeartHandshake } from 'lucide-react';
import { Lien } from '../router';
import { useContenu } from '../data/contenu';
import { CONTACT } from '../data/reseau';
import { ReseauxSociaux } from './ReseauxSociaux';
import { Reveal } from './Reveal';
import { useGsapIcons } from '../hooks/useGsapIcons';

interface ContactSectionProps {
  onOpenContact: (subject?: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenContact }) => {
  const contact = useContenu('contact');
  const sectionRef = useRef<HTMLElement>(null);
  useGsapIcons(sectionRef);
  return (
    <section ref={sectionRef} className="bg-rve-yellow py-20 lg:py-28">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="text-ink">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <Reveal className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-rve-red-ink tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-rve-red" />
                <span>Engagement & Partenariats</span>
              </div>

              <h2
                data-scroll="left"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-rve-green-deep tracking-tight leading-tight"
                style={{ textWrap: 'balance' }}
              >
                Agissons ensemble pour amplifier les voix des femmes et des filles.
              </h2>

              <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl">
                Bailleurs de fonds, agences des Nations Unies, ministères, organisations de la société civile et activistes : unissons nos forces pour un Bénin équitable et prospère.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenContact('Proposition de partenariat')}
                  className="rve-gsap-icon group flex cursor-pointer items-center gap-2 bg-rve-green px-7 py-3.5 text-sm font-semibold text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-rve-green-ink sm:text-base"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contacter</span>
                </button>

                {/* Le second bouton menait au même formulaire que le premier.
                    Il mène désormais au don, qui est une action distincte. */}
                <Lien
                  vers="/don"
                  className="rve-gsap-icon flex cursor-pointer items-center gap-2 border-2 border-rve-red px-7 py-3 text-sm font-semibold text-rve-red-ink transition-colors duration-150 hover:bg-rve-red hover:text-white sm:text-base"
                >
                  <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                  <span>Faire un don</span>
                </Lien>
              </div>
            </Reveal>

            {/* Right Quick Contact Info */}
            <Reveal className="lg:col-span-4 space-y-4">
              <h3 data-scroll="right" className="text-xs font-bold text-rve-green-ink uppercase tracking-wider pb-3">
                Secrétariat Exécutif du Réseau
              </h3>

              <div data-scroll="right" className="rve-gsap-icon flex items-start gap-3 text-xs sm:text-sm text-ink-soft">
                <MapPin className="w-4 h-4 text-rve-red shrink-0 mt-0.5" />
                <span>{contact.adresse}, département du Littoral</span>
              </div>

              <div data-scroll="right" className="rve-gsap-icon flex items-center gap-3 text-xs sm:text-sm text-ink-soft">
                <Mail className="w-4 h-4 text-rve-green shrink-0" />
                <a href={`mailto:${contact.email}`} className="break-all hover:text-rve-green-ink transition-colors">
                  {contact.email}
                </a>
              </div>

              <div data-scroll="right" className="rve-gsap-icon flex items-center gap-3 text-xs sm:text-sm text-ink-soft">
                <Phone className="w-4 h-4 text-rve-yellow-ink shrink-0" />
                <a href={CONTACT.telephoneLien} className="hover:text-rve-green-ink transition-colors">{contact.telephone}</a>
              </div>

              <div className="pt-2 text-[11px] text-ink-muted">{contact.postale}</div>

              <ReseauxSociaux className="pt-2" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
