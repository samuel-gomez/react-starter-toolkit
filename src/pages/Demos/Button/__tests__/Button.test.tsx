import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import ButtonPage from '../Button';

describe('<ButtonPage/>', () => {
  it('Should render ButtonPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<ButtonPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
