import { ReactNode } from 'react';
import Layout, { TLayout } from 'Layout';
import Help from '@axa-fr/react-toolkit-help';
import { PopoverPlacements, PopoverModes } from '@axa-fr/react-toolkit-popover';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  label: 'My label',
  mode: PopoverModes.click,
  placement: PopoverPlacements.right,
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

export const code = ({ label, mode, placement }: Props) => `<Help mode="${mode}" placement="${placement}">${label}</Help>`;

const HelpWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader storybookPath={STORYBOOK_PATH} githubPackage={GITHUB_PACKAGE} npmName={NPM_NAME} openEditor={openEditor} />
      <LiveCode
        classModifier="with-editor"
        code={code(props)}
        scope={{
          Help,
          ...props,
        }}
      />
    </>
  ),
  knobs as unknown as Tknobs,
);

const HelpEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });

  return <HelpWithEditor {...state} onChange={onChange} />;
};

type THelpPage = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
};

const HelpPage = ({ titleBar = TITLE_BAR, title = TITLE }: THelpPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <HelpEditable />
  </Layout>
);

export default HelpPage;
