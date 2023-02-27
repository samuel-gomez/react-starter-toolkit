import { ReactNode } from 'react';
import Layout, { TLayout } from 'shared/components/Layout';
import { TITLE_BAR, TITLE } from './constants';

export type THome = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
};

const Home = ({ titleBar = TITLE_BAR, title = TITLE }: THome) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
  </Layout>
);

export default Home;
