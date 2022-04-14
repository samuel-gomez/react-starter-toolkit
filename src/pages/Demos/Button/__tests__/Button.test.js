import React from 'react';
import { render } from '@testing-library/react';
import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import ButtonPage from '../Button';

const defaultProps = {};

describe('<ButtonPage/>', () => {
  it('Should render ButtonPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<ButtonPage {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
