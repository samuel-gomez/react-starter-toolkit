import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ImageEnhanced from 'shared/hook/useLoadImage.hook';

const Panel = ({ link, title, picture: { alt, name } }) => (
  <article className="af-panel">
    <header className="af-panel__header">
      <h3 className="af-panel__title">{title}</h3>
    </header>
    <section className="af-panel__content" style={{ minHeight: '200px', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
      <Link className="af-link" to={link.path}>
        <ImageEnhanced name={name} alt={alt} />
      </Link>
    </section>
  </article>
);

export const panelPropTypes = {
  link: PropTypes.shape({
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
