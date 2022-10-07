# Script de nettoyage

## Clean github / CI

- [ ] Suppression du dossier .git
- [ ] Suppression du dossier .github
- [ ] Suppression du fichier netlify.toml
- [ ] Suppression ou modification du fichier LICENCE.md
- [ ] Suppression du fichier renovate.json

## Clean de la démo

### Config

- [ ] .env : modifier le port
- [ ] Dans le fichier shared/constants.ts, redéfinir les profils déclarés pour l’accès à l’application (authorized = PROFILS dans le fichier Routes.tsx) et ne pas oublier de supprimer le profil ‘ALL’

### Menu

- [ ] Supprimer les liens de la démo (src/Layout/Menu/constants.ts)

### Routes

- [ ] Modifier le fichier de Routes et supprimer les routes de la démo (src/App/Routes/Routes.tsx)
- [ ] Supprimer les imports inutiles des constantes URL : src/App/Routes/constants.ts
- [ ] Fixer le fichier de test src/App/Routes/**tests**/Routes.test.tsx (en fonction des routes supprimées ou ajoutées)

### Pages

- [ ] Suppression des features de la démo features/Demos
- [ ] Suppression du dossier src/pages/Demos

### Shared components

- [ ] Suppression du dossier src/shared/images
- [ ] Suppression du dossier src/shared/components/LiveCode
- [ ] Suppression du dossier src/shared/components/Cards
- [ ] Suppression du dossier src/shared/components/LasyImage
- [ ] Suppression du dossier src/shared/components/DownloadLink
- [ ] Suppression du dossier src/shared/components/Editor

### Assets

- [ ] Changer l’image du header par le logo Axa import logo from '@axa-fr/react-toolkit-core/dist/assets/logo-axa.svg'; dans src/Layout/Header/Header.tsx
- [ ] Dossier Public
  - [ ] Suppression du fichier public/\_redirect
  - [ ] Modifier la configuration du fichier public/environment.production.local.json
  - [ ] Changer le favicon pour celui d’Axa
  - [ ] Modifier les fichiers logo192.png et logo512.png
  - [ ] Modifier le manifest : changer le nom, supprimer les objets des images supprimées
  - [ ] Modifier le fichier index.html : le title et les métadonnées
  - [ ] Supprimer le dossier public/templates

### Docs

- [ ] docs/CLEAN.md : supprimer le fichier
- [ ] README.md : adapter le contenu
- [ ] Nettoyer le fichier de constantes : src/shared/constants.ts

### Package.json :

- [ ] Packages supprimés
  - [ ] prism-react-renderer
  - [ ] react-live
  - [ ] downloadjs
  - [ ] @uiw/react-textarea-code-editor
  - [ ] @types/downloadjs
  - [ ] prism-react-renderer
  - [ ] react-draggable
  - [ ] react-live
