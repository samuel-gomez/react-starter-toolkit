Feature: Playground Accordion
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant Accordion

  @RG1
  Scenario Outline: Affichage du playground Accordion
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J’accède à la page démo du Accordion
    Then un titre "Accordion playground" est visible
    And un lien "Guidelines" est visible avec un href "https://axaguildev.github.io/design-system/organisms/accordion/"
    And un lien "Storybook" est visible avec un href "https://axaguildev.github.io/react-toolkit/latest/storybook/?path=/story/collapse--accordion"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.0.0/packages/collapse"
    And un bouton "Edit props" est visible
    And un titre "Header 1" est visible
    And un titre "Header 2" est visible
    And un titre "Header 3" est visible

    Examples:
      | profil |
      | Admin  |
      | User   |