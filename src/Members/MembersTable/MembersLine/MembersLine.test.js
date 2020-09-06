import React from 'react';
import { render } from '@testing-library/react';
import MembersLine from './MembersLine';

const defaultProps = {
  _id: '00001',
  type: 'PP',
  firstname: 'Samuel',
  lastname: 'Gomez',
  birthdate: '1985-10-20T13:44:20.540000',
  created: '2020-10-20T13:44:20.540000',
  fetch: jest.fn(),
};

describe('<MembersLine/>', () => {
  it('Should render MembersLine', () => {
    const tbody = document.createElement('tbody');
    const { asFragment } = render(<MembersLine {...defaultProps} />, {
      container: document.body.appendChild(tbody),
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
