import { MessageTypes } from '@axa-fr/react-toolkit-all';
import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import RadioInputPage, { code } from '../RadioInput';

describe('<RadioInputPage />', () => {
  it('Should render RadioInputPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<RadioInputPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const onChange = jest.fn();
  const onChangeRadio = jest.fn();

  const defaultProps = {
    name: 'name-field',
    id: 'uniqueid',
    options: [
      { label: 'For fun', value: '1', id: 'fun' },
      { label: 'For work', value: '2', id: 'work' },
      { label: 'For drink', value: '3', id: 'drink' },
      { label: 'For the life', value: '4', id: 'life', disabled: true },
    ],
    mode: 'default',
    classModifier: '',
    className: '',
    label: 'My Label',
    value: '',
    helpMessage: 'Enter your name',
    message: '',
    messageType: MessageTypes.error,
    forceDisplayMessage: false,
    disabled: false,
    readOnly: false,
    isVisible: true,
    classNameContainerLabel: 'col-md-2',
    classNameContainerInput: 'col-md-10',
    helpButton: false,
    onChange,
    onChangeRadio,
  };

  it('Should render RadioInputPage without help button', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`<RadioInput
      label={<>${defaultProps.label}</>}
      name="${defaultProps.name}"
      id="${defaultProps.id}"
      options={${JSON.stringify(defaultProps.options)}}
      onChange={onChangeRadio}
      mode="${defaultProps.mode}"
      value="${defaultProps.value}"
      helpMessage="${defaultProps.helpMessage}"
      message="${defaultProps.message}" 
      messageType="${defaultProps.messageType}"
      forceDisplayMessage={${defaultProps.forceDisplayMessage}}
      readOnly={${defaultProps.readOnly}}
      disabled={${defaultProps.disabled}} 
      isVisible={${defaultProps.isVisible}}
      classModifier="${defaultProps.classModifier}"
      className="${defaultProps.className}"
      classNameContainerLabel="${defaultProps.classNameContainerLabel}"
      classNameContainerInput="${defaultProps.classNameContainerInput}"></RadioInput>
      `),
    );
  });

  it('Should render RadioInputPage with help button', () => {
    const result = code({ ...defaultProps, helpButton: true });
    expect(clearString(result)).toEqual(
      clearString(`<RadioInput
        label={<>${defaultProps.label}</>}
        name="${defaultProps.name}"
        id="${defaultProps.id}"
        options={${JSON.stringify(defaultProps.options)}}
        onChange={onChangeRadio}
        mode="${defaultProps.mode}"
        value="${defaultProps.value}"
        helpMessage="${defaultProps.helpMessage}"
        message="${defaultProps.message}" 
        messageType="${defaultProps.messageType}"
        forceDisplayMessage={${defaultProps.forceDisplayMessage}}
        readOnly={${defaultProps.readOnly}}
        disabled={${defaultProps.disabled}} 
        isVisible={${defaultProps.isVisible}}
        classModifier="${defaultProps.classModifier}"
        className="${defaultProps.className}"
        classNameContainerLabel="${defaultProps.classNameContainerLabel}"
        classNameContainerInput="${defaultProps.classNameContainerInput}">
            <HelpButton>Hello Radio</HelpButton>
        </RadioInput>
        `),
    );
  });
});
