import Layout, { TLayoutPage } from 'Layout';
import Cards from 'shared/components/Cards';
import COMPONENTS, { TITLE_BAR, TITLE } from './constants';

export type TSlashDesignSystemPage = TLayoutPage & {
  components?: typeof COMPONENTS;
};

const SlashDesignSystemPage = ({ titleBar = TITLE_BAR, title = TITLE, components = COMPONENTS }: TSlashDesignSystemPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <Cards items={components} />
  </Layout>
);

export default SlashDesignSystemPage;
