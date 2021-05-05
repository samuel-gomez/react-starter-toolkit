import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import DownloadLink from './DownloadLink';

const defaultProps = {
  isDisabled: false,
  onDownload: jest.fn(),
  loaderMode: 'get',
};

describe('DownloadLink', () => {
  it('Render <DownloadLink/>', () => {
    const { asFragment } = render(<DownloadLink {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Render <DownloadLink/> loaded', () => {
    const { asFragment } = render(<DownloadLink {...defaultProps} loaderMode="none" />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Render <DownloadLink/> loaded and disabled', () => {
    const { asFragment } = render(<DownloadLink {...defaultProps} isDisabled loaderMode="none" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
