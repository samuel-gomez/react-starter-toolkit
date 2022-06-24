import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import Layout from '../Layout';

describe('Layout', () => {
  it.each`
    disabled
    ${{ header: true }}
    ${{ title: true }}
    ${{ footer: true }}
    ${{ menu: true }}
  `('Should render when disabled: $disabled', ({ disabled }) => {
    const { asFragment } = renderWithWrapperStaticRouter(<Layout disabled={disabled} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
