import React from 'react';
import { createRoot } from 'react-dom/client';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'shared/scss/grid.css';
import 'shared/scss/reboot.css';
import '@axa-fr/react-toolkit-all/dist/style/af-components.scss';
import '@axa-fr/react-toolkit-core/dist/assets/fonts/icons/af-icons.css';
import 'shared/scss/fixes-toolkit.scss';

import App from 'App';

const container = document.getElementById('root');

const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
