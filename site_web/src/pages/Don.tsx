import React from 'react';
import { PageBody, PageHeader } from '../components/PageHeader';
import { PageAnimee } from '../components/PageAnimee';
import { TitreSection } from '../components/ui';
import { Cadence, CadenceItem, Reveal } from '../components/Reveal';
import { Lien } from '../router';
import { useContenu } from '../data/contenu';
import { CONTACT } from '../data/reseau';
import { GraduationCap, HandHeart, Mail, Megaphone, Phone, Sprout } from 'lucide-react';

/**
 * Page de don.
 *
 * Aucun paiement en ligne n'est branché, et aucune coordonnée bancaire
 * n'est publiée ici : ces éléments n'ont pas été transmis et un RIB inventé
 * ou approximatif sur un site public est le genre d'erreur qui coûte la
 * confiance d'un bailleur. La page explique donc à quoi sert un don, puis
 * dirige vers le Secrétariat Exécutif qui communique les modalités.
 *
 * Quand le réseau fournira ses coordonnées de versement — virement, mobile
 * money ou passerelle en ligne —, elles prendront la place du bloc de
 * contact, sans toucher au reste de la page.
 */

const AFFECTATIONS = [
  {
    icone: GraduationCap,
    titre: 'Former les organisations membres',
    texte:
      'Ateliers techniques, mentorat et coaching pour renforcer les compétences organisationnelles et stratégiques des organisations membres.',
    aplat: 'bg-rve-green',
  },
  {
    icone: Megaphone,
    titre: 'Porter le plaidoyer',
    texte:
      'Production de données, notes de position et rencontres avec les décideurs pour influencer les politiques publiques de santé et de genre.',
    aplat: 'bg-rve-red',
  },
  {
    icone: Sprout,
    titre: 'Appuyer les initiatives locales',
    texte:
      'Soutien technique, logistique ou financier aux actions menées par les membres dans leurs zones d’intervention.',
    aplat: 'bg-rve-yellow',
  },
];

export const PageDon: React.FC = () => {
  const contact = useContenu('contact');

  return (
    <>
      <PageHeader
        titre="Soutenir le réseau"
        amorce="Chaque contribution finance des formations, du plaidoyer et des actions de terrain menées par des organisations féminines béninoises."
        image="/assets/img/hero/IMG_4811.jpg"
        cadrage="50% 35%"
        fil={[{ label: 'S’engager' }, { label: 'Faire un don' }]}
      />
      <PageAnimee>
      <PageBody>
        <TitreSection
          titre="À quoi sert votre don"
          amorce="Le réseau mutualise les ressources au profit de ses organisations membres. Un don ne finance pas une structure de plus : il alimente les moyens d’action que les statuts assignent au réseau."
        />

        <Cadence className="mt-10 grid gap-6 lg:grid-cols-3" as="ul">
          {AFFECTATIONS.map((a) => (
            <CadenceItem key={a.titre} as="li">
              <article data-scroll="rise" className="rve-gsap-icon flex h-full flex-col overflow-hidden rounded-carte border border-line bg-white transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lg">
                <span className={`block h-1.5 w-full ${a.aplat}`} aria-hidden="true" />
                <div className="flex flex-1 flex-col p-6">
                  <span className={`mb-4 flex h-12 w-12 items-center justify-center rounded-carte ${a.aplat} text-white`}>
                    <a.icone className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-base font-bold leading-snug text-ink">{a.titre}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{a.texte}</p>
                </div>
              </article>
            </CadenceItem>
          ))}
        </Cadence>

        <Reveal className="mt-14 overflow-hidden rounded-carte border-2 border-rve-green bg-white">
          <div className="grid gap-0 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="p-8 sm:p-10">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-carte bg-rve-green text-white">
                <HandHeart className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="font-display text-2xl font-extrabold leading-tight text-ink">
                Comment verser une contribution
              </h2>
              <p className="mt-4 max-w-[58ch] leading-relaxed text-ink-soft">
                Le réseau ne collecte pas de paiement en ligne. Les modalités de versement — virement bancaire,
                mobile money ou convention de financement — sont communiquées par le Secrétariat Exécutif,
                qui établit également le reçu correspondant.
              </p>
              <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-ink-muted">
                Les organisations souhaitant formaliser un appui durable sont orientées vers une convention de
                partenariat plutôt que vers un don ponctuel.
              </p>
            </div>

            <div className="bg-surface-rest p-8 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-wider text-rve-green-deep">
                Secrétariat Exécutif
              </p>
              <dl className="mt-5 flex flex-col gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-rve-green-ink" aria-hidden="true" />
                  <div>
                    <dt className="font-bold text-ink">Téléphone</dt>
                    <dd>
                      <a href={CONTACT.telephoneLien} className="text-rve-green-ink underline underline-offset-2 hover:text-rve-green">
                        {contact.telephone}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-rve-green-ink" aria-hidden="true" />
                  <div className="min-w-0">
                    <dt className="font-bold text-ink">Courriel</dt>
                    <dd className="break-words">
                      <a href={`mailto:${contact.email}`} className="text-rve-green-ink underline underline-offset-2 hover:text-rve-green">
                        {contact.email}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>
              <Lien vers="/contact" className="mt-6 inline-flex w-full items-center justify-center rounded-bouton bg-rve-green px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-rve-green-ink">
                Contacter le réseau
              </Lien>
            </div>
          </div>
        </Reveal>
      </PageBody>
      </PageAnimee>
    </>
  );
};
