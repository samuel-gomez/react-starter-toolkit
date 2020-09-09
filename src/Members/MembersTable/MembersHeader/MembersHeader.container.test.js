import React from 'react';
import { render } from '@testing-library/react';
import { MembersHeaderEnhanced } from './MembersHeader.container';

describe('<MembersHeaderEnhanced />', () => {
  it('Should render MembersHeaderEnhanced', () => {
    const table = document.createElement('table');
    const defaultProps = {};
    const { asFragment } = render(<MembersHeaderEnhanced {...defaultProps} />, {
      container: document.body.appendChild(table),
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
