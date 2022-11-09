import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import { PopoverPlacements, PopoverModes } from '@axa-fr/react-toolkit-popover';
import HelpPage, { code } from '../Help';

describe('<HelpPage/>', () => {
  it('Should render HelpPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<HelpPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

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
      clearString(`<Help mode="${defaultProps.mode}" placement="${defaultProps.placement}">${defaultProps.label}</Help>`),
    );
  });
});
