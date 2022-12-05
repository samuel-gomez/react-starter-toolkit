import { ReactNode } from 'react';
import { MessageTypes } from '@axa-fr/react-toolkit-all';
import Layout, { TLayout } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  label: 'My Label',
  name: 'name-field',
  id: 'uniqueid',
  helpMessage: 'Take a photo',
  accept: 'image/jpeg, image/png, application/*',
  message: '',
  messageType: MessageTypes.error,
  forceDisplayMessage: false,
  multiple: false,
  disabled: false,
  readOnly: false,
  isVisible: true,
  classModifier: 'required',
  className: 'row af-form__group',
  classNameContainerLabel: 'col-md-2',
  classNameContainerInput: 'col-md-10',
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
  isOpenEditor?: boolean;
};

export const code = ({
  label,
  name,
  id,
  accept,
  helpMessage,
  messageType,
  message,
  forceDisplayMessage,
  multiple,
  readOnly,
  isVisible,
  disabled,
  className,
  classModifier,
  classNameContainerLabel,
  classNameContainerInput,
}: Props) => `
    <FileInput
      label={<>${label}</>}
      name="${name}" 
      id="${id}" 
      accept="${accept}"
      helpMessage="${helpMessage}"
      message="${message}"
      onChange={onChange}
      messageType="${messageType}"
      forceDisplayMessage={${forceDisplayMessage}}
      multiple={${multiple}} 
      readOnly={${readOnly}} 
      isVisible={${isVisible}}
      disabled={${disabled}}
      className="${className}" 
      classModifier="${classModifier}" 
      classNameContainerLabel="${classNameContainerLabel}"
      classNameContainerInput="${classNameContainerInput}"
    />
  `;

const FileInputWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
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

const FileInputEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <FileInputWithEditor {...state} onChange={onChange} />;
};

type TTabsPage = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
};

const FileInputPage = ({ titleBar = TITLE_BAR, title = TITLE }: TTabsPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <FileInputEditable />
  </Layout>
);

export default FileInputPage;
