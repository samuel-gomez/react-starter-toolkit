import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import DateInputPage, { code, INITIAL_STATE } from '../DateInput';

describe('<DateInputPage />', () => {
  it('Should render DateInputPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<DateInputPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const onChange = jest.fn();

  const defaultProps = {
    ...INITIAL_STATE,
    onChange,
  };

  it('Should render DateInputPage without help button', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`<DateInput required={${defaultProps.required}} 
      forceDisplayMessage={${defaultProps.forceDisplayMessage}} 
      disabled={${defaultProps.disabled}} 
      id="${defaultProps.id}" 
      message="${defaultProps.message}" 
      placeholder="${defaultProps.placeholder}" 
      helpMessage="${defaultProps.helpMessage}" 
      name="${defaultProps.name}" 
      value={value}
      label={<>${defaultProps.label}</>}
      className="${defaultProps.className}" 
      classModifier="${defaultProps.classModifier}" 
      messageType="${defaultProps.messageType}" 
      onChange={onChange('value')} 
      autoComplete="none"
      autoFocus={${defaultProps.autoFocus}} 
      readOnly={${defaultProps.readOnly}} 
      isVisible={${defaultProps.isVisible}} 
      classNameContainerLabel="${defaultProps.classNameContainerLabel}"
      classNameContainerInput="${defaultProps.classNameContainerInput}"
      ></DateInput>  
    `),
    );
  });

  it('Should render DateInputPage with help button', () => {
    const result = code({ ...defaultProps, helpButton: true });
    expect(clearString(result)).toEqual(
      clearString(`<DateInput required={${defaultProps.required}} 
      forceDisplayMessage={${defaultProps.forceDisplayMessage}} 
      disabled={${defaultProps.disabled}} 
      id="${defaultProps.id}" 
      message="${defaultProps.message}" 
      placeholder="${defaultProps.placeholder}" 
      helpMessage="${defaultProps.helpMessage}" 
      name="${defaultProps.name}" 
      value={value}
      label={<>${defaultProps.label}</>}
      className="${defaultProps.className}" 
      classModifier="${defaultProps.classModifier}" 
      messageType="${defaultProps.messageType}" 
      onChange={onChange('value')} 
      autoComplete="none"
      autoFocus={${defaultProps.autoFocus}} 
      readOnly={${defaultProps.readOnly}} 
      isVisible={${defaultProps.isVisible}} 
      classNameContainerLabel="${defaultProps.classNameContainerLabel}"
      classNameContainerInput="${defaultProps.classNameContainerInput}"
      >
      <HelpButton>tooltip avec du text</HelpButton>
      </DateInput>  
    `),
    );
  });
});
