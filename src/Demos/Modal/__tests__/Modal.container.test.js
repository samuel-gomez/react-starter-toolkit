import React from 'react';
import { render } from '@testing-library/react';
import ModalPageContainer from '../Modal.container';

const defaultProps = {
  header: () => {},
  title: () => {},
  footer: () => {},
  menu: () => {},
};

describe('<ModalPageContainer/>', () => {
  it('Should render ModalPageContainer', () => {
    const { asFragment } = render(<ModalPageContainer {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
