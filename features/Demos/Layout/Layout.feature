Feature: Playground Layout
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant Layout

  @RG1
  Scenario Outline: Affichage du playground Layout
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J’accède à la page démo du Layout
    Then un titre "Layout playground" est visible
    And un bouton "Edit props" est visible
    And un texte "Lorem ipsum" est visible

    Examples:
      | profil |
      | Admin  |
      | User   |