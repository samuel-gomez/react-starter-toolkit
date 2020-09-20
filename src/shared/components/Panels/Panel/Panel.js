import React from 'react';
import PropTypes from 'prop-types';
import LasyImage from 'shared/components/LasyImage';
import { STORYBOOK, DESIGN_SYSTEM } from 'shared/constants';

const Panel = ({ storybook, designSystem, title, picture: { alt, name } }) => (
  <article className="af-panel">
    <LasyImage name={name} alt={alt} />
    <header className="af-panel__header">
      <h3 className="af-panel__title">{title}</h3>
    </header>
    <section className="af-panel__content" style={{ minHeight: '200px', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
      <a
        className="btn af-btn--circle"
        href={`${DESIGN_SYSTEM}${designSystem.path}`}
        title={storybook.text}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="glyphicon glyphicon-link" />
      </a>
      <a
        className="btn af-btn--circle"
        href={`${STORYBOOK}?path=/story/${storybook.path}`}
        title={storybook.text}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="glyphicon glyphicon-link" />
      </a>
    </section>
  </article>
);

export const panelPropTypes = {
  storybook: PropTypes.shape({
    path: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  designSystem: PropTypes.shape({
    path: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  title: PropTypes.string,
};

export const panelDefaultProps = {
  title: 'Title',
};

Panel.propTypes = panelPropTypes;
Panel.defaultProps = panelDefaultProps;

export default Panel;
