import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import Unauthorize from '../Unauthorize';

describe('<Unauthorize page/>', () => {
  it('Renders Unauthorize page component without crashing', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<Unauthorize />);
    expect(asFragment()).toMatchSnapshot();
  });
});
