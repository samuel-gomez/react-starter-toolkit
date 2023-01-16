Feature: Playground Table
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant Table

  @RG1
  Scenario Outline: Affichage du playground Table
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J’accède à la page démo du Table
    Then un titre "Table playground" est visible
    And un lien "Guidelines" est visible avec un href "https://axaguildev.github.io/design-system/molecules/table/"
    And un lien "Storybook" est visible avec un href "https://axaguildev.github.io/react-toolkit/latest/storybook/?path=/story/table-table--simple"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.0.0/packages/table"
    And un bouton "Edit props" est visible
    And un texte "Prénom" est visible

    Examples:
      | profil |
      | Admin  |
      | User   |

