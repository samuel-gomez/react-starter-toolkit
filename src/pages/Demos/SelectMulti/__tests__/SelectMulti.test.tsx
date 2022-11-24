import { MessageTypes } from '@axa-fr/react-toolkit-all';
import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import SelectMultiPage, { code } from '../SelectMulti';

describe('<SelectMultiPage />', () => {
  it('Should render SelectMultiPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<SelectMultiPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const onChange = jest.fn();

  const defaultProps = {
    label: 'My Label',
    name: 'name-field',
    id: 'uniqueid',
    options: [
      { value: 'fun', label: 'For fun', id: 'fun' },
      { value: 'work', label: 'For work', id: 'work' },
      { value: 'drink', label: 'For drink', id: 'drink' },
      { value: 'sleep', label: 'For sleep', id: 'sleep' },
      { value: 'swim', label: 'For swim', id: 'swim' },
    ],
    values: ['fun', 'drink'],
    helpMessage: 'Enter the place name',
    message: '',
    messageType: MessageTypes.error,
    forceDisplayMessage: false,
    multiple: false,
    disabled: false,
    readOnly: false,
    isVisible: true,
    classModifier: 'required',
    placeholder: 'Enter the place name',
    className: 'row af-form__group',
    classNameContainerLabel: 'col-md-2',
    classNameContainerInput: 'col-md-10',
    onChange,
  };

  it('Should render SelectMulti with default props', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`
      <MultiSelectInput
        label={<>${defaultProps.label}</>}
        id="${defaultProps.id}"
        name="${defaultProps.name}" 
        options={${JSON.stringify(defaultProps.options)}}
        onChange={onChangeSelect}
        values={${JSON.stringify(defaultProps.values)}}
        helpMessage="${defaultProps.helpMessage}"
        message="${defaultProps.message}"
        messageType="${defaultProps.messageType}"
        forceDisplayMessage={${defaultProps.forceDisplayMessage}}
        readOnly={${defaultProps.readOnly}} 
        isVisible={${defaultProps.isVisible}}
        disabled={${defaultProps.disabled}}
        className="${defaultProps.className}" 
        classModifier="${defaultProps.classModifier}" 
        placeholder="${defaultProps.placeholder}" 
        classNameContainerLabel="${defaultProps.classNameContainerLabel}"
        classNameContainerInput="${defaultProps.classNameContainerInput}"
        />
    `),
    );
  });
});
