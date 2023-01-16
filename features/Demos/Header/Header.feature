Feature: Playground Header
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant Header

  @RG1
  Scenario Outline: Affichage du playground Header
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J’accède à la page démo du Header
    Then un titre "Header playground" est visible
    And un lien "Storybook" est visible avec un href "https://axaguildev.github.io/react-toolkit/latest/storybook/?path=/story/layout-header-header--with-name-infos"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.0.0/packages/Layout/header"
    And un bouton "Edit props" est visible
    And un texte "Toolkit React Starter" est visible

    Examples:
      | profil |
      | Admin  |
      | User   |