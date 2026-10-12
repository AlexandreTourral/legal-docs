# legals-doc

Site statique (Astro) regroupant les documents légaux de mes projets.

URL : `https://<user>.github.io/<nom-du-repo>/<projet>/<document>`

## Ajouter un projet

1. Créer `projects/<projet>/project.json` :
   ```json
   { "name": "Mon App", "description": "Optionnel" }
   ```
2. Ajouter un fichier Markdown par document, par ex. `projects/<projet>/cgv.md` → `/<nom-du-repo>/<projet>/cgv` :
   ```md
   ---
   title: Conditions générales de vente
   updatedAt: 2026-10-12
   order: 3   # optionnel, ordre d'affichage
   ---

   ## Article 1
   ...
   ```
3. Commit + push sur `main` : le site est redéployé automatiquement.

Le frontmatter et `project.json` sont **facultatifs** : un `.md` brut suffit.
- Titre = premier `# Titre` du fichier, date = ligne `Dernière mise à jour : 12 octobre 2026` (ces deux lignes ne sont pas dupliquées dans la page).
- Sans `project.json`, le nom du projet est le nom du dossier (`singularity` → « Singularity »).
- Les liens `[CGU](conditions-generales-utilisation.md)` sont convertis en URL du site (alias dans `plugins/remark-legal-docs.mjs`).
- Ordre par défaut : `ml`, `cgu`, `cgv`, `pu`, `pc`, `cookies` (surchargeable avec `order`).

Le plus simple : dupliquer `projects/exemple/`.

## Développement

```bash
npm install
npm run dev      # http://localhost:4321/legal-docs/
npm run build    # génère dist/
```

## Déploiement (une seule fois)

1. Créer le repo GitHub (son nom = le chemin dans l'URL ; le site s'adapte automatiquement si tu le renommes).
2. Settings → Pages → Source : **GitHub Actions**.
