import { render, act, waitFor } from '@testing-library/react';
import Cards from '../index';

const defaultProps = {
  items: [
    { id: 'id1', title: 'title1', picture: { name: 'accordion.svg', alt: 'alt_accordion' } },
    { id: 'id2', title: 'title2', picture: { name: 'accordion.svg', alt: 'alt_accordion' } },
  ],
};

describe('<Cards/>', () => {
  it('Should render Cards', async () => {
    const { asFragment, getAllByAltText } = render(<Cards {...defaultProps} />);

    await act(() => expect(getAllByAltText('loading...').length).toEqual(2));
    await waitFor(() => expect(getAllByAltText('alt_accordion').length).toEqual(2));
    expect(asFragment()).toMatchSnapshot();
  });
});
