import React from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

interface ContactSectionProps {
  onOpenContact: (subject?: string) => void;
  onOpenJoin: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenContact,
  onOpenJoin,
}) => {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="relative overflow-hidden border-t-4 border-rve-green bg-forest p-8 text-white sm:p-12 lg:p-16">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-rve-lime tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-rve-lime" />
                <span>Engagement & Partenariats</span>
              </div>

              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
                style={{ textWrap: 'balance' }}
              >
                Agissons ensemble pour amplifier les voix des femmes et des filles.
              </h2>

              <p className="text-base sm:text-lg text-line leading-relaxed max-w-2xl">
                Bailleurs de fonds, agences des Nations Unies, ministères, organisations de la société civile et activistes : unissons nos forces pour un Bénin équitable et prospère.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenContact('Proposition de partenariat')}
                  className="px-7 py-3.5 text-sm sm:text-base font-semibold text-night bg-rve-yellow hover:bg-rve-yellow-ink active:bg-rve-yellow-ink rounded-xl transition-all shadow-md shadow-rve-yellow/20 flex items-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Nous contacter</span>
                </button>

                <button
                  onClick={onOpenJoin}
                  className="px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/15 active:bg-white/20 border border-white/20 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Rejoindre la dynamique</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Quick Contact Info */}
            <div className="lg:col-span-4 bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-white/10 space-y-4">
              <h3 className="text-xs font-bold text-rve-yellow uppercase tracking-wider pb-3 border-b border-white/10">
                Secrétariat Exécutif du Réseau
              </h3>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-line">
                <MapPin className="w-4 h-4 text-rve-lime shrink-0 mt-0.5" />
                <span>Agla Akplomey, 13ᵉ arrondissement de Cotonou, département du Littoral</span>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-line">
                <Mail className="w-4 h-4 text-rve-lime shrink-0" />
                <a href="mailto:rvoixessentiellesbenin@gmail.com" className="break-all hover:text-rve-yellow transition-colors">
                  rvoixessentiellesbenin@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-line">
                <Phone className="w-4 h-4 text-rve-lime shrink-0" />
                <a href="tel:+2290152634545" className="hover:text-rve-yellow transition-colors">+229 01 52 63 45 45</a>
              </div>

              <div className="pt-2 text-[11px] text-ink-faint">
                02 BP 591 Cotonou
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
