import { render } from '@testing-library/react';
import Loader from '../Loader';

const defaultProps = {
  classModifier: '',
  text: '',
  mode: 'none',
  isVisible: false,
  children: <span>my component to load</span>,
};

describe('<Loader />', () => {
  it('Should render Loader when loading', () => {
    const { asFragment } = render(<Loader {...defaultProps} isVisible />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render Loader when loaded', () => {
    const { asFragment } = render(<Loader {...defaultProps} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
