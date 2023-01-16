Feature: Playground FooterClient
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant FooterClient

  @RG1
  Scenario Outline: Affichage du playground FooterClient
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J’accède à la page démo du FooterClient
    Then un titre "FooterClient playground" est visible
    And un lien "Guidelines" est visible avec un href "https://axaguildev.github.io/design-system/organisms/footer-client/"
    And un lien "Storybook" est visible avec un href "https://axaguildev.github.io/react-toolkit/latest/storybook/?path=/story/layout-footerclient--complex"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.0.0/packages/Layout/footer-client"
    And un bouton "Edit props" est visible
    And un texte "Policy Privacy © 2022 AXA All Rights Reserved" est visible

    Examples:
      | profil |
      | Admin  |
      | User   |