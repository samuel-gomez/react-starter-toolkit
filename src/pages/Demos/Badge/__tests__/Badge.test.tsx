import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import Badge, { code } from '../Badge';

describe('<Badge />', () => {
  it('Should render Badge', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<Badge />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const onChange = jest.fn();

  const defaultProps = {
    children: 'Coucou',
    classModifier: 'success',
    disabled: false,
    onChange,
  };

  it('Should render Badge with default props', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`
      <Badge
        classModifier="${defaultProps.classModifier}"
        disabled={${defaultProps.disabled}}>
        ${defaultProps.children}
      </Badge>
      `),
    );
  });
});
