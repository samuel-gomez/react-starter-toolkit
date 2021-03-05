import { useContext } from 'react';
import { UserContext } from 'App/UserProvider';

const Authorize = ({ authorized, children }) => {
  const { authRole } = useContext(UserContext);
  return authorized !== undefined && !authorized.includes(authRole) ? null : children;
};

export default Authorize;
