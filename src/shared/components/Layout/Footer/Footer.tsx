import Image from 'next/image';
import logo from '@axa-fr/react-toolkit-core/dist/assets/logo-axa.svg';
import packageJson from '../../../../../package.json';
import './Footer.scss';

type TFooterAxa = {
  version?: string;
  icon?: string;
  copyright?: string;
  year?: number;
  fullScreen?: boolean;
};

const FooterCustom = ({ className, icon, copyright }: { className: string; icon: string; copyright: string }) => (
  <footer className={className}>
    <div className="container-fluid container">
      <a className="af-logo" href="https://www.axa.fr/" title="Site Axa" target="blank">
        <Image className="af-logo__brand" alt="Logo Axa" src={icon} width={22} height={22} />
      </a>
      <div className="af-footer-content">{copyright}</div>
    </div>
  </footer>
);

const FooterAxa = ({
  fullScreen,
  year = new Date().getFullYear(),
  version = packageJson.version,
  icon = logo.src,
  copyright = `© ${year} AXA Tous droits réservés - v${version}`,
}: TFooterAxa) => <FooterCustom className={`af-footer${fullScreen ? ' af-footer--fullscreen' : ''}`} icon={icon} copyright={copyright} />;

export default FooterAxa;
