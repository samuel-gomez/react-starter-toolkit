Feature: Playground Help
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant Help

  @RG1
  Scenario Outline: Affichage du playground Help
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J’accède à la page démo du Help
    Then un titre "Help playground" est visible
    And un lien "Storybook" est visible avec un href "https://axaguildev.github.io/react-toolkit/latest/storybook/?path=/story/help--text-story"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.0.0/packages/help"
    And un bouton "Edit props" est visible
    And un bouton d'aide "i" est visible

    Examples:
      | profil |
      | Admin  |
      | User   |