import React from 'react';
import Layout, { renderTitle, renderHeader, renderFooter } from './Layout';
import TitleBarEnhanced from './TitleBar';
import Header from './Header';
import Footer from './Footer';

describe('Layout', () => {
  const CustomComponent = () => <div>Hello</div>;
  it('Should <CustomComponent /> contain layout props when call Layout', () => {
    const CustomComponentWithLayout = Layout(CustomComponent);
    expect(CustomComponentWithLayout.props.header).toBeDefined();
    expect(CustomComponentWithLayout.props.footer).toBeDefined();
    expect(CustomComponentWithLayout.props.title).toBeDefined();
  });

  it('Should <CustomComponent /> contain layout props and customProps when call Layout with ', () => {
    const customProps = {
      myProp: 'test',
    };
    const CustomComponentWithLayout = Layout(CustomComponent, customProps);
    expect(CustomComponentWithLayout.props.myProp).toBeDefined();
  });
});

describe('renderTitle', () => {
  it('Should return component TitleBarEnhanced', () => {
    const result = renderTitle({ children: <p>Hello</p> });
    expect(result.type).toEqual(TitleBarEnhanced);
    expect(result.props.children.type).toEqual('p');
  });
  it('Should return component TitleBarEnhanced with prop', () => {
    const propsTitle = {
      title: 'mytitle',
    };
    const result = renderTitle({ children: <p>Hello</p>, ...propsTitle });
    expect(result.props.title).toEqual('mytitle');
  });
});

describe('renderHeader', () => {
  it('Should return component <Header />', () => {
    const result = renderHeader({ children: <p>Hello</p> });
    expect(result.type).toEqual(Header);
  });
});

describe('renderFooter', () => {
  it('Should return component <Footer />', () => {
    const result = renderFooter({ children: <p>Hello</p> });
    expect(result.type).toEqual(Footer);
  });
});
