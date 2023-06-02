import { ComponentPropsWithoutRef, ReactNode } from 'react';
import withClassNameModifier, { TwithClassNameModifier } from 'shared/hoc/WithClassNameModifier';
import Header from 'Layout/Header';
import Footer from 'Layout/Footer';
import TitleBar from 'Layout/TitleBar';
import Menu from 'Layout/Menu';
import A11yMenu from 'Layout/A11yMenu';
import './Layout.scss';

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
  propsMenu?: ComponentPropsWithoutRef<typeof Menu>;
  propsTitle?: ComponentPropsWithoutRef<typeof TitleBar>;
  propsFooter?: ComponentPropsWithoutRef<typeof Footer>;
  propsA11yMenu?: ComponentPropsWithoutRef<typeof A11yMenu>;
} & TwithClassNameModifier;

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
  { defaultClassName: 'af-main' },
);

export default Layout;
