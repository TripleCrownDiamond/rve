import React, { useState } from 'react';
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
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-[#FCFCFD] border-b border-stone-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#303030]">Contacter le RVE-Bénin</h3>
            <p className="text-xs text-stone-500">Secrétariat Exécutif · Cotonou, Bénin</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-[#109030] rounded-full mx-auto flex items-center justify-center">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-stone-900">Message transmis avec succès</h4>
              <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
                Le Secrétariat Exécutif du Réseau Voix EssentiELLES Bénin a bien reçu votre communication. Une réponse vous sera apportée sous 48 heures ouvrées.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-5 py-2.5 text-xs font-semibold text-white bg-[#109030] rounded-xl hover:bg-[#0c7326] transition-colors"
              >
                Fermer la fenêtre
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Nom complet *</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ex. Mariam Kora"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#109030] focus:ring-1 focus:ring-[#109030]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Organisation / Institution</label>
                  <input
                    type="text"
                    value={formData.org}
                    onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                    placeholder="ex. Agence, ONG ou Ministère"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#109030] focus:ring-1 focus:ring-[#109030]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Adresse email *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nom@organisation.org"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#109030] focus:ring-1 focus:ring-[#109030]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Téléphone / WhatsApp</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+229 97 00 00 00"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#109030] focus:ring-1 focus:ring-[#109030]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Objet *</label>
                <input
                  required
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#109030] focus:ring-1 focus:ring-[#109030]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Message ou proposition *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Précisez votre demande, proposition de partenariat ou de concertation..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#109030] focus:ring-1 focus:ring-[#109030]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 rounded-xl"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#109030] hover:bg-[#0c7326] rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
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
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        <div className="px-6 py-5 bg-[#FCFCFD] border-b border-stone-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#303030]">Adhérer au Réseau RVE-Bénin</h3>
            <p className="text-xs text-[#109030] font-medium">Rejoindre la coalition des OSC féminines</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-[#109030] rounded-full mx-auto flex items-center justify-center">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-stone-900">Demande d'adhésion enregistrée</h4>
              <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
                Votre dossier préliminaire a été transmis à la Commission d'Adhésion et de Conformité du Conseil d'Administration. Vous recevrez les termes de référence et la fiche de collecte.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#109030] rounded-xl hover:bg-[#0c7326]"
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
              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-xs text-emerald-900 space-y-1">
                <span className="font-bold block">Critères généraux d'éligibilité :</span>
                <p>• Être une organisation féminine légalement enregistrée en République du Bénin.</p>
                <p>• Avoir au moins 1 an d'activités vérifiables sur le terrain dans nos 6 domaines.</p>
                <p>• Adhérer sans réserve à la charte éthique et au principe de sororité solidaire.</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Dénomination de l'OSC *</label>
                <input
                  required
                  type="text"
                  value={oscName}
                  onChange={(e) => setOscName(e.target.value)}
                  placeholder="ex. Association des Femmes Leaders du Couffo"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#109030]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Département principal *</label>
                  <select
                    value={departement}
                    onChange={(e) => setDepartement(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-200 rounded-xl bg-white focus:outline-none focus:border-[#109030]"
                  >
                    {[
                      'Alibori', 'Atacora', 'Atlantique', 'Borgou', 'Collines', 
                      'Couffo', 'Donga', 'Littoral (Cotonou)', 'Mono', 'Ouémé', 'Plateau', 'Zou'
                    ].map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Numéro d’enregistrement / Journal Officiel</label>
                  <input
                    type="text"
                    placeholder="N° Rép. Préfecture / MISP"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#109030]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Email de contact *</label>
                  <input
                    required
                    type="email"
                    placeholder="contact@ong.bj"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#109030]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Téléphone de la présidente / coordinatrice *</label>
                  <input
                    required
                    type="tel"
                    placeholder="+229 ..."
                    className="w-full px-3.5 py-2 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#109030]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#109030] hover:bg-[#0c7326] rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
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
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-y-auto">
        <div className="sticky top-0 z-10 px-6 py-4 bg-white/95 backdrop-blur-md border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <span className="text-[#109030] font-semibold">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.date}</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#303030] tracking-tight leading-tight">
            {article.title}
          </h2>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between text-xs text-stone-600">
            <span>Rédigé par : <strong>{article.author}</strong></span>
            <span>Lieu : <strong>{article.location}</strong></span>
          </div>

          <div className="prose prose-stone text-sm sm:text-base leading-relaxed text-stone-700 whitespace-pre-line">
            {article.fullContent}
          </div>

          <div className="pt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
            <span>Réseau Voix EssentiELLES Bénin</span>
            <button
              onClick={onClose}
              className="px-4 py-2 font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
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
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        <div className="px-6 py-5 bg-[#FCFCFD] border-b border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#109030] uppercase tracking-wider">
              {resource.category} · {resource.year}
            </span>
            <h3 className="text-base font-bold text-[#303030] mt-0.5">
              Consulter la publication
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <h4 className="text-lg font-bold text-[#303030] leading-snug">
            {resource.title}
          </h4>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {resource.description}
          </p>

          <div className="grid grid-cols-3 gap-3 p-3.5 bg-stone-50 rounded-xl text-center text-xs">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Format</span>
              <span className="font-bold text-stone-800">{resource.format}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Poids</span>
              <span className="font-bold text-stone-800">{resource.size}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Pagination</span>
              <span className="font-bold text-stone-800">{resource.pages} pages</span>
            </div>
          </div>

          {downloaded ? (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-[#109030] flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Document prêt. Le téléchargement de « {resource.title} » a démarré.</span>
            </div>
          ) : null}

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
            >
              Fermer
            </button>
            <button
              onClick={handleDownload}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#109030] hover:bg-[#0c7326] rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
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
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        <div className="px-6 py-5 bg-[#FCFCFD] border-b border-stone-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-[#109030]">
            {member.category}
          </span>
          <button onClick={onClose} className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="h-20 w-full flex items-center justify-center p-3 bg-stone-50 rounded-xl border border-stone-100">
            {member.logo}
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#303030] leading-snug">
              {member.name}
            </h3>
            <span className="text-xs text-stone-500 font-medium">Acronyme : {member.shortName}</span>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {member.description}
          </p>

          <div className="p-3.5 bg-stone-50 rounded-xl">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1">
              Spécialité & Champs d'action
            </span>
            <p className="text-xs sm:text-sm font-semibold text-[#109030]">
              {member.focus}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
            >
              Fermer
            </button>
            <button
              onClick={() => {
                onClose();
                onContact(`Mise en relation avec ${member.name}`);
              }}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-[#109030] hover:bg-[#0c7326] rounded-xl flex items-center gap-1.5 cursor-pointer"
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
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        <div className="px-6 py-5 bg-[#FCFCFD] border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#109030] font-mono">AXE 0{domain.id}</span>
            <span className="text-xs text-stone-400">·</span>
            <span className="text-xs text-stone-500 font-medium">{domain.sdgGoal}</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-7 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center shrink-0">
              {domain.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#303030] leading-snug">
                {domain.title}
              </h3>
            </div>
          </div>

          <p className="text-sm text-stone-600 leading-relaxed">
            {domain.fullDesc}
          </p>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Actions Opérationnelles & Programmes Clés
            </h4>
            <ul className="space-y-2">
              {domain.keyActions.map((action, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#109030] shrink-0 mt-2" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
            <button
              onClick={onClose}
              className="px-4 py-2 font-semibold text-stone-600 hover:text-stone-900"
            >
              Fermer
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenContact(`Partenariat sur l’axe : ${domain.title}`);
              }}
              className="px-4 py-2.5 font-semibold text-white bg-[#109030] hover:bg-[#0c7326] rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <span>Soutenir cet axe d’intervention</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
