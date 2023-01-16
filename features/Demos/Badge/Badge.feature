Feature: Playground Badge
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant Badge

  @RG1
  Scenario Outline: Affichage du playground Badge
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J’accède à la page démo du Badge
    Then un titre "Badge playground" est visible
    And un lien "Guidelines" est visible avec un href "https://axaguildev.github.io/design-system/atoms/badge/"
    And un lien "Storybook" est visible avec un href "https://axaguildev.github.io/react-toolkit/latest/storybook/?path=/story/badge--badge-story"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.0.0/packages/badge"
    And un bouton "Edit props" est visible
    And un texte "my badge" est visible

    Examples:
      | profil |
      | Admin  |
      | User   |