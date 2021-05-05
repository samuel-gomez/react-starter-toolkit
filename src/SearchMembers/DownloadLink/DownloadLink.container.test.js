import React from 'react';
import { render } from '@testing-library/react';
import { LoaderModes } from 'shared/components/Loader';
import DownloadLinkContainer from './DownloadLink.container';

describe('DownloadLinkContainer', () => {
  it('Render <DownloadLinkContainer/> disabled', () => {
    const { asFragment } = render(<DownloadLinkContainer />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Render <DownloadLinkContainer/> ', () => {
    const { asFragment } = render(<DownloadLinkContainer idKey="idKey" name={{ label: 'name' }} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Should call useDownloadFn with distributorId: "idKey" and callsetLoaderModeFn with {isLoading: false, LoaderModes} when render DownloadLinkContainer', () => {
    const setLoaderModeFnMock = jest.fn().mockReturnValue('none');
    const useDownloadFnMock = jest.fn().mockReturnValue({ onDownload: jest.fn(), stateDownload: { isLoading: false } });
    render(<DownloadLinkContainer setLoaderModeFn={setLoaderModeFnMock} useDownloadFn={useDownloadFnMock} idKey="idKey" />);
    expect(setLoaderModeFnMock).toBeCalledWith({ isLoading: false, LoaderModes });
    expect(useDownloadFnMock).toBeCalledWith({ distributorId: 'idKey' });
  });
});
