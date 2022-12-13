import { createContext } from 'react';
import { render, act } from '@testing-library/react';
import { TEnvironmentState } from 'App/EnvironmentProvider';
import AppWithEnvironment, { AppContainer } from '../App.container';
import { TApp } from '../App';

describe('<AppWithEnvironment />', () => {
  it('Renders AppWithEnvironment component without crashing', async () => {
    const { asFragment } = render(<AppWithEnvironment />);
    await act(() => expect(asFragment()).toMatchSnapshot());
  });
});

describe('<AppContainer />', () => {
  it('Renders AppContainer component without crashing', () => {
    const API_URL = {
      base: '/myApiUrlEnv',
    };
    const EnvironmentContextObj = createContext<TEnvironmentState>({
      environment: {
        oidc: {},
        fetchConfig: {},
        apiUrl: API_URL,
      },
      error: null,
    });

    const AppCmpt = ({ apiUrl = API_URL }: TApp) => <p>{apiUrl.base}</p>;
    const { getByText } = render(<AppContainer EnvironmentContextObj={EnvironmentContextObj} AppCmpt={AppCmpt} />);
    expect(getByText(/myApiUrlEnv/)).toBeInTheDocument();
  });
});
