import React from 'react';
import { func, string, bool } from 'prop-types';
import { Button } from '@axa-fr/react-toolkit-all';
import Loader from 'shared/components/Loader';
import Icons from 'shared/components/Icons';
import { LABEL_DOWNLOAD } from './constants';
import './DownloadLink.scss';

const DownloadLink = ({ loaderMode, onDownload, isDisabled }) => (
  <Loader mode={loaderMode} classModifier="fullscreen" text="Téléchargement du fichier en cours ...">
    <Button
      aria-label="download-link"
      disabled={isDisabled}
      type="button"
      className="af-link"
      classModifier="hasIconLeft download"
      onClick={onDownload}
    >
      <Icons className="af-download-link__icon" icon="download-csv" />
      <span className="af-link__text">{LABEL_DOWNLOAD}</span>
    </Button>
  </Loader>
);

DownloadLink.propTypes = {
  onDownload: func.isRequired,
  loaderMode: string.isRequired,
  isDisabled: bool,
};

DownloadLink.defaultProps = {
  isDisabled: false,
};

export default DownloadLink;
