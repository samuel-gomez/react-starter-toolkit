import { ComponentProps, useContext } from 'react';
import { UserContext } from 'App/UserProvider';
import Header from './Header';
import { SUBTITLE, TITLE } from './constants';

type THeaderContainer = Omit<ComponentProps<typeof Header>, 'title' | 'subtitle'> & {
  UserContextObj?: typeof UserContext;
  HeaderCmpt?: typeof Header;
  title?: string;
  subtitle?: string;
};

const HeaderContainer = ({ UserContextObj = UserContext, HeaderCmpt = Header, title = TITLE, subtitle = SUBTITLE, ...props }: THeaderContainer) => {
  const userContext = useContext(UserContextObj);
  return <HeaderCmpt {...props} {...userContext} title={title} subtitle={subtitle} />;
};

export default HeaderContainer;
