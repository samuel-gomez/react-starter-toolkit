import { ReactNode } from 'react';
import Layout, { TLayout } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  infos: [{ word: 'Portefeuille :', definition: '000123456789' }],
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

export const code = ({ infos }: Props) => `<Infos infos={${JSON.stringify(infos)}} />`;

const InfosWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader
        storybookPath={STORYBOOK_PATH}
        designSystemPath={DESIGN_SYSTEM_PATH}
        githubPackage={GITHUB_PACKAGE}
        npmName={NPM_NAME}
        openEditor={openEditor}
      />
      <LiveCode classModifier="with-editor" styleLivePreview={{ textAlign: 'left' }} code={code(props)} scope={{ props }} />
    </>
  ),
  knobs as unknown as Tknobs,
);

const InfosEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <InfosWithEditor {...state} onChange={onChange} />;
};

type TInfosPage = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
};

const InfosDemo = ({ titleBar = TITLE_BAR, title = TITLE }: TInfosPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <InfosEditable />
  </Layout>
);

export default InfosDemo;
