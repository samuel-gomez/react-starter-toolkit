import { useContext, ComponentProps } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PageNotFound from 'pages/NotFound';
import PageUnauthorize from 'pages/Unauthorize';
import Members from 'pages/Members';
import SearchMembers from 'pages/SearchMembers';
import SlashDesignSystem from 'pages/SlashDesignSystem';
import Modal from 'pages/Demos/Modal';
import Button from 'pages/Demos/Button';
import Dashboard from 'pages/Dashboard';
import ROUTE_URL from 'Layout/constants';
import { UserContext } from 'App/UserProvider';

export const withAuth = <T extends object>(
  Component: React.ComponentType<T>,
  UserContextObj = UserContext,
  NavigateCmpt = Navigate,
  authorized = [''],
) => {
  const NewComp = (props: ComponentProps<typeof Component> | object) => {
    const userContext = useContext(UserContextObj);
    return authorized.includes(userContext?.authRole) || !userContext.isEnabled ? (
      <Component {...(props as T)} />
    ) : (
      <NavigateCmpt to={ROUTE_URL.UNAUTHORIZE} />
    );
  };

  return <NewComp />;
};

type TRoutesCmpt = {
  SlashDesignSystemCmpt?: typeof SlashDesignSystem;
  DashboardCmpt?: typeof Dashboard;
  MembersCmpt?: typeof Members;
  SearchMembersCmpt?: typeof SearchMembers;
  ModalCmpt?: typeof Modal;
  ButtonCmpt?: typeof Button;
  PageUnauthorizeCmpt?: typeof PageUnauthorize;
  withAuthCmpt?: typeof withAuth;
};

const RoutesCmpt = ({
  SlashDesignSystemCmpt = SlashDesignSystem,
  DashboardCmpt = Dashboard,
  MembersCmpt = Members,
  SearchMembersCmpt = SearchMembers,
  ModalCmpt = Modal,
  ButtonCmpt = Button,
  PageUnauthorizeCmpt = PageUnauthorize,
  withAuthCmpt = withAuth,
}: TRoutesCmpt) => (
  <Routes>
    <Route path={ROUTE_URL.SLASH} element={withAuthCmpt(SlashDesignSystemCmpt)} />
    <Route path={ROUTE_URL.MEMBERS} element={withAuthCmpt(MembersCmpt)} />
    <Route path={ROUTE_URL.SEARCHMEMBERS} element={withAuthCmpt(SearchMembersCmpt)} />
    <Route path={ROUTE_URL.MODAL} element={withAuthCmpt(ModalCmpt)} />
    <Route path={ROUTE_URL.BUTTON} element={withAuthCmpt(ButtonCmpt)} />
    <Route path={ROUTE_URL.DASHBOARD} element={withAuthCmpt(DashboardCmpt)} />
    <Route path={ROUTE_URL.UNAUTHORIZE} element={<PageUnauthorizeCmpt />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

export default RoutesCmpt;
