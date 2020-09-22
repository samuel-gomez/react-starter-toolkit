import React from 'react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { render, act } from '@testing-library/react';
import Environment from 'App/Environment';
import MembersPage from 'Members';
import DashboardPage from 'Dashboard';
import SlashDesignSystemPage from 'SlashDesignSystem';
import { renderLayoutMembers, renderLayoutDashboard, renderLayoutSlashDesignSystem } from './Routes';
import Routes from '.';

describe('Route', () => {
  it('Should render Routes', async () => {
    await act(async () => {
      const { asFragment } = render(
        <Environment>
          <Router>
            <Routes />
          </Router>
        </Environment>,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('NotFound Page', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/random']}>
        <Routes />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('Should return <MembersPage /> with props when call renderLayoutMembers', () => {
    const customProps = {
      myProp: 'property members',
    };
    const result = renderLayoutMembers({ ...customProps });
    expect(result.type).toEqual(MembersPage);
    expect(result.props.myProp).toEqual('property members');
  });
  it('Should return <DashboardPage /> with props when call renderLayoutDashboard', () => {
    const customProps = {
      myProp: 'property dashboard',
    };
    const result = renderLayoutDashboard({ ...customProps });
    expect(result.type).toEqual(DashboardPage);
    expect(result.props.myProp).toEqual('property dashboard');
  });
  it('Should return <FormPage /> with props when call renderLayoutSlashDesignSystem', () => {
    const customProps = {
      myProp: 'property slash',
    };
    const result = renderLayoutSlashDesignSystem({ ...customProps });
    expect(result.type).toEqual(SlashDesignSystemPage);
    expect(result.props.myProp).toEqual('property slash');
  });
});
