import { defineFeature, loadFeature } from 'jest-cucumber';
import { screen, configure } from '@testing-library/react';
import { render } from 'shared/testsUtils/customRender';
import {
  JeCliqueSurLaCheckbox,
  JeCliqueSurLeBouton,
  JeCliqueSurLeBoutonIcone,
  JeSaisieDansLeChamp,
  JeSelectionneUneValeurSurleChamp,
  JeSuisUnUtilisateurConnuEtConnecteAvecleProfil,
  UnBoutonEstVisible,
  UnBoutonHelpEstMasque,
  UnBoutonHelpEstVisible,
  UnChampCheckboxToggleAvecUnLabelEtUneValeurNonSelectionne,
  UnChampCheckboxToggleAvecUnLabelEtUneValeurSelectionne,
  UnChampTextALeFocus,
  UnChampTextEstActive,
  UnChampTextEstDesactive,
  UnChampTextEstEditable,
  UnChampTextEstEnLectureSeule,
  UnChampTextEstMasque,
  UnChampTextEstOptionnel,
  UnChampTextEstRequis,
  UnChampTextEstVisible,
  UnChampTextEstVisibleAvecLaValeurEtUnPlaceholder,
  UnChampTextEstVisibleAvecSonWrapper,
  UnCodeDecomposantEstVisible,
  UnEditeurEstVisible,
  UneModaleApparaitAvecLeTitre,
  UnLabelEstVisible,
  UnLienEstVisible,
  UnMessageEstVisibleAvecLaClass,
  UnTitreEstVisible,
} from 'shared/testsUtils/sharedScenarios';
import NumberInput from '../NumberInput';

configure({ defaultHidden: true });

const feature = loadFeature('features/Demos/NumberInput/NumberInput.feature');

const SCOPE_EDITOR = 'Edit props';
const SCOPE_PREVIEW = 'af-accessibility';
const SCOPE_CODE = 'af-accessibility-code';
const ROLE_NUMBER = 'spinbutton';

