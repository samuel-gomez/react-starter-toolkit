import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import logo from 'shared/images/slash-logo.svg';
import HeaderPage, { code } from '../Header';

describe('<HeaderPage/>', () => {
  it('Should render HeaderPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<HeaderPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const onChange = jest.fn();

  const defaultProps = {
    classModifier: 'custom-width',
    title: 'Toolkit React Starter',
    alt: 'Toolkit React Starter',
    subtitle: 'by Slash Design System',
    infos: JSON.stringify([{ word: 'Portefeuille :', definition: '000123456789' }]),
    name: 'Bob Smith',
    link: 'link',
    profile: 'Public',
    onChange,
  };

  it('Should render Header with default props', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`<Header classModifier="${defaultProps.classModifier}">
      <Name title="${defaultProps.title}" img="${logo}" alt="${defaultProps.alt}" subtitle="${defaultProps.subtitle}" />
      <Infos infos={${defaultProps.infos}} />
      <User name="${defaultProps.name}" href="${defaultProps.link}" profile="${defaultProps.profile}" />
    </Header>`),
    );
  });
});
