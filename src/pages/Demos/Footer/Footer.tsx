import Layout, { TLayoutPage } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  copyright: '© 2022-2023 AXA Webcenter',
  isIconHidden: false,
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

export const code = ({ copyright, isIconHidden }: Props) => `<Footer copyright="${copyright}"  isIconHidden={${isIconHidden}} />`;

const FooterWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
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

const FooterEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <FooterWithEditor {...state} onChange={onChange} />;
};

type TFooterPage = TLayoutPage;

const FooterDemo = ({ titleBar = TITLE_BAR, title = TITLE }: TFooterPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <FooterEditable />
  </Layout>
);

export default FooterDemo;
