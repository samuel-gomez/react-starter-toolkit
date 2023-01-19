import { clearString } from 'shared/testsUtils';
import { MessageTypes } from '@axa-fr/react-toolkit-form-core';
import { code } from '../Switch';

describe('code', () => {
  const onChange = jest.fn();

  const defaultProps = {
    label: 'Select a choice',
    name: 'name',
    options: [
      {
        id: 'check1',
        label: 'Choix 1',
        value: '0',
      },
      {
        id: 'check2',
        label: 'Choix 2',
        value: '1',
      },
    ],
    value: '1',
    disabled: false,
    isVisible: true,
    classModifier: '',
    className: '',
    message: '',
    messageType: MessageTypes.error,
    forceDisplayMessage: false,
    onChange,
  };

  it('Should render Switch with default props', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`
        <SwitchInput
          name="${defaultProps.name}" 
          value="${defaultProps.value}" 
          label={<>${defaultProps.label}</>}
          disabled={${defaultProps.disabled}} 
          isVisible={${defaultProps.isVisible}}
          className="${defaultProps.className}" 
          classModifier="${defaultProps.classModifier}"
          options={${JSON.stringify(defaultProps.options)}}
          message="${defaultProps.message}" 
          messageType="${defaultProps.messageType}"
          forceDisplayMessage={${defaultProps.forceDisplayMessage}}
          onChange={onChange('value')}
        />
      `),
    );
  });
});
