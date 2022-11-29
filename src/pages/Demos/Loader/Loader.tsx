import { ReactNode } from 'react';
import { Loader } from '@axa-fr/react-toolkit-all';
import { LoaderModes } from '@axa-fr/react-toolkit-loader';
import Layout, { TLayout } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
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
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

export const code = ({ text, mode, content, classModifier, className }: Props) => `
    <Loader
      mode="${mode}"
      text="${text}"
      classModifier="${classModifier}"
      className="${className}">
      ${content}
    </Loader>
`;

const LoaderWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader
        storybookPath={STORYBOOK_PATH}
        designSystemPath={DESIGN_SYSTEM_PATH}
        githubPackage={GITHUB_PACKAGE}
        npmName={NPM_NAME}
        openEditor={openEditor}
      />
      <LiveCode
        classModifier="with-editor"
        styleLivePreview={{ textAlign: 'center', position: 'relative' }}
        code={code(props)}
        scope={{
          Loader,
          ...props,
        }}
      />
    </>
  ),
  knobs as unknown as Tknobs,
);

const LoaderEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <LoaderWithEditor {...state} onChange={onChange} />;
};

type TLoaderPage = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
};

const LoaderDemo = ({ titleBar = TITLE_BAR, title = TITLE }: TLoaderPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <LoaderEditable />
  </Layout>
);

export default LoaderDemo;
