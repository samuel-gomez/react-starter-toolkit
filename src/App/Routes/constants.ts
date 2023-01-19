import { ROUTE_URL_HOME as HOME } from 'pages/Home/constants';
import { ROUTE_URL_MEMBERS as MEMBERS } from 'pages/Demos/Members/constants';
import { ROUTE_URL_SEARCHMEMBERS as SEARCHMEMBERS } from 'pages/Demos/SearchMembers/constants';
import { ROUTE_URL_MODAL_CUSTOM as MODAL_CUSTOM } from 'pages/Demos/ModalCustom/constants';
import { ROUTE_URL_NOTIFICATION as NOTIFICATION } from 'pages/Demos/Notification/constants';

import { ROUTE_URL_ACCORDION as ACCORDION } from 'pages/Demos/Accordion/constants';
import { ROUTE_URL_ACTION as ACTION } from 'pages/Demos/Action/constants';
import { ROUTE_URL_ALERT as ALERT } from 'pages/Demos/Alert/constants';
import { ROUTE_URL_BADGE as BADGE } from 'pages/Demos/Badge/constants';
import { ROUTE_URL_BUTTON as BUTTON } from 'pages/Demos/Button/constants';
import { ROUTE_URL_CHECKBOX_INPUT as CHECKBOX_INPUT } from 'pages/Demos/CheckboxInput/constants';
import { ROUTE_URL_DATE_INPUT as DATE_INPUT } from 'pages/Demos/DateInput/constants';
import { ROUTE_URL_FILE_INPUT as FILE_INPUT } from 'pages/Demos/FileInput/constants';
import { ROUTE_URL_FOOTER as FOOTER } from 'pages/Demos/Footer/constants';
import { ROUTE_URL_FOOTER_CLIENT as FOOTER_CLIENT } from 'pages/Demos/FooterClient/constants';
import { ROUTE_URL_HEADER as HEADER } from 'pages/Demos/Header/constants';
import { ROUTE_URL_HELP as HELP } from 'pages/Demos/Help/constants';
import { ROUTE_URL_INFOS as INFOS } from 'pages/Demos/Infos/constants';
import { ROUTE_URL_LAYOUT as LAYOUT } from 'pages/Demos/Layout/constants';
import { ROUTE_URL_LOADER as LOADER } from 'pages/Demos/Loader/constants';
import { ROUTE_URL_MODAL as MODAL } from 'pages/Demos/Modal/constants';
import { ROUTE_URL_NAVBAR as NAVBAR } from 'pages/Demos/NavBar/constants';
import { ROUTE_URL_NUMBER_INPUT as NUMBER_INPUT } from 'pages/Demos/NumberInput/constants';
import { ROUTE_URL_POPOVER as POPOVER } from 'pages/Demos/Popover/constants';
import { ROUTE_URL_RADIO_INPUT as RADIO_INPUT } from 'pages/Demos/RadioInput/constants';
import { ROUTE_URL_RESTITUTION as RESTITUTION } from 'pages/Demos/Restitution/constants';
import { ROUTE_URL_SELECT_INPUT as SELECT_INPUT } from 'pages/Demos/SelectInput/constants';
import { ROUTE_URL_SELECT_MULTI as SELECT_MULTI } from 'pages/Demos/SelectMulti/constants';
import { ROUTE_URL_SLIDER as SLIDER } from 'pages/Demos/Slider/constants';
import { ROUTE_URL_STEPPER as STEPPER } from 'pages/Demos/Stepper/constants';
import { ROUTE_URL_SWITCH as SWITCH } from 'pages/Demos/Switch/constants';
import { ROUTE_URL_TABLE as TABLE } from 'pages/Demos/Table/constants';
import { ROUTE_URL_TABS as TABS } from 'pages/Demos/Tabs/constants';
import { ROUTE_URL_TEXTAREA_INPUT as TEXTAREA_INPUT } from 'pages/Demos/TextareaInput/constants';
import { ROUTE_URL_TEXT_INPUT as TEXT_INPUT } from 'pages/Demos/TextInput/constants';
import { ROUTE_URL_TITLE as TITLE } from 'pages/Demos/Title/constants';
import { ROUTE_URL_TITLE_BAR as TITLE_BAR } from 'pages/Demos/TitleBar/constants';

import { ROUTE_URL_SLASH as SLASH } from 'pages/Demos/SlashDesignSystem/constants';
import { ROUTE_URL_NOTFOUND as NOTFOUND } from 'pages/NotFound/constants';
import { ROUTE_URL_UNAUTHORIZE as UNAUTHORIZE } from 'pages/Unauthorize/constants';

const DEMOS = '/demos';

const URLS_FULL_DEMOS = {
  HOME,
  MEMBERS,
  SEARCHMEMBERS,
  MODAL_CUSTOM,
  NOTIFICATION,
};

const URLS_TOOLKIT_DEMOS = {
  DEMOS,
  ACCORDION,
  ACTION,
  ALERT,
  BADGE,
  BUTTON,
  CHECKBOX_INPUT,
  DATE_INPUT,
  FILE_INPUT,
  FOOTER,
  FOOTER_CLIENT,
  HEADER,
  HELP,
  INFOS,
  LOADER,
  MODAL,
  NAVBAR,
  NUMBER_INPUT,
  POPOVER,
  RADIO_INPUT,
  RESTITUTION,
  SELECT_INPUT,
  SELECT_MULTI,
  SLASH,
  SLIDER,
  STEPPER,
  SWITCH,
  TABLE,
  TABS,
  TEXTAREA_INPUT,
  TEXT_INPUT,
  TITLE,
  TITLE_BAR,
};

const URLS_OTHER_PAGES = {
  NOTFOUND,
  UNAUTHORIZE,
  LAYOUT,
};

const ROUTE_URL = {
  ...URLS_FULL_DEMOS,
  ...URLS_TOOLKIT_DEMOS,
  ...URLS_OTHER_PAGES,
};

export default ROUTE_URL;
