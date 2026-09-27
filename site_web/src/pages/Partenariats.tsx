import React from 'react';
import { Coins, GraduationCap, Handshake, Megaphone } from 'lucide-react';
import { PageHeader, PageBody } from '../components/PageHeader';
import { Tache } from '../components/Decor';
import { MEMBER_ORGANIZATIONS } from '../components/MemberLogos';
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
      'Des comptes audités chaque année par un cabinet indépendant',
      'Un rapportage aux échéances convenues',
      'La traçabilité documentaire des dépenses engagées',
    ],
  },
  {
    icone: GraduationCap,
    titre: 'Coopération technique',
    texte:
      'Mise en commun d’expertises : méthodologie d’enquête, formation des équipes, appui à la production de données de terrain.',
    engagements: [
      'Un protocole de travail signé entre les parties',
      'Le partage des données produites avec les organisations membres',
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
  const partenaires = MEMBER_ORGANIZATIONS.filter(
    (m) => m.category === 'Partenaire Stratégique',
  );

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

        {partenaires.length > 0 && (
          <div className="mt-20 border-t border-line pt-12">
            <TitreSection niveau={3} titre="Ils appuient le réseau" />
            <ul className="mt-8 flex flex-wrap gap-4 sm:gap-5">
              {partenaires.map((p) => (
                <li key={p.id}>
                  <Lien
                    vers={`/membres/${p.id}`}
                    title={p.name}
                    aria-label={`${p.name} — voir la fiche`}
                    className="group flex h-28 w-44 cursor-pointer items-center justify-center rounded-carte border border-line bg-surface px-6 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-rve-green/40 hover:shadow-md sm:h-32 sm:w-48"
                  >
                    {p.logo}
                  </Lien>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-20 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <TitreSection
              titre="Engager une collaboration"
              amorce="Écrivez au secrétariat exécutif en précisant la forme envisagée et le sujet concerné. Une première rencontre est proposée sous quinze jours."
            />
            <Bouton vers="/" icone="fleche" className="mt-8">
              Écrire au secrétariat
            </Bouton>
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
