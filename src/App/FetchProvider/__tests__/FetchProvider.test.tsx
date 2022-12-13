import { useContext } from 'react';
import { render } from '@testing-library/react';
import { STATUS_HTTP_MESSAGES } from 'shared/constants';
import { QueryKey } from '@tanstack/react-query';
import FetchProvider, {
  buildResponse,
  FetchContext,
  setFetchCustom,
  computeDataError,
  showReactQueryDevtools,
  setQueryClient,
  setQuery,
} from '../FetchProvider';

const fetchConfigMock = {
  headers: {
    'Content-Type': 'text/plain',
  },
};

const apiMock = {
  base: 'http://localhost:5001/api/',
  github: 'https://raw.githubusercontent.com/',
};

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

describe('setQuery', () => {
  it('Should call setQueryFn with fetchcustom and querykey when defaultQueryWithAuthFn have been called with fetchcustom and querykey', async () => {
    const fetchCustom = jest.fn();
    const defaultQueryWithAuthFn = jest.fn();
    setQuery(fetchCustom)({ queryKey: 'queryKey' as unknown as QueryKey, defaultQueryWithAuthFn });

    expect(defaultQueryWithAuthFn).toHaveBeenCalledWith('queryKey', fetchCustom);
  });
  it('Should return when setQueryClient have been called with fetchcustom', async () => {
    const fetchCustom = jest.fn();
    const result = setQuery(fetchCustom)({ queryKey: 'queryKey' as unknown as QueryKey });

    expect(result).toEqual(Promise.resolve({}));
  });
});

describe('setQueryClient', () => {
  it('Should call setQueryFn with fetch custom when setQueryClient have been called with fetchcustom', async () => {
    const fetchCustom = jest.fn();
    const setQueryFn = jest.fn();
    setQueryClient({ fetchCustom, setQueryFn });

    expect(setQueryFn).toHaveBeenCalledWith(fetchCustom);
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
  const computeDataErrorFn = jest.fn();
  const responseMock = {
    status: 200,
    text: async () => ({ msg: 'testText' }),
    json: async () => ({ msg: 'test' }),
    blob: async () => ({ msg: 'testblob' }),
  };
  it('Should return response 200 and msg = test when status = 200 and blob is falsy', async () => {
    const result = await buildResponse(responseMock, { blob: false, text: false });
    expect(result).toEqual({ statusHttp: responseMock.status, msg: 'test' });
  });
  it('Should return msg = testblob when status = 200 and blob is truthy', async () => {
    const result = await buildResponse(responseMock, { blob: true, text: false });
    expect(result).toEqual({ msg: 'testblob' });
  });
  it('Should return msg = testText when status = 200 and text is truthy', async () => {
    const result = await buildResponse(responseMock, { blob: false, text: true });
    expect(result).toEqual({ msg: 'testText' });
  });
  it('Should called computeDataErrorFn when status = 504', async () => {
    responseMock.status = 504;
    try {
      await buildResponse(responseMock, { blob: false, text: false }, computeDataErrorFn);
    } catch (error) {
      expect(computeDataErrorFn).toBeCalled();
    }
  });
  it('Should called computeDataErrorFn when status = 500', async () => {
    responseMock.status = 500;
    try {
      await buildResponse(responseMock, { blob: false, text: false }, computeDataErrorFn);
    } catch (error) {
      expect(computeDataErrorFn).toBeCalled();
    }
  });
  it('Should called computeDataErrorFn when status = 400', async () => {
    responseMock.status = 400;
    try {
      await buildResponse(responseMock, { blob: false, text: false }, computeDataErrorFn);
    } catch (error) {
      expect(computeDataErrorFn).toBeCalled();
    }
  });
  it('Should return response 204 when status = 204', async () => {
    responseMock.status = 204;
    const result = await buildResponse(responseMock, { blob: false, text: false });
    expect(result).toEqual({ statusHttp: responseMock.status });
  });
});

describe('computeDataError', () => {
  const responseMock = {
    status: 500,
    text: async () => ({ msg: 'test' }),
    json: async () => ({}),
    blob: async () => ({ msg: 'testblob' }),
  };
  const setResponseFn = jest.fn();
  it('Should called setResponseFn without setResponseFn', async () => {
    responseMock.json = async () => ({
      anomaly: { label: 'test' },
      code: 500,
    });
    try {
      await computeDataError(responseMock);
      expect(setResponseFn).toBeCalledWith({ label: 'test' });
    } catch (error) {}
  });
  it('Should called setResponseFn', async () => {
    responseMock.json = async () => ({
      anomaly: { label: 'test' },
      code: 500,
    });
    try {
      await computeDataError(responseMock, setResponseFn);
      expect(setResponseFn).toBeCalledWith({ label: 'test' });
    } catch (error) {}
  });
  it('Should called setResponseFn in throw', async () => {
    responseMock.json = async () => {
      throw new Error('');
    };
    try {
      await computeDataError(responseMock, setResponseFn);
    } catch (error) {
      expect(setResponseFn).toBeCalledWith({
        response: { anomaly: { label: STATUS_HTTP_MESSAGES[responseMock.status] }, status: responseMock.status },
      });
    }
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
