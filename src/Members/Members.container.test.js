import React from 'react';
import { render, act } from '@testing-library/react';
import { MembersEnhanced } from './Members.container';

const defaultProps = {
  header: () => {},
  title: () => {},
  footer: () => {},
  members: [],
  anomaly: null,
  loaderMode: 'none',
  deleteNotification: () => {},
  notifications: [],
};

describe('Component <MembersEnhanced />', () => {
  it('Should render <MembersEnhanced /> with defaultProps', async () => {
    await act(async () => {
      const { asFragment } = render(<MembersEnhanced {...defaultProps} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('Should render <MembersEnhanced /> with one member', () => {
    const useMembersMock = jest.fn(() => ({
      members: [
        {
          _id: '00001',
          type: 'PP',
          firstname: 'Samuel',
          lastname: 'Gomez',
          birthdate: '20/10/1985',
          sexe: 'M',
        },
      ],
      onChangeOrder: () => {},
      sorting: {
        field: '',
        order: 'NONE',
      },
    }));
    act(() => {
      const { asFragment } = render(<MembersEnhanced {...defaultProps} useMembersFn={useMembersMock} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
