import React from 'react';
import { render } from '@testing-library/react';
import Icon from '..';

const defaultProps = { icon: 'date' };

describe('<Icon/>', () => {
  it('Should render Icon', () => {
    const { asFragment } = render(<Icon {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
