import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import Layout from '../Layout';

describe('Layout', () => {
  it.each`
    fullScreen | disabled
    ${false}   | ${{ header: true }}
    ${false}   | ${{ title: true }}
    ${false}   | ${{ footer: true }}
    ${false}   | ${{ menu: true }}
    ${true}    | ${{ header: true, title: true, menu: true, footer: true }}
  `('Should render when disabled: $disabled', ({ disabled, fullScreen }) => {
    const { asFragment } = renderWithWrapperStaticRouter(<Layout disabled={disabled} fullScreen={fullScreen} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
