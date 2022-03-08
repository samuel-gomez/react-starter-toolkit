import React from 'react';
import { render, act } from '@testing-library/react';
import Cards from '../index';

const defaultProps = { items: [{ id: 'id', title: 'title', picture: { alt: 'alt', name: 'image.jpg' } }] };

describe('<Cards/>', () => {
  it('Should render Cards', async () => {
    await act(async () => {
      const { asFragment } = render(<Cards {...defaultProps} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
