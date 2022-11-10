import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import TitleBarPage, { code } from '../TitleBar';

describe('<TitleBarPage/>', () => {
  it('Should render TitleBarPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<TitleBarPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const onChange = jest.fn();

  const defaultProps = {
    classModifier: 'custom-width',
    content: 'Custom right content',
    title: 'Demo Titlebar',
    subtitle: 'Sous titre',
    onChange,
  };

  it('Should render TitleBar with default props', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`<Title classModifier="${defaultProps.classModifier}" title="${defaultProps.title}" subtitle="${defaultProps.subtitle}">
        ${defaultProps.content}
    </Title>`),
    );
  });
});
