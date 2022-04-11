import React from 'react';
import { bool, func, string } from 'prop-types';
import { Button } from '@axa-fr/react-toolkit-all';
import Loader from 'shared/components/Loader';
import Icons from 'shared/components/Icons';
import { LABEL_DOWNLOAD } from './constants';
import './DownloadLink.scss';

const DownloadLink = ({ label, loaderMode, onDownload, isDisabled }) => (
  <Loader mode={loaderMode} classModifier="fullscreen" text="Téléchargement du fichier en cours...">
    <Button aria-label={label} disabled={isDisabled} type="button" className="af-link" classModifier="hasIconLeft download" onClick={onDownload}>
      <Icons className="af-download-link__icon" icon="download-csv" />
      <span className="af-link__text">{label}</span>
    </Button>
  </Loader>
);

DownloadLink.propTypes = {
  label: string,
  onDownload: func.isRequired,
  loaderMode: string.isRequired,
  isDisabled: bool,
};

DownloadLink.defaultProps = {
  label: LABEL_DOWNLOAD,
  isDisabled: false,
};

export default DownloadLink;