defineFeature(feature, test => {
  let role: string;

  const setRoleMock = (roleMock: string) => {
    role = roleMock;
  };

  const renderPage = async () => {
    render(<NumberInput />, {}, { role });
    expect(await screen.findByText('Samuel Gomez')).toBeInTheDocument();
  };

  /**
   * thrown: "Exceeded timeout of 5000 ms for a test.
    Use jest.setTimeout(newTimeout) to increase the timeout value, if this is a long-running test."
   */
  jest.setTimeout(10000);
  /************************* */

  test('Affichage du playground NumberInput', ({ given, and, when, then }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when("J'accède à la page playground NumberInput", renderPage);
    UnTitreEstVisible(then);
    UnTitreEstVisible(and);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnBoutonEstVisible(and);
    UnLabelEstVisible(and);
    UnChampTextEstVisibleAvecLaValeurEtUnPlaceholder(and, SCOPE_PREVIEW, ROLE_NUMBER);
    UnMessageEstVisibleAvecLaClass(and, SCOPE_PREVIEW);
    UnBoutonEstVisible(and);
    UnCodeDecomposantEstVisible(and, SCOPE_CODE);
  });

  test('Modification des propriétés du champ input', ({ given, and, when, then }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when("J'accède à la page playground NumberInput", renderPage);
    JeCliqueSurLeBouton(and);
    UnEditeurEstVisible(then);
    UnChampTextEstVisible(and);
    JeSaisieDansLeChamp(when, SCOPE_EDITOR);
    JeSaisieDansLeChamp(and, SCOPE_EDITOR);
    JeSaisieDansLeChamp(and, SCOPE_EDITOR);
    JeSaisieDansLeChamp(and, SCOPE_EDITOR);
    JeSaisieDansLeChamp(and, SCOPE_EDITOR);
    JeSaisieDansLeChamp(and, SCOPE_EDITOR);
    JeCliqueSurLaCheckbox(and, SCOPE_EDITOR);
    UnChampTextALeFocus(then, SCOPE_PREVIEW, ROLE_NUMBER);
    and(
      /^un champ texte "(.*)" est visible avec les propriétés : "(.*)", "(.*)", "(.*)", "(.*)"$/,
      async (fieldName, value, id, className, placeholder) => {
        const input = screen.getByRole(ROLE_NUMBER, { name: RegExp(fieldName) });
        expect(input).toHaveAttribute('value', value);
        expect(input).toHaveAttribute('id', id);
        expect(input).toHaveAttribute('class', className);
        expect(input).toHaveAttribute('placeholder', placeholder);
      },
    );
  });

  test('Affichage/masquage du helpButton', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when("J'accède à la page playground NumberInput", renderPage);
    UnBoutonHelpEstMasque(then, SCOPE_PREVIEW);
    JeCliqueSurLeBouton(when);
    UnEditeurEstVisible(then);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurNonSelectionne(and);
    JeCliqueSurLaCheckbox(when, SCOPE_EDITOR);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurSelectionne(then);
    UnBoutonHelpEstVisible(and, SCOPE_PREVIEW);
    JeCliqueSurLaCheckbox(when, SCOPE_EDITOR);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurNonSelectionne(then);
    UnBoutonHelpEstMasque(and, SCOPE_PREVIEW);
  });

  test('Activation/desactivation du champ input', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when("J'accède à la page playground NumberInput", renderPage);
    JeCliqueSurLeBouton(and);
    UnEditeurEstVisible(then);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurNonSelectionne(and);
    JeCliqueSurLaCheckbox(when, SCOPE_EDITOR);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurSelectionne(then);
    UnChampTextEstDesactive(and, SCOPE_PREVIEW, ROLE_NUMBER);
    JeCliqueSurLaCheckbox(when, SCOPE_EDITOR);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurNonSelectionne(then);
    UnChampTextEstActive(and, SCOPE_PREVIEW, ROLE_NUMBER);
  });

  test('Requis/optionnel du champ input', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when("J'accède à la page playground NumberInput", renderPage);
    JeCliqueSurLeBouton(and);
    UnEditeurEstVisible(then);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurNonSelectionne(and);
    JeCliqueSurLaCheckbox(when, SCOPE_EDITOR);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurSelectionne(then);
    UnChampTextEstRequis(and, SCOPE_PREVIEW, ROLE_NUMBER);
    JeCliqueSurLaCheckbox(when, SCOPE_EDITOR);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurNonSelectionne(then);
    UnChampTextEstOptionnel(and, SCOPE_PREVIEW, ROLE_NUMBER);
  });

  test('ReadOnly/editable du champ input', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when("J'accède à la page playground NumberInput", renderPage);
    JeCliqueSurLeBouton(and);
    UnEditeurEstVisible(then);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurNonSelectionne(and);
    JeCliqueSurLaCheckbox(when, SCOPE_EDITOR);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurSelectionne(then);
    UnChampTextEstEnLectureSeule(and, SCOPE_PREVIEW, ROLE_NUMBER);
    JeCliqueSurLaCheckbox(when, SCOPE_EDITOR);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurNonSelectionne(then);
    UnChampTextEstEditable(and, SCOPE_PREVIEW, ROLE_NUMBER);
  });

  test('Affichage/masquage du champ input', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when("J'accède à la page playground NumberInput", renderPage);
    UnChampTextEstVisibleAvecLaValeurEtUnPlaceholder(and, SCOPE_PREVIEW, ROLE_NUMBER);
    JeCliqueSurLeBouton(when);
    UnEditeurEstVisible(then);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurSelectionne(and);
    JeCliqueSurLaCheckbox(when, SCOPE_EDITOR);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurNonSelectionne(then);
    UnChampTextEstMasque(and, SCOPE_PREVIEW, ROLE_NUMBER);
    JeCliqueSurLaCheckbox(when, SCOPE_EDITOR);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurSelectionne(then);
    UnChampTextEstVisibleAvecLaValeurEtUnPlaceholder(and, SCOPE_PREVIEW, ROLE_NUMBER);
  });

  test('Gestion des erreurs du champ input', ({ given, when, and, then }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when("J'accède à la page playground NumberInput", renderPage);
    JeCliqueSurLeBouton(and);
    UnEditeurEstVisible(then);
    UnChampTextEstVisible(and);
    JeSaisieDansLeChamp(when, SCOPE_EDITOR);
    JeCliqueSurLaCheckbox(and, SCOPE_EDITOR);
    JeSelectionneUneValeurSurleChamp(and, SCOPE_EDITOR);
    UnChampTextEstVisibleAvecSonWrapper(then, SCOPE_PREVIEW, ROLE_NUMBER);
    UnMessageEstVisibleAvecLaClass(and, SCOPE_PREVIEW);
  });

  test('Modification du label', ({ given, when, and, then }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when("J'accède à la page playground NumberInput", renderPage);
    JeCliqueSurLeBouton(and);
    UnEditeurEstVisible(then);
    JeCliqueSurLeBouton(when);
    UneModaleApparaitAvecLeTitre(then);
    UnChampTextEstVisible(and);
    JeCliqueSurLeBoutonIcone(when);
    JeCliqueSurLeBoutonIcone(and);
    UnLabelEstVisible(and, SCOPE_PREVIEW);
  });
});
