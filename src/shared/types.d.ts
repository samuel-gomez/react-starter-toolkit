export type Tanomaly = {
  label: string;
  detail?: string;
  type?: string;
  iconName?: string;
  code?: string | number;
};

export type TInitialState = {
  isLoading: boolean;
  isLoaded: boolean;
  [x: string]: unknown;
  anomaly: {
    [x: string]: Tanomaly | null;
  };
};

export type TFetchState = TInitialState & {
  label?: string;
  code?: string | number;
  detail?: string;
};
