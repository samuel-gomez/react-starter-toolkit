import React from 'react';
import { Link } from 'react-router-dom';
import { Title } from '@axa-fr/react-toolkit-all';
import { PropTypes } from 'prop-types';
import './TitleBar.scss';

const TitleBar = ({ backHome, children, className, handleClick, title }) => (
  <Title className={className} toggleMenu={handleClick} title={title}>
    {backHome && (
      <Link title="Retour à l'accueil" className="btn af-btn--circle" to="/">
        <i className="glyphicon glyphicon-home" />
      </Link>
    )}
    {children}
  </Title>
);

TitleBar.defaultProps = {
  backHome: false,
  children: null,
  className: 'af-title-bar',
};

TitleBar.propTypes = {
  backHome: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default TitleBar;
