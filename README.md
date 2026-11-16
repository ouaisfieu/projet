# Dictionnaire de la crise budgétaire belge

Site statique (Jekyll) publié sur <https://ouaisfieu.github.io/projet/>.

Un dictionnaire encyclopédique de la crise budgétaire belge de 2025-2026 : 49 notices sourcées sur les acteurs, les institutions, les notions et les procédures, du fédéral aux communes et au cadre européen, avec une chronologie et un tableau de chiffres clés. Information arrêtée au 16 novembre 2026.

## Publier

Le site est conçu pour la génération native de GitHub Pages, sans étape de build à maintenir :

1. *Settings → Pages → Build and deployment* : source **Deploy from a branch**, branche `main`, dossier `/ (root)`.
2. Chaque `push` sur `main` régénère le site.

Le chemin `/projet` est déclaré dans `_config.yml` (`baseurl`). Si le dépôt change de nom, adapter cette valeur.

## Travailler en local

```sh
bundle install
bundle exec jekyll serve
# http://localhost:4000/projet/
```

## Organisation

| Emplacement | Contenu |
|---|---|
| `_notices/*.md` | Une notice par fichier (Markdown + en-tête YAML) |
| `_data/sources.yml` | Registre des sources, référencées par clé dans les notices |
| `_data/chronologie.yml` | Jalons de la chronologie |
| `_data/chiffres.yml` | Chiffres clés (page « Chiffres » et accueil) |
| `_data/categories.yml` | Rubriques |
| `_layouts/` | Gabarits (`default`, `page`, `notice`) |
| `assets/` | Feuille de style, recherche locale, icône |
| `search.json` | Index de recherche généré par Jekyll |

## Ajouter ou modifier une notice

Créer `_notices/mon-identifiant.md` :

```yaml
---
title: "Titre de la notice"
slug: mon-identifiant        # identique au nom du fichier
lettre: T                    # initiale pour l'index alphabétique
categorie: notions           # un identifiant de _data/categories.yml
alias: ["Autre nom"]         # facultatif
resume: "Définition en une phrase."
voir: [autre-notice]         # renvois (identifiants de notices)
sources: [cle-de-source]     # clés de _data/sources.yml
maj: 2026-11-16              # date de mise à jour
---
```

Le corps est en Markdown. Les liens vers une autre notice s'écrivent en relatif : `[kern](../kern/)`.

Pour mettre à jour la date d'arrêt de l'information affichée sur le site, modifier `edition` et `edition_iso` dans `_config.yml`, ainsi que l'encadré « État au… » de `index.html`.

## Principes éditoriaux

- Une définition courte, valable hors contexte, puis un développement daté.
- Chiffres donnés avec leur périmètre, leur date et l'institution qui les produit.
- Positions des acteurs attribuées, non arbitrées ; même traitement pour tous les partis.
- Sources listées au bas de chaque notice.

Voir la page « À propos » du site pour la méthode et les limites.
