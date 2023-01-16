Feature: Playground Alert
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant Alert

  @RG1
  Scenario Outline: Affichage du playground Alert
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J’accède à la page démo du Alert
    Then un titre "Alert playground" est visible
    And un bouton de fermeture est visible
    And un lien "Guidelines" est visible avec un href "https://axaguildev.github.io/design-system/molecules/alert/"
    And un lien "Storybook" est visible avec un href "https://axaguildev.github.io/react-toolkit/latest/storybook/?path=/story/alert-alert--default"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.0.0/packages/alert"
    And un bouton "Edit props" est visible
    And un texte "Attention : des informations sont manquantes" est visible

    Examples:
      | profil |
      | Admin  |
      | User   |

  @RG2
  Scenario Outline: Affichage/masquage du closeButton
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J’accède à la page démo du Alert
    And un bouton de fermeture est visible
    And je clique sur le bouton "Edit props"
    Then un éditeur de propriété est visible
    And un champ checkbox toggle "toggleOnCloseProps" avec le label "toggleOnCloseProps" sélectionné
    When je clique sur la checkbox "toggleOnCloseProps"
    Then un champ checkbox toggle "toggleOnCloseProps" avec le label "toggleOnCloseProps" non sélectionné
    And un bouton de fermeture est masqué

    Examples:
      | profil |
      | Admin  |
      | User   |