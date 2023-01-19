import Layout, { TLayoutPage } from 'Layout';
import { PopoverModes, PopoverPlacements } from '@axa-fr/react-toolkit-popover';
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

export const code = ({ label, mode, placement }: Props) => `<HelpButton mode="${mode}" placement="${placement}">${label}</HelpButton>`;

const HelpWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader storybookPath={STORYBOOK_PATH} githubPackage={GITHUB_PACKAGE} npmName={NPM_NAME} openEditor={openEditor} />
      <LiveCode code={code(props)} scope={props} githubPackage={GITHUB_PACKAGE} />
    </>
  ),
  knobs as unknown as Tknobs,
);

const HelpEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });

  return <HelpWithEditor {...state} onChange={onChange} />;
};

const HelpPage = ({ titleBar = TITLE_BAR, title = TITLE }: TLayoutPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <HelpEditable />
  </Layout>
);

export default HelpPage;
