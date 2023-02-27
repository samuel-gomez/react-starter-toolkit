import { clearString } from 'shared/testsUtils';
import logo from 'shared/images/slash-logo.svg';
import { code } from '../Header';

describe('code', () => {
  const onChange = jest.fn();

  const defaultProps = {
    classModifier: 'custom-width',
    title: 'Toolkit React Starter',
    alt: 'Toolkit React Starter',
    subtitle: 'by Slash Design System',
    infos: [{ word: 'Portefeuille :', definition: '000123456789' }],
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
      <Infos infos={${JSON.stringify(defaultProps.infos)}} />
      <User name="${defaultProps.name}" href="${defaultProps.link}" profile="${defaultProps.profile}" />
    </Header>`),
    );
  });
});
