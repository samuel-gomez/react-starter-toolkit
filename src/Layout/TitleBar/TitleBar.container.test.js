import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import TitleBarEnhanced from './index';

const wrapper = ({ children }) => <StaticRouter context={{}}>{children}</StaticRouter>;

const defaultProps = { backHome: false, classModifier: '' };

const createRender = customProps => {
  const actualProps = { ...defaultProps, ...customProps };
  return render(<TitleBarEnhanced {...actualProps} />, { wrapper });
};

describe('Component <TitleBarEnhanced />', () => {
  it('Should render TitleBarEnhanced', () => {
    const { asFragment } = createRender({ classModifier: 'red' });
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should className contain "af-title-bar--red" when classModifier equal "red"', () => {
    const { container } = createRender({ classModifier: 'red' });
    expect(container.querySelector('.af-title-bar--red')).toBeDefined();
  });

  it('Should className contain "af-title-bar--backhome" modifier when backhome equal true', () => {
    const { container } = createRender({ backHome: true });
    expect(container.querySelector('.af-title-bar--backhome')).toBeDefined();
  });
});
