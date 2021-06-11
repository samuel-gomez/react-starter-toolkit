import React from 'react';
import { render } from '@testing-library/react';
import { emptyFunction } from 'shared/testsUtils';
import ModalPage from '../Modal';

const defaultProps = {
  header: emptyFunction,
  title: emptyFunction,
  footer: emptyFunction,
  menu: emptyFunction,
  openModalConfirm: emptyFunction,
  modalConfirmProps: {
    isOpen: false,
    onCancel: emptyFunction,
  },
};

describe('<ModalPage/>', () => {
  it('Should render ModalPage', () => {
    const { asFragment } = render(<ModalPage {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
