Feature: Menu d'accès rapide
  En tant que profil autorisé, je souhaite avoir un menu d'accès rapide

  @RG1
  Scenario Outline: Menu d'accès rapide
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When Je suis sur l'application
    Then un menu d'accès rapide est présent

    Examples:
      | profil |
      | Admin  |
      | User   |
