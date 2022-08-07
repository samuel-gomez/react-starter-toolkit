import setInitialState from './setInitialState';

const serviceName = 'myservice';

describe('setInitialState', () => {
  it('Should return initial state when called with service name', () => {
    const result = setInitialState(serviceName);
    const expected = {
      isLoading: false,
      isLoaded: false,
      [serviceName]: [],
      anomaly: {
        [serviceName]: null,
      },
    };
    expect(result).toEqual(expected);
  });
});
