import { ReactNode } from 'react';
import { MessageTypes } from '@axa-fr/react-toolkit-all';
import Layout, { TLayout } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  label: 'My Label',
  id: 'uniqueid',
  name: 'name-field',
  value: 256,
  options: [
    { label: '64', value: '64', id: 'uniqueId1' },
    { label: '128', value: '128', id: 'uniqueId2' },
    { label: '256', value: '256', index: 2, id: 'uniqueId3' },
    { label: '1024', value: '1024', id: 'uniqueId4' },
    { label: '2048', value: '2048', id: 'uniqueId5' },
    { label: '4096', value: '4096', id: 'uniqueId5' },
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

type TSliderPage = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
};

const SliderDemo = ({ titleBar = TITLE_BAR, title = TITLE }: TSliderPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <SliderEditable />
  </Layout>
);

export default SliderDemo;
