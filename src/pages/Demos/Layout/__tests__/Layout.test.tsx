import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import WithoutHeader from '../Layout';

describe('<WithoutHeader page/>', () => {
  it('Renders WithoutHeader page component without crashing', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<WithoutHeader />);
    expect(asFragment()).toMatchSnapshot();
  });
});
