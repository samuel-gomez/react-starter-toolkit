import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import { MessageTypes } from '@axa-fr/react-toolkit-all';
import TextInputPage, { code } from '../TextInput';

describe('<TextInputPage/>', () => {
  it('Should render TextInputPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<TextInputPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const onChange = jest.fn();
  const onChangeInput = jest.fn();

  const defaultProps = {
    id: 'id',
    name: 'name',
    label: 'my label',
    className: undefined,
    classModifier: '',
    message: '',
    placeholder: '',
    helpMessage: '',
    isOpenEditor: false,
    helpButton: false,
    disabled: false,
    readOnly: false,
    isVisible: true,
    required: false,
    forceDisplayMessage: false,
    messageType: MessageTypes.error,
    onChange,
    onChangeInput,
    value: '',
  };

  it('Should render TextInputPage without help button', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`<TextInput 
      autoFocus={${!defaultProps.isOpenEditor}} 
      readOnly={${defaultProps.readOnly}} 
      isVisible={${defaultProps.isVisible}} 
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
      onChange={onChangeInput} ></TextInput>
    `),
    );
  });

  it('Should render TextInputPage with help button', () => {
    const result = code({ ...defaultProps, helpButton: true });
    expect(clearString(result)).toEqual(
      clearString(`<TextInput 
      autoFocus={${!defaultProps.isOpenEditor}} 
      readOnly={${defaultProps.readOnly}} 
      isVisible={${defaultProps.isVisible}} 
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
      onChange={onChangeInput} >
      <HelpButton>tooltip avec du text</HelpButton>
    </TextInput>
    `),
    );
  });
});
