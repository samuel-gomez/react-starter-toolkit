import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PageNotFound from 'NotFound';
import Members from 'Members';
import Layout from 'Layout';

export const renderLayoutMembers = props => Layout(Members, props);

const Routes = () => (
  <Switch>
    <Route exact path="/" render={renderLayoutMembers} />
    <Route component={PageNotFound} />
  </Switch>
);

export default Routes;
