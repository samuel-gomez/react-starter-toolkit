Feature: Playground Action
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant Action

  @RG1
  Scenario Outline: Affichage du playground Action
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J’accède à la page démo du Action
    Then un titre "Action playground" est visible
    And un lien "Storybook" est visible avec un href "https://axaguildev.github.io/react-toolkit/latest/storybook/?path=/story/action-action--link"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.0.0/packages/action"
    And un bouton "Edit props" est visible

    Examples:
      | profil |
      | Admin  |
      | User   |