Feature: Playground Button
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant Button

  @RG1
  Scenario Outline: Affichage du playground Button
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J’accède à la page démo du Button
    Then un titre "Button playground" est visible
    And un lien "Guidelines" est visible avec un href "https://axaguildev.github.io/design-system/atoms/button/"
    And un lien "Storybook" est visible avec un href "https://axaguildev.github.io/react-toolkit/latest/storybook/?path=/story/button--simple-button"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.0.0/packages/button"
    And un bouton "Edit props" est visible
    And un bouton "valider" est visible

    Examples:
      | profil |
      | Admin  |
      | User   |


  @RG2
  Scenario Outline: Sélection d'un icone
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J’accède à la page démo du Button
    And je clique sur le bouton "Edit props"
    Then un éditeur de propriété est visible
    When Je sélectionne la valeur "<icon>" sur le champ "icon"
    Then un icone "<icon>" est visible

    Examples:
      | profil | icon  |
      | Admin  | close |
      | User   | close |