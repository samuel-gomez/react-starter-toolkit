Feature: Consultation des membres

  @RG1
  Scenario Outline: Affichage de la liste des membres
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    And la page reçoit les membres suivants
      | _id | firstname | lastname | birthdate           | sexe |
      | 1   | Samuel    | Gomez    | 1983-10-20T00:00:00 | M    |
      | 2   | John      | Doe      | 1978-10-20T00:00:00 | M    |
      | 3   | Guillaume | Chervet  | 1985-10-20T00:00:00 | M    |
      | 4   | Sophie    | Danneels | 1992-10-20T00:00:00 | F    |
    When J'accède à la page des membres
    Then la page contient un tableau répertoriant la liste des membres
    And le tableau présente des entêtes de colonnes dans l’ordre suivant : "Nom", "Prénom", "Date de naissance", "Sexe"
    And le tableau contient 4 lignes correspondant à un sociétaire avec 4 colonnes dans l'ordre suivant :
      | firstname | lastname | birthdate  | sexe |
      | Samuel    | Gomez    | 20/10/1983 | M    |
      | John      | Doe      | 20/10/1978 | M    |
      | Guillaume | Chervet  | 20/10/1985 | M    |
      | Sophie    | Danneels | 20/10/1992 | F    |

    Examples:
      | profil |
      | Admin  |
      | User   |