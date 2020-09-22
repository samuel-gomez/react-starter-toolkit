import React from 'react';
import { render, act } from '@testing-library/react';
import LasyImage from './index';

const defaultProps = { alt: 'alt', name: 'image.jpg' };

describe('<LasyImage/>', () => {
  it('Should render LasyImage', async () => {
    await act(async () => {
      const { asFragment } = render(<LasyImage {...defaultProps} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
