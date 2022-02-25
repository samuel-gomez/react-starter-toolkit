import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import MembersPage from 'Members';
import DashboardPage from 'Dashboard';
import SlashDesignSystemPage from 'SlashDesignSystem';
import SearchMembersPage from 'SearchMembers';
import ModalPage from 'Demos/Modal';
import ButtonPage from 'Demos/Button';
import {
  renderLayoutMembers,
  renderLayoutDashboard,
  renderLayoutSlashDesignSystem,
  renderLayoutSearchMembers,
  renderLayoutModal,
  renderLayoutButton,
} from './Routes';
import Routes from '.';

describe('Route', () => {
  it('Should render Routes', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('NotFound Page', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/random']}>
        <Routes />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
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

  it('Should return <SearchMembersPage /> with props when call renderLayoutSearchMembers', () => {
    const customProps = {
      myProp: 'property search member',
    };
    const result = renderLayoutSearchMembers(parentProps)({ ...customProps });
    expect(result.type).toEqual(SearchMembersPage);
    expect(result.props.myProp).toEqual('property search member');
  });

  it('Should return <ModalPage /> with props when call renderLayoutModal', () => {
    const customProps = {
      myProp: 'property modal',
    };
    const result = renderLayoutModal(parentProps)({ ...customProps });
    expect(result.type).toEqual(ModalPage);
    expect(result.props.myProp).toEqual('property modal');
  });

  it('Should return <ButtonPage /> with props when call renderLayoutButton', () => {
    const customProps = {
      myProp: 'property button',
    };
    const result = renderLayoutButton(parentProps)({ ...customProps });
    expect(result.type).toEqual(ButtonPage);
    expect(result.props.myProp).toEqual('property button');
  });
});
