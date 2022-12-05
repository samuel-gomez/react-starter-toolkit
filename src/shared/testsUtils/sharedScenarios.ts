import { screen, waitFor, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import { DefineStepFunction } from 'jest-cucumber';
import expectButton from './expectButton';
import expectLink from './expectLink';
import expectTitle from './expectTitle';

export const UnBoutonEstMasque = (instruction: DefineStepFunction) =>
  instruction(/^un bouton "(.*)" est masqué$/, name => {
    expectButton({ name, isQueryByRole: true, beInDoc: false });
  });

export const UnBoutonEstVisible = (instruction: DefineStepFunction) =>
  instruction(/^un bouton "(.*)" est visible$/, name => {
    expectButton({ name, beDisabled: false });
  });

export const UnLienEstMasque = (instruction: DefineStepFunction, role = 'link') =>
  instruction(/^un lien "(.*)" est masqué$/, name => {
    expectLink({ name, role, isQueryByRole: true, beInDoc: false });
  });

export const UnLienEstVisible = (instruction: DefineStepFunction, role = 'link') =>
  instruction(/^un lien "(.*)" est visible avec un href "(.*)"$/, (name, href) => {
    expectLink({ name, href, role });
  });

export const JeSuisUnUtilisateurConnuEtConnecteAvecleProfil = (instruction: DefineStepFunction, callback: (arg: string) => void) =>
  instruction(/^Je suis un utilisateur connu et connecté avec le profil "(.*)"$/, role => {
    callback(role);
  });

export const UnTitreEstVisible = (instruction: DefineStepFunction, level = 1) =>
  instruction(/^un titre "(.*)" est visible$/, title => {
    expectTitle({ name: title, level });
  });

export const UnTexteEstVisible = (instruction: DefineStepFunction) =>
  instruction(/^un texte "(.*)" est visible$/, text => {
    expect(screen.getByText(RegExp(text))).toBeInTheDocument();
  });

export const UnLabelEstVisible = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^un label "(.*)" est visible$/, async name => {
    const base = !!parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    await waitFor(() => expect(base.getByLabelText(RegExp(name))).toBeInTheDocument());
  });

export const UnChampTextEstVisibleAvecLaValeurEtUnPlaceholder = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^un champ texte "(.*)" est visible avec la valeur "(.*)", un placeholder "(.*)"$/, (name, value, placeholder) => {
    const base = !!parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    expect(base.getByRole(inputRole, { name: RegExp(name) })).toHaveAttribute('value', value);
    expect(base.getByRole(inputRole, { name: RegExp(name) })).toHaveAttribute('placeholder', placeholder);
  });

export const UnMessageEstVisibleAvecLaClass = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^un message "(.*)" est visible avec la classe : "(.*)"$/, (name, className) => {
    const base = !!parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    expect(base.getByText(RegExp(name))).toHaveClass(className);
  });

export const UnCodeDecomposantEstVisible = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^un code du composant "(.*)" est visible$/, name => {
    const base = !!parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    expect(base.queryAllByText(RegExp(name)).length).toEqual(2);
  });

export const JeCliqueSurLeBouton = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^je clique sur le bouton "(.*)"$/, labelBtn => {
    const base = !!parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    fireEvent.click(base.getByText(labelBtn));
  });

export const JeCliqueSurLeBoutonIcone = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^je clique sur le bouton icone "(.*)"$/, labelBtn => {
    const base = !!parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    userEvent.click(base.getByLabelText(labelBtn));
  });

export const UnEditeurEstVisible = (instruction: DefineStepFunction) =>
  instruction(/^un éditeur de propriété est visible$/, () => {
    expect(screen.getByLabelText('Edit props')).toHaveAttribute('class', 'af-draggable-container react-draggable');
  });

export const UnChampTextEstVisible = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^un champ texte "(.*)" est visible avec la valeur "(.*)"$/, (fieldName, value) => {
    const base = !!parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    expect(base.getByRole(inputRole, { name: RegExp(fieldName) })).toHaveValue(value);
  });

export const UnChampTextEstMasque = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^un champ texte "(.*)" est masqué$/, fieldName => {
    const base = !!parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    expect(base.queryByRole(inputRole, { name: RegExp(fieldName) })).not.toBeInTheDocument();
  });

export const JeSaisieDansLeChamp = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^je saisie "(.*)" dans le champ "(.*)"$/, async (value, fieldName) => {
    const base = !!parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const input = base.getByRole(inputRole, { name: fieldName });
    const user = userEvent.setup();
    if (!!value) {
      await user.clear(input);
      await user.type(input, value);
      expect(input).toHaveValue(value);
    }
  });

