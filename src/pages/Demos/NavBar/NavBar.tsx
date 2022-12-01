import { ReactNode } from 'react';
import { ClickEvent } from '@axa-fr/react-toolkit-core';
import Layout, { TLayout } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';
import './NavBar.scss';

const INITIAL_STATE = {
  classModifier: '',
  positionInit: 1,
  isVisible: true,
};

type Props = Partial<typeof INITIAL_STATE> & {
  onClick?: (arg: ClickEvent) => void;
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

export const code = ({
  positionInit,
  isVisible,
  classModifier,
}: Props) => `<NavBar classModifier="${classModifier}" positionInit={${positionInit}} isVisible={${isVisible}} onClick={onClick}>
    <NavBarItem actionElt={<a className="af-nav__link">Home</a>} />
    <NavBarItem actionElt={<a className="af-nav__link">Forms</a>} />
</NavBar>`;

const NavBarWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
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
        classModifier="with-editor navbar"
        styleLivePreview={{ textAlign: 'left' }}
        code={code(props)}
        scope={props}
        githubPackage={GITHUB_PACKAGE}
      />
    </>
  ),
  knobs as unknown as Tknobs,
);

const NavBarEditable = () => {
  const { state, onChange, onClick } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <NavBarWithEditor {...state} onClick={onClick('onClick Navbar')} onChange={onChange} />;
};

type TNavBarPage = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
};

const NavBarDemo = ({ titleBar = TITLE_BAR, title = TITLE }: TNavBarPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <NavBarEditable />
  </Layout>
);

export default NavBarDemo;
