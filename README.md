# RVE-Bénin — site web

Le plan de communication 2026–2027 se trouve dans `03_PLAN_COMMUNICATION/` en Markdown et en Word. Il couvre diagnostic, publics, messages, canaux, validation, calendrier de quatre semaines, supports et indicateurs.

Site du **Réseau Voix EssentiELLES Bénin**, fédération de neuf organisations
féminines de la société civile béninoise.

## Pile technique

React 19 · TypeScript · Vite · Tailwind CSS 4 · Motion

## Démarrer

```bash
cd site_web
npm install
npm run dev
```

Le site tourne sur `http://localhost:3000`.

```bash
npm run build    # build de production
npm run lint     # vérification des types
```

## Structure

```
site_web/src/
├── components/      composants du site et système d'interface (ui.tsx)
├── pages/           pages internes et espace d'administration
├── router.tsx       routeur à fragment d'URL, sans dépendance
├── motion.ts        tokens d'animation
└── index.css        tokens de marque (@theme Tailwind)
```

## Charte graphique

Les couleurs, typographies, rayons et durées d'animation sont ceux de la
charte du réseau, centralisés dans `src/index.css` et exposés comme tokens
Tailwind. Aucune couleur n'est codée en dur dans les composants : la charte
l'interdit explicitement.

Points de contrainte notables :

- Texte sur fond clair vérifié à 4,5:1 minimum ; le vert institutionnel
  (#109030) plafonnant à 4,16:1 sur blanc, les libellés de boutons pleins
  sont en grand corps gras, seuil où 3:1 suffit.
- La vague signature est le seul endroit où le vert, le jaune et le rouge
  se touchent, et le seul élément animé pour lui-même.
- Champs de formulaire : 44 px de haut, bordure #979797, focus vert 1,5 px.

## État

Site public statique. L'authentification et les actions du tableau de bord
nécessitent encore une base de données. Les formulaires de contact, de partenariat
et d'adhésion préparent un e-mail que le visiteur doit envoyer depuis sa messagerie. Les fiches membres proviennent de la fiche
de collecte du réseau ; trois profils restent à compléter. Les opportunités
restent vides tant qu'aucune annonce validée n'est fournie.

Pages publiques : accueil, présentation du réseau, domaines, actions, projets,
organisations membres et fiches, gouvernance, documents institutionnels,
partenariats, opportunités, adhésion, contact et confidentialité. Les statuts et le
règlement intérieur sont disponibles au téléchargement sur la page ressources.

Les documents de travail internes restent hors du dépôt : voir `.gitignore`.
Les copies destinées à la publication sont dans `site_web/public/assets/documents/`.
