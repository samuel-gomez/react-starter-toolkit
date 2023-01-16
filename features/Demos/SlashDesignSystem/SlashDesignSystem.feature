Feature: Page SlashDesignSystem
  En tant que profil autorisé, je souhaite pouvoir afficher la page SlashDesignSystem

  @RG1
  Scenario Outline: Affichage de la page SlashDesignSystem
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J'accède à la page SlashDesignSystem
    Then un titre "Liste des composants" est visible
    And un titre "Champ texte" est visible
    And un titre "Champ textarea" est visible
    And un titre "Champ file" est visible
    And un titre "Accordion" est visible
    And un titre "Modal" est visible
    And un titre "Alert" est visible
    And un titre "Badge" est visible
    And un titre "Popover" est visible
    And un titre "Slider" est visible
    And un titre "Table" est visible
    And un titre "Tabs" est visible
    And un titre "Button" est visible
    And un titre "Menu" est visible
    And un titre "List" est visible
    And un titre "Checkbox classic" est visible
    And un titre "Checkbox-card" est visible
    And un titre "Radio-card" est visible
    And un titre "Steps" est visible
    And un titre "Number" est visible
    And un titre "Select-multi" est visible
    And un titre "Pass" est visible
    And un titre "Date" est visible
    And un titre "Toggle" est visible

    Examples:
      | profil |
      | Admin  |
      | User   |
