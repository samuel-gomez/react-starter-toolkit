import React, { useContext } from 'react';
import { UserContext } from 'App/User';
import Routes from './Routes';

const RouteWithUserInfo = () => {
  const userContext = useContext(UserContext);
  return <Routes {...userContext} />;
};

export default RouteWithUserInfo;
