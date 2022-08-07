import { ComponentProps } from 'react';
import setLoaderMode from 'shared/helpers/setLoaderMode';
import DownloadLink from './DownloadLink';
import { useDownload, useSubmitDownload, useNotifyDownloadError, useNotifyDownloadSuccess, useDownloadFile } from './DownloadLink.hook';

type TDownloadLinkEnhanced = Omit<ComponentProps<typeof DownloadLink>, 'onDownload' | 'loaderMode'> & {
  fileName: string;
  path: string;
  isDisabled?: boolean;
  setLoaderModeFn?: typeof setLoaderMode;
  useDownloadFn?: typeof useDownload;
  useNotifyDownloadErrorFn?: typeof useNotifyDownloadError;
  useNotifyDownloadSuccessFn?: typeof useNotifyDownloadSuccess;
  useDownloadFileFn?: typeof useDownloadFile;
  useSubmitDownloadFn?: typeof useSubmitDownload;
  DownloadLinkCmpt?: typeof DownloadLink;
};

const DownloadLinkEnhanced = ({
  label,
  path,
  fileName,
  isDisabled = false,
  setLoaderModeFn = setLoaderMode,
  useDownloadFn = useDownload,
  useNotifyDownloadErrorFn = useNotifyDownloadError,
  useNotifyDownloadSuccessFn = useNotifyDownloadSuccess,
  useDownloadFileFn = useDownloadFile,
  useSubmitDownloadFn = useSubmitDownload,
  DownloadLinkCmpt = DownloadLink,
  ...rest
}: TDownloadLinkEnhanced) => {
  const { stateSubmitDownload, submitDownload, clearSubmitDownload } = useSubmitDownloadFn();
  const { state, clearState } = useDownloadFn({ path, hasSubmit: stateSubmitDownload });
  const { isLoading } = state;
  useNotifyDownloadErrorFn({ state, path, clearState, clearSubmitDownload, hasSubmit: stateSubmitDownload });
  useNotifyDownloadSuccessFn({ state, path, clearState, clearSubmitDownload, hasSubmit: stateSubmitDownload });

  useDownloadFileFn({ state, fileName });

  return <DownloadLinkCmpt {...rest} label={label} loaderMode={setLoaderModeFn({ isLoading })} onDownload={submitDownload} isDisabled={isDisabled} />;
};

export default DownloadLinkEnhanced;