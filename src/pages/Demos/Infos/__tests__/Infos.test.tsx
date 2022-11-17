import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import InfosPage, { code } from '../Infos';

describe('<InfosPage />', () => {
  it('Should render InfosPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<InfosPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const onChange = jest.fn();

  const defaultProps = {
    infos: [{ word: 'Portefeuille :', definition: '000123456789' }],
    onChange,
  };

  it('Should render Infos with default props', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(clearString(`<Infos infos={${JSON.stringify(defaultProps.infos)}} />`));
  });
});
