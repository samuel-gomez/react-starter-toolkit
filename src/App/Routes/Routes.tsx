/* eslint-disable max-lines-per-function */
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
import TextareaInput from 'pages/Demos/TextareaInput';
import Tabs from 'pages/Demos/Tabs';
import RadioInput from 'pages/Demos/RadioInput';
import CheckboxInput from 'pages/Demos/CheckboxInput';
import Restitution from 'pages/Demos/Restitution';
import SelectInput from 'pages/Demos/SelectInput';
import Stepper from 'pages/Demos/Stepper';
import Badge from 'pages/Demos/Badge';
import Title from 'pages/Demos/Title';
import Help from 'pages/Demos/Help';
import Header from 'pages/Demos/Header';
import Table from 'pages/Demos/Table';
import TitleBar from 'pages/Demos/TitleBar';
import Action from 'pages/Demos/Action';
import Infos from 'pages/Demos/Infos';
import NavBar from 'pages/Demos/NavBar';
import Popover from 'pages/Demos/Popover';
import FooterClient from 'pages/Demos/FooterClient';
import Footer from 'pages/Demos/Footer';
import Accordion from 'pages/Demos/Accordion';
import LoaderAxa from 'pages/Demos/Loader';
import Slider from 'pages/Demos/Slider';
import Switch from 'pages/Demos/Switch';
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
  TextareaInputCmpt?: typeof TextareaInput;
  TabsCmpt?: typeof Tabs;
  RadioInputCmpt?: typeof RadioInput;
  CheckboxInputCmpt?: typeof CheckboxInput;
  RestitutionCmpt?: typeof Restitution;
  SelectInputCmpt?: typeof SelectInput;
  StepperCmpt?: typeof Stepper;
  BadgeCmpt?: typeof Badge;
  TitleCmpt?: typeof Title;
  HelpCmpt?: typeof Help;
  HeaderCmpt?: typeof Header;
  TableCmpt?: typeof Table;
  TitleBarCmpt?: typeof TitleBar;
  ActionCmpt?: typeof Action;
  InfosCmpt?: typeof Infos;
  NavBarCmpt?: typeof NavBar;
  PopoverCmpt?: typeof Popover;
  FooterClientCmpt?: typeof FooterClient;
  FooterCmpt?: typeof Footer;
  AccordionCmpt?: typeof Accordion;
  LoaderAxaCmpt?: typeof LoaderAxa;
  SliderCmpt?: typeof Slider;
  SwitchCmpt?: typeof Switch;
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
  TextareaInputCmpt = TextareaInput,
  TabsCmpt = Tabs,
  RadioInputCmpt = RadioInput,
  CheckboxInputCmpt = CheckboxInput,
  RestitutionCmpt = Restitution,
  SelectInputCmpt = SelectInput,
  StepperCmpt = Stepper,
  BadgeCmpt = Badge,
  TitleCmpt = Title,
  HelpCmpt = Help,
  HeaderCmpt = Header,
  TableCmpt = Table,
  TitleBarCmpt = TitleBar,
  ActionCmpt = Action,
  InfosCmpt = Infos,
  NavBarCmpt = NavBar,
  PopoverCmpt = Popover,
  FooterClientCmpt = FooterClient,
  FooterCmpt = Footer,
  AccordionCmpt = Accordion,
  LoaderAxaCmpt = LoaderAxa,
  SliderCmpt = Slider,
  SwitchCmpt = Switch,
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
      <Route path={ROUTE_URL.TEXTAREA_INPUT} element={withAuthFn(TextareaInputCmpt)} />
      <Route path={ROUTE_URL.TABS} element={withAuthFn(TabsCmpt)} />
      <Route path={ROUTE_URL.RADIO_INPUT} element={withAuthFn(RadioInputCmpt)} />
      <Route path={ROUTE_URL.CHECKBOX_INPUT} element={withAuthFn(CheckboxInputCmpt)} />
      <Route path={ROUTE_URL.RESTITUTION} element={withAuthFn(RestitutionCmpt)} />
      <Route path={ROUTE_URL.SELECT_INPUT} element={withAuthFn(SelectInputCmpt)} />
      <Route path={ROUTE_URL.STEPPER} element={withAuthFn(StepperCmpt)} />
      <Route path={ROUTE_URL.BADGE} element={withAuthFn(BadgeCmpt)} />
      <Route path={ROUTE_URL.TITLE} element={withAuthFn(TitleCmpt)} />
      <Route path={ROUTE_URL.HELP} element={withAuthFn(HelpCmpt)} />
      <Route path={ROUTE_URL.HEADER} element={withAuthFn(HeaderCmpt)} />
      <Route path={ROUTE_URL.TABLE} element={withAuthFn(TableCmpt)} />
      <Route path={ROUTE_URL.TITLEBAR} element={withAuthFn(TitleBarCmpt)} />
      <Route path={ROUTE_URL.ACTION} element={withAuthFn(ActionCmpt)} />
      <Route path={ROUTE_URL.INFOS} element={withAuthFn(InfosCmpt)} />
      <Route path={ROUTE_URL.NAVBAR} element={withAuthFn(NavBarCmpt)} />
      <Route path={ROUTE_URL.POPOVER} element={withAuthFn(PopoverCmpt)} />
      <Route path={ROUTE_URL.FOOTER_CLIENT} element={withAuthFn(FooterClientCmpt)} />
      <Route path={ROUTE_URL.FOOTER} element={withAuthFn(FooterCmpt)} />
      <Route path={ROUTE_URL.ACCORDION} element={withAuthFn(AccordionCmpt)} />
      <Route path={ROUTE_URL.LOADER} element={withAuthFn(LoaderAxaCmpt)} />
      <Route path={ROUTE_URL.SLIDER} element={withAuthFn(SliderCmpt)} />
      <Route path={ROUTE_URL.SWITCH} element={withAuthFn(SwitchCmpt)} />
    </Route>
    <Route path={ROUTE_URL.LAYOUT} element={withAuthFn(LayoutCmpt)} />
    <Route path={ROUTE_URL.UNAUTHORIZE} element={<PageUnauthorizeCmpt />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

export default RoutesCmpt;
