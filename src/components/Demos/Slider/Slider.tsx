import { MessageTypes } from '@axa-fr/react-toolkit-form-core';
import Layout, { TLayoutPage } from 'shared/components/Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  label: 'My Label Slider',
  id: 'uniqueid',
  name: 'name-field',
  value: 3,
  options: [
    { label: '0', value: 0 },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ],
  classModifier: '',
  className: '',
  helpMessage: 'Slide your value',
  message: '',
  messageType: MessageTypes.error,
  forceDisplayMessage: false,
  disabled: false,
  readOnly: false,
  isVisible: true,
  classNameContainerLabel: 'col-md-2',
  classNameContainerInput: 'col-md-10',
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChangeSlider: (arg: TEvent) => void;
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

export const code = ({
  label,
  options,
  name,
  id,
  value,
  helpMessage,
  message,
  messageType,
  readOnly,
  forceDisplayMessage,
  isVisible,
  classNameContainerLabel,
  classNameContainerInput,
  disabled,
  className,
  classModifier,
}: Props) => `
    <SliderInput
      options={${JSON.stringify(options)}}
      id="${id}"
      label={<>${label}</>}
      name="${name}"
      onChange={onChangeSlider}
      value={${value}}
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
      classNameContainerInput="${classNameContainerInput}"
    />
`;

const SliderWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
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

const SliderEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <SliderWithEditor {...state} onChange={onChange} onChangeSlider={onChange('value')} />;
};

const SliderDemo = ({ titleBar = TITLE_BAR, title = TITLE }: TLayoutPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <SliderEditable />
  </Layout>
);

export default SliderDemo;
