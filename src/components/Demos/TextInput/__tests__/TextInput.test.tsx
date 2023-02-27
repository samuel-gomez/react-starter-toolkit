import { clearString } from 'shared/testsUtils';
import { MessageTypes } from '@axa-fr/react-toolkit-form-core';
import { code } from '../TextInput';

describe('code', () => {
  const onChange = jest.fn();

  const defaultProps = {
    id: 'id',
    name: 'name',
    label: 'my label',
    className: undefined,
    classModifier: '',
    message: '',
    placeholder: '',
    helpMessage: '',
    autoFocus: false,
    helpButton: false,
    disabled: false,
    readOnly: false,
    isVisible: true,
    required: false,
    forceDisplayMessage: false,
    messageType: MessageTypes.error,
    onChange,
    value: '',
  };

  it('Should render TextInputPage without help button', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`<TextInput 
      required={${defaultProps.required}} 
      forceDisplayMessage={${defaultProps.forceDisplayMessage}} 
      disabled={${defaultProps.disabled}} 
      id="${defaultProps.id}" 
      message="${defaultProps.message}" 
      placeholder="${defaultProps.placeholder}" 
      helpMessage="${defaultProps.helpMessage}" 
      name="${defaultProps.name}" 
      value="${defaultProps.value}" 
      label={<>${defaultProps.label}</>}
      className="${defaultProps.className}" 
      classModifier="${defaultProps.classModifier}" 
      messageType="${defaultProps.messageType}" 
      onChange={onChange('value')} 
      autoComplete="none"
      onBlur={onBlur} 
      onFocus={onFocus} 
      autoFocus={${defaultProps.autoFocus}} 
      readOnly={${defaultProps.readOnly}} 
      isVisible={${defaultProps.isVisible}}
      ></TextInput>
    `),
    );
  });

  it('Should render TextInputPage with help button', () => {
    const result = code({ ...defaultProps, helpButton: true });
    expect(clearString(result)).toEqual(
      clearString(`<TextInput 
      required={${defaultProps.required}} 
      forceDisplayMessage={${defaultProps.forceDisplayMessage}} 
      disabled={${defaultProps.disabled}} 
      id="${defaultProps.id}" 
      message="${defaultProps.message}" 
      placeholder="${defaultProps.placeholder}" 
      helpMessage="${defaultProps.helpMessage}" 
      name="${defaultProps.name}" 
      value="${defaultProps.value}" 
      label={<>${defaultProps.label}</>}
      className="${defaultProps.className}" 
      classModifier="${defaultProps.classModifier}" 
      messageType="${defaultProps.messageType}" 
      onChange={onChange('value')} 
      autoComplete="none"
      onBlur={onBlur} 
      onFocus={onFocus} 
      autoFocus={${defaultProps.autoFocus}} 
      readOnly={${defaultProps.readOnly}} 
      isVisible={${defaultProps.isVisible}}
      >
      <HelpButton>tooltip avec du text</HelpButton>
    </TextInput>
    `),
    );
  });
});
