import { render } from '@testing-library/react';
import { emptyFunction } from 'shared/testsUtils';
import ModalCommonHeader from '../ModalCommonHeader';

const defaultProps = {
  onCancel: emptyFunction,
};

describe('ModalCommonHeader', () => {
  it('Should render ModalCommonHeader without title', () => {
    const { asFragment } = render(<ModalCommonHeader {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render ModalCommonHeader with title', () => {
    const { asFragment } = render(<ModalCommonHeader {...defaultProps} title="my title" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
