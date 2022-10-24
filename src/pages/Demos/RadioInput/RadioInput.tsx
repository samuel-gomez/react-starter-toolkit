import { ReactNode } from 'react';
import { RadioInput, HelpButton, MessageTypes, RadioModes } from '@axa-fr/react-toolkit-all';
import Layout, { TLayout } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  name: 'name-field',
  id: 'uniqueid',
  options: JSON.stringify([
    { label: 'For fun', value: '1', id: 'fun' },
    { label: 'For work', value: '2', id: 'work' },
    { label: 'For drink', value: '3', id: 'drink' },
    { label: 'For the life', value: '4', id: 'life', disabled: true },
  ]),
  mode: RadioModes.default,
  classModifier: '',
  className: '',
  label: 'My Label',
  value: '1',
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
    options={${options}}
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
      <LiveCode
        classModifier="with-editor"
        styleLivePreview={{ textAlign: 'left' }}
        code={code(props)}
        scope={{
          RadioInput,
          HelpButton,
          ...props,
        }}
      />
    </>
  ),
  knobs as unknown as Tknobs,
);

const RadioInputEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });

  return <RadioInputWithEditor {...state} onChange={onChange} onChangeRadio={onChange('value')} />;
};

type TTabsPage = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
};

const RadioInputPage = ({ titleBar = TITLE_BAR, title = TITLE }: TTabsPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <RadioInputEditable />
  </Layout>
);

export default RadioInputPage;
