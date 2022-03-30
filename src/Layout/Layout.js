import React from 'react';
import { node, string, bool, shape } from 'prop-types';
import WithClassNameModifier from 'shared/helpers/WithClassNameModifier';
import Header from 'Layout/Header';
import Footer from 'Layout/Footer';
import TitleBar from 'Layout/TitleBar';
import Menu from 'Layout/Menu';

const Layout = WithClassNameModifier(({ className, children, propsHeader, propsMenu, propsTitle, propsFooter, disabled }) => (
  <>
    {!disabled.header && <Header {...propsHeader} />}
    {!disabled.menu && <Menu {...propsMenu} />}
    {!disabled.title && <TitleBar {...propsTitle} />}
    <section className={className}>{children}</section>
    {!disabled.footer && <Footer {...propsFooter} />}
  </>
));

Layout.propTypes = {
  children: node,
  className: string,
  disabled: shape({
    header: bool,
    menu: bool,
    title: bool,
    footer: bool,
  }),
};

Layout.defaultProps = {
  className: 'af-main container',
  children: null,
  disabled: {
    header: false,
    menu: false,
    title: false,
    footer: false,
  },
};

export default Layout;
