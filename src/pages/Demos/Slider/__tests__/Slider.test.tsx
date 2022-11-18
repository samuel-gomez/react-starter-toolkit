import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import { MessageTypes } from '@axa-fr/react-toolkit-all';
import SliderPage, { code } from '../Slider';

describe('<Slider />', () => {
  it('Should render SliderPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<SliderPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const onChange = jest.fn();
  const onChangeSlider = jest.fn();

  const defaultProps = {
    label: 'My Label',
    id: 'uniqueid',
    name: 'name-field',
    value: 256,
    options: [
      { label: '64', value: '64', id: 'uniqueId1' },
      { label: '128', value: '128', id: 'uniqueId2' },
      { label: '256', value: '256', index: 2, id: 'uniqueId3' },
      { label: '1024', value: '1024', id: 'uniqueId4' },
      { label: '2048', value: '2048', id: 'uniqueId5' },
      { label: '4096', value: '4096', id: 'uniqueId5' },
    ],
    classModifier: '',
    className: '',
    helpMessage: 'Slide your value',
    message: '',
    messageType: MessageTypes.error,
    forceDisplayMessage: false,
    disabled: false,
    readOnly: false,
    isVisible: true,
    classNameContainerLabel: 'col-md-2',
    classNameContainerInput: 'col-md-10',
    onChange,
    onChangeSlider,
  };

  it('Should render Slider with default props', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`
      <SliderInput
        options={${JSON.stringify(defaultProps.options)}}
        id="${defaultProps.id}"
        label={<>${defaultProps.label}</>}
        name="${defaultProps.name}"
        onChange={onChangeSlider}
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
        classNameContainerInput="${defaultProps.classNameContainerInput}"
      />
      `),
    );
  });
});
