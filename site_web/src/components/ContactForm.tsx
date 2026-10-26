import React, { useState } from 'react';

const DESTINATAIRE = 'rvoixessentiellesbenin@gmail.com';

type TypeDemande = 'Renseignement général' | 'Adhésion' | 'Partenariat' | 'Presse' | 'Autre demande';

export const ContactForm: React.FC<{ typeInitial?: TypeDemande; titre?: string }> = ({
  typeInitial = 'Renseignement général',
  titre = 'Envoyer une demande',
}) => {
  const [type, setType] = useState<TypeDemande>(typeInitial);
  const [ouvert, setOuvert] = useState(false);

  const soumettre = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const valeur = (cle: string) => String(data.get(cle) || '').trim();
    const sujet = `[Site RVE-Bénin] ${type} : ${valeur('objet')}`;
    const corps = [
      `Nom : ${valeur('nom')}`,
      `Organisation : ${valeur('organisation') || 'Non indiquée'}`,
      `Adresse e-mail : ${valeur('email')}`,
      `Téléphone : ${valeur('telephone') || 'Non indiqué'}`,
      `Type de demande : ${type}`,
      '',
      valeur('message'),
    ].join('\n');
    setOuvert(true);
    window.location.href = `mailto:${DESTINATAIRE}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
  };

  const champ = 'mt-2 w-full rounded-bouton border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-rve-green focus:ring-2 focus:ring-rve-green/20';
  const label = 'block text-sm font-semibold text-ink';

  return (
    <section className="rounded-carte border border-line bg-surface p-6 shadow-sm sm:p-8" aria-labelledby="formulaire-contact-titre">
      <h2 id="formulaire-contact-titre" className="font-display text-2xl font-bold text-ink">{titre}</h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">Remplissez les champs ci-dessous. Le bouton préparera votre message dans votre application de messagerie. Vous devrez ensuite confirmer son envoi.</p>
      <form className="mt-7 space-y-5" onSubmit={soumettre}>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={label}>Nom et prénom <span aria-hidden="true">*</span><input className={champ} name="nom" autoComplete="name" required maxLength={120} /></label>
          <label className={label}>Adresse e-mail <span aria-hidden="true">*</span><input className={champ} name="email" type="email" autoComplete="email" required maxLength={180} /></label>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={label}>Organisation<input className={champ} name="organisation" autoComplete="organization" maxLength={160} /></label>
          <label className={label}>Téléphone<input className={champ} name="telephone" type="tel" autoComplete="tel" maxLength={40} /></label>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={label}>Type de demande <span aria-hidden="true">*</span><select className={champ} value={type} onChange={(event) => setType(event.target.value as TypeDemande)} required><option>Renseignement général</option><option>Adhésion</option><option>Partenariat</option><option>Presse</option><option>Autre demande</option></select></label>
          <label className={label}>Objet <span aria-hidden="true">*</span><input className={champ} name="objet" required maxLength={160} /></label>
        </div>
        <label className={label}>Votre message <span aria-hidden="true">*</span><textarea className={`${champ} min-h-40 resize-y`} name="message" required minLength={15} maxLength={4000} /></label>
        <p className="text-xs leading-relaxed text-ink-muted">Les informations saisies ne sont pas enregistrées sur ce site. Elles seront transmises uniquement si vous envoyez le message depuis votre messagerie.</p>
        <button type="submit" className="inline-flex rounded-bouton bg-rve-green px-6 py-3 text-sm font-bold text-white hover:bg-rve-green-ink">Préparer mon e-mail</button>
        {ouvert && <p role="status" className="rounded-bouton bg-surface-sunken p-4 text-sm text-ink-soft">Votre messagerie devrait s’ouvrir. Vérifiez votre message et cliquez sur « Envoyer » dans cette application. Si rien ne s’ouvre, écrivez directement à <a className="font-semibold text-rve-green-ink underline" href={`mailto:${DESTINATAIRE}`}>{DESTINATAIRE}</a>.</p>}
      </form>
    </section>
  );
};
