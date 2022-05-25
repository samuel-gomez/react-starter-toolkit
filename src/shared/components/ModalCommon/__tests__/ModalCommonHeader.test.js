import { render } from '@testing-library/react';
import { emptyFunction } from 'shared/testsUtils';
import ModalCommonHeader from '../ModalCommonHeader';

const defaultProps = {
  title: 'my title',
  onCancel: emptyFunction,
};

describe('ModalCommonHeader', () => {
  it('Should render ModalCommonHeader without message', () => {
    const { asFragment } = render(<ModalCommonHeader {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
