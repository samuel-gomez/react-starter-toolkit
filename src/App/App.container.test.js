import React, { createContext } from 'react';
import { render, act } from '@testing-library/react';
import AppWithEnvironment, { AppContainer } from './App.container';

describe('<AppWithEnvironment />', () => {
  it('Renders AppWithEnvironment component without crashing', async () => {
    await act(async () => {
      const { asFragment } = await render(<AppWithEnvironment />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});

describe('<AppContainer />', () => {
  it('Renders AppContainer component without crashing', () => {
    const EnvironmentContextObj = createContext({
      environment: {
        baseUrl: 'local',
      },
      error: null,
    });
    const AppCmpt = ({ baseUrl = '' }) => <p>{baseUrl}</p>;
    const { asFragment, getByText } = render(<AppContainer EnvironmentContextObj={EnvironmentContextObj} AppCmpt={AppCmpt} />);
    expect(getByText('local')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
