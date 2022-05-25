import { render } from '@testing-library/react';
import { emptyFunction } from 'shared/testsUtils';
import ModalCommonFooter from '../ModalCommonFooter';

const defaultProps = {
  onSubmit: emptyFunction,
  onCancel: emptyFunction,
};

describe('<ModalCommonFooter/>', () => {
  it('Should render ModalCommonFooter', () => {
    const { asFragment } = render(<ModalCommonFooter {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
