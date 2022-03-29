import React from 'react';
import { render } from '@testing-library/react';
import Members from '../Members';
import { defaultProps, membersFormattedMock } from './Members.mock';

describe('<Members/>', () => {
  it('Should render Members', () => {
    const { asFragment } = render(<Members {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render <Members /> with one member', () => {
    const { asFragment } = render(<Members {...defaultProps} members={membersFormattedMock} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
