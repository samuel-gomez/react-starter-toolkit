import { ReactNode } from 'react';
import { MessageTypes } from '@axa-fr/react-toolkit-all';
import Layout, { TLayout } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  label: 'Select a choice',
  name: 'name',
  options: [
    {
      id: 'check1',
      label: 'Choix 1',
      value: '0',
    },
    {
      id: 'check2',
      label: 'Choix 2',
      value: '1',
    },
  ],
  value: '1',
  disabled: false,
  isVisible: true,
  classModifier: '',
  className: '',
  message: '',
  messageType: MessageTypes.error,
  forceDisplayMessage: false,
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

export const code = ({
  name,
  value,
  label,
  disabled,
  isVisible,
  className,
  options,
  classModifier,
  message,
  messageType,
  forceDisplayMessage,
}: Props) => `
  <SwitchInput
    name="${name}" 
    value="${value}" 
    label={<>${label}</>}
    disabled={${disabled}} 
    isVisible={${isVisible}}
    className="${className}" 
    classModifier="${classModifier}"
    options={${JSON.stringify(options)}}
    message="${message}" 
    messageType="${messageType}"
    forceDisplayMessage={${forceDisplayMessage}}
    onChange={onChange('value')}
  />
`;

const SwitchWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
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
        githubPackage={GITHUB_PACKAGE}
        scope={props}
      />
    </>
  ),
  knobs as unknown as Tknobs,
);

const SwitchEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <SwitchWithEditor {...state} onChange={onChange} />;
};

type TSwitchPage = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
};

const SwitchDemo = ({ titleBar = TITLE_BAR, title = TITLE }: TSwitchPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <SwitchEditable />
  </Layout>
);

export default SwitchDemo;
