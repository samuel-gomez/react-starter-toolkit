import { clearString } from 'shared/testsUtils';
import { PopoverPlacements, PopoverModes } from '@axa-fr/react-toolkit-popover';
import { code } from '../Help';

describe('code', () => {
  const onChange = jest.fn();

  const defaultProps = {
    mode: PopoverModes.click,
    placement: PopoverPlacements.right,
    label: 'af-title--content',
    onChange,
  };

  it('Should render Help with default props', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`<HelpButton mode="${defaultProps.mode}" placement="${defaultProps.placement}">${defaultProps.label}</HelpButton>`),
    );
  });
});
