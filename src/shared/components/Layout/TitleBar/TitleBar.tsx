import { ReactNode } from 'react';
import Link from 'next/link';
import { Title as HeaderTitle } from '@axa-fr/react-toolkit-layout-header';
import { withClassDefault, withClassModifier, WithClassModifierOptions, compose, identity } from '@axa-fr/react-toolkit-core';
import './TitleBar.scss';

type TTitleBar = WithClassModifierOptions & {
  backHome?: boolean;
  children?: ReactNode;
  className?: string;
  title?: string;
  handleClick?: () => void;
};

export const DEFAULT_CLASSNAME = 'af-title-bar';

const TitleBar = ({ title = 'title', handleClick, children = <></>, backHome = false, className }: TTitleBar) => (
  <HeaderTitle className={className} toggleMenu={handleClick} title={title}>
    {backHome && (
      <Link aria-label="Retour à l'accueil" className="btn af-btn--circle" href="/">
        <i className="glyphicon glyphicon-home" />
      </Link>
    )}
    {children}
  </HeaderTitle>
);

const enhance = compose(identity<TTitleBar>(), withClassDefault(DEFAULT_CLASSNAME), withClassModifier());

export default enhance(TitleBar);
