import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withOidcSecure } from '@axa-fr/react-oidc-context';
import PageNotFound from 'NotFound';
import PageUnauthorize from 'Unauthorize';
import Members from 'Members';
import SlashDesignSystem from 'SlashDesignSystem';
import Dashboard from 'Dashboard';
import Layout from 'Layout';
import ROUTE_URL from 'Layout/constants';

export const renderLayoutMembers = parentProps => props => Layout(Members, props, parentProps);
export const renderLayoutDashboard = parentProps => props => Layout(Dashboard, props, parentProps);
export const renderLayoutSlashDesignSystem = parentProps => props => Layout(SlashDesignSystem, props, parentProps);

const Routes = props => (
  <Switch>
    <Route exact path={ROUTE_URL.DASHBOARD} render={withOidcSecure(renderLayoutDashboard(props))} />
    <Route exact path={ROUTE_URL.MEMBERS} render={withOidcSecure(renderLayoutMembers(props))} />
    <Route exact path={ROUTE_URL.SLASH} render={withOidcSecure(renderLayoutSlashDesignSystem(props))} />
    <Route exact path={ROUTE_URL.UNAUTHORIZE} component={PageUnauthorize} />
    <Route component={PageNotFound} />
  </Switch>
);

export default Routes;
