import { render, act, waitFor } from '@testing-library/react';
import LasyImage, { loadImage } from '../index';

const defaultProps = { alt: 'alt', name: '' };

describe('<LasyImage/>', () => {
  it('Should render LasyImage', async () => {
    const { getByAltText, asFragment } = render(<LasyImage {...defaultProps} name="accordion.svg" alt="alt_accordion" />);
    await act(() => {
      getByAltText('loading...');
    });

    await waitFor(() => expect(getByAltText('alt_accordion')).toBeDefined());
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render LasyImage unknown image', async () => {
    const { getByAltText, asFragment } = render(<LasyImage {...defaultProps} name="unknown.svg" alt="alt_unknown" />);
    await act(() => {
      getByAltText('loading...');
    });

    await waitFor(() => expect(getByAltText('alt_unknown')).toBeDefined());
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render LasyImage when loading', () => {
    const { asFragment } = render(<LasyImage {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('loadImage', () => {
  it('Should return import when loadImage have been called with image name and extension', async () => {
    const result = await loadImage('quality.png');
    expect(result.default).toEqual('quality.png');
  });

  it('Should return import when loadImage have been called with image name and without extension', async () => {
    const result = await loadImage('text.svg');
    expect(result.default).toEqual('text.svg');
  });

  it('Should return import when loadImage have been called with image unknown name and without extension', async () => {
    try {
      await loadImage('unknown.svg');
    } catch (error) {
      expect((error as Error).message).toEqual(
        "Cannot find module '../../../../public/images/unknown.svg' from 'src/shared/components/LazyImage/LazyImage.tsx'",
      );
    }
  });
});
