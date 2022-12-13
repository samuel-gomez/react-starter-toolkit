import manageConfig from 'shared/helpers/manageConfig';

describe('manageConfig', () => {
  let apiNameMock = 'base';
  const fetchAuthConfigMock = {
    headers: { test: 'test' },
  };
  it('Should return object with headers', () => {
    const result = manageConfig(apiNameMock, fetchAuthConfigMock);
    expect(result).toEqual(fetchAuthConfigMock);
  });
  it('Should return object without headers', () => {
    apiNameMock = 'other';
    const result = manageConfig(apiNameMock, fetchAuthConfigMock);
    expect(result).toEqual({});
  });
});
