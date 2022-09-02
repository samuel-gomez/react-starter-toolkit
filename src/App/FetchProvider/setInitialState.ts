import { TInitialState } from 'shared/types';

const setInitialState = (serviceName: string, defaultValue: object | [] = []): TInitialState => ({
  isLoading: false,
  isLoaded: false,
  [serviceName]: defaultValue,
  anomaly: {
    [serviceName]: null,
  },
});

export default setInitialState;
