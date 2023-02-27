import { FocusEvent, memo } from 'react';
import isEqual from 'lodash/isEqual';
import { MessageTypes } from '@axa-fr/react-toolkit-form-core';
import Layout, { TLayoutPage } from 'shared/components/Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  name: 'name-field',
  id: 'uniqueid',
  classModifier: 'required',
  className: 'row af-form__group',
  label: 'My Label Text',
  value: 'my value',
  helpMessage: 'Enter your name',
  placeholder: 'Ex: votre nom',
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
  onBlur?: (arg: TEvent) => void;
  onFocus?: (arg: FocusEvent<HTMLInputElement>) => void;
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
  isVisible,
  required,
  autoFocus,
}: Props) => `<TextInput required={${required}} 
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
  onChange={onChange('value')} 
  autoComplete="none"
  onBlur={onBlur} 
  onFocus={onFocus} 
  autoFocus={${autoFocus}} 
  readOnly={${readOnly}} 
  isVisible={${isVisible}} >
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
      <LiveCode code={code(props)} scope={props} githubPackage={GITHUB_PACKAGE} />
    </>
  ),
  knobs as unknown as Tknobs,
);

const MemoizedTextInputWithEditor = memo(TextInputWithEditor, (prev: Props, next: Props) => isEqual(prev, next));

const TextInputEditable = () => {
  const { state, onChange, onBlur, onFocus } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });

  return <MemoizedTextInputWithEditor {...state} onBlur={onBlur} onFocus={onFocus} onChange={onChange} />;
};

const TextInputPage = ({ titleBar = TITLE_BAR, title = TITLE }: TLayoutPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <TextInputEditable />
  </Layout>
);

export default TextInputPage;
