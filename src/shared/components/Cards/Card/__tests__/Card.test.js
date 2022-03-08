import React from 'react';
import { render, act } from '@testing-library/react';
import Card from '../index';

const defaultProps = { title: 'title', picture: { alt: 'alt', name: 'image.jpg' } };

describe('<Card/>', () => {
  it('Should render Card', async () => {
    await act(async () => {
      const { asFragment } = render(<Card {...defaultProps} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
