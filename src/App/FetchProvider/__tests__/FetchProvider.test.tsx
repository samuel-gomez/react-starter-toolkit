import { useContext } from 'react';
import { render } from '@testing-library/react';
import FetchProvider, { FetchContext, setFetchCustom } from '../FetchProvider';

const fetchConfigMock = {
  headers: {
    'Content-Type': 'text/plain',
  },
};

const apiMock = 'http://localhost:5001/api/';

type TBase = {
  fetchCustom?: (path: string, customConfig: object) => Promise<Response> | null;
};

const Base = ({ fetchCustom }: TBase) => <div>{fetchCustom ? 'haveFetchCustom' : 'notHaveFetchCustom'}</div>;

const BaseWithFetch = () => {
  const fetchProps = useContext(FetchContext);
  return <Base {...fetchProps} />;
};

const useOidcAccessTokenMock = jest.fn().mockReturnValue({
  accessToken: 'accessTokenfdsfdsqgvqvsqfs',
});

describe('FetchProvider', () => {
  it('Should Base have fetchCustom props when render FetchProvider with required props', async () => {
    const { asFragment, getByText } = render(
      <FetchProvider apiUrl={apiMock} fetchConfig={fetchConfigMock} useOidcAccessToken={useOidcAccessTokenMock}>
        <BaseWithFetch />
      </FetchProvider>,
    );

    expect(getByText(/haveFetchCustom/)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});

const fetchMock = jest.fn();

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
    const result = await setFetchCustom({ apiUrl: apiMock, fetchAuthConfig: fetchConfigMock, fetchFn: fetchMock })(path, customConfig);

    expect(fetchMock).toBeCalledWith('http://localhost:5001/api/members', {
      headers: {
        'Content-Type': 'text/plain',
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
    const result = await setFetchCustom({ apiUrl: apiMock, fetchAuthConfig: fetchConfigMock, fetchFn: fetchMock })(path, customConfig);
    expect(result).toEqual({ blob: 'blob' });
  });
});
