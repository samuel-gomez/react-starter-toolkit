Feature: Playground SelectMulti
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant SelectMulti

  @RG1
  Scenario Outline: Affichage du playground SelectMulti
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J’accède à la page démo du SelectMulti
    Then un titre "SelectMulti playground" est visible
    And un lien "Guidelines" est visible avec un href "https://axaguildev.github.io/design-system/form-select/"
    And un lien "Storybook" est visible avec un href "https://axaguildev.github.io/react-toolkit/latest/storybook/?path=/story/form-input-selectmulti--multiselect"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.0.0/packages/Form/Input/select-multi"
    And un bouton "Edit props" est visible
    And un texte "My Label Select-multi" est visible

    Examples:
      | profil |
      | Admin  |
      | User   |
