import React from 'react';
import { render } from '@testing-library/react';
import ModalPage from '../Modal';

const defaultProps = {
  header: () => {},
  title: () => {},
  footer: () => {},
  menu: () => {},
  openModalConfirm: () => {},
  modalConfirmProps: {
    isOpen: false,
    onCancel: () => {},
  },
};

describe('<ModalPage/>', () => {
  it('Should render ModalPage', () => {
    const { asFragment } = render(<ModalPage {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
