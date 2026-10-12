# legals-doc

Site statique (Astro) regroupant les documents légaux de mes projets.

URL : `https://<user>.github.io/legals-doc/<projet>/<document>`

## Ajouter un projet

1. Créer `projects/<projet>/project.json` :
   ```json
   { "name": "Mon App", "description": "Optionnel" }
   ```
2. Ajouter un fichier Markdown par document, par ex. `projects/<projet>/cgv.md` → `/legals-doc/<projet>/cgv` :
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

Le plus simple : dupliquer `projects/exemple/`.

## Développement

```bash
npm install
npm run dev      # http://localhost:4321/legals-doc/
npm run build    # génère dist/
```

## Déploiement (une seule fois)

1. Créer le repo GitHub **`legals-doc`** (le nom du repo = le chemin dans l'URL).
2. Settings → Pages → Source : **GitHub Actions**.
