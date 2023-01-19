import { MessageTypes } from '@axa-fr/react-toolkit-form-core';
import Layout, { TLayoutPage } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  label: 'My Label Select-multi',
  name: 'name-field',
  id: 'uniqueid',
  options: [
    { value: 'fun', label: 'For fun', id: 'fun' },
    { value: 'work', label: 'For work', id: 'work' },
    { value: 'drink', label: 'For drink', id: 'drink' },
    { value: 'sleep', label: 'For sleep', id: 'sleep' },
    { value: 'swim', label: 'For swim', id: 'swim' },
  ],
  values: ['fun', 'drink'],
  helpMessage: 'Enter the place name',
  message: '',
  messageType: MessageTypes.error,
  forceDisplayMessage: false,
  multiple: false,
  disabled: false,
  readOnly: false,
  isVisible: true,
  classModifier: 'required',
  placeholder: 'Enter the place name',
  className: 'row af-form__group',
  classNameContainerLabel: 'col-md-2',
  classNameContainerInput: 'col-md-10',
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
  onChangeSelect: (arg: TEvent) => void;
  isOpenEditor?: boolean;
};

export const code = ({
  label,
  name,
  id,
  helpMessage,
  messageType,
  message,
  options,
  values,
  forceDisplayMessage,
  readOnly,
  isVisible,
  disabled,
  className,
  classModifier,
  classNameContainerLabel,
  classNameContainerInput,
  placeholder,
}: Props) => `
    <MultiSelectInput
      label={<>${label}</>}
      id="${id}" 
      name="${name}" 
      options={${JSON.stringify(options)}}
      onChange={onChangeSelect}
      values={${JSON.stringify(values)}}
      helpMessage="${helpMessage}"
      message="${message}"
      messageType="${messageType}"
      forceDisplayMessage={${forceDisplayMessage}}
      readOnly={${readOnly}} 
      isVisible={${isVisible}}
      disabled={${disabled}}
      className="${className}" 
      classModifier="${classModifier}" 
      placeholder="${placeholder}" 
      classNameContainerLabel="${classNameContainerLabel}"
      classNameContainerInput="${classNameContainerInput}"
      aria-labelledby="${id}"
    />
  `;

const SelectMultiWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
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

const SelectMultiEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <SelectMultiWithEditor {...state} onChange={onChange} onChangeSelect={onChange('values')} />;
};

const SelectMultiPage = ({ titleBar = TITLE_BAR, title = TITLE }: TLayoutPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <SelectMultiEditable />
  </Layout>
);

export default SelectMultiPage;
