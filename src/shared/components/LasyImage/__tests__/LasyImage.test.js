import { render, act } from '@testing-library/react';
import LasyImage from '../index';

const defaultProps = { alt: 'alt' };

describe('<LasyImage/>', () => {
  it('Should render LasyImage', async () => {
    const { getByAltText, asFragment } = render(<LasyImage {...defaultProps} name="accordion.svg" alt="alt_accordion" />);
    await act(() => getByAltText('loading...'));
    act(() => getByAltText('alt_accordion'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render LasyImage unknown image', async () => {
    const { getByAltText, asFragment } = render(<LasyImage {...defaultProps} name="unknown.svg" alt="alt_unknown" />);
    await act(() => getByAltText('loading...'));
    act(() => getByAltText('alt_unknown'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render LasyImage when loading', () => {
    const { asFragment } = render(<LasyImage {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
