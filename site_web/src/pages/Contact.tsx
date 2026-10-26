import React from 'react';
import { PageHeader, PageBody } from '../components/PageHeader';
import { Lien } from '../router';
import { ContactForm } from '../components/ContactForm';

export const PageContact: React.FC = () => (
  <>
    <PageHeader titre="Contacter le RVE-Bénin" amorce="Une question sur le réseau, ses membres ou une proposition de collaboration ? Le Secrétariat exécutif est votre point d’entrée." image="/assets/img/atelier-ecriture.jpg" fil={[{ label: 'Contact' }]} />
    <PageBody>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink">Coordonnées du réseau</h2>
          <dl className="mt-7 space-y-6">
            <div><dt className="text-sm font-semibold text-ink">Adresse</dt><dd className="mt-1 text-ink-soft">Quartier Agla Akplomey, 13e arrondissement de Cotonou, Bénin · 02 BP 591</dd></div>
            <div><dt className="text-sm font-semibold text-ink">E-mail</dt><dd className="mt-1"><a className="text-rve-green-ink underline" href="mailto:rvoixessentiellesbenin@gmail.com">rvoixessentiellesbenin@gmail.com</a></dd></div>
            <div><dt className="text-sm font-semibold text-ink">Téléphone</dt><dd className="mt-1"><a className="text-rve-green-ink underline" href="tel:+2290152634545">+229 01 52 63 45 45</a></dd></div>
          </dl>
          <p className="mt-9 text-sm leading-relaxed text-ink-soft">Vous pouvez aussi écrire directement au Secrétariat exécutif à l’adresse indiquée ci-dessus.</p>
        </div>
        <aside className="rounded-carte border border-line bg-surface-sunken p-7">
          <h2 className="font-display text-xl font-bold text-ink">Pour une demande précise</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">Indiquez l’objet de votre message, votre organisation et le moyen de vous recontacter. Pour joindre une organisation membre directement, consultez sa fiche dans l’annuaire.</p>
          <Lien vers="/membres" className="mt-6 inline-flex font-semibold text-rve-green-ink underline">Voir les organisations membres</Lien>
          <h3 className="mt-10 font-semibold text-ink">Réseaux sociaux du RVE-Bénin</h3>
          <div className="mt-3 flex flex-wrap gap-4 text-sm"><a className="text-rve-green-ink underline" href="https://www.facebook.com/share/1HQzgGeRPy/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">Facebook ↗</a><a className="text-rve-green-ink underline" href="https://lnkd.in/p/ep6YJmSK" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div>
        </aside>
      </div>
      <div className="mt-12 max-w-4xl"><ContactForm /></div>
    </PageBody>
  </>
);

export const PageConfidentialite: React.FC = () => (
  <>
    <PageHeader titre="Confidentialité" amorce="Informations sur les données transmises lorsque vous contactez le réseau." image="/assets/img/participante-table.jpg" fil={[{ label: 'Confidentialité' }]} />
    <PageBody>
      <div className="max-w-[68ch] space-y-8 leading-relaxed text-ink-soft">
        <section><h2 className="font-display text-xl font-bold text-ink">Contact par e-mail</h2><p className="mt-3">Les formulaires préparent un e-mail dans votre application de messagerie. Le site ne stocke pas le contenu du message. Vous devez confirmer son envoi dans votre messagerie. Les informations envoyées au RVE-Bénin servent à traiter votre demande et à vous répondre.</p></section>
        <section><h2 className="font-display text-xl font-bold text-ink">Pages externes</h2><p className="mt-3">Les liens vers les sites et réseaux sociaux des membres et partenaires ouvrent leurs propres services. Leurs règles de confidentialité s’appliquent une fois que vous les consultez.</p></section>
        <section><h2 className="font-display text-xl font-bold text-ink">Vos questions</h2><p className="mt-3">Pour toute question concernant un message que vous avez envoyé, écrivez à <a className="text-rve-green-ink underline" href="mailto:rvoixessentiellesbenin@gmail.com">rvoixessentiellesbenin@gmail.com</a>.</p></section>
      </div>
    </PageBody>
  </>
);
