# Structure de l'application

## Fichiers à la racine du projet

```
├─── /
│   ├─── .editorconfig (Fichier de configuration pour l'IDE)
│   ├─── .env (Constantes d'environnement)
│   ├─── .eslintrc (Règles Eslint)
│   ├─── .npmrc (Constantes pour npm)
│   ├─── .prettierrc (Configuration pour Prettier)
│   ├─── app.code-workspace (Fichier de personnalisation de l'espace de travail pour VSCode)
│   ├─── LICENSE (Fichier de licence)
│   ├─── README.md (Fichier de description générale de l'application)
│   ├─── sonar-project.properties (Fichier de configuration pour Sonar)
│   ├─── tsconfig.json (Fichier de configuration pour Typescript)
│   ├─── package.json (Scripts, dependances, config Jest, config Commitlint, ...)
```

## .husky

Ce dossier contient les scripts qui seront exécutés en pre-commit

## .vscode

Ce dossier propose une configuration pour VSCode, vous pouvez le supprimer si vous avez votre propre configuration ou si vous utilisez un autre IDE.

## /docs

Ce dossier contient les markdowns pour la documentation.

```
├─── /docs
│   ├─── STRUCTURE.md (Fichier de documentation de la structure du projet)
│   ├─── CONFIG.md (Fichier de documentation de la configuration générale du projet)
│   ├─── CLEAN.md (Fichier de documentation du script de nettoyage de la démo)
```

## /features

Ce dossier contient les scenarios guerkins.

## /public

Ce dossier contient le fichier index.html, les fichiers d'environnement, favicon, etc ...

## /features

Ce dossier contient les scenarios guerkins.

## /src

Ce dossier contient les fichiers sources de l'application

```
├─── /src
│   ├─── index.tsx (Point d'entrée de l'application)
│   ├─── react-app-env.d.ts (déclaration de modules pour le typage)
│   ├─── setupTests.tsx (configuration de l'environnement de tests
```

### /src/App

Ce dossier contient les providers, le router et le composant App de l'application

```
├─── /App
│   ├─── /EnvironmentProvider (Récupère les informations d'environnement)
│   ├─── /FetchProvider (Customise les appels fetch avec le bearer Accestoken)
│   ├─── /NotificationProvider (Met à disposition un système de notification pour toute l'application)
│   └─── /Routes (Gestion des routes)
│   └─── /UserProvider (Met à disposition les informations de l'utilisateur connecté)
```

### /src/Layout

Ce dossier contient le système de layout et les composants associés (Header, Footer, Menu, TitleBar) de l'application

```
├─── Layout
│   ├─── /Footer (Composant de plus haut niveau basé sur le composant Footer du Toolkit)
│   ├─── /Header (Composant de plus haut niveau basé sur les composants Header, Name, User, Infos du Toolkit)
│   ├─── /Menu (Composant de plus haut niveau basé sur les composants NavBar et NavBarItem du Toolkit)
│   └─── /Title (Composant de plus haut niveau basé sur le composant HeaderTitle du Toolkit)
│   └─── Layout.tsx (Composant de layout permettant de personnaliser le layout)
```

### /src/pages

Ce dossier contient les pages de l'application

### /src/shared/

Ce dossier contient tout ce qui est commun et partagé au sein de l'application.

```
├─── /shared
│   ├─── constants.ts (Fichier où l'on met toutes les constantes partagées, notamment les profils, status, ...)
│   ├─── ...
```

### /src/shared/components

Ce dossier contient des composants partagés qui pourraient à terme être intégrés au Toolkit.

```
├─── /components
│   ├─── /Autorize (Composant permettant de gérer l'affichage d'un composant en fonction des autorisations)
│   ├─── /HelpInfo (Composant permettant de founir une info-bulle)
│   ├─── /Icons (Composant permettant d'ajouter des icones SVG autres que les icones du Toolkit)
│   └─── /Loader (Composant amélioré du composant Loader du Toolkit, en vue d'être intégré au toolkit)
│   └─── /ModalCommon (Composant de plus haut niveau basé sur le composant Modal du Toolkit)
│   └─── /Resilience (Composant permettant d'afficher une alert ou un autre composant de fallback encas d'échec d'appel Fetch)
│   └─── /ResiliencePage (Composant Layout pour les pages 404 et 403)
│   └─── /Skeleton (Composant de loading façon skeleton)
│   └─── /SkeletonInputField (Composant de loading façon skeleton pour les champs de formulaire)
│   └─── /Table (Composant de plus haut niveau basé sur le composant Table et Paging du Toolkit, il gère la pagination et le tri)
```

### /src/shared/helpers

Ce dossier contient des fonctions utilitaires.

### /src/shared/hoc

Ce dossier contient des HOC.

Ce dossier contient des fonctions utilitaires.

### /src/shared/scss

Ce dossier contient tout ce qui est lié au style commun.

```
├─── /scss
│   ├─── custom.scss (Customisation CSS ou correctifs des composants du Toolkit)
│   ├─── keyframes.scss (Animations CSS)
│   ├─── mixins.scss (Fonctions SCSS)
│   ├─── variables.scss (variables SCSS)
│   ├─── grid.css (grille Bootstrap pour éviter l'installation du package)
│   ├─── reboot.css (grille Bootstrap pour éviter l'installation du package)
```

### /src/shared/testUtils

Ce dossier contient des fonctions utilitaires pour les tests.

```
├─── /testsUtils
│   ├─── customRender.tsx (Customisation de la fonction render de Testing Library)
│   ├─── msw.tsx (Customisation de la fonction render de Testing Library)
│   ├─── sharedScenarios.ts (Liste de scenarios type pour industrialiser les guerkins)
│   ├─── ...
```
