import React from 'react';
import { emptyFunction, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import SearchMembers, { getDownloadPath, setFileName, DownloadLinkEnhanced } from '../SearchMembers';

const defaultProps = {
  members: [],
  anomaly: null,
  loaderMode: 'none',
  submitSearch: emptyFunction,
  DownloadLinkCmpt: () => <>DownloadLinkCmpt</>,
};

describe('getDownloadPath', () => {
  it('Should return "members/0064962455/download-detail" When getDownloadPath with distributorId "0064962455"', () => {
    const result = getDownloadPath('0064962455');
    const expected = 'members/0064962455/download-detail';
    expect(result).toEqual(expected);
  });
});

describe('setFileName', () => {
  it('Should return prefix___20180922.csv When setFileName with date (2018, 8, 22)', () => {
    const result = setFileName({ date: new Date(2018, 8, 22) });
    const expected = 'prefix___20180922.csv';
    expect(result).toEqual(expected);
  });
  it('Should return prefix___20180922.csv When setFileName with date (2018, 8, 22)', () => {
    const result = setFileName({ name: 'name', distributorId: '0123456789', date: new Date(2018, 8, 22) });
    const expected = 'prefix_name_0123456789_20180922.csv';
    expect(result).toEqual(expected);
  });
  it('Should return prefix___20180922.csv When setFileName with formatDateFn return 20180922', () => {
    const formatDateFnMock = jest.fn().mockReturnValue('20180922');
    const result = setFileName({ name: 'name', distributorId: '0123456789', formatDateFn: formatDateFnMock });
    const expected = 'prefix_name_0123456789_20180922.csv';
    expect(result).toEqual(expected);
  });
});

describe('<DownloadLinkEnhanced />', () => {
  const setFileNameFnMock = jest.fn();
  const getDownloadPathFnMock = jest.fn();
  const defaultDownloadProps = {
    idKey: '09878817',
    firstname: { label: 'samuel' },
    lastname: { label: 'gomez' },
  };
  it('Should call getDownloadPathFn and setFileNameFn with proper params', () => {
    const { asFragment } = renderWithWrapperStaticRouter(
      <DownloadLinkEnhanced {...defaultDownloadProps} getDownloadPathFn={getDownloadPathFnMock} setFileNameFn={setFileNameFnMock} />,
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getDownloadPathFnMock).toBeCalledWith('09878817');
    expect(setFileNameFnMock).toBeCalledWith({ distributorId: '09878817', name: 'samuel-gomez' });
  });

  it('Should call getDownloadPathFn and setFileNameFn with proper params 2 ', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<DownloadLinkEnhanced {...defaultDownloadProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('<SearchMembers/>', () => {
  it('Should render SearchMembers', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<SearchMembers {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render <SearchMembers /> with one member', () => {
    const { asFragment } = renderWithWrapperStaticRouter(
      <SearchMembers
        {...defaultProps}
        members={[
          {
            key: '1',
            name: {
              label: 'nom du membre',
            },
            id: {
              label: '1254689759',
            },
          },
        ]}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
