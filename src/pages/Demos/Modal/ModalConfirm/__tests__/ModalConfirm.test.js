import { render } from '@testing-library/react';
import { emptyFunction } from 'shared/testsUtils';
import ModalConfirm from '../ModalConfirm';

const defaultProps = {
  isOpen: false,
  onCancel: emptyFunction,
};

describe('<ModalConfirm/>', () => {
  it('Should render ModalConfirm', () => {
    const { baseElement } = render(<ModalConfirm {...defaultProps} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Should render ModalConfirm opened', () => {
    const { baseElement } = render(<ModalConfirm {...defaultProps} isOpen />);
    expect(baseElement).toMatchSnapshot();
  });
});
