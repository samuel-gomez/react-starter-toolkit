import { ComponentProps, useContext } from 'react';
import { UserContext } from 'App/UserProvider';
import Header from './Header';

type THeaderContainer = Omit<ComponentProps<typeof Header>, 'title' | 'subtitle'> & {
  UserContextObj?: typeof UserContext;
  HeaderCmpt?: typeof Header;
  title?: string;
  subtitle?: string;
};

const HeaderContainer = ({
  UserContextObj = UserContext,
  HeaderCmpt = Header,
  title = 'Toolkit React Starter',
  subtitle = 'by Slash Design System',
  ...props
}: THeaderContainer) => {
  const userContext = useContext(UserContextObj);
  return <HeaderCmpt {...props} {...userContext} title={title} subtitle={subtitle} />;
};

export default HeaderContainer;
