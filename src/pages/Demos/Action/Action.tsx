import { ReactNode } from 'react';
import Layout, { TLayout } from 'Layout';
import { Action } from '@axa-fr/react-toolkit-all';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  classModifier: '',
  icon: 'link',
  title: 'Demo title',
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

export const code = ({ title, icon, classModifier }: Props) => `
<Action
    classModifier="${classModifier}"
    icon="${icon}"
    title="${title}"
/>`;

const ActionWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader storybookPath={STORYBOOK_PATH} githubPackage={GITHUB_PACKAGE} npmName={NPM_NAME} openEditor={openEditor} />
      <LiveCode
        classModifier="with-editor"
        code={code(props)}
        scope={{
          Action,
          ...props,
        }}
      />
    </>
  ),
  knobs as unknown as Tknobs,
);

const ActionEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });

  return <ActionWithEditor {...state} onChange={onChange} />;
};

type TActionPage = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
};

const ActionPage = ({ titleBar = TITLE_BAR, title = TITLE }: TActionPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <ActionEditable />
  </Layout>
);

export default ActionPage;
