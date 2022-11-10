import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import NavBarPage, { code } from '../NavBar';

describe('<NavBarPage />', () => {
  it('Should render NavBarPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<NavBarPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const onChange = jest.fn();

  const defaultProps = {
    classModifier: '',
    positionInit: 1,
    isVisible: true,
    onChange,
  };

  it('Should render NavBar with default props', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`
    <NavBar classModifier="${defaultProps.classModifier}" positionInit={${defaultProps.positionInit}} isVisible={${defaultProps.isVisible}} onClick={onClick}>
        <NavBarItem actionElt={<a className="af-nav__link">Home</a>} />
        <NavBarItem actionElt={<a className="af-nav__link">Forms</a>} />
    </NavBar>
    `),
    );
  });
});
