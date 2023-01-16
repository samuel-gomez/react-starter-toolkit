/* eslint-disable max-lines-per-function */
import { useContext, ComponentProps, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ROUTE_URL from 'App/Routes/constants';
import { UserContext } from 'App/UserProvider';
import Loader, { MODES } from 'shared/components/Loader';
import { PROFILS } from 'shared/constants';

const Home = lazy(() => import('pages/Home'));
const Members = lazy(() => import('pages/Demos/Members'));
const SearchMembers = lazy(() => import('pages/Demos/SearchMembers'));
const ModalCustom = lazy(() => import('pages/Demos/ModalCustom'));
const Notification = lazy(() => import('pages/Demos/Notification'));

const Accordion = lazy(() => import('pages/Demos/Accordion'));
const Action = lazy(() => import('pages/Demos/Action'));
const Alert = lazy(() => import('pages/Demos/Alert'));
const Badge = lazy(() => import('pages/Demos/Badge'));
const Button = lazy(() => import('pages/Demos/Button'));
const CheckboxInput = lazy(() => import('pages/Demos/CheckboxInput'));
const DateInput = lazy(() => import('pages/Demos/DateInput'));
const FileInput = lazy(() => import('pages/Demos/FileInput'));
const Footer = lazy(() => import('pages/Demos/Footer'));
const FooterClient = lazy(() => import('pages/Demos/FooterClient'));
const Header = lazy(() => import('pages/Demos/Header'));
const Help = lazy(() => import('pages/Demos/Help'));
const Infos = lazy(() => import('pages/Demos/Infos'));
const Layout = lazy(() => import('pages/Demos/Layout'));
const LoaderPage = lazy(() => import('pages/Demos/Loader'));
const Modal = lazy(() => import('pages/Demos/Modal'));
const NavBar = lazy(() => import('pages/Demos/NavBar'));
const NumberInput = lazy(() => import('pages/Demos/NumberInput'));
const Popover = lazy(() => import('pages/Demos/Popover'));
const RadioInput = lazy(() => import('pages/Demos/RadioInput'));
const Restitution = lazy(() => import('pages/Demos/Restitution'));
const SelectInput = lazy(() => import('pages/Demos/SelectInput'));
const SelectMulti = lazy(() => import('pages/Demos/SelectMulti'));
const SlashDesignSystem = lazy(() => import('pages/Demos/SlashDesignSystem'));
const Slider = lazy(() => import('pages/Demos/Slider'));
const Stepper = lazy(() => import('pages/Demos/Stepper'));
const Switch = lazy(() => import('pages/Demos/Switch'));
const Table = lazy(() => import('pages/Demos/Table'));
const Tabs = lazy(() => import('pages/Demos/Tabs'));
const TextareaInput = lazy(() => import('pages/Demos/TextareaInput'));
const TextInput = lazy(() => import('pages/Demos/TextInput'));
const Title = lazy(() => import('pages/Demos/Title'));
const TitleBar = lazy(() => import('pages/Demos/TitleBar'));

const PageUnauthorize = lazy(() => import('pages/Unauthorize'));
const PageNotFound = lazy(() => import('pages/NotFound'));

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
  HomeCmpt?: typeof Home;
  MembersCmpt?: typeof Members;
  SearchMembersCmpt?: typeof SearchMembers;
  ModalCustomCmpt?: typeof ModalCustom;
  NotificationCmpt?: typeof Notification;
  AccordionCmpt?: typeof Accordion;
  ActionCmpt?: typeof Action;
  AlertCmpt?: typeof Alert;
  BadgeCmpt?: typeof Badge;
  ButtonCmpt?: typeof Button;
  CheckboxInputCmpt?: typeof CheckboxInput;
  DateInputCmpt?: typeof DateInput;
  FileInputCmpt?: typeof FileInput;
  FooterCmpt?: typeof Footer;
  FooterClientCmpt?: typeof FooterClient;
  HeaderCmpt?: typeof Header;
  HelpCmpt?: typeof Help;
  InfosCmpt?: typeof Infos;
  LayoutCmpt?: typeof Layout;
  LoaderPageCmpt?: typeof LoaderPage;
  ModalCmpt?: typeof Modal;
  NavBarCmpt?: typeof NavBar;
  NumberInputCmpt?: typeof NumberInput;
  PopoverCmpt?: typeof Popover;
  RadioInputCmpt?: typeof RadioInput;
  RestitutionCmpt?: typeof Restitution;
  SelectInputCmpt?: typeof SelectInput;
  SelectMultiCmpt?: typeof SelectMulti;
  SlashDesignSystemCmpt?: typeof SlashDesignSystem;
  SliderCmpt?: typeof Slider;
  StepperCmpt?: typeof Stepper;
  SwitchCmpt?: typeof Switch;
  TableCmpt?: typeof Table;
  TabsCmpt?: typeof Tabs;
  TextareaInputCmpt?: typeof TextareaInput;
  TextInputCmpt?: typeof TextInput;
  TitleCmpt?: typeof Title;
  TitleBarCmpt?: typeof TitleBar;
  PageUnauthorizeCmpt?: typeof PageUnauthorize;
  withAuthFn?: typeof withAuth;
};

