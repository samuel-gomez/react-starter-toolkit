import { ReactNode } from 'react';
import { TextInput, HelpButton, MessageTypes } from '@axa-fr/react-toolkit-all';
import Layout, { TLayout } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  name: 'name-field',
  id: 'uniqueid',
  classModifier: '',
  className: 'af-form__group row',
  label: 'My Label',
  value: 'my value',
  helpMessage: 'Enter your name',
  placeholder: 'Ex: Samuel',
  message: '',
  messageType: MessageTypes.error,
  forceDisplayMessage: false,
  autoFocus: true,
  disabled: false,
  required: false,
  readOnly: false,
  isVisible: true,
  classNameContainerLabel: 'col-md-2',
  classNameContainerInput: 'col-md-10',
  helpButton: false,
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
  onChangeInput: (arg: TEvent) => void;
  isOpenEditor?: boolean;
};

export const code = ({
  label,
  className,
  classModifier,
  disabled,
  helpButton,
  value,
  id,
  name,
  helpMessage,
  placeholder,
  message,
  messageType,
  readOnly,
  forceDisplayMessage,
  isOpenEditor,
  isVisible,
  required,
}: Props) => `
  <TextInput 
    autoFocus={${!isOpenEditor}} 
    readOnly={${readOnly}} 
    isVisible={${isVisible}} 
    required={${required}} 
    forceDisplayMessage={${forceDisplayMessage}} 
    disabled={${disabled}} 
    id="${id}" 
    message="${message}" 
    placeholder="${placeholder}" 
    helpMessage="${helpMessage}" 
    name="${name}" 
    value="${value}" 
    label={<>${label}</>}
    className="${className}" 
    classModifier="${classModifier}" 
    messageType="${messageType}" 
    onChange={onChangeInput} >
    ${helpButton ? `<HelpButton>tooltip avec du text</HelpButton>` : ''}
  </TextInput>
`;

const TextInputWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
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
          TextInput,
          HelpButton,
          ...props,
        }}
      />
    </>
  ),
  knobs as unknown as Tknobs,
);

const TextInputEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <TextInputWithEditor {...state} onChangeInput={onChange('value')} onChange={onChange} />;
};

type TTextInputPage = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
};

const TextInputPage = ({ titleBar = TITLE_BAR, title = TITLE }: TTextInputPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <TextInputEditable />
  </Layout>
);

export default TextInputPage;
