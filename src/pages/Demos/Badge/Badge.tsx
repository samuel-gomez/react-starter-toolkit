import { ReactNode } from 'react';
import { Badge } from '@axa-fr/react-toolkit-all';
import Layout, { TLayout } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  children: 'Coucou',
  classModifier: 'success',
  disabled: false,
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

export const code = ({ children, classModifier, disabled }: Props) => `
  <Badge classModifier="${classModifier}" disabled={${disabled}}>
    ${children}
  </Badge>
  `;

const BadgeWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
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
          Badge,
          ...props,
        }}
      />
    </>
  ),
  knobs as unknown as Tknobs,
);

const BadgeEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <BadgeWithEditor {...state} onChange={onChange} />;
};

type TBadgePage = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
};

const BadgeDemo = ({ titleBar = TITLE_BAR, title = TITLE }: TBadgePage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <BadgeEditable />
  </Layout>
);

export default BadgeDemo;
