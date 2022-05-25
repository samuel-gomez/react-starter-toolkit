import { func, number, oneOfType, string } from 'prop-types';
import setLoaderMode from 'shared/helpers/setLoaderMode';
import DownloadLink from './DownloadLink';
import { useDownload, useSubmitDownload, useNotifyDownloadError, useNotifyDownloadSuccess, useDownloadFile } from './DownloadLink.hook';

const DownloadLinkEnhanced = ({
  label,
  path,
  setLoaderModeFn,
  useDownloadFn,
  fileName,
  useNotifyDownloadErrorFn,
  useNotifyDownloadSuccessFn,
  useDownloadFileFn,
  useSubmitDownloadFn,
  ...rest
}) => {
  const { stateSubmitDownload, submitDownload, clearSubmitDownload } = useSubmitDownloadFn();
  const { state, clearState } = useDownloadFn({ path, clearSubmitDownload, hasSubmit: stateSubmitDownload });
  const { isLoading } = state;
  const isDisabled = path === undefined || fileName === undefined;
  useNotifyDownloadErrorFn({ state, clearState, clearSubmitDownload, hasSubmit: stateSubmitDownload });
  useNotifyDownloadSuccessFn({ state, clearState, clearSubmitDownload, hasSubmit: stateSubmitDownload });

  useDownloadFileFn({ state, fileName });

  return <DownloadLink {...rest} label={label} loaderMode={setLoaderModeFn({ isLoading })} onDownload={submitDownload} isDisabled={isDisabled} />;
};

DownloadLinkEnhanced.propTypes = {
  idKey: oneOfType([string, number]),
  label: string,
  path: string,
  setLoaderModeFn: func,
  useDownloadFn: func,
  fileName: string,
  useSubmitDownloadFn: func,
  useNotifyDownloadErrorFn: func,
  useNotifyDownloadSuccessFn: func,
  useDownloadFileFn: func,
};

DownloadLinkEnhanced.defaultProps = {
  setLoaderModeFn: setLoaderMode,
  useDownloadFn: useDownload,
  useSubmitDownloadFn: useSubmitDownload,
  useNotifyDownloadErrorFn: useNotifyDownloadError,
  useNotifyDownloadSuccessFn: useNotifyDownloadSuccess,
  useDownloadFileFn: useDownloadFile,
};

export default DownloadLinkEnhanced;
