import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import { LoaderModes } from '@axa-fr/react-toolkit-loader';
import LoaderPage, { code } from '../Loader';

describe('<Loader />', () => {
  it('Should render LoaderPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<LoaderPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const onChange = jest.fn();

  const defaultProps = {
    text: '',
    content: `
        <div>
          <h1>Title Child</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ea blanditiis modi nobis eius 
            similique placeat veniam dolorum iusto. 
            Voluptatibus eum optio harum, saepe repellat dolorem tempore corporis doloremque magnam.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ea blanditiis modi nobis eius 
            similique placeat veniam dolorum iusto. 
            Voluptatibus eum optio harum, saepe repellat dolorem tempore corporis doloremque magnam.
          </p>
        </div>
    `,
    className: '',
    classModifier: '',
    mode: LoaderModes.get,
    onChange,
  };

  it('Should render Loader with default props', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`
        <Loader
          mode="${defaultProps.mode}"
          text="${defaultProps.text}"
          classModifier="${defaultProps.classModifier}"
          className="${defaultProps.className}">
          ${defaultProps.content}
        </Loader>
      `),
    );
  });
});