export const UnChampCheckboxToggleAvecUnLabelEtUneValeurNonSelectionne = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^un champ checkbox toggle "(.*)" avec le label "(.*)" non sélectionné$/, async (id, label) => {
    const base = !!parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const inputCheckboxtoggle = base.getByRole('checkbox', { name: label });
    await waitFor(() => expect(inputCheckboxtoggle).not.toBeChecked());
  });

export const UnChampCheckboxToggleAvecUnLabelEtUneValeurSelectionne = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^un champ checkbox toggle "(.*)" avec le label "(.*)" sélectionné$/, async (id, label) => {
    const base = !!parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const inputCheckboxtoggle = base.getByRole('checkbox', { name: label });
    await waitFor(() => expect(inputCheckboxtoggle).toBeChecked());
  });

export const JeCliqueSurLaCheckbox = async (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^je clique sur la checkbox "(.*)"$/, async label => {
    const base = !!parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const inputCheckboxtoggle = base.getByRole('checkbox', { name: label });
    await userEvent.click(inputCheckboxtoggle);
  });

export const UnBoutonHelpEstVisible = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^un bouton Help est visible$/, () => {
    const base = !!parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    expect(base.getByRole('presentation')).toHaveClass('af-popover__container-over');
  });

export const UnBoutonHelpEstMasque = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^un bouton Help est masqué$/, () => {
    const base = !!parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    expect(base.queryByRole('presentation')).not.toBeInTheDocument();
  });

export const UnChampTextALeFocus = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^un champ texte "(.*)" a le focus$/, fieldName => {
    const base = !!parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const input = base.getByRole(inputRole, { name: RegExp(fieldName) });
    expect(input).toHaveFocus();
  });

export const UnChampTextEstDesactive = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^un champ texte "(.*)" est désactivé$/, async fieldName => {
    const base = !!parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const input = base.getByRole(inputRole, { name: RegExp(fieldName) });
    await waitFor(() => expect(input).toBeDisabled());
  });

export const UnChampTextEstActive = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^un champ texte "(.*)" est activé$/, async fieldName => {
    const base = !!parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const input = base.getByRole(inputRole, { name: RegExp(fieldName) });
    await waitFor(() => expect(input).toBeEnabled());
  });

export const UnChampTextEstOptionnel = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^un champ texte "(.*)" est optionnel$/, async fieldName => {
    const base = !!parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const input = base.getByRole(inputRole, { name: RegExp(fieldName) });
    await waitFor(() => expect(input).not.toBeRequired());
  });

export const UnChampTextEstRequis = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^un champ texte "(.*)" est requis$/, async fieldName => {
    const base = !!parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const input = base.getByRole(inputRole, { name: RegExp(fieldName) });
    await waitFor(() => expect(input).toBeRequired());
  });

export const UnChampTextEstEnLectureSeule = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^un champ texte "(.*)" est en lecture seule$/, async fieldName => {
    const base = !!parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const input = base.getByRole(inputRole, { name: RegExp(fieldName) });
    await waitFor(() => expect(input).toHaveAttribute('readOnly'));
  });

export const UnChampTextEstEditable = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^un champ texte "(.*)" est éditable$/, async fieldName => {
    const base = !!parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const input = base.getByRole(inputRole, { name: RegExp(fieldName) });
    await waitFor(() => expect(input).not.toHaveAttribute('readOnly'));
  });

export const JeSelectionneUneValeurSurleChamp = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^Je sélectionne la valeur "(.*)" sur le champ "(.*)"$/, async (type, fieldName) => {
    const base = !!parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const selectInput = base.getByRole('combobox', { name: RegExp(fieldName) });
    await waitFor(() => userEvent.selectOptions(selectInput, type === 'error' ? 'success' : 'error'));
    await waitFor(() => userEvent.selectOptions(selectInput, type));
    await waitFor(() => expect(base.getByDisplayValue(RegExp(type))).toBeInTheDocument());
  });

export const UnChampTextEstVisibleAvecSonWrapper = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^un champ texte "(.*)" est visible et son wrapper a la classe : "(.*)"$/, (fieldName, classNameWrapper) => {
    const base = !!parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const input = base.getByRole(inputRole, { name: RegExp(fieldName) });
    const wrapper = input.closest('div');
    expect(wrapper).toHaveAttribute('class', classNameWrapper);
  });

export const UneModaleApparaitAvecLeTitre = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^une modal apparait avec le titre "(.*)"$/, async modalTitle => {
    const base = !!parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const dialog = base.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText(RegExp(modalTitle))).toBeInTheDocument();
  });
