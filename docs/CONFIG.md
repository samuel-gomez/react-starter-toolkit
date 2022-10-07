# Configuration (manuelle)

### Config générale

- [ ] .env : modifier le port souhaité
- [ ] Dans le fichier shared/constants.ts,
  - redéfinir les profils déclarés pour l’accès à l’application (authorized = PROFILS dans le fichier Routes.tsx)
  - ne pas oublier de supprimer le profil ‘ALL’
- [ ] Modifier la configuration du fichier public/environment.production.local.json
- [ ] Modifier la configuration du fichier public/environment.production.json
- [ ] Modifier la configuration du fichier public/environment.development.json
- [ ] Modifier le manifest : changer le nom, supprimer les objets des images supprimées
- [ ] Modifier le fichier index.html : le title et les métadonnées
- [ ] README.md : adapter le contenu au projet

### Package.json

- [ ] Modifier le nom du projet
- [ ] Modifier la version
- [ ] Modifier la description
- [ ] Modifier l'auteur
- [ ] Modifier l’url du repository
- [ ] husky (adapter en fonction de la structure du projet)
  - [ ] prepare": "cd ../.. && husky install Sources/client/.husky",
  - [ ] Ne pas oublier d’ajouter la commande « cd Sources/client » en haut des scripts situés dans .husky
