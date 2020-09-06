import React from 'react';
import { render } from '@testing-library/react';
import { MembersHeaderThEnhanced } from './MembersHeaderTh.container';

describe('<MembersHeaderThEnhanced />', () => {
  it('Should render MembersHeaderThEnhanced with no sortable button', () => {
    const tr = document.createElement('tr');
    const defaultProps = { children: 'No sortable', sortingInfo: {} };
    const { asFragment, getByRole } = render(<MembersHeaderThEnhanced {...defaultProps} />, {
      container: document.body.appendChild(tr),
    });
    expect(getByRole('columnheader')).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render MembersHeaderThEnhanced with sortable button for firstname column', () => {
    const tr = document.createElement('tr');
    const defaultProps = { children: 'sortable', sortingInfo: { firstname: 1 }, field: 'firstname' };
    const { asFragment, container } = render(<MembersHeaderThEnhanced {...defaultProps} />, {
      container: document.body.appendChild(tr),
    });
    expect(container.querySelector('.glyphicon-arrow-xs-up')).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });
});
