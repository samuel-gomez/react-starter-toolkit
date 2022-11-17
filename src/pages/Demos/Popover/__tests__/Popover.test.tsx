import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import { PopoverPlacements, PopoverModes } from '@axa-fr/react-toolkit-popover';
import PopoverPage, { code } from '../Popover';

describe('<Popover />', () => {
  it('Should render PopoverPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<PopoverPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const onChange = jest.fn();

  const defaultProps = {
    title: 'Exemple',
    content: 'Contenu qui va reçevoir la popover',
    classModifier: '',
    placement: PopoverPlacements.right,
    mode: PopoverModes.over,
    onChange,
  };

  it('Should render Popover with default props', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`
        <Popover mode="${defaultProps.mode}" placement="${defaultProps.placement}" classModifier="${defaultProps.classModifier}">
            <Popover.Pop>
                ${defaultProps.content}
            </Popover.Pop>
            <Popover.Over>
                ${defaultProps.title}
            </Popover.Over>
        </Popover>
      `),
    );
  });
});
