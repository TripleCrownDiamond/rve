# Site public du RVE-Bénin

Site vitrine du Réseau Voix EssentiELLES Bénin. Il utilise React, TypeScript, Vite et Tailwind CSS. Les couleurs, polices et composants suivent la charte graphique du réseau.

## Lancer le site

```bash
npm install
npm run dev
```

Le serveur local indique son adresse au démarrage. `npm run lint` vérifie les types et `npm run build` produit les fichiers statiques dans `dist/`.

## Pages disponibles

Accueil, réseau, gouvernance, six domaines d’intervention, actualités et articles, projets, agenda, annuaire et fiches des organisations membres, opportunités, ressources, partenariats, adhésion, contact et confidentialité. Les documents institutionnels publiables sont dans `public/assets/documents/`.

## Formulaires et espace membre

Les formulaires de contact, de partenariat et d’adhésion contrôlent les champs dans le navigateur et préparent un e-mail à l’adresse du Secrétariat exécutif. Le visiteur doit confirmer l’envoi dans son application de messagerie. Aucun message n’est conservé par ce site statique.

Les routes `/connexion` et `/admin` affichent une page d’information. Un espace membre ne pourra être ouvert qu’avec une authentification et un stockage côté serveur. Les informations absentes des fiches membres et les annonces non validées ne sont pas inventées.

## Déploiement

La racine du projet Vercel doit être `site_web`, la commande de build `npm run build` et le répertoire de sortie `dist`. Les URL internes utilisent le fragment `/#/` pour fonctionner sur un hébergement statique sans règle de réécriture.
