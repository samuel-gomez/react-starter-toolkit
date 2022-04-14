import React from 'react';
import { string } from 'prop-types';
import Layout from 'Layout';
import { TITLE_BAR, TITLE } from './constants';

const Dashboard = ({ titleBar, title }) => (
  <Layout propsTitle={{ title: titleBar }} classModifier="dashboard">
    <h1 className="af-title--content">{title}</h1>
  </Layout>
);

Dashboard.propTypes = {
  titleBar: string,
  title: string,
};

Dashboard.defaultProps = {
  titleBar: TITLE_BAR,
  title: TITLE,
};
export default Dashboard;
