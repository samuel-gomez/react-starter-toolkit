import React from 'react';
import Cards, { cardsPropTypes } from 'shared/components/Cards';
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
  ...cardsPropTypes,
};

export const formPageDefaultProps = {
  components: COMPONENTS,
};

SlashDesignSystemPage.propTypes = formPagePropTypes;
SlashDesignSystemPage.defaultProps = formPageDefaultProps;

SlashDesignSystemPage.propTypes = formPagePropTypes;

export default SlashDesignSystemPage;
