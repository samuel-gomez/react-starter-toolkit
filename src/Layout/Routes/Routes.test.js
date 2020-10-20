import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, act } from '@testing-library/react';
import withWrapperEnvAndAuth from 'shared/hoc/withWrapperEnvAndAuth';
import MembersPage from 'Members';
import DashboardPage from 'Dashboard';
import SlashDesignSystemPage from 'SlashDesignSystem';
import { renderLayoutMembers, renderLayoutDashboard, renderLayoutSlashDesignSystem } from './Routes';
import Routes from '.';

const RoutesEnvAndAuth = withWrapperEnvAndAuth(Routes);

describe('Route', () => {
  it('Should render Routes', async () => {
    await act(async () => {
      const { asFragment } = render(
        <MemoryRouter initialEntries={['/']}>
          <RoutesEnvAndAuth authRole="ELMU_Admin" />
        </MemoryRouter>,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('NotFound Page', async () => {
    await act(async () => {
      const { asFragment } = render(
        <MemoryRouter initialEntries={['/random']}>
          <RoutesEnvAndAuth />
        </MemoryRouter>,
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });

  const parentProps = {
    authName: 'Bob Smith',
    authRole: 'admin',
  };
  it('Should return <MembersPage /> with props when call renderLayoutMembers', () => {
    const customProps = {
      myProp: 'property members',
    };
    const result = renderLayoutMembers(parentProps)({ ...customProps });
    expect(result.type).toEqual(MembersPage);
    expect(result.props.myProp).toEqual('property members');
  });
  it('Should return <DashboardPage /> with props when call renderLayoutDashboard', () => {
    const customProps = {
      myProp: 'property dashboard',
    };
    const result = renderLayoutDashboard(parentProps)({ ...customProps });
    expect(result.type).toEqual(DashboardPage);
    expect(result.props.myProp).toEqual('property dashboard');
  });
  it('Should return <SlashDesignSystemPage /> with props when call renderLayoutSlashDesignSystem', () => {
    const customProps = {
      myProp: 'property slash',
    };
    const result = renderLayoutSlashDesignSystem(parentProps)({ ...customProps });
    expect(result.type).toEqual(SlashDesignSystemPage);
    expect(result.props.myProp).toEqual('property slash');
  });
});
