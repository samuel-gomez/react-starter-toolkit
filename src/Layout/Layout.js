import React from 'react';
import Header from 'Layout/Header';
import Footer from 'Layout/Footer';
import TitleBar from 'Layout/TitleBar';

export const renderTitle = ({ children, ...propsTitle }) => <TitleBar {...propsTitle}>{children}</TitleBar>;
export const renderHeader = propsHeader => <Header {...propsHeader} />;
export const renderFooter = () => <Footer />;

const Layout = (Component, props = {}) => <Component {...props} title={renderTitle} header={renderHeader} footer={renderFooter} />;
export default Layout;
