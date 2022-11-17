import { isEqual } from 'lodash';
import React, { FocusEvent, ReactNode } from 'react';
import { MessageTypes } from '@axa-fr/react-toolkit-all';
import Layout, { TLayout } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  name: 'name-field',
  id: 'uniqueid',
  classModifier: 'required',
  className: 'row af-form__group',
  label: 'My Label',
  value: 'my value',
  helpMessage: 'Enter your name',
  placeholder: 'Ex: Samuel',
  rows: 6,
  cols: 60,
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
  rows,
  cols,
}: Props) => `<TextareaInput required={${required}} 
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
  isVisible={${isVisible}}
  rows={${rows}}
  cols={${cols}} >
  ${helpButton ? `<HelpButton>tooltip avec du text</HelpButton>` : ''}
</TextareaInput>  
`;

const TextareaInputWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader
        storybookPath={STORYBOOK_PATH}
        designSystemPath={DESIGN_SYSTEM_PATH}
        githubPackage={GITHUB_PACKAGE}
        npmName={NPM_NAME}
        openEditor={openEditor}
      />
      <LiveCode classModifier="with-editor" code={code(props)} scope={props} />
    </>
  ),
  knobs as unknown as Tknobs,
);

const MemoizedTextareaInputWithEditor = React.memo(TextareaInputWithEditor, (prev: Props, next: Props) => isEqual(prev, next));

const TextareaInputEditable = () => {
  const { state, onChange, onBlur, onFocus } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });

  return <MemoizedTextareaInputWithEditor {...state} onBlur={onBlur} onFocus={onFocus} onChange={onChange} />;
};

type TTextareaInputPage = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
};

const TextareaInputPage = ({ titleBar = TITLE_BAR, title = TITLE }: TTextareaInputPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <TextareaInputEditable />
  </Layout>
);

export default TextareaInputPage;
