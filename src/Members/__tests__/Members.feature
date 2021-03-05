Feature: Consultation des sociétaires

  @RG1
  Scenario: Affichage de la liste des sociétaires
    Given Je suis un utilisateur connu et connecté
    When J’accède à la page des sociétaires
    Then la page contient un tableau répertoriant la liste des sociétaires
    And le tableau présente 4 colonnes dans l’ordre suivant : ’Nom’, ‘Prénom’, ‘Date de naissance’, ‘sexe’
    And le tableau contient 1 ligne correspondant à un sociétaire avec 4 colonnes dans l’ordre suivant :’Samuel’, ‘Gomez’, ‘20/10/1985’, ‘M’
