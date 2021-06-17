import React from 'react';
import { render } from '@testing-library/react';
import { emptyFunction } from 'shared/testsUtils';
import ButtonPage from '../Button';

const defaultProps = {
  header: emptyFunction,
  title: emptyFunction,
  footer: emptyFunction,
  menu: emptyFunction,
};

describe('<ButtonPage/>', () => {
  it('Should render ButtonPage', () => {
    const { asFragment } = render(<ButtonPage {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
