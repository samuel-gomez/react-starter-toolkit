import React from 'react';
import { render } from '@testing-library/react';
import { emptyFunction } from 'shared/testsUtils';
import ModalPageContainer from '../Modal.container';

const defaultProps = {
  header: emptyFunction,
  title: emptyFunction,
  footer: emptyFunction,
  menu: emptyFunction,
};

describe('<ModalPageContainer/>', () => {
  it('Should render ModalPageContainer', () => {
    const { asFragment } = render(<ModalPageContainer {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
