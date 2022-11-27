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
const SCOPE_PREVIEW = 'demo-preview';
const SCOPE_CODE = 'demo-source-code';

defineFeature(feature, test => {
  let role: string;

  const setRoleMock = (roleMock: string) => {
    role = roleMock;
  };

  const renderPage = async () => {
    render(<NumberInput />, {}, { role });
    expect(await screen.findByText('Samuel Gomez')).toBeInTheDocument();
  };

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
    UnChampTextEstVisibleAvecLaValeurEtUnPlaceholder(and);
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
    JeSaisieDansLeChamp(and, SCOPE_EDITOR);
    JeCliqueSurLaCheckbox(and, SCOPE_EDITOR);
    JeCliqueSurLaCheckbox(and, SCOPE_EDITOR);
    then(
      /^un champ texte "(.*)" est visible avec les propriétés : "(.*)", "(.*)", "(.*)", "(.*)"$/,
      async (fieldName, value, id, className, placeholder) => {
        const input = screen.getByRole('textbox', { name: RegExp(fieldName) });
        expect(input).toHaveAttribute('value', value);
        expect(input).toHaveAttribute('id', id);
        expect(input).toHaveAttribute('class', className);
        expect(input).toHaveAttribute('placeholder', placeholder);
      },
    );
    UnChampTextALeFocus(and);
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
    UnChampTextEstDesactive(and, SCOPE_PREVIEW);
    JeCliqueSurLaCheckbox(when, SCOPE_EDITOR);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurNonSelectionne(then);
    UnChampTextEstActive(and, SCOPE_PREVIEW);
  });

  test('Requis/optionnel du champ input', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when("J'accède à la page playground NumberInput", renderPage);
    JeCliqueSurLeBouton(and);
    UnEditeurEstVisible(then);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurNonSelectionne(and);
    JeCliqueSurLaCheckbox(when, SCOPE_EDITOR);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurSelectionne(then);
    UnChampTextEstRequis(and, SCOPE_PREVIEW);
    JeCliqueSurLaCheckbox(when, SCOPE_EDITOR);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurNonSelectionne(then);
    UnChampTextEstOptionnel(and, SCOPE_PREVIEW);
  });

  test('ReadOnly/editable du champ input', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when("J'accède à la page playground NumberInput", renderPage);
    JeCliqueSurLeBouton(and);
    UnEditeurEstVisible(then);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurNonSelectionne(and);
    JeCliqueSurLaCheckbox(when, SCOPE_EDITOR);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurSelectionne(then);
    UnChampTextEstEnLectureSeule(and, SCOPE_PREVIEW);
    JeCliqueSurLaCheckbox(when, SCOPE_EDITOR);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurNonSelectionne(then);
    UnChampTextEstEditable(and, SCOPE_PREVIEW);
  });

  test('Affichage/masquage du champ input', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when("J'accède à la page playground NumberInput", renderPage);
    UnChampTextEstVisibleAvecLaValeurEtUnPlaceholder(and);
    JeCliqueSurLeBouton(when);
    UnEditeurEstVisible(then);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurSelectionne(and);
    JeCliqueSurLaCheckbox(when, SCOPE_EDITOR);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurNonSelectionne(then);
    UnChampTextEstMasque(and);
    JeCliqueSurLaCheckbox(when, SCOPE_EDITOR);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurSelectionne(then);
    UnChampTextEstVisibleAvecLaValeurEtUnPlaceholder(and);
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
    UnChampTextEstVisibleAvecSonWrapper(then);
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