const RoutesCmpt = ({
  HomeCmpt = Home,
  MembersCmpt = Members,
  SearchMembersCmpt = SearchMembers,
  ModalCustomCmpt = ModalCustom,
  NotificationCmpt = Notification,
  AccordionCmpt = Accordion,
  ActionCmpt = Action,
  AlertCmpt = Alert,
  BadgeCmpt = Badge,
  ButtonCmpt = Button,
  CheckboxInputCmpt = CheckboxInput,
  DateInputCmpt = DateInput,
  FileInputCmpt = FileInput,
  FooterCmpt = Footer,
  FooterClientCmpt = FooterClient,
  HeaderCmpt = Header,
  HelpCmpt = Help,
  InfosCmpt = Infos,
  LayoutCmpt = Layout,
  LoaderPageCmpt = LoaderPage,
  ModalCmpt = Modal,
  NavBarCmpt = NavBar,
  NumberInputCmpt = NumberInput,
  PopoverCmpt = Popover,
  RadioInputCmpt = RadioInput,
  RestitutionCmpt = Restitution,
  SelectInputCmpt = SelectInput,
  SelectMultiCmpt = SelectMulti,
  SlashDesignSystemCmpt = SlashDesignSystem,
  SliderCmpt = Slider,
  StepperCmpt = Stepper,
  SwitchCmpt = Switch,
  TableCmpt = Table,
  TabsCmpt = Tabs,
  TextareaInputCmpt = TextareaInput,
  TextInputCmpt = TextInput,
  TitleCmpt = Title,
  TitleBarCmpt = TitleBar,
  PageUnauthorizeCmpt = PageUnauthorize,
  withAuthFn = withAuth,
}: TRoutesCmpt) => (
  <Suspense fallback={<Loader text="Chargement de la page..." mode={MODES.get} classModifier="fullscreen" />}>
    <Routes>
      <Route index path={ROUTE_URL.HOME} element={withAuthFn(HomeCmpt)} />
      <Route path={ROUTE_URL.DEMOS}>
        <Route index element={withAuthFn(SlashDesignSystemCmpt)} />
        <Route path={ROUTE_URL.MEMBERS} element={withAuthFn(MembersCmpt)} />
        <Route path={ROUTE_URL.SEARCHMEMBERS} element={withAuthFn(SearchMembersCmpt)} />
        <Route path={ROUTE_URL.MODAL_CUSTOM} element={withAuthFn(ModalCustomCmpt)} />
        <Route path={ROUTE_URL.NOTIFICATION} element={withAuthFn(NotificationCmpt)} />
        <Route path={ROUTE_URL.ACCORDION} element={withAuthFn(AccordionCmpt)} />
        <Route path={ROUTE_URL.ACTION} element={withAuthFn(ActionCmpt)} />
        <Route path={ROUTE_URL.ALERT} element={withAuthFn(AlertCmpt)} />
        <Route path={ROUTE_URL.BADGE} element={withAuthFn(BadgeCmpt)} />
        <Route path={ROUTE_URL.BUTTON} element={withAuthFn(ButtonCmpt)} />
        <Route path={ROUTE_URL.CHECKBOX_INPUT} element={withAuthFn(CheckboxInputCmpt)} />
        <Route path={ROUTE_URL.DATE_INPUT} element={withAuthFn(DateInputCmpt)} />
        <Route path={ROUTE_URL.FILE_INPUT} element={withAuthFn(FileInputCmpt)} />
        <Route path={ROUTE_URL.FOOTER} element={withAuthFn(FooterCmpt)} />
        <Route path={ROUTE_URL.FOOTER_CLIENT} element={withAuthFn(FooterClientCmpt)} />
        <Route path={ROUTE_URL.HEADER} element={withAuthFn(HeaderCmpt)} />
        <Route path={ROUTE_URL.HELP} element={withAuthFn(HelpCmpt)} />
        <Route path={ROUTE_URL.INFOS} element={withAuthFn(InfosCmpt)} />
        <Route path={ROUTE_URL.LOADER} element={withAuthFn(LoaderPageCmpt)} />
        <Route path={ROUTE_URL.MODAL} element={withAuthFn(ModalCmpt)} />
        <Route path={ROUTE_URL.NAVBAR} element={withAuthFn(NavBarCmpt)} />
        <Route path={ROUTE_URL.NUMBER_INPUT} element={withAuthFn(NumberInputCmpt)} />
        <Route path={ROUTE_URL.POPOVER} element={withAuthFn(PopoverCmpt)} />
        <Route path={ROUTE_URL.RADIO_INPUT} element={withAuthFn(RadioInputCmpt)} />
        <Route path={ROUTE_URL.RESTITUTION} element={withAuthFn(RestitutionCmpt)} />
        <Route path={ROUTE_URL.SELECT_INPUT} element={withAuthFn(SelectInputCmpt)} />
        <Route path={ROUTE_URL.SELECT_MULTI} element={withAuthFn(SelectMultiCmpt)} />
        <Route path={ROUTE_URL.SLIDER} element={withAuthFn(SliderCmpt)} />
        <Route path={ROUTE_URL.STEPPER} element={withAuthFn(StepperCmpt)} />
        <Route path={ROUTE_URL.SWITCH} element={withAuthFn(SwitchCmpt)} />
        <Route path={ROUTE_URL.TABLE} element={withAuthFn(TableCmpt)} />
        <Route path={ROUTE_URL.TABS} element={withAuthFn(TabsCmpt)} />
        <Route path={ROUTE_URL.TEXTAREA_INPUT} element={withAuthFn(TextareaInputCmpt)} />
        <Route path={ROUTE_URL.TEXT_INPUT} element={withAuthFn(TextInputCmpt)} />
        <Route path={ROUTE_URL.TITLE} element={withAuthFn(TitleCmpt)} />
        <Route path={ROUTE_URL.TITLE_BAR} element={withAuthFn(TitleBarCmpt)} />
      </Route>
      <Route path={ROUTE_URL.LAYOUT} element={withAuthFn(LayoutCmpt)} />
      <Route path={ROUTE_URL.UNAUTHORIZE} element={<PageUnauthorizeCmpt />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </Suspense>
);

export default RoutesCmpt;
