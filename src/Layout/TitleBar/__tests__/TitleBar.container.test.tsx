import { emptyFunction, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import TitleBarEnhanced from '../';

const defaultProps = { title: 'title', handleClick: emptyFunction };

const createRender = (customProps = {}) => {
  const actualProps = { ...defaultProps, ...customProps };
  return renderWithWrapperStaticRouter(<TitleBarEnhanced {...actualProps} />);
};

describe('Component <TitleBarEnhanced />', () => {
  it.each`
    customProps                                                                 | classNameExpected
    ${undefined}                                                                | ${'.af-title-bar'}
    ${{ className: 'otherclassname' }}                                          | ${'.otherclassname'}
    ${{ classModifier: 'red' }}                                                 | ${'.af-title-bar--red'}
    ${{ backHome: true }}                                                       | ${'.af-title-bar--backhome'}
    ${{ backHome: true, classModifier: 'custom' }}                              | ${'.af-title-bar--backhome.af-title-bar--custom'}
    ${{ className: 'otherclassname', backHome: true, classModifier: 'custom' }} | ${'.otherclassname--backhome.otherclassname--custom'}
  `('Should render TitleBarEnhanced with customProps: $customProps', ({ customProps, classNameExpected }) => {
    const { asFragment, container } = createRender(customProps);
    expect(container.querySelector(classNameExpected)).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });
});
