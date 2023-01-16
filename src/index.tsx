import { createRoot } from 'react-dom/client';
import 'shared/scss/grid.css';
import 'shared/scss/reboot.css';
import '@axa-fr/react-toolkit-all/dist/style/af-components.scss';
import '@axa-fr/react-toolkit-core/dist/assets/fonts/icons/af-icons.css';
import 'github-markdown-css/github-markdown-light.css';
import '@uiw/react-textarea-code-editor/dist.css';
import 'shared/scss/custom.scss';

import App from 'App';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
