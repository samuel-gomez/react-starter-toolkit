import { arrayOf, shape, string } from 'prop-types';
import Layout from 'Layout';
import Cards from 'shared/components/Cards';
import { cardPropTypes } from 'shared/components/Cards/Card';
import { COMPONENTS, TITLE_BAR, TITLE } from './constants';

const SlashDesignSystemPage = ({ titleBar, title, components }) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h2 className="af-title--content">{title}</h2>
    <Cards items={components} />
  </Layout>
);

export const slashDesignSystemPagePropTypes = {
  components: arrayOf(
    shape({
      ...cardPropTypes,
    }),
  ),
  titleBar: string,
  title: string,
};

export const slashDesignSystemPageDefaultProps = {
  components: COMPONENTS,
  titleBar: TITLE_BAR,
  title: TITLE,
};

SlashDesignSystemPage.propTypes = slashDesignSystemPagePropTypes;
SlashDesignSystemPage.defaultProps = slashDesignSystemPageDefaultProps;

export default SlashDesignSystemPage;
