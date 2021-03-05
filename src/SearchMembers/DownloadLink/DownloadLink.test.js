import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import DownloadLink from './DownloadLink';

const defaultProps = {
  isDisabled: false,
  onDownload: jest.fn(),
};

describe('DownloadLink', () => {
  it('Render <DownloadLink/>', () => {
    const { asFragment } = render(<DownloadLink {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Render <DownloadLink/> disabled', () => {
    const { asFragment } = render(<DownloadLink {...defaultProps} isDisabled />);
    expect(asFragment()).toMatchSnapshot();
  });
});
