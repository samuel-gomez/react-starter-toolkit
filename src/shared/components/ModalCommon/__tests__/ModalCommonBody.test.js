import { render } from '@testing-library/react';
import ModalCommonBody from '../ModalCommonBody';

const defaultProps = {
  icon: './icon.svg',
  children: <p>content</p>,
};

describe('ModalCommonBody', () => {
  it('Should render ModalCommonBody without message', () => {
    const { asFragment } = render(<ModalCommonBody {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render ModalCommonBody with message', () => {
    const { asFragment } = render(<ModalCommonBody {...defaultProps} anomaly={{ label: 'there is an error', detail: 'detail' }} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render ModalCommonBody with title', () => {
    const { asFragment } = render(<ModalCommonBody {...defaultProps} title="there is a title" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
