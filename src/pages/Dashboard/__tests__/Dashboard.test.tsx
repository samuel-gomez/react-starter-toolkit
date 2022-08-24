import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import Dashboard from '../Dashboard';

describe('<Dashboard page/>', () => {
  it('Renders Dashboard page component without crashing', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<Dashboard />);
    expect(asFragment()).toMatchSnapshot();
  });
});
