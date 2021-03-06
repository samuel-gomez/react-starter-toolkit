import fetchData from './fetchData';

describe('fetchData', () => {
  const fetchCustomMock = jest.fn();
  const setInitMock = jest.fn();
  const setErrorMock = jest.fn();
  const setSuccessMock = jest.fn();
  const fetchServiceMock = jest.fn();

  const defaultProps = {
    fetchCustom: fetchCustomMock,
    setInit: setInitMock,
    setError: setErrorMock,
    setSuccess: setSuccessMock,
    fetchServices: [{ myService: { service: fetchServiceMock } }],
  };

  it('Should setInit called When called fetchData', () => {
    fetchData(defaultProps);
    expect(setInitMock).toBeCalled();
  });

  it('Should setError called with Error("Error fetch") When fetchServices throw error', async () => {
    await fetchData({
      ...defaultProps,
      fetchServices: {
        normes: {
          service: async () => Promise.reject(new Error('Error fetch')),
        },
      },
    });
    expect(setErrorMock).toBeCalled();
    expect(setErrorMock).toBeCalledWith(Error('Error fetch'));
  });

  it('Should setResponsesFn called with data When fetchService return resolved value', async () => {
    const setResponsesMock = jest.fn();
    const findNormesMock = () => jest.fn();
    await fetchData({
      ...defaultProps,
      fetchServices: { normes: { service: findNormesMock } },
      setResponsesFn: setResponsesMock,
    });
    expect(setResponsesMock).toBeCalled();
  });
});
