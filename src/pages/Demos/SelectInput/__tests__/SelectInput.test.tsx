import { MessageTypes } from '@axa-fr/react-toolkit-all';
import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import SelectInputPage, { code } from '../SelectInput';

describe('<SelectInputPage />', () => {
  it('Should render SelectInputPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<SelectInputPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const onChange = jest.fn();
  const onChangeSelect = jest.fn();

  const defaultProps = {
    name: 'name-field',
    id: 'uniqueid',
    options: [
      { label: 'For fun', value: 'fun', id: 'fun' },
      { label: 'For work', value: 'work', id: 'work' },
      { label: 'For drink', value: 'drink', id: 'drink' },
    ],
    mode: 'default',
    placeholder: '- Select -',
    forceDisplayPlaceholder: false,
    classModifier: '',
    className: '',
    label: 'My Label',
    value: '',
    helpMessage: 'Enter your name',
    message: '',
    messageType: MessageTypes.error,
    forceDisplayMessage: false,
    disabled: false,
    isVisible: true,
    classNameContainerLabel: 'col-md-2',
    classNameContainerInput: 'col-md-10',
    helpButton: false,
    onChange,
    onChangeSelect,
  };

  it('Should render RadioInputPage without help button', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`<SelectInput
        label={<>${defaultProps.label}</>}
        name="${defaultProps.name}"
        id="${defaultProps.id}"
        options={${JSON.stringify(defaultProps.options)}}
        onChange={onChangeSelect}
        mode="${defaultProps.mode}"
        value="${defaultProps.value}"
        helpMessage="${defaultProps.helpMessage}"
        message="${defaultProps.message}" 
        messageType="${defaultProps.messageType}"
        forceDisplayMessage={${defaultProps.forceDisplayMessage}}
        disabled={${defaultProps.disabled}} 
        isVisible={${defaultProps.isVisible}}
        classModifier="${defaultProps.classModifier}"
        className="${defaultProps.className}"
        placeholder="${defaultProps.placeholder}"
        forceDisplayPlaceholder={${defaultProps.forceDisplayPlaceholder}}
        classNameContainerLabel="${defaultProps.classNameContainerLabel}"
        classNameContainerInput="${defaultProps.classNameContainerInput}"></SelectInput>
      `),
    );
  });

  it('Should render RadioInputPage with help button', () => {
    const result = code({ ...defaultProps, helpButton: true });
    expect(clearString(result)).toEqual(
      clearString(`<SelectInput
        label={<>${defaultProps.label}</>}
        name="${defaultProps.name}"
        id="${defaultProps.id}"
        options={${JSON.stringify(defaultProps.options)}}
        onChange={onChangeSelect}
        mode="${defaultProps.mode}"
        value="${defaultProps.value}"
        helpMessage="${defaultProps.helpMessage}"
        message="${defaultProps.message}" 
        messageType="${defaultProps.messageType}"
        forceDisplayMessage={${defaultProps.forceDisplayMessage}}
        disabled={${defaultProps.disabled}} 
        isVisible={${defaultProps.isVisible}}
        classModifier="${defaultProps.classModifier}"
        className="${defaultProps.className}"
        placeholder="${defaultProps.placeholder}"
        forceDisplayPlaceholder={${defaultProps.forceDisplayPlaceholder}}
        classNameContainerLabel="${defaultProps.classNameContainerLabel}"
        classNameContainerInput="${defaultProps.classNameContainerInput}">
            <HelpButton>Hello Select</HelpButton>
        </SelectInput>
        `),
    );
  });
});
