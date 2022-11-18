import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import FooterPage, { code } from '../Footer';

describe('<Footer />', () => {
  it('Should render FooterPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<FooterPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const onChange = jest.fn();

  const defaultProps = {
    copyright: '© 2022-2023 AXA Webcenter',
    isIconHidden: false,
    onChange,
  };

  it('Should render Footer with default props', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(clearString(`<Footer copyright="${defaultProps.copyright}"  isIconHidden={${defaultProps.isIconHidden}} />`));
  });
});
