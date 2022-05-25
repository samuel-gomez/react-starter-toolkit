import { render } from '@testing-library/react';
import DownloadLinkContainer from '../DownloadLink.container';
import { SERVICE_NAME } from '../constants';

describe('DownloadLinkContainer', () => {
  it('Render <DownloadLinkContainer/> disabled when undefined path', () => {
    const { asFragment } = render(<DownloadLinkContainer label="Télécharger les résultats" fileName="2_20220112_AAM-VIE_resultats.csv" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Render <DownloadLinkContainer/> disabled when undefined fileName', () => {
    const { asFragment } = render(<DownloadLinkContainer label="Télécharger les résultats" path="elecions/3/resultats" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Render <DownloadLinkContainer/> ', () => {
    const { asFragment } = render(
      <DownloadLinkContainer label="Télécharger les résultats" path="elecions/3/resultats" fileName="2_20220112_AAM-VIE_resultats.csv" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should call useDownloadFn with path: "elecions/3/resultats" and callsetLoaderModeFn with {isLoading: false} when render DownloadLinkContainer', () => {
    const clearSubmitDownloadMock = jest.fn();
    const clearStateMock = jest.fn();
    const setLoaderModeFnMock = jest.fn().mockReturnValue('none');
    const useSubmitDownloadFnMock = jest.fn().mockReturnValue({
      submitDownload: jest.fn(),
      clearSubmitDownload: clearSubmitDownloadMock,
      stateSubmitDownload: false,
    });
    const useDownloadFnMock = jest.fn().mockReturnValue({
      submitDownload: jest.fn(),
      clearState: clearStateMock,
      state: { isLoading: false, anomaly: { [SERVICE_NAME]: null } },
    });
    const useDownloadFileMock = jest.fn();

    render(
      <DownloadLinkContainer
        setLoaderModeFn={setLoaderModeFnMock}
        useDownloadFn={useDownloadFnMock}
        label="Télécharger les résultats"
        path="elecions/3/resultats"
        fileName="2_20220112_AAM-VIE_resultats.csv"
        useSubmitDownloadFn={useSubmitDownloadFnMock}
        useDownloadFileFn={useDownloadFileMock}
      />,
    );

    expect(setLoaderModeFnMock).toBeCalledWith({ isLoading: false });
    expect(useDownloadFnMock).toBeCalledWith({ path: 'elecions/3/resultats', clearSubmitDownload: clearSubmitDownloadMock, hasSubmit: false });
  });
});
