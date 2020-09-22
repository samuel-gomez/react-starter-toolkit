Feature: Chargement de la page 403
 
Scenario: Chargement de la page 403
  Given Je suis un utilisateur accédant à une page non autorisée
  When Je suis redirigé sur cette page
  Then La page m'affiche un titre "403notauthorized"
  And La page m'affiche le contenu suivant "The page you are looking for is forbidden !"
  