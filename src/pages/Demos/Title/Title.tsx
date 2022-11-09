import { ReactNode } from 'react';
import Layout, { TLayout } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  id: 'uniqueid',
  className: 'af-title--content',
  title: 'My title',
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

export const code = ({ className, title, id }: Props) => `<h1 id="${id}" className="${className}">${title}</h1>`;

const TitleWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader
        storybookPath={STORYBOOK_PATH}
        designSystemPath={DESIGN_SYSTEM_PATH}
        githubPackage={GITHUB_PACKAGE}
        npmName={NPM_NAME}
        openEditor={openEditor}
      />
      <LiveCode classModifier="with-editor" code={code(props)} scope={props} />
    </>
  ),
  knobs as unknown as Tknobs,
);

const TitleEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });

  return <TitleWithEditor {...state} onChange={onChange} />;
};

type TTitlePage = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
};

const TitlePage = ({ titleBar = TITLE_BAR, title = TITLE }: TTitlePage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <TitleEditable />
  </Layout>
);

export default TitlePage;
