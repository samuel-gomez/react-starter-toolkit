import React from 'react';
import { render, act } from '@testing-library/react';
import { emptyFunction } from 'shared/testsUtils';
import { MembersEnhanced } from '../Members.container';
import { defaultProps, membersMock } from './Members.test';

const setUseMembersMock = (members = []) =>
  jest.fn(() => ({
    members,
    onChangeSorting: emptyFunction,
    stateSorting: {
      field: '',
      order: 'NONE',
    },
  }));
describe('Component <MembersEnhanced />', () => {
  it('Should render <MembersEnhanced /> with defaultProps', async () => {
    await act(async () => {
      const { asFragment } = render(<MembersEnhanced {...defaultProps} useMembersFn={setUseMembersMock()} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('Should render <MembersEnhanced /> with one member', async () => {
    await act(async () => {
      const { asFragment } = render(<MembersEnhanced {...defaultProps} useMembersFn={setUseMembersMock(membersMock)} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
