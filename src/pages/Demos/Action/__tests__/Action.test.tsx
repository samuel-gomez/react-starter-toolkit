import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import Action, { code } from '../Action';

describe('<Action />', () => {
  it('Should render Action', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<Action />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const onChange = jest.fn();

  const defaultProps = {
    classModifier: '',
    icon: 'link',
    title: 'Demo title',
    onChange,
  };

  it('Should render Action with default props', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`
      <Action
        classModifier="${defaultProps.classModifier}"
        icon="${defaultProps.icon}"
        title="${defaultProps.title}"
      />
      `),
    );
  });
});
