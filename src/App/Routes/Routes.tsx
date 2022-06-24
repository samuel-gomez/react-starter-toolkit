import { useContext, ComponentProps } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PageNotFound from 'pages/NotFound';
import PageUnauthorize from 'pages/Unauthorize';
import Members from 'pages/Members';
import SearchMembers from 'pages/SearchMembers';
import SlashDesignSystem from 'pages/SlashDesignSystem';
import Modal from 'pages/Demos/Modal';
import Button from 'pages/Demos/Button';
import Notification from 'pages/Demos/Notification';
import Dashboard from 'pages/Dashboard';
import ROUTE_URL from 'App/Routes/constants';
import { UserContext } from 'App/UserProvider';
import Loader, { MODES } from 'shared/components/Loader';

export const withAuth = <T extends object>(
  Component: React.ComponentType<T>,
  UserContextObj = UserContext,
  authorized = [''],
  NavigateCmpt = Navigate,
  LoaderCmpt = Loader,
) => {
  const NewComp = (props: ComponentProps<typeof Component> | object) => {
    const userContext = useContext(UserContextObj);

    if (userContext.isEnabled && userContext.isLoading) {
      return <LoaderCmpt text="Chargement des données utilisateur..." mode={MODES.get} classModifier="fullscreen" />;
    }

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
  NotificationCmpt?: typeof Notification;
  PageUnauthorizeCmpt?: typeof PageUnauthorize;
  withAuthFn?: typeof withAuth;
};

const RoutesCmpt = ({
  SlashDesignSystemCmpt = SlashDesignSystem,
  DashboardCmpt = Dashboard,
  MembersCmpt = Members,
  SearchMembersCmpt = SearchMembers,
  ModalCmpt = Modal,
  ButtonCmpt = Button,
  NotificationCmpt = Notification,
  PageUnauthorizeCmpt = PageUnauthorize,
  withAuthFn = withAuth,
}: TRoutesCmpt) => (
  <Routes>
    <Route path={ROUTE_URL.SLASH} element={withAuthFn(SlashDesignSystemCmpt)} />
    <Route path={ROUTE_URL.MEMBERS} element={withAuthFn(MembersCmpt)} />
    <Route path={ROUTE_URL.SEARCHMEMBERS} element={withAuthFn(SearchMembersCmpt)} />
    <Route path={ROUTE_URL.MODAL} element={withAuthFn(ModalCmpt)} />
    <Route path={ROUTE_URL.BUTTON} element={withAuthFn(ButtonCmpt)} />
    <Route path={ROUTE_URL.NOTIFICATION} element={withAuthFn(NotificationCmpt)} />
    <Route path={ROUTE_URL.DASHBOARD} element={withAuthFn(DashboardCmpt)} />
    <Route path={ROUTE_URL.UNAUTHORIZE} element={<PageUnauthorizeCmpt />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

export default RoutesCmpt;
