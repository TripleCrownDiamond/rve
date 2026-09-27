import React, { useState } from 'react';
import { Champ, ChampSelect, ChampTexte, RangeeChamps } from './ui';
import { X, CheckCircle, ArrowDownToLine, Send, Building, Mail, Phone, User, FileText, ExternalLink } from 'lucide-react';
import { ActionArticle } from './ActionsSection.tsx';
import { ResourceItem } from './ResourcesSection.tsx';
import { MemberOrg } from './MemberLogos.tsx';
import { DomainItem } from './DomainsSection.tsx';

/** Contact / Partnership Dialog */
export const ContactModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
}> = ({ isOpen, onClose, defaultSubject = 'Renseignement général' }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    org: '',
    email: '',
    phone: '',
    subject: defaultSubject,
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-line overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-surface-raised border-b border-line-soft flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-ink">Contacter le RVE-Bénin</h3>
            <p className="text-xs text-ink-muted">Secrétariat Exécutif · Cotonou, Bénin</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-sunken transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 bg-surface-rest text-rve-green rounded-full mx-auto flex items-center justify-center">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-ink">Message transmis avec succès</h4>
              <p className="text-xs sm:text-sm text-ink-soft max-w-sm mx-auto leading-relaxed">
                Le Secrétariat Exécutif du Réseau Voix EssentiELLES Bénin a bien reçu votre communication. Une réponse vous sera apportée sous 48 heures ouvrées.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-5 py-2.5 text-xs font-semibold text-white bg-rve-green rounded-xl hover:bg-rve-green-ink transition-colors"
              >
                Fermer la fenêtre
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <RangeeChamps>
                <Champ
                  label="Nom complet"
                  obligatoire
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="ex. Mariam Kora"
                />
                <Champ
                  label="Organisation / Institution"
                  type="text"
                  value={formData.org}
                  onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                  placeholder="ex. Agence, ONG ou Ministère"
                />
              </RangeeChamps>

              <RangeeChamps>
                <Champ
                  label="Adresse email"
                  obligatoire
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="nom@organisation.org"
                />
                <Champ
                  label="Téléphone / WhatsApp"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+229 97 00 00 00"
                />
              </RangeeChamps>

              <Champ
                label="Objet"
                obligatoire
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />

              <ChampTexte
                label="Message ou proposition"
                obligatoire
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Précisez votre demande, proposition de partenariat ou de concertation…"
              />

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-ink-soft hover:text-ink rounded-xl"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex cursor-pointer items-center gap-1.5 rounded-bouton bg-rve-green px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-rve-green-ink"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Envoyer la demande</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

/** Join / Adhesion Modal */
export const JoinModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [oscName, setOscName] = useState('');
  const [departement, setDepartement] = useState('Littoral (Cotonou)');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-line overflow-hidden">
        <div className="px-6 py-5 bg-surface-raised border-b border-line-soft flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-ink">Adhérer au Réseau RVE-Bénin</h3>
            <p className="text-xs text-rve-green font-medium">Rejoindre la coalition des OSC féminines</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-sunken">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-12 h-12 bg-surface-rest text-rve-green rounded-full mx-auto flex items-center justify-center">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-ink">Demande d'adhésion enregistrée</h4>
              <p className="text-xs sm:text-sm text-ink-soft max-w-sm mx-auto leading-relaxed">
                Votre dossier préliminaire a été transmis à la Commission d'Adhésion et de Conformité du Conseil d'Administration. Vous recevrez les termes de référence et la fiche de collecte.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-rve-green rounded-xl hover:bg-rve-green-ink"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4"
            >
              <div className="p-3.5 rounded-xl bg-surface-sunken/60 border border-rve-lime/60 text-xs text-forest space-y-1">
                <span className="font-bold block">Critères généraux d'éligibilité :</span>
                <p>• Être une organisation féminine légalement enregistrée en République du Bénin.</p>
                <p>• Avoir au moins 1 an d'activités vérifiables sur le terrain dans nos 6 domaines.</p>
                <p>• Adhérer sans réserve à la charte éthique et au principe de sororité solidaire.</p>
              </div>

              <Champ
                label="Dénomination de l’OSC"
                obligatoire
                type="text"
                value={oscName}
                onChange={(e) => setOscName(e.target.value)}
                placeholder="Nom officiel de l’organisation"
              />

              <RangeeChamps>
                <ChampSelect
                  label="Département principal"
                  obligatoire
                  value={departement}
                  onChange={(e) => setDepartement(e.target.value)}
                  options={['Alibori','Atacora','Atlantique','Borgou','Collines','Couffo','Donga','Littoral (Cotonou)','Mono','Ouémé','Plateau','Zou']}
                />
                <Champ
                  label="Numéro d’enregistrement / Journal Officiel"
                  type="text"
                  placeholder="N° Rép. Préfecture / MISP"
                />
              </RangeeChamps>

              <RangeeChamps>
                <Champ
                  label="Email de contact"
                  obligatoire
                  type="email"
                  placeholder="contact@ong.bj"
                />
                <Champ
                  label="Téléphone de la présidente / coordinatrice"
                  obligatoire
                  type="tel"
                  placeholder="+229 ..."
                />
              </RangeeChamps>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-ink-soft hover:text-ink"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex cursor-pointer items-center gap-1.5 rounded-bouton bg-rve-green px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-rve-green-ink"
                >
                  <span>Transmettre le formulaire</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

/** Article Reader Modal */
export const ArticleModal: React.FC<{
  article: ActionArticle | null;
  onClose: () => void;
}> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-line overflow-y-auto">
        <div className="sticky top-0 z-10 px-6 py-4 bg-white/95 backdrop-blur-md border-b border-line-soft flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-ink-muted font-medium">
            <span className="text-rve-green font-semibold">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.date}</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-sunken">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight leading-tight">
            {article.title}
          </h2>

          <div className="p-4 rounded-xl bg-surface-raised border border-line-soft flex items-center justify-between text-xs text-ink-soft">
            <span>Rédigé par : <strong>{article.author}</strong></span>
            <span>Lieu : <strong>{article.location}</strong></span>
          </div>

          <div className="prose prose-stone text-sm sm:text-base leading-relaxed text-ink whitespace-pre-line">
            {article.fullContent}
          </div>

          <div className="pt-6 border-t border-line-soft flex items-center justify-between text-xs text-ink-muted">
            <span>Réseau Voix EssentiELLES Bénin</span>
            <button
              onClick={onClose}
              className="px-4 py-2 font-semibold text-ink bg-surface-sunken hover:bg-surface-rest rounded-lg transition-colors"
            >
              Fermer la lecture
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Resource Preview / Download Modal */
export const ResourceModal: React.FC<{
  resource: ResourceItem | null;
  onClose: () => void;
}> = ({ resource, onClose }) => {
  const [downloaded, setDownloaded] = useState(false);

  if (!resource) return null;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-line overflow-hidden">
        <div className="px-6 py-5 bg-surface-raised border-b border-line-soft flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-rve-green uppercase tracking-wider">
              {resource.category} · {resource.year}
            </span>
            <h3 className="text-base font-bold text-ink mt-0.5">
              Consulter la publication
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-sunken">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <h4 className="text-lg font-bold text-ink leading-snug">
            {resource.title}
          </h4>

          <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
            {resource.description}
          </p>

          <div className="grid grid-cols-3 gap-3 p-3.5 bg-surface-raised rounded-xl text-center text-xs">
            <div>
              <span className="text-ink-muted block text-[10px] uppercase">Format</span>
              <span className="font-bold text-ink">{resource.format}</span>
            </div>
            <div>
              <span className="text-ink-muted block text-[10px] uppercase">Poids</span>
              <span className="font-bold text-ink">{resource.size}</span>
            </div>
            <div>
              <span className="text-ink-muted block text-[10px] uppercase">Pagination</span>
              <span className="font-bold text-ink">{resource.pages} pages</span>
            </div>
          </div>

          {downloaded ? (
            <div className="p-3 bg-surface-sunken border border-rve-lime rounded-xl text-xs text-rve-green flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Document prêt. Le téléchargement de « {resource.title} » a démarré.</span>
            </div>
          ) : null}

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-ink-soft hover:text-ink"
            >
              Fermer
            </button>
            <button
              onClick={handleDownload}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-rve-green hover:bg-rve-green-ink rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <ArrowDownToLine className="w-4 h-4" />
              <span>Télécharger le PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Member Detail Modal */
export const MemberDetailModal: React.FC<{
  member: MemberOrg | null;
  onClose: () => void;
  onContact: (subject: string) => void;
}> = ({ member, onClose, onContact }) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-line overflow-hidden">
        <div className="px-6 py-5 bg-surface-raised border-b border-line-soft flex items-center justify-between">
          <span className="text-xs font-semibold text-rve-green">
            {member.category}
          </span>
          <button onClick={onClose} className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-sunken">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="h-20 w-full flex items-center justify-center p-3 bg-surface-raised rounded-xl border border-line-soft">
            {member.logo}
          </div>

          <div>
            <h3 className="text-lg font-bold text-ink leading-snug">
              {member.name}
            </h3>
            <span className="text-xs text-ink-muted font-medium">Acronyme : {member.shortName}</span>
          </div>

          <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
            {member.description}
          </p>

          <div className="p-3.5 bg-surface-raised rounded-xl">
            <span className="text-xs font-bold text-ink-muted uppercase tracking-wider block mb-1">
              Spécialité & Champs d'action
            </span>
            <p className="text-xs sm:text-sm font-semibold text-rve-green">
              {member.focus}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-ink-soft hover:text-ink"
            >
              Fermer
            </button>
            <button
              onClick={() => {
                onClose();
                onContact(`Mise en relation avec ${member.name}`);
              }}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-rve-green hover:bg-rve-green-ink rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <span>Contacter via le réseau</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Domain Detail Modal */
export const DomainDetailModal: React.FC<{
  domain: DomainItem | null;
  onClose: () => void;
  onOpenContact: (subject: string) => void;
}> = ({ domain, onClose, onOpenContact }) => {
  if (!domain) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-line overflow-hidden">
        <div className="px-6 py-5 bg-surface-raised border-b border-line-soft flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-rve-green font-mono">AXE 0{domain.id}</span>
            <span className="text-xs text-ink-muted">·</span>
            <span className="text-xs text-ink-muted font-medium">{domain.sdgGoal}</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-sunken">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-7 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-surface-raised border border-line flex items-center justify-center shrink-0">
              {domain.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-ink leading-snug">
                {domain.title}
              </h3>
            </div>
          </div>

          <p className="text-sm text-ink-soft leading-relaxed">
            {domain.fullDesc}
          </p>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              Actions Opérationnelles & Programmes Clés
            </h4>
            <ul className="space-y-2">
              {domain.keyActions.map((action, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink">
                  <span className="w-1.5 h-1.5 rounded-full bg-rve-green shrink-0 mt-2" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-line-soft flex items-center justify-between text-xs">
            <button
              onClick={onClose}
              className="px-4 py-2 font-semibold text-ink-soft hover:text-ink"
            >
              Fermer
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenContact(`Partenariat sur l’axe : ${domain.title}`);
              }}
              className="px-4 py-2.5 font-semibold text-white bg-rve-green hover:bg-rve-green-ink rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <span>Soutenir cet axe d’intervention</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
