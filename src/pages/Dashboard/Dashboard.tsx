import { ReactNode } from 'react';
import Layout, { TLayout } from 'Layout';
import { TITLE_BAR, TITLE } from './constants';

export type TDashboard = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
};

const Dashboard = ({ titleBar = TITLE_BAR, title = TITLE, classModifier = 'dashboard' }: TDashboard) => (
  <Layout propsTitle={{ title: titleBar }} classModifier={classModifier}>
    <h1 className="af-title--content">{title}</h1>
  </Layout>
);

export default Dashboard;
