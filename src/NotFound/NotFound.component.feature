Feature: Chargement de la page NotFound
 
Scenario: Chargement de la page 404
  Given Je suis un utilisateur accédant à une page inconnue
  When Je suis redirigé sur cette page
  Then La page m'affiche un titre "404notfound"
  And La page m'affiche le contenu suivant "The page you are looking for is not here!"
  