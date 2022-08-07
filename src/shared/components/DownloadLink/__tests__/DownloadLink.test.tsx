import { render } from '@testing-library/react';
import { MODES } from 'shared/components/Loader';
import DownloadLink from '../DownloadLink';

const defaultProps = {
  loaderMode: MODES.none,
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
