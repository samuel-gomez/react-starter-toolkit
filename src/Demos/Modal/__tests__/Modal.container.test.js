import React from 'react';
import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import ModalPageContainer from '../Modal.container';

const defaultProps = {};

describe('<ModalPageContainer/>', () => {
  it('Should render ModalPageContainer', () => {
    const { baseElement } = renderWithWrapperStaticRouter(<ModalPageContainer {...defaultProps} />);
    expect(baseElement).toMatchSnapshot();
  });
});
