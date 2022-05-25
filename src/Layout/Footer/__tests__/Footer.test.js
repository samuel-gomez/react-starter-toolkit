import { render } from '@testing-library/react';
import Footer from '../Footer';

it('Render <Footer/>', () => {
  const { asFragment } = render(<Footer icon="logo" />);
  expect(asFragment()).toMatchSnapshot();
});
