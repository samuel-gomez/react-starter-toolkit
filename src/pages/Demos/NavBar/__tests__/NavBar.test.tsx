import { clearString } from 'shared/testsUtils';
import { code } from '../NavBar';

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
        <NavBarItem actionElt={<a className="af-nav__link" href="/" >Home</a>} />
        <NavBarItem actionElt={<a className="af-nav__link" href="/layout" >Example Link</a>} />
    </NavBar>
    `),
    );
  });
});
