import { clearString } from 'shared/testsUtils';
import { code } from '../TitleBar';

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
      clearString(`<HeaderTitle classModifier="${defaultProps.classModifier}" title="${defaultProps.title}" subtitle="${defaultProps.subtitle}">
        ${defaultProps.content}
    </HeaderTitle>`),
    );
  });
});
