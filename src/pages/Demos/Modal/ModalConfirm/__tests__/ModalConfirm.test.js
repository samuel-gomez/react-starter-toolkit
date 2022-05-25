import { render } from '@testing-library/react';
import { emptyFunction } from 'shared/testsUtils';
import ModalConfirm from '../ModalConfirm';

const defaultProps = {
  isOpen: false,
  onCancel: emptyFunction,
};

describe('<ModalConfirm/>', () => {
  it('Should render ModalConfirm', () => {
    const { asFragment } = render(<ModalConfirm {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
