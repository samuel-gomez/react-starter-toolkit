/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import withClassNameModifier from 'shared/hoc/WithClassNameModifier';
import Header from './Header';
import Footer from './Footer';
import TitleBar from './TitleBar';
import Menu from './Menu';
import A11yMenu from './A11yMenu';

export type TLayout = {
  children?: ReactNode;
  className?: string;
  fullScreen?: boolean;
  disabled?: {
    header?: boolean;
    menu?: boolean;
    title?: boolean;
    footer?: boolean;
    a11yMenu?: boolean;
  };
  propsHeader?: ComponentPropsWithoutRef<typeof Header>;
  propsMenu?: any;
  propsTitle?: any;
  propsFooter?: ComponentPropsWithoutRef<typeof Footer>;
  propsA11yMenu?: ComponentPropsWithoutRef<typeof A11yMenu>;
};

export type TLayoutPage = TLayout & {
  titleBar?: string;
  title?: ReactNode;
};

const disabledDefault = {
  header: false,
  menu: false,
  title: false,
  footer: false,
  a11yMenu: false,
};

const DEFAULT_CLASSNAME = 'af-main';

const Layout = withClassNameModifier(
  ({ className, children, propsHeader, propsMenu, propsTitle, propsFooter, propsA11yMenu, fullScreen, disabled = disabledDefault }: TLayout) => (
    <>
      {!disabled.a11yMenu && <A11yMenu {...propsA11yMenu} />}
      {!disabled.header && <Header {...propsHeader} fullScreen={fullScreen} />}
      {!disabled.menu && <Menu {...propsMenu} fullScreen={fullScreen} />}
      {!disabled.title && <TitleBar {...propsTitle} fullScreen={fullScreen} />}
      <main aria-label="Main Content" id="main-content" className={className}>
        {fullScreen ? children : <section className="container">{children}</section>}
      </main>
      {!disabled.footer && <Footer {...propsFooter} fullScreen={fullScreen} />}
    </>
  ),
  DEFAULT_CLASSNAME,
);

export default Layout;
