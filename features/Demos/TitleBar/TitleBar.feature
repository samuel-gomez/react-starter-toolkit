Feature: Playground TitleBar
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant TitleBar

  @RG1
  Scenario Outline: Affichage du playground TitleBar
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J’accède à la page démo du TitleBar
    Then un titre "TitleBar playground" est visible
    And un lien "Storybook" est visible avec un href "https://axaguildev.github.io/react-toolkit/latest/storybook/?path=/story/layout-header-title--default"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.0.0/packages/Layout/header/src/Title"
    And un bouton "Edit props" est visible
    And un titre "Demo Titlebar" est visible

    Examples:
      | profil |
      | Admin  |
      | User   |
