import { MessageTypes } from '@axa-fr/react-toolkit-form-core';
import Layout, { TLayoutPage } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  name: 'name-field',
  id: 'uniqueid',
  options: [
    { label: 'For fun', value: 'fun', id: 'fun' },
    { label: 'For work', value: 'work', id: 'work' },
    { label: 'For drink', value: 'drink', id: 'drink' },
    { label: 'For the life', value: 'life', id: 'life', disabled: true },
  ],
  mode: 'default',
  classModifier: '',
  className: '',
  label: 'My Label Radio',
  value: 'work',
  helpMessage: 'Enter your name',
  message: '',
  messageType: MessageTypes.error,
  forceDisplayMessage: false,
  disabled: false,
  readOnly: false,
  isVisible: true,
  classNameContainerLabel: 'col-md-2',
  classNameContainerInput: 'col-md-10',
  helpButton: false,
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
  onChangeRadio: (arg: TEvent) => void;
};

export const code = ({
  label,
  className,
  classModifier,
  disabled,
  helpButton,
  value,
  id,
  options,
  mode,
  name,
  helpMessage,
  message,
  messageType,
  readOnly,
  forceDisplayMessage,
  isVisible,
  classNameContainerLabel,
  classNameContainerInput,
}: Props) => `
  <RadioInput
    label={<>${label}</>}
    name="${name}"
    id="${id}"
    options={${JSON.stringify(options)}}
    onChange={onChangeRadio}
    mode="${mode}"
    value="${value}"
    helpMessage="${helpMessage}"
    message="${message}" 
    messageType="${messageType}"
    forceDisplayMessage={${forceDisplayMessage}}
    readOnly={${readOnly}}
    disabled={${disabled}} 
    isVisible={${isVisible}}
    classModifier="${classModifier}"
    className="${className}"
    classNameContainerLabel="${classNameContainerLabel}"
    classNameContainerInput="${classNameContainerInput}">
    ${helpButton ? `<HelpButton>Hello Radio</HelpButton>` : ''}
  </RadioInput>
`;

const RadioInputWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader
        storybookPath={STORYBOOK_PATH}
        designSystemPath={DESIGN_SYSTEM_PATH}
        githubPackage={GITHUB_PACKAGE}
        npmName={NPM_NAME}
        openEditor={openEditor}
      />
      <LiveCode styleLivePreview={{ textAlign: 'left' }} code={code(props)} scope={props} githubPackage={GITHUB_PACKAGE} />
    </>
  ),
  knobs as unknown as Tknobs,
);

const RadioInputEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });

  return <RadioInputWithEditor {...state} onChange={onChange} onChangeRadio={onChange('value')} />;
};

const RadioInputPage = ({ titleBar = TITLE_BAR, title = TITLE }: TLayoutPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <RadioInputEditable />
  </Layout>
);

export default RadioInputPage;
