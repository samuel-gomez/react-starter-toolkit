import { ROUTE_URL_HOME as HOME } from 'components/Home/constants';
import { ROUTE_URL_MEMBERS as MEMBERS } from 'components/Demos/Members/constants';
import { ROUTE_URL_SEARCHMEMBERS as SEARCHMEMBERS } from 'components/Demos/SearchMembers/constants';
import { ROUTE_URL_MODAL_CUSTOM as MODAL_CUSTOM } from 'components/Demos/ModalCustom/constants';
import { ROUTE_URL_NOTIFICATION as NOTIFICATION } from 'components/Demos/Notification/constants';
import { ROUTE_URL_NOTFOUND as NOTFOUND } from 'components/NotFound/constants';
import { ROUTE_URL_SLASH as SLASH } from 'components/Demos/SlashDesignSystem/constants';
import { ROUTE_URL_UNAUTHORIZE as UNAUTHORIZE } from 'components/Unauthorize/constants';
import { ROUTE_URL_ACCORDION as ACCORDION } from 'components/Demos/Accordion/constants';
import { ROUTE_URL_ACTION as ACTION } from 'components/Demos/Action/constants';
import { ROUTE_URL_ALERT as ALERT } from 'components/Demos/Alert/constants';
import { ROUTE_URL_BADGE as BADGE } from 'components/Demos/Badge/constants';
import { ROUTE_URL_BUTTON as BUTTON } from 'components/Demos/Button/constants';
import { ROUTE_URL_CHECKBOX_INPUT as CHECKBOX_INPUT } from 'components/Demos/CheckboxInput/constants';
import { ROUTE_URL_DATE_INPUT as DATE_INPUT } from 'components/Demos/DateInput/constants';
import { ROUTE_URL_FILE_INPUT as FILE_INPUT } from 'components/Demos/FileInput/constants';
import { ROUTE_URL_FOOTER as FOOTER } from 'components/Demos/Footer/constants';
import { ROUTE_URL_FOOTER_CLIENT as FOOTER_CLIENT } from 'components/Demos/FooterClient/constants';
import { ROUTE_URL_HEADER as HEADER } from 'components/Demos/Header/constants';
import { ROUTE_URL_HELP as HELP } from 'components/Demos/Help/constants';
import { ROUTE_URL_INFOS as INFOS } from 'components/Demos/Infos/constants';
import { ROUTE_URL_LOADER as LOADER } from 'components/Demos/Loader/constants';
import { ROUTE_URL_MODAL as MODAL } from 'components/Demos/Modal/constants';
import { ROUTE_URL_NAVBAR as NAVBAR } from 'components/Demos/NavBar/constants';
import { ROUTE_URL_NUMBER_INPUT as NUMBER_INPUT } from 'components/Demos/NumberInput/constants';
import { ROUTE_URL_POPOVER as POPOVER } from 'components/Demos/Popover/constants';
import { ROUTE_URL_RADIO_INPUT as RADIO_INPUT } from 'components/Demos/RadioInput/constants';
import { ROUTE_URL_RESTITUTION as RESTITUTION } from 'components/Demos/Restitution/constants';
import { ROUTE_URL_SELECT_INPUT as SELECT_INPUT } from 'components/Demos/SelectInput/constants';
import { ROUTE_URL_SELECT_MULTI as SELECT_MULTI } from 'components/Demos/SelectMulti/constants';
import { ROUTE_URL_SLIDER as SLIDER } from 'components/Demos/Slider/constants';
import { ROUTE_URL_STEPPER as STEPPER } from 'components/Demos/Stepper/constants';
import { ROUTE_URL_SWITCH as SWITCH } from 'components/Demos/Switch/constants';
import { ROUTE_URL_TABLE as TABLE } from 'components/Demos/Table/constants';
import { ROUTE_URL_TABS as TABS } from 'components/Demos/Tabs/constants';
import { ROUTE_URL_TEXTAREA_INPUT as TEXTAREA_INPUT } from 'components/Demos/TextareaInput/constants';
import { ROUTE_URL_TEXT_INPUT as TEXT_INPUT } from 'components/Demos/TextInput/constants';
import { ROUTE_URL_TITLE as TITLE } from 'components/Demos/Title/constants';
import { ROUTE_URL_TITLE_BAR as TITLE_BAR } from 'components/Demos/TitleBar/constants';
import { ROUTE_URL_LAYOUT as LAYOUT } from 'components/Demos/Layout/constants';

export const CLASS_BODY_MENU_OPEN = 'af-menu-open';

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

