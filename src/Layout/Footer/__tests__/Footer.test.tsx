import { render } from '@testing-library/react';
import Footer from '../Footer';

it('Render <Footer/>', () => {
  const { asFragment } = render(<Footer />);
  expect(asFragment()).toMatchSnapshot();
});

it('Render <Footer/> fullscreen', () => {
  const { asFragment } = render(<Footer fullScreen />);
  expect(asFragment()).toMatchSnapshot();
});
