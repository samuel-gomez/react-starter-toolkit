import { render } from '@testing-library/react';
import ModalCommonBody from '../ModalCommonBody';

describe('ModalCommonBody', () => {
  it('Should render ModalCommonBody without props', () => {
    const { asFragment } = render(<ModalCommonBody />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render ModalCommonBody with icon', () => {
    const { asFragment } = render(<ModalCommonBody icon="./icon.svg" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render ModalCommonBody with anomaly', () => {
    const { asFragment } = render(<ModalCommonBody anomaly={{ label: 'there is an error', detail: 'detail' }} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render ModalCommonBody with title', () => {
    const { asFragment } = render(<ModalCommonBody title="there is a title" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render ModalCommonBody with children', () => {
    const { asFragment } = render(
      <ModalCommonBody title="there is a title">
        <p>child</p>
      </ModalCommonBody>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
