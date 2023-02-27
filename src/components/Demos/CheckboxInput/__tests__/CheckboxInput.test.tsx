import { MessageTypes, CheckboxModes } from '@axa-fr/react-toolkit-all';
import { clearString } from 'shared/testsUtils';
import { code } from '../CheckboxInput';

describe('code', () => {
  const onChange = jest.fn();
  const onChangeCheckbox = jest.fn();

  const defaultProps = {
    name: 'name-field',
    id: 'uniqueid',
    options: [
      { label: 'For fun', value: '1', id: 'fun' },
      { label: 'For work', value: '2', id: 'work' },
      { label: 'For drink', value: '3', id: 'drink' },
      { label: 'For the life', value: '4', id: 'life', disabled: true },
    ],
    mode: CheckboxModes.default,
    classModifier: '',
    className: '',
    label: 'My Label',
    values: ['2'],
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
    onChangeCheckbox,
  };

  it('Should render CheckboxInputPage without help button', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`<CheckboxInput
      label={<>${defaultProps.label}</>}
      name="${defaultProps.name}"
      id="${defaultProps.id}"
      options={${JSON.stringify(defaultProps.options)}}
      onChange={onChangeCheckbox}
      mode="${defaultProps.mode}"
      values={${JSON.stringify(defaultProps.values)}}
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
      classNameContainerInput="${defaultProps.classNameContainerInput}"></CheckboxInput>
      `),
    );
  });

  it('Should render CheckboxInputPage with help button', () => {
    const result = code({ ...defaultProps, helpButton: true });
    expect(clearString(result)).toEqual(
      clearString(`<CheckboxInput
        label={<>${defaultProps.label}</>}
        name="${defaultProps.name}"
        id="${defaultProps.id}"
        options={${JSON.stringify(defaultProps.options)}}
        onChange={onChangeCheckbox}
        mode="${defaultProps.mode}"
        values={${JSON.stringify(defaultProps.values)}}
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
        </CheckboxInput>
        <HelpButton>Hello Checkbox</HelpButton>
        `),
    );
  });
});