const MENU_ITEMS = [
  {
    label: 'Accueil',
    url: ROUTE_URL.HOME,
  },
  {
    label: 'Démos',
    url: ROUTE_URL.DEMOS,
    basePathChildren: ROUTE_URL.DEMOS,
    children: [
      {
        label: 'Membres',
        url: ROUTE_URL.MEMBERS,
      },
      {
        label: 'Rechercher',
        url: ROUTE_URL.SEARCHMEMBERS,
      },
      {
        label: 'Modal',
        url: ROUTE_URL.MODAL_CUSTOM,
      },
      {
        label: 'Notification',
        url: ROUTE_URL.NOTIFICATION,
      },
    ],
  },
  {
    label: 'Toolkit components',
    url: ROUTE_URL.DEMOS,
    basePathChildren: ROUTE_URL.DEMOS,
    children: [
      {
        label: 'Accordion',
        url: ROUTE_URL.ACCORDION,
      },
      {
        label: 'Action',
        url: ROUTE_URL.ACTION,
      },
      {
        label: 'Alert',
        url: ROUTE_URL.ALERT,
      },
      {
        label: 'Badge',
        url: ROUTE_URL.BADGE,
      },
      {
        label: 'Button',
        url: ROUTE_URL.BUTTON,
      },
      {
        label: 'Help',
        url: ROUTE_URL.HELP,
      },
      {
        label: 'Loader',
        url: ROUTE_URL.LOADER,
      },
      {
        label: 'Modal',
        url: ROUTE_URL.MODAL,
      },
      {
        label: 'Popover',
        url: ROUTE_URL.POPOVER,
      },
      {
        label: 'Restitution',
        url: ROUTE_URL.RESTITUTION,
      },
      {
        label: 'Table',
        url: ROUTE_URL.TABLE,
      },
      {
        label: 'Tabs',
        url: ROUTE_URL.TABS,
      },

      {
        label: 'Title',
        url: ROUTE_URL.TITLE,
      },
    ],
  },
  {
    label: 'Toolkit structure',
    url: ROUTE_URL.DEMOS,
    basePathChildren: ROUTE_URL.DEMOS,
    children: [
      {
        label: 'Footer',
        url: ROUTE_URL.FOOTER,
      },
      {
        label: 'Footer Client',
        url: ROUTE_URL.FOOTER_CLIENT,
      },
      {
        label: 'Header',
        url: ROUTE_URL.HEADER,
      },
      {
        label: 'Infos',
        url: ROUTE_URL.INFOS,
      },
      {
        label: 'NavBar',
        url: ROUTE_URL.NAVBAR,
      },
      {
        label: 'TitleBar',
        url: ROUTE_URL.TITLE_BAR,
      },
    ],
  },
  {
    label: 'Toolkit form components',
    url: ROUTE_URL.DEMOS,
    basePathChildren: ROUTE_URL.DEMOS,
    children: [
      {
        label: 'Checkbox Input',
        url: ROUTE_URL.CHECKBOX_INPUT,
      },
      {
        label: 'Date Input',
        url: ROUTE_URL.DATE_INPUT,
      },
      {
        label: 'File',
        url: ROUTE_URL.FILE_INPUT,
      },
      {
        label: 'Number Input',
        url: ROUTE_URL.NUMBER_INPUT,
      },
      {
        label: 'Radio Input',
        url: ROUTE_URL.RADIO_INPUT,
      },
      {
        label: 'Select Input',
        url: ROUTE_URL.SELECT_INPUT,
      },
      {
        label: 'Select Multi',
        url: ROUTE_URL.SELECT_MULTI,
      },
      {
        label: 'Slider',
        url: ROUTE_URL.SLIDER,
      },
      {
        label: 'Stepper',
        url: ROUTE_URL.STEPPER,
      },
      {
        label: 'Switch',
        url: ROUTE_URL.SWITCH,
      },
      {
        label: 'Textarea Input',
        url: ROUTE_URL.TEXTAREA_INPUT,
      },
      {
        label: 'Text Input',
        url: ROUTE_URL.TEXT_INPUT,
      },
    ],
  },
  {
    label: 'Pages',
    children: [
      {
        label: 'Not found',
        url: ROUTE_URL.NOTFOUND,
      },
      {
        label: 'Forbidden',
        url: ROUTE_URL.UNAUTHORIZE,
      },
    ],
  },
  {
    label: 'Layout',
    url: `${DEMOS}/${ROUTE_URL.LAYOUT}`,
  },
];

export default MENU_ITEMS;
