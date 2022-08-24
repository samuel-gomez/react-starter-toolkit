import Layout, { TLayout } from 'Layout';
import { ReactNode } from 'react';
import Cards from 'shared/components/Cards';
import { COMPONENTS, TITLE_BAR, TITLE } from './constants';

export type TSlashDesignSystemPage = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
  components?: typeof COMPONENTS;
};

const SlashDesignSystemPage = ({ titleBar = TITLE_BAR, title = TITLE, components = COMPONENTS }: TSlashDesignSystemPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h2 className="af-title--content">{title}</h2>
    <Cards items={components} />
  </Layout>
);

export default SlashDesignSystemPage;
