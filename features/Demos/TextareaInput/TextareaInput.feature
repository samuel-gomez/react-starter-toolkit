Feature: Playground TextareaInput
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant TextareaInput

  @RG1
  Scenario Outline: Affichage du playground TextareaInput
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J’accède à la page démo du TextareaInput
    Then un titre "TextareaInput playground" est visible
    And un lien "Guidelines" est visible avec un href "https://axaguildev.github.io/design-system/molecules/form-textarea/"
    And un lien "Storybook" est visible avec un href "https://axaguildev.github.io/react-toolkit/latest/storybook/?path=/story/form-input-textarea--textarea"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.0.0/packages/Form/Input/textarea"
    And un bouton "Edit props" est visible
    And un label "My Label for textarea" est visible

    Examples:
      | profil |
      | Admin  |
      | User   |

  @RG3
  Scenario Outline: Affichage/masquage du helpButton
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J’accède à la page démo du TextareaInput
    Then un bouton Help est masqué
    When je clique sur le bouton "Edit props"
    Then un éditeur de propriété est visible
    And un champ checkbox toggle "helpButton" avec le label "helpButton" non sélectionné
    When je clique sur la checkbox "helpButton"
    Then un champ checkbox toggle "helpButton" avec le label "helpButton" sélectionné
    And un bouton Help est visible
    When je clique sur la checkbox "helpButton"
    Then un champ checkbox toggle "helpButton" avec le label "helpButton" non sélectionné
    And un bouton Help est masqué

    Examples:
      | profil |
      | Admin  |
      | User   |