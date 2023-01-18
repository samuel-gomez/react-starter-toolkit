import Button from '@axa-fr/react-toolkit-button';
import Loader, { MODES } from 'shared/components/Loader';
import Icons from 'shared/components/Icons';
import { LABEL_DOWNLOAD } from './constants';
import './DownloadLink.scss';

type TDownloadLink = {
  label?: string;
  loaderMode: keyof typeof MODES;
  loaderClassModifier?: string;
  loaderText?: string;
  onDownload: (event: React.MouseEvent<HTMLElement>) => void;
  isDisabled?: boolean;
};

const DownloadLink = ({
  loaderMode,
  onDownload,
  label = LABEL_DOWNLOAD,
  isDisabled = false,
  loaderClassModifier = 'fullscreen',
  loaderText = 'Téléchargement du fichier en cours...',
}: TDownloadLink) => (
  <Loader mode={loaderMode} classModifier={loaderClassModifier} text={loaderText}>
    <Button aria-label={label} disabled={isDisabled} type="button" className="af-link" classModifier="hasIconLeft download" onClick={onDownload}>
      <Icons className="af-download-link__icon" icon="download-csv" />
      <span className="af-link__text">{label}</span>
    </Button>
  </Loader>
);

export default DownloadLink;
