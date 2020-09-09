import React from 'react';
import { render } from '@testing-library/react';
import { MembersHeaderEnhanced, setSortingInfo } from './MembersHeader.container';

describe('<MembersHeaderEnhanced />', () => {
  it('Should render MembersHeaderEnhanced', () => {
    const table = document.createElement('table');
    const defaultProps = { headers: [{ label: 'name', id: 'id'}]};
    const { asFragment } = render(<MembersHeaderEnhanced {...defaultProps} />, {
      container: document.body.appendChild(table),
    });
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('setSortingInfo', () => {
  it('Should return empty object when receive field is false', () => {
    const result = setSortingInfo({ order: 1 });
    expect(result).toEqual({});
  });

  it('Should return object with field key and order value when field is true', () => {
    const result = setSortingInfo({field: 'fieldname', order:1});
    expect(result).toEqual({fieldname: 1});
  });
});