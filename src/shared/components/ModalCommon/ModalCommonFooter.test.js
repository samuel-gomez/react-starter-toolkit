import React from 'react';
import { render } from '@testing-library/react';
import ModalCommonFooter from './ModalCommonFooter';

const defaultProps = {
  onSubmit: () => {},
  onCancel: () => {},
};

describe('<ModalCommonFooter/>', () => {
  it('Should render ModalCommonFooter', () => {
    const { asFragment } = render(<ModalCommonFooter {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
