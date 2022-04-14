import React, { useContext } from 'react';
import { func } from 'prop-types';
import { Routes, Route, Navigate } from 'react-router-dom';
import PageNotFound from 'pages/NotFound';
import PageUnauthorize from 'pages/Unauthorize';
import Members from 'pages/Members';
import SearchMembers from 'pages/SearchMembers';
import SlashDesignSystem from 'pages/SlashDesignSystem';
import Modal from 'pages/Demos/Modal';
import Button from 'pages/Demos/Button';
import Dashboard from 'pages/Dashboard';
import ROUTE_URL from 'Layout/constants';
import { UserContext } from 'App/UserProvider';

export const WithAuth = ({ Component, NavigateCmpt = Navigate, authorized = [''], UserContextObj = UserContext }) => {
  const userContext = useContext(UserContextObj);
  return authorized.includes(userContext?.authRole) || !userContext.isEnabled ? <Component /> : <NavigateCmpt to={ROUTE_URL.UNAUTHORIZE} />;
};

const RoutesCmpt = ({
  SlashDesignSystemCmpt,
  DashboardCmpt,
  MembersCmpt,
  SearchMembersCmpt,
  ModalCmpt,
  ButtonCmpt,
  PageUnauthorizeCmpt,
  WithAuthCmpt,
}) => (
  <Routes>
    <Route exact path={ROUTE_URL.SLASH} element={<WithAuthCmpt Component={SlashDesignSystemCmpt} />} />
    <Route exact path={ROUTE_URL.MEMBERS} element={<WithAuthCmpt Component={MembersCmpt} />} />
    <Route exact path={ROUTE_URL.SEARCHMEMBERS} element={<WithAuthCmpt Component={SearchMembersCmpt} />} />
    <Route exact path={ROUTE_URL.MODAL} element={<WithAuthCmpt Component={ModalCmpt} />} />
    <Route exact path={ROUTE_URL.BUTTON} element={<WithAuthCmpt Component={ButtonCmpt} />} />
    <Route exact path={ROUTE_URL.DASHBOARD} element={<WithAuthCmpt Component={DashboardCmpt} />} />
    <Route exact path={ROUTE_URL.UNAUTHORIZE} element={<PageUnauthorizeCmpt />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

RoutesCmpt.propTypes = {
  SlashDesignSystemCmpt: func,
  DashboardCmpt: func,
  MembersCmpt: func,
  SearchMembersCmpt: func,
  ModalCmpt: func,
  ButtonCmpt: func,
  PageUnauthorizeCmpt: func,
  WithAuthCmpt: func,
};

RoutesCmpt.defaultProps = {
  SlashDesignSystemCmpt: SlashDesignSystem,
  DashboardCmpt: Dashboard,
  MembersCmpt: Members,
  SearchMembersCmpt: SearchMembers,
  ModalCmpt: Modal,
  ButtonCmpt: Button,
  PageUnauthorizeCmpt: PageUnauthorize,
  WithAuthCmpt: WithAuth,
};

export default RoutesCmpt;
