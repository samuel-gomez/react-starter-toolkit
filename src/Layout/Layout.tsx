import { withClassDefault, withClassModifier, WithClassModifierOptions, compose, identity } from '@axa-fr/react-toolkit-core';
import Header from 'Layout/Header';
import Footer from 'Layout/Footer';
import TitleBar from 'Layout/TitleBar';
import Menu from 'Layout/Menu';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

export type TLayout = WithClassModifierOptions & {
  children?: ReactNode;
  className?: string;
  fullScreen?: boolean;
  disabled?: {
    header?: boolean;
    menu?: boolean;
    title?: boolean;
    footer?: boolean;
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
const DEFAULT_CLASSNAME = 'af-main';

const Layout = ({ className, children, propsHeader, propsMenu, propsTitle, propsFooter, fullScreen, disabled = disabledDefault }: TLayout) => (
  <>
    {!disabled.header && <Header {...propsHeader} fullScreen={fullScreen} />}
    {!disabled.menu && <Menu {...propsMenu} fullScreen={fullScreen} />}
    {!disabled.title && <TitleBar {...propsTitle} fullScreen={fullScreen} />}
    <main className={className}>{fullScreen ? children : <section className="container">{children}</section>}</main>
    {!disabled.footer && <Footer {...propsFooter} fullScreen={fullScreen} />}
  </>
);

const enhance = compose(identity<TLayout>(), withClassDefault(DEFAULT_CLASSNAME), withClassModifier());

export default enhance(Layout);
