/* eslint-disable react/display-name */
import Image from 'next/image';
import { ComponentType, FocusEvent, useCallback, useState } from 'react';
import Draggable from 'react-draggable';
import { useToggleModal } from 'shared/components/ModalCommon';
import Button from '@axa-fr/react-toolkit-button';
import Icons from 'shared/components/Icons';
import type { ClickEvent } from '@axa-fr/react-toolkit-core/dist/esm/withClickId.hoc';
import { DESIGN_SYSTEM, GITHUB, STORYBOOK } from 'shared/constants';
import InputEditor, { TInputEditor } from './InputEditor';
import './Editor.scss';

export type TEvent = {
  value?: string;
  id?: string;
  name?: string;
  values?: string[];
};

const omittedProps = ['onChange', 'knobs', 'onClick', 'values'];

export type TonChange = (e: TEvent) => void;

export type Tknobs = Record<string, Record<string, TInputEditor['value']>>;

type TmergePropsAndKnobs<P> = {
  props: P & Record<string, unknown>;
  knobs: Tknobs;
};

export const mergePropsAndKnobs = <P extends object>({ props, knobs }: TmergePropsAndKnobs<P>) =>
  Object.keys(props).reduce(
    (acc, key) => ({
      ...acc,
      [key]: knobs[key] ? { ...knobs[key], value: props[key] } : props[key],
    }),
    {},
  );

type TLabelEditor = {
  value: TInputEditor['value'];
  name: string;
};
export const LabelEditor = ({ name, value }: TLabelEditor) =>
  !(typeof value === 'object' && !!value.type && value.type === 'separator') ? (
    <label className="af-form__group-label" htmlFor={name}>
      {name}
    </label>
  ) : null;

type TFieldEditor = {
  onChange: TonChange;
  name: string;
  value: TInputEditor['value'];
};

const FieldEditor = ({ name, value, onChange }: TFieldEditor) => (
  <div className="af-form-editor__field" key={name}>
    <LabelEditor value={value} name={name} />
    <InputEditor key={name} name={name} value={value} onChange={onChange} />
  </div>
);

/**
 * @param onChange : function for update state fields value
 * @param knobs : overrided props (for object type)
 * @returns Form fields editor
 */
const FormEditor = <P extends object>({
  onChange,
  knobs,
  ...props
}: Omit<P, 'onClick'> & { onChange: ReturnType<typeof useEditable>['onChange']; knobs: Tknobs }) => (
  <form className="af-form-editor">
    {Object.entries(mergePropsAndKnobs({ props, knobs }))
      .filter(([key, val]) => !omittedProps.includes(key) && typeof val !== 'function')
      .map(([name, value]) => (
        <FieldEditor key={name} name={name} value={value as TInputEditor['value']} onChange={onChange(name)} />
      ))}
  </form>
);

export const useToggleEditor = (initState = false) => {
  const [isOpenEditor, setStateToggleEditor] = useState(initState);

  const closeEditor = useCallback(() => {
    setStateToggleEditor(false);
  }, []);

  const openEditor = useCallback(() => {
    setStateToggleEditor(true);
  }, []);

  return { closeEditor, openEditor, isOpenEditor };
};

export type TReturnUseToggleEditor = ReturnType<typeof useToggleEditor>;

/**
 * HOC to add Editor
 * @param Component : component to be wrapped
 * @param knobs : for lists props values
 * @returns Component Editable
 */
