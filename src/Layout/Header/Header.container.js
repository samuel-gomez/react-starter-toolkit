import React, { useContext } from 'react';
import { string } from 'prop-types';
import { UserContext } from 'App/UserProvider';
import Header from './Header';

const HeaderContainer = props => {
  const userContext = useContext(UserContext);
  return <Header {...props} {...userContext} />;
};

HeaderContainer.propTypes = {
  title: string,
  subtitle: string,
};

HeaderContainer.defaultProps = {
  title: 'Toolkit React Starter',
  subtitle: 'by Slash Design System',
};

export default HeaderContainer;
