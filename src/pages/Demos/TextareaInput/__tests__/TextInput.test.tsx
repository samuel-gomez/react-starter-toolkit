import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import { MessageTypes } from '@axa-fr/react-toolkit-all';
import TextareaInputPage, { code } from '../TextareaInput';

describe('<TextareaInputPage/>', () => {
  it('Should render TextareaInputPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<TextareaInputPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

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
    rows: 6,
    cols: 60,
  };

  it('Should render TextareaInputPage without help button', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`<TextareaInput 
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
      rows={${defaultProps.rows}}
      cols={${defaultProps.cols}}
      ></TextareaInput>
    `),
    );
  });

  it('Should render TextareaInputPage with help button', () => {
    const result = code({ ...defaultProps, helpButton: true });
    expect(clearString(result)).toEqual(
      clearString(`<TextareaInput 
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
      rows={${defaultProps.rows}}
      cols={${defaultProps.cols}}
      >
      <HelpButton>tooltip avec du text</HelpButton>
    </TextareaInput>
    `),
    );
  });
});
