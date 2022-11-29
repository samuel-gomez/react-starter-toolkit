import { isEqual } from 'lodash';
import React, { FocusEvent, ReactNode } from 'react';
import { MessageTypes } from '@axa-fr/react-toolkit-all';
import Layout, { TLayout } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  id: 'uniqueid',
  name: 'number-field',
  className: 'row af-form__group',
  classModifier: 'required',
  label: 'My number',
  value: 5,
  helpMessage: 'Enter your number',
  placeholder: 'Ex: Samuel',
  messageType: MessageTypes.error,
  message: '',
  forceDisplayMessage: false,
  disabled: false,
  autoFocus: true,
  required: false,
  isVisible: true,
  readOnly: false,
  helpButton: false,
  classNameContainerLabel: 'col-md-2',
  classNameContainerInput: 'col-md-10',
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
  onFocus?: (arg: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (arg: TEvent) => void;
};

export const code = ({
  label,
  classModifier,
  className,
  disabled,
  helpButton,
  id,
  value,
  name,
  helpMessage,
  placeholder,
  message,
  messageType,
  forceDisplayMessage,
  isVisible,
  autoFocus,
  required,
  readOnly,
}: Props) => `<NumberInput required={${required}} 
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
  autoFocus={${autoFocus}} 
  onBlur={onBlur} 
  onFocus={onFocus} 
  isVisible={${isVisible}} 
  readOnly={${readOnly}} 
  aria-label="${name}" >
  ${helpButton ? `<HelpButton>tooltip avec du text</HelpButton>` : ''}
</NumberInput>  
`;

const NumberInputWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
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

const MemoizedNumberInputWithEditor = React.memo(NumberInputWithEditor, (prev: Props, next: Props) => isEqual(prev, next));

export const NumberInputEditable = () => {
  const { state, onChange, onBlur, onFocus } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });

  return <MemoizedNumberInputWithEditor {...state} onBlur={onBlur} onFocus={onFocus} onChange={onChange} />;
};

type TNumberInputPage = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
};

const NumberInputPage = ({ titleBar = TITLE_BAR, title = TITLE }: TNumberInputPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <NumberInputEditable />
  </Layout>
);

export default NumberInputPage;
