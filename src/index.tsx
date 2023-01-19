import { createRoot } from 'react-dom/client';
import 'shared/scss/grid.css';
import 'shared/scss/reboot.css';
import '@axa-fr/react-toolkit-all/dist/style/af-components.scss';
import '@axa-fr/react-toolkit-core/dist/assets/fonts/icons/af-icons.css';
import 'shared/scss/custom.scss';
import App from 'App';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
