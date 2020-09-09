import React from 'react';
import { render } from '@testing-library/react';
import { MembersLineEnhanced } from './MembersLine.container';

describe('<MembersLineEnhanced />', () => {
  it('Should render MembersLineEnhanced', () => {
    const tbody = document.createElement('tbody');
    const defaultProps = {
      _id: '00001',
      sexe: 'M',
      firstname: 'Samuel',
      lastname: 'Gomez',
      birthdate: '1985-10-20T13:44:20.540000',
      created: '2020-10-20T13:44:20.540000',
    };
    const { asFragment } = render(<MembersLineEnhanced {...defaultProps} />, {
      container: document.body.appendChild(tbody),
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
