import { ReactNode } from 'react';
import type { ClickEvent } from '@axa-fr/react-toolkit-core/dist/esm/withClickId.hoc';
import Layout, { TLayoutPage } from 'shared/components/Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  classModifier: 'danger',
  className: 'af-alert',
  icon: '',
  title: 'Attention : des informations sont manquantes',
  children: '<p>hello child</p>',
  toggleOnCloseProps: true,
};

type Props = Omit<typeof INITIAL_STATE, 'icon' | 'children' | 'toggleOnCloseProps'> & {
  icon?: string;
  children?: ReactNode;
  toggleOnCloseProps?: boolean;
  onClose?: (arg: ClickEvent) => void;
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

export const code = ({ title, className, classModifier, icon = '', children = '', toggleOnCloseProps }: Props) =>
  `<Alert title="${title}" icon="${icon}" className="${className}" classModifier="${classModifier}" type="submit" onClose={${
    toggleOnCloseProps ? 'onClose' : null
  }} >
  ${children}
</Alert>`;

const AlertWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader
        storybookPath={STORYBOOK_PATH}
        designSystemPath={DESIGN_SYSTEM_PATH}
        githubPackage={GITHUB_PACKAGE}
        npmName={NPM_NAME}
        openEditor={openEditor}
      />
      <LiveCode code={code(props)} scope={props} githubPackage={GITHUB_PACKAGE} />
    </>
  ),
  knobs as unknown as Tknobs,
);

const AlertEditable = () => {
  const { state, onClick, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <AlertWithEditor {...state} onClose={onClick('onClose Alert')} onChange={onChange} />;
};

const AlertPage = ({ titleBar = TITLE_BAR, title = TITLE }: TLayoutPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <AlertEditable />
  </Layout>
);

export default AlertPage;
