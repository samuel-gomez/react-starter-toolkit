import React from 'react';
import PropTypes from 'prop-types';
import LasyImage from 'shared/components/LasyImage';
import StorybookIcon from 'shared/components/StorybookIcon';
import SlashIcon from 'shared/components/SlashIcon';
import { STORYBOOK, DESIGN_SYSTEM } from 'shared/constants';

const Card = ({ storybook, designSystem, title, picture: { alt, name } }) => (
  <article className="af-card">
    <LasyImage className="af-card__image" name={name} alt={alt} />
    <header className="af-card__header">
      <h3 className="af-card__title">{title}</h3>
    </header>
    <section className="af-card__content">
      {designSystem && (
        <a
          className="btn af-btn--circle af-btn--svg"
          href={`${DESIGN_SYSTEM}${designSystem?.path}`}
          title={storybook?.text}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SlashIcon />
        </a>
      )}
      {storybook && (
        <a
          className="btn af-btn--circle af-btn--storybook"
          href={`${STORYBOOK}?path=/story/${storybook?.path}`}
          title={storybook?.text}
          target="_blank"
          rel="noopener noreferrer"
        >
          <StorybookIcon />
        </a>
      )}
    </section>
  </article>
);

export const cardPropTypes = {
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

export const cardDefaultProps = {
  title: 'Title',
};

Card.propTypes = cardPropTypes;
Card.defaultProps = cardDefaultProps;

export default Card;
