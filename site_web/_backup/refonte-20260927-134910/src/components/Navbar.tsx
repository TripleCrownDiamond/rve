import React, { useState } from 'react';
import { Logo } from './Logo.tsx';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenContact: (subject?: string) => void;
  onOpenJoin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenJoin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'À propos', href: '#a-propos' },
    { label: 'Domaines', href: '#domaines' },
    { label: 'Actions & Impact', href: '#actions' },
    { label: 'Membres', href: '#membres' },
    { label: 'Gouvernance', href: '#gouvernance' },
    { label: 'Ressources', href: '#ressources' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white py-3.5">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark / Official Logo */}
        <a
          href="#"
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
          aria-label="Accueil Réseau Voix EssentiELLES Bénin"
        >
          <Logo variant="color" size="md" />
        </a>

        {/* Zone 2: 4-6 Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-stone-700 transition-colors hover:text-[#109030] whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => onOpenContact('Renseignement général')}
            className="px-4 py-2 text-xs font-semibold text-stone-700 hover:text-[#109030] hover:bg-stone-50 border border-stone-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            Contact
          </button>
          <button
            onClick={onOpenJoin}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#109030] hover:bg-[#0c7326] active:bg-[#09571d] rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span>Rejoindre le réseau</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu hamburger button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-stone-800 hover:bg-stone-100 transition-colors"
          aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 shadow-xl px-6 py-6 transition-all animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-stone-800 hover:text-[#109030] py-1 border-b border-stone-100"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact('Renseignement général');
                }}
                className="w-full py-2.5 text-center text-sm font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
              >
                Nous contacter
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenJoin();
                }}
                className="w-full py-2.5 text-center text-sm font-semibold text-white bg-[#109030] hover:bg-[#0c7326] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Rejoindre le réseau</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
