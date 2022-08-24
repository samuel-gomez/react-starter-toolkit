import { withClassDefault, withClassModifier, WithClassModifierOptions, compose, identity } from '@axa-fr/react-toolkit-core';
import Header from 'Layout/Header';
import Footer from 'Layout/Footer';
import TitleBar from 'Layout/TitleBar';
import Menu from 'Layout/Menu';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

export type TLayout = WithClassModifierOptions & {
  children?: ReactNode;
  className?: string;
  disabled?: {
    header: boolean;
    menu: boolean;
    title: boolean;
    footer: boolean;
  };
  propsHeader?: ComponentPropsWithoutRef<typeof Header>;
  propsMenu?: ComponentPropsWithoutRef<typeof Menu>;
  propsTitle?: ComponentPropsWithoutRef<typeof TitleBar>;
  propsFooter?: ComponentPropsWithoutRef<typeof Footer>;
};

const disabledDefault = {
  header: false,
  menu: false,
  title: false,
  footer: false,
};
const DEFAULT_CLASSNAME = 'af-main container';

const Layout = ({ className, children, propsHeader, propsMenu, propsTitle, propsFooter, disabled = disabledDefault }: TLayout) => (
  <>
    {!disabled.header && <Header {...propsHeader} />}
    {!disabled.menu && <Menu {...propsMenu} />}
    {!disabled.title && <TitleBar {...propsTitle} />}
    <section className={className}>{children}</section>
    {!disabled.footer && <Footer {...propsFooter} />}
  </>
);

const enhance = compose(identity<TLayout>(), withClassDefault(DEFAULT_CLASSNAME), withClassModifier());

export default enhance(Layout);
