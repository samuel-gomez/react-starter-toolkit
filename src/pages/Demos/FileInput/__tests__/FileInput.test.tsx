import { clearString } from 'shared/testsUtils';
import { MessageTypes } from '@axa-fr/react-toolkit-all';
import { code } from '../FileInput';

describe('code', () => {
  const onChange = jest.fn();

  const defaultProps = {
    label: 'My Label',
    name: 'name-field',
    id: 'uniqueid',
    helpMessage: 'Take a photo',
    accept: 'image/jpeg, image/png, application/*',
    message: '',
    messageType: MessageTypes.error,
    forceDisplayMessage: false,
    multiple: false,
    disabled: false,
    readOnly: false,
    isVisible: true,
    classModifier: 'required',
    className: 'row af-form__group',
    classNameContainerLabel: 'col-md-2',
    classNameContainerInput: 'col-md-10',
    onChange,
  };

  it('Should render FileInput with default props', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`
      <FileInput
        label={<>${defaultProps.label}</>}
        name="${defaultProps.name}" 
        id="${defaultProps.id}" 
        accept="${defaultProps.accept}"
        helpMessage="${defaultProps.helpMessage}"
        message="${defaultProps.message}"
        onChange={onChange}
        messageType="${defaultProps.messageType}"
        forceDisplayMessage={${defaultProps.forceDisplayMessage}}
        multiple={${defaultProps.multiple}} 
        readOnly={${defaultProps.readOnly}} 
        isVisible={${defaultProps.isVisible}}
        disabled={${defaultProps.disabled}}
        className="${defaultProps.className}" 
        classModifier="${defaultProps.classModifier}" 
        classNameContainerLabel="${defaultProps.classNameContainerLabel}"
        classNameContainerInput="${defaultProps.classNameContainerInput}"
        />
    `),
    );
  });
});
