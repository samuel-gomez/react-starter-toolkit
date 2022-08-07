import Layout from 'Layout';
import Cards from 'shared/components/Cards';
import { COMPONENTS, TITLE_BAR, TITLE } from './constants';

const SlashDesignSystemPage = ({ titleBar = TITLE_BAR, title = TITLE, components = COMPONENTS }) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h2 className="af-title--content">{title}</h2>
    <Cards items={components} />
  </Layout>
);

export default SlashDesignSystemPage;
