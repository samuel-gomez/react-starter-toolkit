import { addDecorator, configure, setAddon } from '@storybook/react';

import infoAddon from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { setOptions } from '@storybook/addon-options';

import '@axa-fr/react-toolkit-all/dist/style/af-toolkit-core.css';
import '@axa-fr/react-toolkit-core/dist/assets/fonts/icons/af-icons.css';
import 'highlight.js/styles/atelier-cave-dark.css';
import '../src/shared/scss/fixes-toolkit.scss';
import './storybook.scss';

setOptions({
  name: 'OASIS',
  url: 'https://www.axa.fr',
  hierarchySeparator: /\./,
  hierarchyRootSeparator: /\|/,
});

addDecorator(withKnobs);
setAddon(infoAddon);

configure(require.context('../src', true, /\.stories\.js$/), module);
