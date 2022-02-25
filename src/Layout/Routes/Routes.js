import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withOidcSecure } from '@axa-fr/react-oidc-context';
import PageNotFound from 'NotFound';
import PageUnauthorize from 'Unauthorize';
import Members from 'Members';
import SearchMembers from 'SearchMembers';
import SlashDesignSystem from 'SlashDesignSystem';
import Modal from 'Demos/Modal';
import Button from 'Demos/Button';
import Dashboard from 'Dashboard';
import Layout from 'Layout';
import ROUTE_URL from 'Layout/constants';

export const renderLayoutMembers = parentProps => props => Layout(Members, props, parentProps);
export const renderLayoutSearchMembers = parentProps => props => Layout(SearchMembers, props, parentProps);
export const renderLayoutDashboard = parentProps => props => Layout(Dashboard, props, parentProps);
export const renderLayoutSlashDesignSystem = parentProps => props => Layout(SlashDesignSystem, props, parentProps);
export const renderLayoutModal = parentProps => props => Layout(Modal, props, parentProps);
export const renderLayoutButton = parentProps => props => Layout(Button, props, parentProps);

const Routes = props => (
  <Switch>
    <Route exact path={ROUTE_URL.DASHBOARD} render={renderLayoutDashboard(props)} />
    <Route exact path={ROUTE_URL.MEMBERS} render={renderLayoutMembers(props)} />
    <Route exact path={ROUTE_URL.SEARCHMEMBERS} render={renderLayoutSearchMembers(props)} />
    <Route exact path={ROUTE_URL.SLASH} render={renderLayoutSlashDesignSystem(props)} />
    <Route exact path={ROUTE_URL.MODAL} render={renderLayoutModal(props)} />
    <Route exact path={ROUTE_URL.BUTTON} render={renderLayoutButton(props)} />
    <Route exact path={ROUTE_URL.UNAUTHORIZE} component={PageUnauthorize} />
    <Route component={PageNotFound} />
  </Switch>
);

export default Routes;
