import { ReactNode } from 'react';
import { Footer } from '@axa-fr/react-toolkit-all';
import { ClickEvent } from '@axa-fr/react-toolkit-core';
import Layout, { TLayout } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  copyright: '© 2022-2023 AXA Webcenter',
  isIconHidden: false,
};

type Props = Partial<typeof INITIAL_STATE> & {
  onClick?: (arg: ClickEvent) => void;
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
      <LiveCode
        classModifier="with-editor"
        styleLivePreview={{ textAlign: 'left' }}
        code={code(props)}
        scope={{
          Footer,
          ...props,
        }}
      />
    </>
  ),
  knobs as unknown as Tknobs,
);

const FooterEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <FooterWithEditor {...state} onChange={onChange} />;
};

type TFooterPage = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
};

const FooterDemo = ({ titleBar = TITLE_BAR, title = TITLE }: TFooterPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <FooterEditable />
  </Layout>
);

export default FooterDemo;
