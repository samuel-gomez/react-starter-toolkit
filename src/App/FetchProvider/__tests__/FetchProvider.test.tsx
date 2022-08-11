import { useContext } from 'react';
import { render } from '@testing-library/react';
import FetchProvider, { buildResponse, FetchContext, setFetchCustom, showReactQueryDevtools } from '../FetchProvider';

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
      <FetchProvider apiUrl={apiMock} fetchConfig={fetchConfigMock} useOidcAccessTokenFn={useOidcAccessTokenMock}>
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
  it('Should fetch called with merged infos and result return 200 response Fetch when call setFetchCustom', async () => {
    const queryKey = [
      'members',
      {
        headers: {
          body: 'body',
        },
      },
    ];
    fetchMock.mockResolvedValue(resolvedValue);
    const result = await setFetchCustom({ apiUrl: apiMock, fetchAuthConfig: fetchConfigMock, fetchFn: fetchMock })(queryKey);

    expect(fetchMock).toBeCalledWith('http://localhost:5001/api/members', {
      headers: {
        'Content-Type': 'text/plain',
        body: 'body',
      },
    });

    expect(result).toEqual({ data: 'data', statusHttp: 200 });
  });

  it('Should return blob response when config.blob is true', async () => {
    const queryKey = [
      'members',
      {
        blob: true,
      },
    ];
    fetchMock.mockResolvedValue(resolvedValue);
    const result = await setFetchCustom({ apiUrl: apiMock, fetchAuthConfig: fetchConfigMock, fetchFn: fetchMock })(queryKey);
    expect(result).toEqual({ blob: 'blob' });
  });
});

describe('buildResponse', () => {
  const responseMock = { status: 200, json: async () => ({ msg: 'test' }), blob: async () => ({ msg: 'testblob' }) };
  it('Should return response 200 and msg = test when status = 200 and blob is falsy', async () => {
    const result = await buildResponse(responseMock, { blob: false });
    expect(result).toEqual({ statusHttp: responseMock.status, msg: 'test' });
  });
  it('Should return msg = testblob when status = 200 and blob is truthy', async () => {
    const result = await buildResponse(responseMock, { blob: true });
    expect(result).toEqual({ msg: 'testblob' });
  });
  it('Should return throw error when status = 504', async () => {
    responseMock.status = 504;
    try {
      await buildResponse(responseMock, { blob: false });
    } catch (error) {
      expect(error).toEqual(responseMock);
    }
  });
  it('Should return throw error when status = 500', async () => {
    responseMock.status = 500;
    try {
      await buildResponse(responseMock, { blob: false });
    } catch (error) {
      expect(error).toEqual(responseMock);
    }
  });
  it('Should return throw error when status = 400', async () => {
    responseMock.status = 400;
    try {
      await buildResponse(responseMock, { blob: false });
    } catch (error) {
      expect(error).toEqual(responseMock);
    }
  });
  it('Should return response 204 when status = 204', async () => {
    responseMock.status = 204;
    const result = await buildResponse(responseMock, { blob: false });
    expect(result).toEqual({ statusHttp: responseMock.status });
  });
});

describe('showReactQueryDevtools', () => {
  it('Should not return ReactQueryDevTools', () => {
    const process = 'test';
    const result = showReactQueryDevtools(process);
    expect(result).toEqual(false);
  });
  it('Should return ReactQueryDevTools', () => {
    const process = 'development';
    const result = showReactQueryDevtools(process);
    expect(result).not.toEqual(false);
  });
});
