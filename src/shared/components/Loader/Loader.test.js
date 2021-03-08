import React from 'react';
import { render } from '@testing-library/react';
import Loader from './Loader';

const defaultProps = {
  classModifier: '',
  text: '',
  mode: 'none',
};
describe('<Loader />', () => {
  it('Should render Loader', () => {
    const { asFragment } = render(<Loader {...defaultProps} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
