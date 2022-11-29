import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { HeaderTitle } from '@axa-fr/react-toolkit-all';
import { withClassDefault, withClassModifier, WithClassModifierOptions, compose, identity } from '@axa-fr/react-toolkit-core';
import './TitleBar.scss';

type TTitleBar = WithClassModifierOptions & {
  backHome?: boolean;
  children?: ReactNode;
  className?: string;
  title?: ReactNode;
  handleClick?: () => void;
  id?: string;
};

export const DEFAULT_CLASSNAME = 'af-title-bar';

const TitleBar = ({ title = 'title', handleClick, children = <></>, backHome = false, id = '', className }: TTitleBar) => (
  <HeaderTitle id={id} className={className} toggleMenu={handleClick} title={title}>
    {backHome && (
      <Link aria-label="Retour à l'accueil" className="btn af-btn--circle" to="/">
        <i className="glyphicon glyphicon-home" />
      </Link>
    )}
    {children}
  </HeaderTitle>
);

const enhance = compose(identity<TTitleBar>(), withClassDefault(DEFAULT_CLASSNAME), withClassModifier());

export default enhance(TitleBar);
