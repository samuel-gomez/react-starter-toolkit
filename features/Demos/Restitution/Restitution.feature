Feature: Playground Restitution
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant Restitution

  @RG1
  Scenario Outline: Affichage du playground Restitution
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J’accède à la page démo du Restitution
    Then un titre "Restitution playground" est visible
    And un lien "Guidelines" est visible avec un href "https://axaguildev.github.io/design-system/organisms/restitution/"
    And un lien "Storybook" est visible avec un href "https://axaguildev.github.io/react-toolkit/latest/storybook/?path=/story/restitution--default"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.0.0/packages/restitution"
    And un bouton "Edit props" est visible
    And un texte "Base de calcul des prestations" est visible

    Examples:
      | profil |
      | Admin  |
      | User   |

