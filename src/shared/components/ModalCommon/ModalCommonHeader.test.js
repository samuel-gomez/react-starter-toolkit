import React from 'react';
import { render } from '@testing-library/react';
import ModalCommonHeader from './ModalCommonHeader';

const defaultProps = {
  title: 'my title',
  onCancel: () => {},
};

describe('ModalCommonHeader', () => {
  it('Should render ModalCommonHeader without message', () => {
    const { asFragment } = render(<ModalCommonHeader {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
