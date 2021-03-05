import React from 'react';
import { render } from '@testing-library/react';
import Members from '../Members';

export const defaultProps = {
  header: () => {},
  title: () => {},
  footer: () => {},
  menu: () => {},
  members: [],
  anomaly: null,
  loaderMode: 'none',
};

export const membersMock = [
  {
    key: 99999,
    firstname: {
      label: 'Samuel',
    },
    lastname: {
      label: 'Gomez',
    },
    birthdate: {
      label: '20/10/1985',
    },
    sexe: {
      label: 'M',
    },
  },
];

describe('<Members/>', () => {
  it('Should render Members', () => {
    const { asFragment } = render(<Members {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render <Members /> with one member', () => {
    const { asFragment } = render(<Members {...defaultProps} members={membersMock} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
