import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import TitlePage, { code } from '../Title';

describe('<TitlePage/>', () => {
  it('Should render TitlePage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<TitlePage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const onChange = jest.fn();

  const defaultProps = {
    name: 'name-field',
    className: 'af-title--content',
    title: 'My title',
    onChange,
  };

  it('Should render Title with default props', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(clearString(`<h1 className="${defaultProps.className}">${defaultProps.title}</h1>`));
  });
});
