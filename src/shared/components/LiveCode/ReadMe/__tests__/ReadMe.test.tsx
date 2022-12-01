import { render } from '@testing-library/react';
import ReadMe, { codeMarkdown, regexLanguage } from '../ReadMe';

describe('<ReadMe />', () => {
  it('Render <ReadMe /> with markdownContent, isFetching, error, refetch', () => {
    const { asFragment } = render(<ReadMe markdownContent="test" isFetching={false} error={null} refetch={jest.fn()} />);

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('codeFn', () => {
  const childrenMock = ['const Button = () => <SimpleButton>Lorem Ipsum</SimpleButton>;\nexport default Button;\n'];
  it('Render codeFn with inline undefined', () => {
    const { asFragment } = render(
      codeMarkdown({
        inline: undefined,
        className: 'language-javascript',
        children: childrenMock,
      }),
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('Render codeFn with inline true', () => {
    const { asFragment } = render(
      codeMarkdown({
        inline: true,
        className: undefined,
        children: childrenMock,
      }),
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('regexLanguage', () => {
  it('Should return an array with javascript language', () => {
    const result = regexLanguage('language-javascript');
    expect(result?.length).toEqual(2);
  });
  it('Should return null when className is undefined', () => {
    const result = regexLanguage(undefined);
    expect(result).toEqual(null);
  });
});
