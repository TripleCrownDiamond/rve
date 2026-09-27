import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Vague } from './Vague';
import { Reveal, Cadence, CadenceItem } from './Reveal';
import { Compteur, TitreRevele } from './Motion';

/**
 * Le pivot de la page — dispositif « chiffre clé » de la charte §40 :
 * aplat vert, nombre en Montserrat Bold blanc, libellé en dessous,
 * vague en pied.
 *
 * C'est le seul aplat de couleur fort de la page, conformément à §18
 * (« Un seul aplat de couleur fort par page »), et le seul endroit où
 * la vague se trace à l'entrée dans le champ (§07).
 *
 * Le chiffre ne décore pas : les neuf organisations sont montrées, une
 * par une, avec leur marque. Un « 9 » suivi de trois listes de noms
 * demande au lecteur de compter ; neuf pastilles se voient.
 *
 * Les trois collèges ne comptent pas le même nombre de membres (2, 4, 3).
 * Les colonnes sont donc étirées à hauteur égale et leur lien de pied est
 * poussé en bas : le déséquilibre du contenu ne devient pas un
 * déséquilibre visuel.
 *
 * Texte blanc exclusivement sur le vert (§18 : « Jamais de texte noir ou
 * jaune sur vert »).
 */

const COLLEGES = [
  {
    titre: 'Santé sexuelle et reproductive',
    membres: [
      { nom: 'Fondation Reine Hangbe', logo: 'frh.jpg' },
      { nom: 'FJAD', logo: 'fjad.jpg' },
    ],
  },
  {
    titre: 'Paludisme, tuberculose et VIH',
    membres: [
      { nom: 'Fondation Reine Adjignon Natabou', logo: 'fran.jpg' },
      { nom: 'Icône 360°', logo: 'icone360.jpg' },
      { nom: 'FADeC ONG', logo: 'fadec.jpg' },
      { nom: 'VIA-ME', logo: 'via-me.png' },
    ],
  },
  {
    titre: 'Violences basées sur le genre',
    membres: [
      { nom: 'Women and Power Association', logo: 'wopas.png' },
      { nom: 'Benin Women Alumni Association', logo: 'bwaa.jpg' },
      { nom: 'GJFA', logo: 'gjfa.jpg' },
    ],
  },
] as const;

export const CollegesSection: React.FC = () => {
  return (
    <section id="colleges" aria-labelledby="colleges-titre">
      <div className="bg-rve-green">
        <div className="mx-auto w-full max-w-[1240px] px-6 pt-24 pb-16 sm:px-8 sm:pt-28 sm:pb-20 lg:px-10">
          <Reveal as="header" className="max-w-3xl">
            <p className="font-display text-[clamp(5.5rem,17vw,13rem)] font-extrabold leading-[0.82] tracking-[-0.04em] tabular-nums text-white">
              <Compteur valeur={9} />
            </p>
            <TitreRevele
              texte="organisations féminines, trois collèges, une seule voix"
              className="mt-6 max-w-[26ch] font-display text-[clamp(1.5rem,3.2vw,2.25rem)] font-bold leading-tight text-white"
            />
            <p className="mt-5 max-w-[54ch] text-[1.0625rem] leading-relaxed text-white/85">
              Chaque organisation siège dans le collège qui correspond à son
              terrain. C’est là que se prépare la position que le réseau porte
              ensuite d’une seule voix.
            </p>
          </Reveal>

          <Cadence
            as="div"
            className="mt-16 grid items-stretch gap-6 sm:mt-20 md:grid-cols-3 md:gap-8"
          >
            {COLLEGES.map((college) => (
              <CadenceItem
                key={college.titre}
                className="flex h-full flex-col rounded-carte bg-white/10 p-6 sm:p-7"
              >
                <h3 className="font-display text-lg font-bold leading-snug text-white">
                  {college.titre}
                </h3>
                <p className="mt-1.5 text-sm text-white/65">
                  {college.membres.length} organisation
                  {college.membres.length > 1 ? 's' : ''}
                </p>

                {/* Chaque organisation porte sa marque, dans une pastille
                    blanche : sur l'aplat vert, c'est le seul fond qui rende
                    neuf logos distincts les uns des autres. */}
                <ul className="mt-6 flex flex-col gap-3.5">
                  {college.membres.map((membre) => (
                    <li key={membre.nom} className="flex items-center gap-3.5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1.5">
                        <img
                          src={`/assets/logos/${membre.logo}`}
                          alt=""
                          width={44}
                          height={44}
                          loading="lazy"
                          className="h-full w-full object-contain"
                        />
                      </span>
                      <span className="text-[0.9375rem] font-medium leading-snug text-white">
                        {membre.nom}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Poussé en bas : les trois colonnes se terminent à la même
                    hauteur quel que soit le nombre de membres. */}
                <a
                  href="#membres"
                  className="group mt-auto inline-flex items-center gap-1.5 pt-7 text-[0.9375rem] font-semibold text-white"
                >
                  <span className="underline decoration-white/40 underline-offset-4 transition-colors duration-150 group-hover:decoration-white">
                    Voir ces organisations
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                </a>
              </CadenceItem>
            ))}
          </Cadence>
        </div>
      </div>

      {/* Vague en pied — §12. Elle ferme l'aplat : l'arête verte du bloc EST
          le premier ruban, le jaune et le rouge courent dessous sur le blanc.
          Aucune bande intermédiaire, aucune crête coupée.
          Seul tracé animé du site (§07). */}
      <Vague
        dessine
        termine="var(--color-rve-green)"
        className="pointer-events-none -mt-px -mb-px block h-24 w-full sm:h-28 lg:h-32"
      />
    </section>
  );
};
