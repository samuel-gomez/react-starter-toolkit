import React from 'react';
import Header from 'Layout/Header';
import Footer from 'Layout/Footer';
import TitleBar from 'Layout/TitleBar';
import Menu from 'Layout/Menu';

export const renderTitle = ({ children, ...propsTitle }) => <TitleBar {...propsTitle}>{children}</TitleBar>;
export const renderHeader = propsHeader => <Header {...propsHeader} />;
export const renderFooter = () => <Footer />;
export const renderMenu = () => <Menu />;

const Layout = (Component, props = {}) => <Component {...props} menu={renderMenu} header={renderHeader} footer={renderFooter} title={renderTitle} />;
export default Layout;
