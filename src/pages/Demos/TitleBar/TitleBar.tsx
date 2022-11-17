import { ReactNode } from 'react';
import Layout, { TLayout } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';
import './TitleBar.scss';

const INITIAL_STATE = {
  classModifier: 'custom-width',
  content: 'Custom right content',
  title: 'Demo Titlebar',
  subtitle: 'Sous titre',
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

export const code = ({
  title,
  subtitle,
  content,
  classModifier,
}: Props) => `<Title classModifier="${classModifier}" title="${title}" subtitle="${subtitle}">
    ${content}
</Title>`;

const TitleBarWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader storybookPath={STORYBOOK_PATH} githubPackage={GITHUB_PACKAGE} npmName={NPM_NAME} openEditor={openEditor} />
      <LiveCode classModifier="with-editor" code={code(props)} scope={props} />
    </>
  ),
  knobs as unknown as Tknobs,
);

const TitleBarEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });

  return <TitleBarWithEditor {...state} onChange={onChange} />;
};

type TTitleBarPage = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
};

const TitleBarPage = ({ titleBar = TITLE_BAR, title = TITLE }: TTitleBarPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <TitleBarEditable />
  </Layout>
);

export default TitleBarPage;
