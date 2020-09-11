import React from 'react';
import { withCustomFetch, customFetch } from './withCustomFetch';

const baseProps = {
  environment: {
    apiUrl: 'myurl',
    fetchConfig: {
      headers: 'headers',
      body: 'body',
    },
  },
  accessToken: 'mytoken',
};

const BaseComponent = () => <div>BaseComponent</div>;
const fetchMock = jest.fn({
  json: () => {},
});

const EnhancedComponent = withCustomFetch(BaseComponent);

describe('withCustomFetch', () => {
  it('Should BaseComponent receive fetch props when use withCustomFetch HOC', () => {
    expect(EnhancedComponent({ ...baseProps }).props.fetchCustom).toBeDefined();
  });
});

describe('customFetch', () => {
  const resolvedValue = { json: () => ({ data: 'data' }), blob: () => ({ blob: 'blob' }), status: 200 };
  const apiMock = 'http://localhost:5001/api/';
  const fetchAuthConfigMock = {
    headers: {
      'x-api-key': 'nadia',
    },
  };
  const path = 'projects';

  it('Should BaseComponent receive fetch props when use withCustomFetch HOC', async () => {
    const customConfig = {
      headers: {
        body: 'body',
      },
    };
    fetchMock.mockResolvedValue(resolvedValue);
    await customFetch({ apiUrl: apiMock, fetchAuthConfig: fetchAuthConfigMock, fetchFn: fetchMock })(path, customConfig);

    expect(fetchMock).toBeCalledWith('http://localhost:5001/api/projects', {
      headers: {
        'x-api-key': 'nadia',
        body: 'body',
      },
    });
  });

  it('Should return called response.json When config.blob equal is false', async () => {
    const customConfig = {};
    fetchMock.mockResolvedValue(resolvedValue);
    const result = await customFetch({ apiUrl: apiMock, fetchAuthConfig: fetchAuthConfigMock, fetchFn: fetchMock })(path, customConfig);
    expect(result).toEqual({ data: 'data', statusHttp: 200 });
  });

  it('Should return called response.blob When config.blob is true', async () => {
    const customConfig = {
      blob: true,
    };
    fetchMock.mockResolvedValue(resolvedValue);
    const result = await customFetch({ apiUrl: apiMock, fetchAuthConfig: fetchAuthConfigMock, fetchFn: fetchMock })(path, customConfig);
    expect(result).toEqual({ blob: 'blob' });
  });
});
