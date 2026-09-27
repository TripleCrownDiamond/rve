# RVE-Bénin — site web

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

Maquette sans serveur. L'authentification, les commentaires et les actions
du tableau de bord sont inertes ; ils seront branchés avec la base de
données. Les écrans le signalent explicitement plutôt que de le laisser
croire.

Les documents institutionnels du réseau ne sont pas versionnés ici : voir
`.gitignore`.
