# Site personnel — version GitHub Pages

Ce site est entièrement statique et fonctionne sur GitHub Pages, sans framework ni étape de compilation. Il est responsive pour téléphone, tablette et ordinateur.

## Structure principale

- `index.html` : accueil en français.
- `en/index.html` : accueil en anglais.
- `projets/`, `photos/`, `recettes/` : pages détaillées françaises.
- `en/projets/`, `en/photos/`, `en/recettes/` : traductions anglaises correspondantes.
- `game-of-life/game.js` : simulation moderne du Jeu de la vie intégrée dans `projets/programmation.html` et sa version anglaise.
- `game-of-life/index.html` + anciens fichiers JS : version historique conservée dans l’archive.
- `site-config.js` : liens Tipeee / Patreon partagés par les deux langues.
- `site.js` : menu mobile et mise en évidence de la rubrique visible.
- `styles.css` : styles partagés, navigation et interface du Jeu de la vie.

## Liens de soutien

Les URL Tipeee et Patreon sont centralisées dans `site-config.js` :

```js
const SUPPORT_LINKS = {
  tipeee: "https://fr.tipeee.com/khyrlab/",
  patreon: "https://www.patreon.com/cw/Khyrlab"
};
```

## Jeu de la vie

La page `projets/programmation.html` contient maintenant la simulation directement dans la page : lecture/pause, pas-à-pas, vitesse, bords reliés, palettes de couleurs, génération/population, placement et rotation de plusieurs motifs. La version anglaise est disponible dans `en/projets/programmation.html`.

## Publication GitHub Pages

Dépose le contenu de ce dossier à la racine du dépôt GitHub puis active : **Settings → Pages → Deploy from a branch → main → /(root)**.

Aucune dépendance, commande npm ou génération n’est nécessaire.
