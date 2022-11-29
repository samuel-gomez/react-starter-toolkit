Feature: Playground NumberInput
  En tant que profil autorisé, je souhaite pouvoir configurer le composant NumberInput

  @RG1
  Scenario Outline: Affichage du playground NumberInput
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J'accède à la page playground NumberInput
    Then un titre "Demo NumberInput" est visible
    And un titre "NumberInput playground" est visible
    And un lien "Guidelines" est visible avec un href "https://axaguildev.github.io/design-system/molecules/form-text/"
    And un lien "Storybook" est visible avec un href "https://axaguildev.github.io/react-toolkit/latest/storybook/?path=/story/form-input-number--number"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.0.0/packages/Form/Input/number"
    And un bouton "Edit props" est visible
    And un label "My number" est visible
    And un champ texte "number-field" est visible avec la valeur "5", un placeholder "Ex: Samuel"
    And un message "Enter your number" est visible avec la classe : "af-form__help"
    And un bouton "Copy to clipboard" est visible
    And un code du composant "NumberInput" est visible

    Examples:
      | profil |
      | Admin  |
      | User   |

  @RG2
  Scenario Outline: Modification des propriétés du champ input
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J'accède à la page playground NumberInput
    And je clique sur le bouton "Edit props"
    Then un éditeur de propriété est visible
    And un champ texte "value" est visible avec la valeur "5"
    When je saisie "<value>" dans le champ "value"
    And je saisie "name-field" dans le champ "name"
    And je saisie "monid" dans le champ "id"
    And je saisie "<className>" dans le champ "className"
    And je saisie "<modifier>" dans le champ "classModifier"
    And je saisie "<placeholder>" dans le champ "placeholder"
    And je clique sur la checkbox "autoFocus"
    Then un champ texte "name-field" a le focus
    And un champ texte "name-field" est visible avec les propriétés : "<expectedValue>", "<expectedId>", "<expectedClass>", "<expectedPlaceholder>"

    Examples:
      | profil | value | placeholder | className | modifier | expectedValue | expectedPlaceholder | expectedId | expectedClassWrapper                            | expectedClass                                     |
      | Admin  | 459   |             |           |          | 459           | Ex: Samuel          | monid      | row af-form__group                              | af-form__input-text af-form__input-text--required |
      | User   | 322   | Ex: 5       |           |          | 322           | Ex: 5               | monid      | row af-form__group                              | af-form__input-text af-form__input-text--required |
      | User   | aaa   |             |           |          | aaa           | Ex: Samuel          | monid      | row af-form__group                              | af-form__input-text af-form__input-text--required |
      | Admin  | 459   | Ex: 5       | myClass   |          | 459           | Ex: 5               | monid      | myClass                                         | af-form__input-text af-form__input-text--required |
      | User   | 322   |             | myClass   |          | 322           | Ex: Samuel          | monid      | myClass                                         | af-form__input-text af-form__input-text--required |
      | User   | aaa   |             | myClass   |          | aaa           | Ex: Samuel          | monid      | myClass                                         | af-form__input-text af-form__input-text--required |
      | Admin  | 459   | Ex: 5       |           | other    | 459           | Ex: 5               | monid      | row af-form__group row af-form__group--required | af-form__input-text af-form__input-text--other    |
      | User   | 322   |             |           | other    | 322           | Ex: Samuel          | monid      | row af-form__group row af-form__group--required | af-form__input-text af-form__input-text--other    |
      | User   | aaa   |             |           | other    | aaa           | Ex: Samuel          | monid      | row af-form__group row af-form__group--required | af-form__input-text af-form__input-text--other    |

  @RG3
  Scenario Outline: Affichage/masquage du helpButton
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J'accède à la page playground NumberInput
    Then un bouton Help est masqué
    When je clique sur le bouton "Edit props"
    Then un éditeur de propriété est visible
    And un champ checkbox toggle "helpButton" avec le label "helpButton" non sélectionné
    When je clique sur la checkbox "helpButton"
    Then un champ checkbox toggle "helpButton" avec le label "helpButton" sélectionné
    And un bouton Help est visible
    When je clique sur la checkbox "helpButton"
    Then un champ checkbox toggle "helpButton" avec le label "helpButton" non sélectionné
    And un bouton Help est masqué

    Examples:
      | profil |
      | Admin  |
      | User   |

  @RG4
  Scenario Outline: Activation/desactivation du champ input
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J'accède à la page playground NumberInput
    And je clique sur le bouton "Edit props"
    Then un éditeur de propriété est visible
    And un champ checkbox toggle "disabled" avec le label "disabled" non sélectionné
    When je clique sur la checkbox "disabled"
    Then un champ checkbox toggle "disabled" avec le label "disabled" sélectionné
    And un champ texte "number-field" est désactivé
    When je clique sur la checkbox "disabled"
    Then un champ checkbox toggle "disabled" avec le label "disabled" non sélectionné
    And un champ texte "number-field" est activé

    Examples:
      | profil |
      | Admin  |
      | User   |

  @RG5
  Scenario Outline: Requis/optionnel du champ input
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J'accède à la page playground NumberInput
    And je clique sur le bouton "Edit props"
    Then un éditeur de propriété est visible
    And un champ checkbox toggle "required" avec le label "required" non sélectionné
    When je clique sur la checkbox "required"
    Then un champ checkbox toggle "required" avec le label "required" sélectionné
    And un champ texte "number-field" est requis
    When je clique sur la checkbox "required"
    Then un champ checkbox toggle "required" avec le label "required" non sélectionné
    And un champ texte "number-field" est optionnel

    Examples:
      | profil |
      | Admin  |
      | User   |


  @RG6
  Scenario Outline: ReadOnly/editable du champ input
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J'accède à la page playground NumberInput
    And je clique sur le bouton "Edit props"
    Then un éditeur de propriété est visible
    And un champ checkbox toggle "readOnly" avec le label "readOnly" non sélectionné
    When je clique sur la checkbox "readOnly"
    Then un champ checkbox toggle "readOnly" avec le label "readOnly" sélectionné
    And un champ texte "number-field" est en lecture seule
    When je clique sur la checkbox "readOnly"
    Then un champ checkbox toggle "readOnly" avec le label "readOnly" non sélectionné
    And un champ texte "number-field" est éditable

    Examples:
      | profil |
      | Admin  |
      | User   |

  @RG7
  Scenario Outline: Affichage/masquage du champ input
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J'accède à la page playground NumberInput
    Then un champ texte "number-field" est visible avec la valeur "5", un placeholder "Ex: Samuel"
    When je clique sur le bouton "Edit props"
    Then un éditeur de propriété est visible
    And un champ checkbox toggle "isVisible" avec le label "isVisible" sélectionné
    When je clique sur la checkbox "isVisible"
    Then un champ checkbox toggle "isVisible" avec le label "isVisible" non sélectionné
    And un champ texte "number-field" est masqué
    When je clique sur la checkbox "isVisible"
    Then un champ checkbox toggle "isVisible" avec le label "isVisible" sélectionné
    And un champ texte "number-field" est visible avec la valeur "5", un placeholder "Ex: Samuel"

    Examples:
      | profil |
      | Admin  |
      | User   |
  @RG8
  Scenario Outline: Gestion des erreurs du champ input
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J'accède à la page playground NumberInput
    And je clique sur le bouton "Edit props"
    Then un éditeur de propriété est visible
    And un champ texte "message" est visible avec la valeur ""
    When je saisie "<message>" dans le champ "message"
    And je clique sur la checkbox "forceDisplayMessage"
    And Je sélectionne la valeur "<type>" sur le champ "messageType"
    Then un champ texte "number-field" est visible et son wrapper a la classe : "<expectedWrapperInputClass>"
    And un message "<expectedDisplayMessage>" est visible avec la classe : "<expectedDisplayMessageClass>"

    Examples:
      | profil | message          | type    | expectedWrapperInputClass                                    | expectedDisplayMessage | expectedDisplayMessageClass |
      | Admin  |                  | warning | af-form__text                                                | Enter your number      | af-form__help               |
      | User   |                  | success | af-form__text                                                | Enter your number      | af-form__help               |
      | User   |                  | error   | af-form__text                                                | Enter your number      | af-form__help               |
      | Admin  | myMessageWarning | warning | af-form__text af-form__text--required af-form__text--warning | myMessageWarning       | af-form__warning-text       |
      | User   | myMessageError   | error   | af-form__text af-form__text--required af-form__text--error   | myMessageError         | af-form__error-text         |
      | User   | myMessageSuccess | success | af-form__text af-form__text--required af-form__text--success | myMessageSuccess       | af-form__success-text       |

  @RG9
  Scenario Outline: Modification du label
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J'accède à la page playground NumberInput
    And je clique sur le bouton "Edit props"
    Then un éditeur de propriété est visible
    When je clique sur le bouton "Edit label"
    Then une modal apparait avec le titre "Saisir la value de label"
    And un champ texte "jsx-code-editor" est visible avec la valeur "My number"
    When je clique sur le bouton icone "Suppression du code"
    And je clique sur le bouton icone "Ajout du code H1"
    Then un label "sample title" est visible

    Examples:
      | profil | message | type    | expectedWrapperInputClass | expectedDisplayMessage | expectedDisplayMessageClass |
      | Admin  |         | warning | af-form__text             | Enter your number      | af-form__help               |
      | User   |         | success | af-form__text             | Enter your number      | af-form__help               |