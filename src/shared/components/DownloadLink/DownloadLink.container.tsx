import { ComponentProps } from 'react';
import { setLoaderMode } from 'shared/components/Loader';
import DownloadLink from './DownloadLink';
import { useDownload, useSubmitDownload, useDownloadFile } from './DownloadLink.hook';

type TDownloadLinkEnhanced = Omit<ComponentProps<typeof DownloadLink>, 'onDownload' | 'loaderMode'> & {
  fileName: string;
  path: string;
  isDisabled?: boolean;
  setLoaderModeFn?: typeof setLoaderMode;
  useDownloadFn?: typeof useDownload;
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
  useDownloadFileFn = useDownloadFile,
  useSubmitDownloadFn = useSubmitDownload,
  DownloadLinkCmpt = DownloadLink,
  ...rest
}: TDownloadLinkEnhanced) => {
  const { stateSubmitDownload, submitDownload, clearSubmitDownload } = useSubmitDownloadFn();
  const { state } = useDownloadFn({ path, hasSubmit: stateSubmitDownload, clearSubmitDownload });
  const { isLoading } = state;

  useDownloadFileFn({ state, fileName, hasSubmit: stateSubmitDownload });

  return <DownloadLinkCmpt {...rest} label={label} loaderMode={setLoaderModeFn({ isLoading })} onDownload={submitDownload} isDisabled={isDisabled} />;
};

export default DownloadLinkEnhanced;
