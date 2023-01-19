Feature: Playground Stepper
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant Stepper

  @RG1
  Scenario Outline: Affichage du playground Stepper
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J’accède à la page démo du Stepper
    Then un titre "Stepper playground" est visible
    And un lien "Guidelines" est visible avec un href "https://axaguildev.github.io/design-system/molecules/stepper/"
    And un lien "Storybook" est visible avec un href "https://axaguildev.github.io/react-toolkit/latest/storybook/?path=/story/form-steps--new-design-steps"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.0.0/packages/Form/steps"
    And un bouton "Edit props" est visible
    And un texte "Final step" est visible

    Examples:
      | profil |
      | Admin  |
      | User   |

  @RG2
  Scenario Outline: Sélection d'un icone
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J’accède à la page démo du Stepper
    And je clique sur le bouton "Edit props"
    Then un éditeur de propriété est visible
    When Je sélectionne la valeur "<icon>" sur le champ "step4Icon"
    Then un icone "<icon>" est visible

    Examples:
      | profil | icon  |
      | Admin  | close |
      | User   | close |