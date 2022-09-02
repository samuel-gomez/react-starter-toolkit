import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import Home from '../Home';

describe('<Home page/>', () => {
  it('Renders Home page component without crashing', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});
