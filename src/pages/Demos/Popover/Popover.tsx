import { ReactNode } from 'react';
import { PopoverPlacements, PopoverModes } from '@axa-fr/react-toolkit-popover';
import { ClickEvent } from '@axa-fr/react-toolkit-core';
import Layout, { TLayout } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  title: 'Exemple',
  content: 'Contenu qui va reçevoir la popover',
  classModifier: '',
  placement: PopoverPlacements.right,
  mode: PopoverModes.over,
};

type Props = Partial<typeof INITIAL_STATE> & {
  onClick?: (arg: ClickEvent) => void;
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

export const code = ({ title, placement, mode, content, classModifier }: Props) => `
    <Popover mode="${mode}" placement="${placement}" classModifier="${classModifier}">
        <Popover.Pop>
            ${content}
        </Popover.Pop>
        <Popover.Over>
            ${title}
        </Popover.Over>
    </Popover>
`;

const PopoverWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader
        storybookPath={STORYBOOK_PATH}
        designSystemPath={DESIGN_SYSTEM_PATH}
        githubPackage={GITHUB_PACKAGE}
        npmName={NPM_NAME}
        openEditor={openEditor}
      />
      <LiveCode styleLivePreview={{ textAlign: 'left' }} code={code(props)} githubPackage={GITHUB_PACKAGE} scope={props} />
    </>
  ),
  knobs as unknown as Tknobs,
);

const PopoverEditable = () => {
  const { state, onChange, onClick } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <PopoverWithEditor {...state} onClick={onClick('onClick Navbar')} onChange={onChange} />;
};

type TNavBarPage = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
};

const PopoverDemo = ({ titleBar = TITLE_BAR, title = TITLE }: TNavBarPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <PopoverEditable />
  </Layout>
);

export default PopoverDemo;
