import React from 'react';
import { string, number, func, oneOfType } from 'prop-types';
import { LoaderModes } from 'shared/components/Loader';
import setLoaderMode from 'shared/helpers/setLoaderMode';
import DownloadLink from './DownloadLink';
import { useDownload } from './DownloadLink.hook';

const DownloadLinkEnhanced = ({ idKey, setLoaderModeFn, useDownloadFn, name, ...rest }) => {
  const {
    onDownload,
    stateDownload: { isLoading },
  } = useDownloadFn({ distributorId: idKey, name });
  return <DownloadLink {...rest} loaderMode={setLoaderModeFn({ isLoading, LoaderModes })} onDownload={onDownload} isDisabled={idKey === undefined} />;
};

DownloadLinkEnhanced.propTypes = {
  idKey: oneOfType([string, number]),
  setLoaderModeFn: func,
  useDownloadFn: func,
};

DownloadLinkEnhanced.defaultProps = {
  setLoaderModeFn: setLoaderMode,
  useDownloadFn: useDownload,
};

export default DownloadLinkEnhanced;
