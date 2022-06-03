import { UserContext } from 'App/UserProvider';

const withUser = Component => props =>
  (
    <UserContext.Provider value={{ authRole: 'ADMIN' }}>
      <Component {...props} />
    </UserContext.Provider>
  );

export default withUser;
