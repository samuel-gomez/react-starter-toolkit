import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import { emptyFunction } from 'shared/testsUtils';
import FetchProvider, { FetchContext, setFetchCustom } from '../FetchProvider';

const fetchConfig = {
  headers: {
    'Content-Type': 'text/plain',
  },
};
const apiMock = 'http://localhost:5001/api/';

const BaseWithFetch = () => {
  const fetchProps = useContext(FetchContext);
  return <Base {...fetchProps} />;
};

const Base = ({ fetchCustom }) => <div>{fetchCustom ? 'haveFetchCustom' : 'notHaveFetchCustom'}</div>;

const useOidcAccessTokenMock = jest.fn().mockReturnValue({
  accessToken: 'accessTokenfdsfdsqgvqvsqfs',
});

const App = () => (
  <FetchProvider apiUrl={apiMock} fetchConfig={fetchConfig} useOidcAccessToken={useOidcAccessTokenMock}>
    <BaseWithFetch />
  </FetchProvider>
);

describe('setFetchCustom', () => {
  it('Should Base have fetchCustom props when call setFetchCustom', () => {
    const { asFragment, getByText } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByText('haveFetchCustom')).toBeDefined();
  });
});

const fetchMock = jest.fn({
  json: emptyFunction,
});
describe('setFetchCustom', () => {
  const resolvedValue = { json: () => ({ data: 'data' }), blob: () => ({ blob: 'blob' }), status: 200 };

  const path = 'members';

  it('Should fetch called with merged infos and result return 200 response Fetch when call setFetchCustom', async () => {
    const customConfig = {
      headers: {
        body: 'body',
      },
    };
    fetchMock.mockResolvedValue(resolvedValue);
    const result = await setFetchCustom({ apiUrl: apiMock, fetchConfig, fetchFn: fetchMock })(path, customConfig);

    expect(fetchMock).toBeCalledWith('http://localhost:5001/api/members', {
      headers: {
        body: 'body',
      },
    });

    expect(result).toEqual({ data: 'data', statusHttp: 200 });
  });

  it('Should return blob response when config.blob is true', async () => {
    const customConfig = {
      blob: true,
    };
    fetchMock.mockResolvedValue(resolvedValue);
    const result = await setFetchCustom({ apiUrl: apiMock, fetchConfig, fetchFn: fetchMock })(path, customConfig);
    expect(result).toEqual({ blob: 'blob' });
  });
});
