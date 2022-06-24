import logo from '@axa-fr/react-toolkit-core/dist/assets/logo-axa.svg';
import { Footer } from '@axa-fr/react-toolkit-all';
import packageJson from '../../../package.json';

type TFooterAxa = {
  version?: string;
  icon?: string;
  copyright?: string;
  year?: number;
};

const FooterAxa = ({
  year = new Date().getFullYear(),
  version = packageJson.version,
  icon = logo,
  copyright = `© ${year} AXA Tous droits réservés - v${version}`,
}: TFooterAxa) => <Footer icon={icon} copyright={copyright} />;

export default FooterAxa;
