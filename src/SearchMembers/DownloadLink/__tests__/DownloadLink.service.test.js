import fetchDownload from '../DownloadLink.service';

describe('Download Service', () => {
  const fetchCustomMock = jest.fn();

  it('fetchDownload', () => {
    fetchDownload({ fetchCustom: fetchCustomMock, distributorId: 'distributorId' });
    expect(fetchCustomMock).toBeCalledWith('distributeurs/distributorId/details-contrats', {
      blob: true,
    });
  });
});
