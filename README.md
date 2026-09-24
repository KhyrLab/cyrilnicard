# Site personnel — version GitHub Pages

Cette version est entièrement statique et fonctionne sur GitHub Pages. Elle est pensée pour téléphone, tablette et ordinateur.

## Avant publication

1. Ouvre `site-config.js`.
2. Remplace les deux chaînes vides par tes URL Tipeee et Patreon :

```js
const SUPPORT_LINKS = {
  tipeee: "https://www.tipeee.com/ton-compte",
  patreon: "https://www.patreon.com/ton-compte"
};
```

Tant que ces URL restent vides, les cartes Tipeee/Patreon sont visibles mais volontairement non cliquables.

## Publication GitHub Pages

Dépose le contenu de ce dossier à la racine d’un dépôt GitHub, puis active : **Settings → Pages → Deploy from a branch → main → /(root)**.

## Structure

- `index.html` : accueil
- `projets/` : pages détaillées des projets
- `photos/` : photos en grand + légendes
- `recettes/` : ingrédients et préparation
- `game-of-life/` : ancien mini-projet JavaScript
- `site-config.js` : liens Tipeee / Patreon
- `styles.css` : mise en page partagée

L’ancienne adresse e-mail n’est plus présente. LinkedIn est conservé.


## Variante bleue
Cette version applique une palette plus bleue, tout en gardant la même structure mobile-first et les mêmes contenus.
