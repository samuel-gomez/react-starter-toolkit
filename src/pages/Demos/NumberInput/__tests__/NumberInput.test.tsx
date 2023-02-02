import { screen, configure, within, waitFor } from '@testing-library/react';
import { render, userEvent } from 'shared/testsUtils/customRender';
import expectButton from 'shared/testsUtils/expectButton';
import expectLink from 'shared/testsUtils/expectLink';
import expectTitle from 'shared/testsUtils/expectTitle';
import { ROLE_NUMBER, SCOPE_PREVIEW, SCOPE_CODE, SCOPE_EDITOR } from 'shared/testsUtils/constants';
import NumberInput from '../NumberInput';

configure({ defaultHidden: true });

const setScope = (parentLabel: string) => (parentLabel ? within(screen.getByLabelText(parentLabel)) : screen);

describe('NumberInput', () => {
  it.each`
    profil
    ${'Admin'}
    ${'User'}
  `('Affichage du playground NumberInput', async ({ profil }) => {
    // Given Je suis un utilisateur connu et connecté avec le profil
    const role = profil;

    // When J'accède à la page playground NumberInput
    render(<NumberInput />, {}, { role });
    expect(await screen.findByText('Samuel Gomez')).toBeInTheDocument();

    // Then un titre "Demo NumberInput" est visible
    expectTitle({ name: 'Demo NumberInput' });

    // And un titre "NumberInput playground" est visible
    expectTitle({ name: 'NumberInput playground' });

    // And un lien "Guidelines" est visible avec un href "https://axaguildev.github.io/design-system/molecules/form-text/"
    expectLink({ name: 'Guidelines', href: 'https://axaguildev.github.io/design-system/molecules/form-text/' });

    // And un lien "Storybook" est visible avec un href "https://axaguildev.github.io/react-toolkit/latest/storybook/?path=/story/form-input-number--number"
    expectLink({ name: 'Storybook', href: 'https://axaguildev.github.io/react-toolkit/latest/storybook/?path=/story/form-input-number--number' });

    // And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.0.0/packages/Form/Input/number"
    expectLink({ name: 'Github', href: 'https://github.com/AxaGuilDEv/react-toolkit/tree/v2.0.0/packages/Form/Input/number' });

    // And un bouton "Edit props" est visible
    expectButton({ name: 'Edit props', beDisabled: false });

    // And un label "My number" est visible
    expect(screen.getByLabelText(RegExp('My number'))).toBeInTheDocument();

    // And un champ texte "number-field" est visible avec la valeur "5", un placeholder "Ex: Samuel"
    const scopePreview = setScope(SCOPE_PREVIEW);
    expect(scopePreview.getByRole(ROLE_NUMBER, { name: RegExp('number-field') })).toHaveAttribute('value', '5');
    expect(scopePreview.getByRole(ROLE_NUMBER, { name: RegExp('number-field') })).toHaveAttribute('placeholder', 'Ex: Samuel');

    // And un message "Enter your number" est visible avec la classe : "af-form__help"
    expect(scopePreview.getByText(RegExp('Enter your number'))).toHaveClass('af-form__help');

    // And un bouton "Copy to clipboard" est visible
    expectButton({ name: 'Copy to clipboard', beDisabled: false });

    // And un code du composant "NumberInput" est visible
    const scopeCode = setScope(SCOPE_CODE);
    expect(scopeCode.queryAllByText(RegExp('NumberInput')).length).toEqual(2);
  });

  jest.setTimeout(10000);

  it.each`
    profil     | value    | placeholder | className    | modifier   | expectedValue | expectedPlaceholder | expectedId | expectedClassWrapper        | expectedClass
    ${'Admin'} | ${459}   | ${''}       | ${''}        | ${''}      | ${'459'}      | ${'Ex: Samuel'}     | ${'monid'} | ${'row af-form__group'}     | ${'af-form__input-text af-form__input-text--required'}
    ${'User'}  | ${459}   | ${'Ex: 5'}  | ${''}        | ${'other'} | ${'459'}      | ${'Ex: 5'}          | ${'monid'} | ${'row af-form__group'}     | ${'af-form__input-text af-form__input-text--other'}
    ${'Admin'} | ${322}   | ${'Ex: 5'}  | ${'myClass'} | ${''}      | ${'322'}      | ${'Ex: 5'}          | ${'monid'} | ${'myClass'}                | ${'af-form__input-text af-form__input-text--required'}
    ${'User'}  | ${322}   | ${''}       | ${'myClass'} | ${'other'} | ${'322'}      | ${'Ex: Samuel'}     | ${'monid'} | ${'myClass myClass--other'} | ${'af-form__input-text af-form__input-text--other'}
    ${'Admin'} | ${'aaa'} | ${''}       | ${''}        | ${''}      | ${'aaa'}      | ${'Ex: Samuel'}     | ${'monid'} | ${'row af-form__group'}     | ${'af-form__input-text af-form__input-text--required'}
    ${'User'}  | ${'aaa'} | ${''}       | ${''}        | ${''}      | ${'aaa'}      | ${'Ex: Samuel'}     | ${'monid'} | ${'row af-form__group'}     | ${'af-form__input-text af-form__input-text--required'}
  `(
    'Modification des propriétés du champ input',
    async ({ profil, value, placeholder, className, modifier, expectedClass, expectedId, expectedPlaceholder, expectedValue }) => {
      // Given Je suis un utilisateur connu et connecté avec le profil
      const role = profil;

      // When J'accède à la page playground NumberInput
      render(<NumberInput />, {}, { role });
      expect(await screen.findByText('Samuel Gomez')).toBeInTheDocument();

      // And je clique sur le bouton "Edit props"
      await userEvent.click(screen.getByText('Edit props'));

      // Then un éditeur de propriété est visible
      expect(screen.getByLabelText('Edit props')).toHaveAttribute('class', 'af-draggable-container react-draggable');

      // And un champ texte "value" est visible avec la valeur "5"
      const scopeEditor = setScope(SCOPE_EDITOR);
      expect(scopeEditor.getByRole('textbox', { name: RegExp('value') })).toHaveValue('5');

      // When je saisie "<value>" dans le champ "value"
      const user = userEvent.setup();
      const input = scopeEditor.getByRole('textbox', { name: 'value' });
      if (value) {
        await user.clear(input);
        await user.type(input, `${value}`);
        expect(input).toHaveValue(`${value}`);
      }

      // And je saisie "name-field" dans le champ "name"
      const inputName = scopeEditor.getByRole('textbox', { name: 'name' });
      await user.clear(inputName);
      await user.type(inputName, 'name-field');
      expect(inputName).toHaveValue('name-field');

      // And je saisie "monid" dans le champ "id"
      const inputId = scopeEditor.getByRole('textbox', { name: 'id' });
      await user.clear(inputId);
      await user.type(inputId, 'monid');
      expect(inputId).toHaveValue('monid');

      // And je saisie "<className>" dans le champ "className"
      const inputClassName = scopeEditor.getByRole('textbox', { name: 'className' });
      if (className) {
        await user.clear(inputClassName);
        await user.type(inputClassName, className);
        expect(inputClassName).toHaveValue(className);
      }

      // And je saisie "<modifier>" dans le champ "classModifier"
      const inputClassModifier = scopeEditor.getByRole('textbox', { name: 'classModifier' });
      if (modifier) {
        await user.clear(inputClassModifier);
        await user.type(inputClassModifier, modifier);
        expect(inputClassModifier).toHaveValue(modifier);
      }

      // And je saisie "<placeholder>" dans le champ "placeholder"
      const inputPlaceHolder = scopeEditor.getByRole('textbox', { name: 'placeholder' });
      if (placeholder) {
        await user.clear(inputPlaceHolder);
        await user.type(inputPlaceHolder, placeholder);
        expect(inputPlaceHolder).toHaveValue(placeholder);
      }

      // And je clique sur la checkbox "autoFocus"
      const inputCheckboxtoggle = scopeEditor.getByRole('checkbox', { name: 'autoFocus' });
      await userEvent.click(inputCheckboxtoggle);

      // Then un champ texte "name-field" a le focus
      const scopePreview = setScope(SCOPE_PREVIEW);
      const inputDemo = scopePreview.getByRole(ROLE_NUMBER, { name: RegExp('name-field') });
      expect(inputDemo).toHaveFocus();

      // And un champ texte "name-field" est visible avec les propriétés : "<expectedValue>", "<expectedId>", "<expectedClass>", "<expectedPlaceholder>"
      expect(inputDemo).toHaveAttribute('value', expectedValue);
      expect(inputDemo).toHaveAttribute('id', expectedId);
      expect(inputDemo).toHaveAttribute('class', expectedClass);
      expect(inputDemo).toHaveAttribute('placeholder', expectedPlaceholder);
    },
  );

  it.each`
    profil
    ${'Admin'}
    ${'User'}
  `('Affichage/masquage du helpButton', async ({ profil }) => {
    // Given Je suis un utilisateur connu et connecté avec le profil
    const role = profil;

    // When J'accède à la page playground NumberInput
    render(<NumberInput />, {}, { role });
    expect(await screen.findByText('Samuel Gomez')).toBeInTheDocument();

    // Then un bouton Help est masqué
    const scopePreview = setScope(SCOPE_PREVIEW);
    expect(scopePreview.queryByRole('presentation')).not.toBeInTheDocument();

    // When je clique sur le bouton "Edit props"
    await userEvent.click(screen.getByText('Edit props'));

    // Then un éditeur de propriété est visible
    expect(screen.getByLabelText('Edit props')).toHaveAttribute('class', 'af-draggable-container react-draggable');

    // And un champ checkbox toggle "helpButton" avec le label "helpButton" non sélectionné
    const scopeEditor = setScope(SCOPE_EDITOR);
    const inputCheckboxtoggle = scopeEditor.getByRole('checkbox', { name: 'helpButton' });
    await waitFor(() => expect(inputCheckboxtoggle).not.toBeChecked());

    // When je clique sur la checkbox "helpButton"
    await userEvent.click(inputCheckboxtoggle);

    // Then un champ checkbox toggle "helpButton" avec le label "helpButton" sélectionné
    await waitFor(() => expect(inputCheckboxtoggle).toBeChecked());

    // And un bouton Help est visible
    expect(scopePreview.getByRole('presentation')).toHaveClass('af-popover__container-over');

    // When je clique sur la checkbox "helpButton"
    await userEvent.click(inputCheckboxtoggle);

    // Then un champ checkbox toggle "helpButton" avec le label "helpButton" non sélectionné
    await waitFor(() => expect(inputCheckboxtoggle).not.toBeChecked());

    // And un bouton Help est masqué
    expect(scopePreview.queryByRole('presentation')).not.toBeInTheDocument();
  });

  it.each`
    profil
    ${'Admin'}
    ${'User'}
  `('Activation/desactivation du champ input', async ({ profil }) => {
    // Given Je suis un utilisateur connu et connecté avec le profil
    const role = profil;

    // When J'accède à la page playground NumberInput
    render(<NumberInput />, {}, { role });
    expect(await screen.findByText('Samuel Gomez')).toBeInTheDocument();
    const scopePreview = setScope(SCOPE_PREVIEW);

    // And je clique sur le bouton "Edit props"
    await userEvent.click(screen.getByText('Edit props'));
    const scopeEditor = setScope(SCOPE_EDITOR);

    // Then un éditeur de propriété est visible
    expect(screen.getByLabelText('Edit props')).toHaveAttribute('class', 'af-draggable-container react-draggable');

    // And un champ checkbox toggle "disabled" avec le label "disabled" non sélectionné
    const inputCheckboxtoggle = scopeEditor.getByRole('checkbox', { name: 'disabled' });
    await waitFor(() => expect(inputCheckboxtoggle).not.toBeChecked());

    // When je clique sur la checkbox "disabled"
    await userEvent.click(inputCheckboxtoggle);

    // Then un champ checkbox toggle "disabled" avec le label "disabled" sélectionné
    await waitFor(() => expect(inputCheckboxtoggle).toBeChecked());

    // And un champ texte "number-field" est désactivé
    await waitFor(() => expect(scopePreview.getByRole(ROLE_NUMBER, { name: RegExp('number-field') })).toBeDisabled());

    // When je clique sur la checkbox "disabled"
    await userEvent.click(inputCheckboxtoggle);

    // Then un champ checkbox toggle "disabled" avec le label "disabled" non sélectionné
    await waitFor(() => expect(inputCheckboxtoggle).not.toBeChecked());

    // And un champ texte "number-field" est activé
    await waitFor(() => expect(scopePreview.getByRole(ROLE_NUMBER, { name: RegExp('number-field') })).toBeEnabled());
  });

  it.each`
    profil
    ${'Admin'}
    ${'User'}
  `('Requis/optionnel du champ input', async ({ profil }) => {
    // Given Je suis un utilisateur connu et connecté avec le profil
    const role = profil;

    // When J'accède à la page playground NumberInput
    render(<NumberInput />, {}, { role });
    expect(await screen.findByText('Samuel Gomez')).toBeInTheDocument();
    const scopePreview = setScope(SCOPE_PREVIEW);

    // And je clique sur le bouton "Edit props"
    await userEvent.click(screen.getByText('Edit props'));
    const scopeEditor = setScope(SCOPE_EDITOR);

    // Then un éditeur de propriété est visible
    expect(screen.getByLabelText('Edit props')).toHaveAttribute('class', 'af-draggable-container react-draggable');

    // And un champ checkbox toggle "required" avec le label "required" non sélectionné
    const inputCheckboxtoggle = scopeEditor.getByRole('checkbox', { name: 'required' });
    await waitFor(() => expect(inputCheckboxtoggle).not.toBeChecked());

    // When je clique sur la checkbox "required"
    await userEvent.click(inputCheckboxtoggle);

    // Then un champ checkbox toggle "required" avec le label "required" sélectionné
    await waitFor(() => expect(inputCheckboxtoggle).toBeChecked());

    // And un champ texte "number-field" est requis
    await waitFor(() => expect(scopePreview.getByRole(ROLE_NUMBER, { name: RegExp('number-field') })).toBeRequired());

    // When je clique sur la checkbox "required"
    await userEvent.click(inputCheckboxtoggle);

    // Then un champ checkbox toggle "required" avec le label "required" non sélectionné
    await waitFor(() => expect(inputCheckboxtoggle).not.toBeChecked());

    // And un champ texte "number-field" est optionnel
    await waitFor(() => expect(scopePreview.getByRole(ROLE_NUMBER, { name: RegExp('number-field') })).not.toBeRequired());
  });

  it.each`
    profil
    ${'Admin'}
    ${'User'}
  `('ReadOnly/editable du champ input', async ({ profil }) => {
    // Given Je suis un utilisateur connu et connecté avec le profil
    const role = profil;

    // When J'accède à la page playground NumberInput
    render(<NumberInput />, {}, { role });
    expect(await screen.findByText('Samuel Gomez')).toBeInTheDocument();
    const scopePreview = setScope(SCOPE_PREVIEW);

    // And je clique sur le bouton "Edit props"
    await userEvent.click(screen.getByText('Edit props'));
    const scopeEditor = setScope(SCOPE_EDITOR);

    // Then un éditeur de propriété est visible
    expect(screen.getByLabelText('Edit props')).toHaveAttribute('class', 'af-draggable-container react-draggable');

    // And un champ checkbox toggle "readOnly" avec le label "readOnly" non sélectionné
    const inputCheckboxtoggle = scopeEditor.getByRole('checkbox', { name: 'readOnly' });
    await waitFor(() => expect(inputCheckboxtoggle).not.toBeChecked());

    // When je clique sur la checkbox "readOnly"
    await userEvent.click(inputCheckboxtoggle);

    // Then un champ checkbox toggle "readOnly" avec le label "readOnly" sélectionné
    await waitFor(() => expect(inputCheckboxtoggle).toBeChecked());

    // And un champ texte "number-field" est en lecture seule
    await waitFor(() => expect(scopePreview.getByRole(ROLE_NUMBER, { name: RegExp('number-field') })).toHaveAttribute('readOnly'));

    // When je clique sur la checkbox "readOnly"
    await userEvent.click(inputCheckboxtoggle);

    // Then un champ checkbox toggle "readOnly" avec le label "readOnly" non sélectionné
    await waitFor(() => expect(inputCheckboxtoggle).not.toBeChecked());

    // And un champ texte "number-field" est éditable
    await waitFor(() => expect(scopePreview.getByRole(ROLE_NUMBER, { name: RegExp('number-field') })).not.toHaveAttribute('readOnly'));
  });

  it.each`
    profil
    ${'Admin'}
    ${'User'}
  `('Affichage/masquage du champ input', async ({ profil }) => {
    // Given Je suis un utilisateur connu et connecté avec le profil
    const role = profil;

    // When J'accède à la page playground NumberInput
    render(<NumberInput />, {}, { role });
    expect(await screen.findByText('Samuel Gomez')).toBeInTheDocument();
    const scopePreview = setScope(SCOPE_PREVIEW);

    // Then un champ texte "number-field" est visible avec la valeur "5", un placeholder "Ex: Samuel"
    const inputDemo = scopePreview.getByRole(ROLE_NUMBER, { name: RegExp('number-field') });
    expect(inputDemo).toHaveAttribute('value', '5');
    expect(inputDemo).toHaveAttribute('placeholder', 'Ex: Samuel');

    // When je clique sur le bouton "Edit props"
    await userEvent.click(screen.getByText('Edit props'));
    const scopeEditor = setScope(SCOPE_EDITOR);

    // Then un éditeur de propriété est visible
    expect(screen.getByLabelText('Edit props')).toHaveAttribute('class', 'af-draggable-container react-draggable');

    // And un champ checkbox toggle "isVisible" avec le label "isVisible" sélectionné
    const inputCheckboxtoggle = scopeEditor.getByRole('checkbox', { name: 'isVisible' });
    await waitFor(() => expect(inputCheckboxtoggle).toBeChecked());

    // When je clique sur la checkbox "isVisible"
    await userEvent.click(inputCheckboxtoggle);

    // Then un champ checkbox toggle "isVisible" avec le label "isVisible" non sélectionné
    await waitFor(() => expect(inputCheckboxtoggle).not.toBeChecked());

    // And un champ texte "number-field" est masqué
    await waitFor(() => expect(scopePreview.queryByRole(ROLE_NUMBER, { name: RegExp('number-field') })).not.toBeInTheDocument());

    // When je clique sur la checkbox "isVisible"
    await userEvent.click(inputCheckboxtoggle);

    // Then un champ checkbox toggle "readOnly" avec le label "readOnly" sélectionné
    await waitFor(() => expect(inputCheckboxtoggle).toBeChecked());

    //  And un champ texte "number-field" est visible avec la valeur "5", un placeholder "Ex: Samuel"
    await waitFor(() => expect(inputDemo).toHaveAttribute('value', '5'));
    await waitFor(() => expect(inputDemo).toHaveAttribute('placeholder', 'Ex: Samuel'));
  });

  it.each`
    profil     | message               | type         | expectedWrapperInputClass                                         | expectedDisplayMessage | expectedDisplayMessageClass
    ${'Admin'} | ${''}                 | ${'warning'} | ${'af-form__text'}                                                | ${'Enter your number'} | ${'af-form__help'}
    ${'User'}  | ${''}                 | ${'success'} | ${'af-form__text'}                                                | ${'Enter your number'} | ${'af-form__help'}
    ${'Admin'} | ${''}                 | ${'error'}   | ${'af-form__text'}                                                | ${'Enter your number'} | ${'af-form__help'}
    ${'User'}  | ${'myMessageWarning'} | ${'warning'} | ${'af-form__text af-form__text--required af-form__text--warning'} | ${'myMessageWarning'}  | ${'af-form__warning-text'}
    ${'User'}  | ${'myMessageSuccess'} | ${'success'} | ${'af-form__text af-form__text--required af-form__text--success'} | ${'myMessageSuccess'}  | ${'af-form__success-text'}
    ${'Admin'} | ${'myMessageError'}   | ${'error'}   | ${'af-form__text af-form__text--required af-form__text--error'}   | ${'myMessageError'}    | ${'af-form__error-text'}
  `(
    'Gestion des erreurs du champ input',
    async ({ profil, message, type, expectedWrapperInputClass, expectedDisplayMessage, expectedDisplayMessageClass }) => {
      // Given Je suis un utilisateur connu et connecté avec le profil
      const role = profil;

      // When J'accède à la page playground NumberInput
      render(<NumberInput />, {}, { role });
      expect(await screen.findByText('Samuel Gomez')).toBeInTheDocument();

      // And je clique sur le bouton "Edit props"
      await userEvent.click(screen.getByText('Edit props'));

      // Then un éditeur de propriété est visible
      expect(screen.getByLabelText('Edit props')).toHaveAttribute('class', 'af-draggable-container react-draggable');

      // And un champ texte "message" est visible avec la valeur ""
      const scopeEditor = setScope(SCOPE_EDITOR);
      expect(scopeEditor.getByRole('textbox', { name: RegExp('message') })).toHaveValue('');

      //When je saisie "<message>" dans le champ "message"
      const user = userEvent.setup();
      const input = scopeEditor.getByRole('textbox', { name: 'message' });
      if (message) {
        await user.clear(input);
        await user.type(input, `${message}`);
        expect(input).toHaveValue(`${message}`);
      }

      // And je clique sur la checkbox "forceDisplayMessage"
      const inputCheckboxtoggle = scopeEditor.getByRole('checkbox', { name: 'forceDisplayMessage' });
      await userEvent.click(inputCheckboxtoggle);
      await waitFor(() => expect(inputCheckboxtoggle).toBeChecked());

      // And Je sélectionne la valeur "<type>" sur le champ "messageType"
      const selectInput = scopeEditor.getByRole('combobox', { name: RegExp('messageType') });
      await waitFor(() => userEvent.selectOptions(selectInput, type));
      await waitFor(() => expect(scopeEditor.getByDisplayValue(RegExp(type))).toBeInTheDocument());

      // Then un champ texte "number-field" est visible et son wrapper a la classe : "<expectedWrapperInputClass>"
      const scopePreview = setScope(SCOPE_PREVIEW);
      const inputDemo = await scopePreview.getByRole(ROLE_NUMBER, { name: RegExp('number-field') });
      const wrapper = inputDemo.closest('div');
      expect(wrapper).toHaveAttribute('class', `${expectedWrapperInputClass}`);

      // And un message "<expectedDisplayMessage>" est visible avec la classe : "<expectedDisplayMessageClass>"
      expect(scopePreview.getByText(RegExp(expectedDisplayMessage))).toHaveClass(expectedDisplayMessageClass);
    },
  );

  it.each`
    profil
    ${'Admin'}
    ${'User'}
  `('Modification du label', async ({ profil }) => {
    // Given Je suis un utilisateur connu et connecté avec le profil
    const role = profil;

    // When J'accède à la page playground NumberInput
    render(<NumberInput />, {}, { role });
    expect(await screen.findByText('Samuel Gomez')).toBeInTheDocument();

    // And je clique sur le bouton "Edit props"
    await userEvent.click(screen.getByText('Edit props'));

    // Then un éditeur de propriété est visible
    expect(screen.getByLabelText('Edit props')).toHaveAttribute('class', 'af-draggable-container react-draggable');

    // When je clique sur le bouton "Edit label"
    const scopeEditor = setScope(SCOPE_EDITOR);
    await userEvent.click(scopeEditor.getByText('Edit label'));

    // Then une modal apparait avec le titre "Saisir la value de label"
    const dialog = within(screen.getByRole('dialog'));
    expect(dialog.getByText(RegExp('Saisir la value de label'))).toBeInTheDocument();

    // And un champ texte "jsx-code-editor" est visible avec la valeur "My number"
    expect(dialog.getByRole('textbox', { name: RegExp('jsx-code-editor') })).toHaveValue('My number');

    // When je clique sur le bouton icone "Suppression du code"
    await userEvent.click(dialog.getByLabelText('Suppression du code'));

    // And je clique sur le bouton icone "Ajout du code H1"
    await userEvent.click(dialog.getByLabelText('Ajout du code H1'));

    // Then un label "sample title" est visible
    const scopePreview = setScope(SCOPE_PREVIEW);
    await waitFor(() => expect(scopePreview.getByLabelText(RegExp('sample title'))).toBeInTheDocument());
  });
});
