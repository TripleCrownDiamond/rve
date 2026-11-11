import React from 'react';
import { Coins, GraduationCap, Handshake, Megaphone } from 'lucide-react';
import { PageHeader, PageBody } from '../components/PageHeader';
import { Tache } from '../components/Decor';
import {
  Bouton,
  Carte,
  CarteCorps,
  Encadre,
  Grille,
  ListeCoches,
  TitreSection,
} from '../components/ui';
import { Lien } from '../router';
import { ContactForm } from '../components/ContactForm';

/**
 * Partenariats.
 *
 * La page répond à une question précise : « que se passe-t-il si nous
 * travaillons avec ce réseau ? ». Elle décrit donc des formes de
 * collaboration et ce que chacune engage, au lieu de dérouler un argumentaire
 * général sur l'importance du partenariat.
 */

const FORMES = [
  {
    icone: Handshake,
    titre: 'Partenariat institutionnel',
    texte:
      'Travail suivi avec un ministère, une collectivité ou une institution sur un dossier précis : concertation régulière, positions préparées en amont, suivi des engagements.',
    engagements: [
      'Un point de contact désigné de part et d’autre',
      'Un calendrier de rencontres arrêté à l’avance',
      'Un compte rendu écrit après chaque séance',
    ],
  },
  {
    icone: Coins,
    titre: 'Appui technique et financier',
    texte:
      'Soutien d’un bailleur ou d’une agence à un programme porté par le réseau ou par l’une de ses organisations membres.',
    engagements: [
      'Des objectifs et indicateurs définis ensemble',
      'Un rapportage aux échéances convenues',
      'Un suivi documenté des activités soutenues',
    ],
  },
  {
    icone: GraduationCap,
    titre: 'Coopération technique',
    texte:
      'Mise en commun d’expertises : méthodologie d’enquête, formation des équipes, appui à la production de données de terrain.',
    engagements: [
      'Un cadre de travail défini entre les parties',
      'Des règles de partage des données convenues en amont',
      'La mention des contributions respectives dans les publications',
    ],
  },
  {
    icone: Megaphone,
    titre: 'Alliance de plaidoyer',
    texte:
      'Position portée conjointement avec d’autres réseaux ou collectifs sur un sujet où les voix séparées portent moins loin.',
    engagements: [
      'Une position commune validée par chaque partie',
      'Une prise de parole coordonnée',
      'Le respect de l’autonomie de chaque organisation',
    ],
  },
];

export const PagePartenariats: React.FC = () => {
  return (
    <>
      <PageHeader
        titre="Travailler avec le réseau"
        amorce="Quatre formes de collaboration, et ce que chacune engage de part et d’autre."
        image="/assets/img/pleniere-parakou.jpg"
        cadrage="45% 42%"
        fil={[{ label: 'Partenariats' }]}
      />

      <PageBody className="relative">
        <Tache
          couleur="var(--color-rve-green)"
          className="absolute -left-24 top-32 h-60 w-60 opacity-[0.07]"
        />

        {/* La liste des partenaires vivait ici, en doublon de la page qui
            leur est consacrée. Cette page répond à « comment collaborer »,
            l'autre à « qui nous appuie ». Un lien suffit. */}
        <div className="relative mb-14 flex flex-wrap items-center gap-4 rounded-carte border border-line bg-surface-raised p-6">
          <p className="min-w-0 flex-1 text-sm leading-relaxed text-ink-soft">
            Les organisations qui appuient déjà le réseau — appuis techniques, financiers et institutionnels —
            sont présentées sur leur propre page.
          </p>
          <Lien vers="/partenaires" className="inline-flex shrink-0 items-center gap-2 rounded-bouton bg-rve-green px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-rve-green-ink">
            Voir nos partenaires
          </Lien>
        </div>

        <TitreSection titre="Formes de collaboration" className="relative mb-8" />
        <Grille colonnes={2} className="relative">
          {FORMES.map(({ icone: Icone, titre, texte, engagements }) => (
            <Carte key={titre}>
              <CarteCorps>
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-[4px] border border-line bg-surface-sunken">
                  <Icone className="h-5 w-5 text-rve-green" aria-hidden="true" />
                </span>
                <h2 className="font-display text-lg font-bold leading-snug text-ink">
                  {titre}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {texte}
                </p>
                {/* Ce que le partenariat engage, plutôt que ce qu'il promet :
                    c'est l'information qu'un bailleur cherche réellement. */}
                <p className="mt-6 text-[0.8125rem] font-semibold text-ink">
                  Ce que cela engage
                </p>
                <ListeCoches items={engagements} className="mt-3" />
              </CarteCorps>
            </Carte>
          ))}
        </Grille>

        <div className="mt-20 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <TitreSection
              titre="Engager une collaboration"
              amorce="Écrivez au secrétariat exécutif en précisant la forme envisagée et le sujet concerné."
            />
            <div className="mt-8"><ContactForm typeInitial="Partenariat" titre="Présenter une proposition" /></div>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <Encadre titre="À joindre à votre demande">
              <ListeCoches
                items={[
                  'La forme de collaboration envisagée',
                  'Le domaine et le territoire concernés',
                  'Le calendrier souhaité',
                ]}
              />
            </Encadre>
          </aside>
        </div>
      </PageBody>
    </>
  );
};
