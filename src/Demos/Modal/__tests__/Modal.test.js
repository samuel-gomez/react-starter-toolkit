import React from 'react';
import { emptyFunction, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import ModalPage from '../Modal';

const defaultProps = {
  openModalConfirm: emptyFunction,
  modalConfirmProps: {
    isOpen: false,
    onCancel: emptyFunction,
  },
};

describe('<ModalPage/>', () => {
  it('Should render ModalPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<ModalPage {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
