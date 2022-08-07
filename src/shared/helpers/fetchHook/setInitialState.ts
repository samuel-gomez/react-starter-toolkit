type TReturnSetInitialState = {
  isLoading: boolean;
  isLoaded: boolean;
  [x: string | number]: unknown;
  anomaly: {
    [x: string]: unknown;
  };
};

const setInitialState = (serviceName: string, defaultValue: object | [] = []): TReturnSetInitialState => ({
  isLoading: false,
  isLoaded: false,
  [serviceName]: defaultValue,
  anomaly: {
    [serviceName]: null,
  },
});

export default setInitialState;
