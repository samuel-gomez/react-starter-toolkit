Feature: Modal Custom
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant Modal Custom

  @RG1
  Scenario Outline: Affichage de la démo Modal Custom
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J’accède à la page démo Modal Custom
    Then un titre "Custom Modal" est visible
    And un bouton "Click me to launch modal" est visible

    Examples:
      | profil |
      | Admin  |
      | User   |