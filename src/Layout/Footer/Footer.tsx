import logo from '@axa-fr/react-toolkit-core/dist/assets/logo-axa.svg';
import { Footer } from '@axa-fr/react-toolkit-all';
import packageJson from '../../../package.json';
import './Footer.scss';

type TFooterAxa = {
  version?: string;
  icon?: string;
  copyright?: string;
  year?: number;
  fullScreen?: boolean;
};

const FooterAxa = ({
  fullScreen,
  year = new Date().getFullYear(),
  version = packageJson.version,
  icon = logo,
  copyright = `© ${year} AXA Tous droits réservés - v${version}`,
}: TFooterAxa) => <Footer className={`af-footer${fullScreen ? ' af-footer--fullscreen' : ''}`} icon={icon} copyright={copyright} />;

export default FooterAxa;
