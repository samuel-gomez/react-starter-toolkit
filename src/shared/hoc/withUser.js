import React from 'react';
import { UserContextProvider } from 'App/UserProvider/UserProvider';

const withUser = Component => props => (
  <UserContextProvider value={{ authRole: 'ADMIN' }}>
    <Component {...props} />
  </UserContextProvider>
);

export default withUser;
