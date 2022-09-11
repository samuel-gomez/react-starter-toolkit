import { screen, render, act } from '@testing-library/react';
import Card from '../index';

const defaultProps = { title: 'title', picture: { name: 'accordion.svg', alt: 'alt_accordion' } };

describe('<Card/>', () => {
  it('Should render Card when image loaded', async () => {
    const { asFragment } = render(<Card {...defaultProps} />);
    await act(() => {
      screen.getByAltText('loading...');
    });
    act(() => {
      screen.getByAltText('alt_accordion');
    });
    expect(asFragment()).toMatchSnapshot();
  });
  it('Should render Card when image loading', () => {
    const { asFragment } = render(<Card {...defaultProps} />);
    act(() => {
      screen.getByAltText('loading...');
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
