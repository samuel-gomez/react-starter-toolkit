import { Tanomaly } from 'shared/types';

export type TInitialState<TdefaultValue = []> = {
  [x: string]:
    | unknown
    | TdefaultValue
    | {
        [y: string]: Tanomaly | null;
      };
};

const setInitialState = <TdefaultValue = []>(serviceName: string, defaultValue: TdefaultValue | never[] = []): TInitialState<TdefaultValue> => ({
  isLoading: false,
  isLoaded: false,
  anomaly: {
    [serviceName]: null,
  },
  [serviceName]: defaultValue,
});

export default setInitialState;