export const withEditor =
  <P extends object>(Component: ComponentType<P>, knobs: Tknobs = {}, useToggleEditorFn = useToggleEditor): ComponentType<P> =>
  (props: P) => {
    const { closeEditor, openEditor, isOpenEditor } = useToggleEditorFn();
    return (
      <section className="af-editor">
        <Component {...props} openEditor={openEditor} isOpenEditor={isOpenEditor} />
        {isOpenEditor && (
          <Draggable cancel=".glyphicon-close" handle=".af-draggable__title">
            <div aria-label="Edit props" className="af-draggable-container">
              <div className="af-draggable">
                <h3 className="af-draggable__title">
                  Props Editor
                  <div className="af-draggable__tools">
                    <i className="glyphicon glyphicon-move" />
                    <Button aria-label="close Editor" className="af-btn--circle" classModifier="close-editor" onClick={closeEditor}>
                      <i className="glyphicon glyphicon-close" />
                    </Button>
                  </div>
                </h3>

                <div className="af-draggable__content">
                  <FormEditor<P> {...(props as P & { onChange: ReturnType<typeof useEditable>['onChange'] })} knobs={knobs} />
                </div>
              </div>
            </div>
          </Draggable>
        )}
      </section>
    );
  };

export const setValue = (value: string | number) => {
  if (value === 'false') return true;
  if (value === 'true') return false;

  return value;
};

type TuseEditable<T> = {
  initialState: T;
  logEventFn?: typeof console.log;
  setValueFn?: typeof setValue;
};

export const useEditable = <T extends object>({ initialState, setValueFn = setValue }: TuseEditable<T>) => {
  const [state, setState] = useState(initialState);
  const { onCancel, openModal, isOpen } = useToggleModal();

  const onClick = useCallback(
    (name: string) => (e: ClickEvent) => {
      return { name, e };
    },
    [],
  );

  const onChange = useCallback(
    (key: string) => (e: TEvent) => {
      if (!e.value && e.values) {
        setState(prevState => ({ ...prevState, [key]: e.values }));
      } else {
        setState(prevState => ({ ...prevState, [key]: setValueFn(e?.value ?? '') }));
      }
    },
    [setValueFn],
  );

  const onBlur = useCallback(() => {
    setState(prevState => ({ ...prevState, autoFocus: false }));
  }, []);

  const onFocus = useCallback((e: FocusEvent<HTMLInputElement>) => {
    if (e.target.type === 'textarea') {
      e.target.setSelectionRange(e.target.value.length, e.target.value.length);
    }
    setState(prevState => ({ ...prevState, autoFocus: true }));
  }, []);

  return { onClick, onChange, state, onFocus, onBlur, onCancel, openModal, isOpen };
};

type TEditorHeader = {
  storybookPath?: string;
  designSystemPath?: string;
  githubPackage?: string;
  npmName?: string;
} & Partial<TReturnUseToggleEditor>;

export const EditorHeader = ({ storybookPath = '', designSystemPath = '', githubPackage = '', npmName = '', openEditor }: TEditorHeader) => (
  <header className="af-editor__header">
    {!!designSystemPath && (
      <a className="af-link" href={`${DESIGN_SYSTEM}${designSystemPath}`} target="_blank" rel="noopener noreferrer">
        <Icons icon="slash" viewBox="0 0 342.988 280" />
        Guidelines
      </a>
    )}

    {!!storybookPath && (
      <a className="af-link" href={`${STORYBOOK}${storybookPath}`} target="_blank" rel="noopener noreferrer">
        <Icons icon="storybook" viewBox="0 0 9.6 12" />
        Storybook
      </a>
    )}

    {!!githubPackage && (
      <a className="af-link" href={`${GITHUB}${githubPackage}`} target="_blank" rel="noopener noreferrer">
        <Icons icon="github" viewBox="0 0 438 438" />
        Github
      </a>
    )}

    {!!npmName && (
      <a className="af-link__npm-name" target="_blank" rel="noopener noreferrer" href={`https://badge.fury.io/js/${npmName}`}>
        <Image alt="npm version" src={`https://badge.fury.io/js/${npmName}.svg`} fill sizes="(max-width: 768px) 100vw" />
      </a>
    )}

    <button type="button" className="af-link" onClick={openEditor}>
      <i role="img" aria-label="cog" className="glyphicon glyphicon-cog" />
      <span>Edit props</span>
    </button>
  </header>
);
