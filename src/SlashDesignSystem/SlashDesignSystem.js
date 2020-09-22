import React from 'react';
import PropTypes from 'prop-types';
import Cards from 'shared/components/Cards';
import { cardPropTypes } from 'shared/components/Cards/Card';
import { COMPONENTS, TITLE_BAR, TITLE } from './constants';

const SlashDesignSystemPage = ({ header, footer, title, menu, components }) => (
  <>
    {header()}
    {menu()}
    {title({ title: TITLE_BAR })}
    <div className="af-main container">
      <h2 className="af-title--content">{TITLE}</h2>
      <Cards items={components} />
    </div>
    {footer()}
  </>
);

export const formPagePropTypes = {
  components: PropTypes.arrayOf(
    PropTypes.shape({
      ...cardPropTypes,
    }),
  ),
};

export const formPageDefaultProps = {
  components: COMPONENTS,
};

SlashDesignSystemPage.propTypes = formPagePropTypes;
SlashDesignSystemPage.defaultProps = formPageDefaultProps;

SlashDesignSystemPage.propTypes = formPagePropTypes;

export default SlashDesignSystemPage;
