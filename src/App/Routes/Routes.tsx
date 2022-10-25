import { useContext, ComponentProps } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PageNotFound from 'pages/NotFound';
import PageUnauthorize from 'pages/Unauthorize';
import Members from 'pages/Demos/Members';
import SearchMembers from 'pages/Demos/SearchMembers';
import SlashDesignSystem from 'pages/Demos/SlashDesignSystem';
import Modal from 'pages/Demos/Modal';
import Button from 'pages/Demos/Button';
import Notification from 'pages/Demos/Notification';
import Home from 'pages/Home';
import Layout from 'pages/Demos/Layout';
import Alert from 'pages/Demos/Alert';
import TextInput from 'pages/Demos/TextInput';
import Tabs from 'pages/Demos/Tabs';
import RadioInput from 'pages/Demos/RadioInput';
import Restitution from 'pages/Demos/Restitution';
import ROUTE_URL from 'App/Routes/constants';
import { UserContext } from 'App/UserProvider';
import Loader, { MODES } from 'shared/components/Loader';
import { PROFILS } from 'shared/constants';

export const withAuth = <T extends object>(
  Component: React.ComponentType<T>,
  UserContextObj = UserContext,
  authorized = PROFILS,
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
  HomeCmpt?: typeof Home;
  MembersCmpt?: typeof Members;
  SearchMembersCmpt?: typeof SearchMembers;
  ModalCmpt?: typeof Modal;
  ButtonCmpt?: typeof Button;
  NotificationCmpt?: typeof Notification;
  PageUnauthorizeCmpt?: typeof PageUnauthorize;
  withAuthFn?: typeof withAuth;
  LayoutCmpt?: typeof Layout;
  AlertCmpt?: typeof Alert;
  TextInputCmpt?: typeof TextInput;
  TabsCmpt?: typeof Tabs;
  RadioInputCmpt?: typeof RadioInput;
  RestitutionCmpt?: typeof Restitution;
};

const RoutesCmpt = ({
  SlashDesignSystemCmpt = SlashDesignSystem,
  HomeCmpt = Home,
  MembersCmpt = Members,
  SearchMembersCmpt = SearchMembers,
  ModalCmpt = Modal,
  ButtonCmpt = Button,
  NotificationCmpt = Notification,
  PageUnauthorizeCmpt = PageUnauthorize,
  LayoutCmpt = Layout,
  AlertCmpt = Alert,
  TextInputCmpt = TextInput,
  TabsCmpt = Tabs,
  RadioInputCmpt = RadioInput,
  RestitutionCmpt = Restitution,
  withAuthFn = withAuth,
}: TRoutesCmpt) => (
  <Routes>
    <Route path={ROUTE_URL.HOME} element={withAuthFn(HomeCmpt)} />
    <Route path="demos">
      <Route index element={withAuthFn(SlashDesignSystemCmpt)} />
      <Route path={ROUTE_URL.MEMBERS} element={withAuthFn(MembersCmpt)} />
      <Route path={ROUTE_URL.SEARCHMEMBERS} element={withAuthFn(SearchMembersCmpt)} />
      <Route path={ROUTE_URL.MODAL} element={withAuthFn(ModalCmpt)} />
      <Route path={ROUTE_URL.BUTTON} element={withAuthFn(ButtonCmpt)} />
      <Route path={ROUTE_URL.NOTIFICATION} element={withAuthFn(NotificationCmpt)} />
      <Route path={ROUTE_URL.ALERT} element={withAuthFn(AlertCmpt)} />
      <Route path={ROUTE_URL.TEXT_INPUT} element={withAuthFn(TextInputCmpt)} />
      <Route path={ROUTE_URL.TABS} element={withAuthFn(TabsCmpt)} />
      <Route path={ROUTE_URL.RADIO_INPUT} element={withAuthFn(RadioInputCmpt)} />
      <Route path={ROUTE_URL.RESTITUTION} element={withAuthFn(RestitutionCmpt)} />
    </Route>
    <Route path={ROUTE_URL.LAYOUT} element={withAuthFn(LayoutCmpt)} />
    <Route path={ROUTE_URL.UNAUTHORIZE} element={<PageUnauthorizeCmpt />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

export default RoutesCmpt;
