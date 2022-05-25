import { render, act } from '@testing-library/react';
import Card from '../index';

const defaultProps = { title: 'title', picture: { name: 'accordion.svg', alt: 'alt_accordion' } };

describe('<Card/>', () => {
  it('Should render Card when image loaded', async () => {
    const { asFragment, getByAltText } = render(<Card {...defaultProps} />);
    await act(() => getByAltText('loading...'));
    act(() => getByAltText('alt_accordion'));
    expect(asFragment()).toMatchSnapshot();
  });
  it('Should render Card when image loading', () => {
    const { asFragment, getByAltText } = render(<Card {...defaultProps} />);
    act(() => getByAltText('loading...'));
    expect(asFragment()).toMatchSnapshot();
  });
});
