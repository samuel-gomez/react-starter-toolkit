import { ReactNode, useContext } from 'react';
import { UserContext } from 'providers/UserProvider';

type TAuthorize = {
  authorized?: string[];
  children?: ReactNode;
  UserContextObj?: typeof UserContext;
};

const Authorize = ({ children, authorized, UserContextObj = UserContext }: TAuthorize) => {
  const { authRole } = useContext(UserContextObj);
  return authorized !== undefined && !authorized.includes(authRole) ? null : <>{children}</>;
};

export default Authorize;
