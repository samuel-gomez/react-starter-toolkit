import { ComponentType, useCallback, useState } from 'react';
import { Text, CheckboxItem, CheckboxModes, Select } from '@axa-fr/react-toolkit-all';
import Draggable from 'react-draggable';
import Icons from 'shared/components/Icons';
import { ClickEvent } from '@axa-fr/react-toolkit-core';
import { DEFAULT_OPTION_LABEL, DESIGN_SYSTEM, GITHUB, STORYBOOK } from 'shared/constants';
import './Editor.scss';

export type TEvent = {
  value: string;
  id?: string;
  name?: string;
};

const omittedProps = ['onChange', 'knobs', 'onClick'];

type TListSelect = {
  value: string | number;
  options: Record<string, string>;
};

type TFieldEditor = {
  value: string | boolean | TListSelect;
  name: string;
  onChange: (e: TEvent) => void;
  options?: { label: string; value: string }[];
};

export type Tknobs = Record<string, Record<string, unknown>>;

export const FieldEditor = ({ value, name, onChange }: TFieldEditor) => (
  <>
    {(() => {
      switch (true) {
        case typeof value === 'boolean':
          return (
            <CheckboxItem
              disabled={false}
              isChecked={value}
              onChange={onChange}
              id={name}
              name={name}
              value={`${value}`}
              mode={CheckboxModes.toggle}
              className="af-form__checkbox-toggle"
            />
          );
        case typeof value === 'object':
          return (
            typeof value === 'object' && (
              <div className="af-form__select">
                <Select
                  forceDisplayPlaceholder={true}
                  placeholder={DEFAULT_OPTION_LABEL}
                  name={name}
                  id={name}
                  options={value.options}
                  onChange={onChange}
                  value={value.value}
                  aria-label={`select-${name}`}
                />
              </div>
            )
          );

        default:
          return <Text type="text" value={value} id={name} name={name} onChange={onChange} />;
      }
    })()}
  </>
);

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

/**
 * @param onChange : function for update state fields value
 * @param knobs : overrided props (for object type)
 * @returns Form fields editor
 */
export const FormEditor = <P extends object>({
  onChange,
  knobs,
  ...props
}: Omit<P, 'onClick'> & { onChange: ReturnType<typeof useEditable>['onChange']; knobs: Tknobs }) => (
  <form className="af-form-editor">
    <>
      {Object.entries(mergePropsAndKnobs({ props, knobs }))
        .filter(([key]) => !omittedProps.includes(key))
        .map(([name, value]) => (
          <div className="af-form-editor__field" key={name}>
            <label className="af-form__group-label" htmlFor={name}>
              {name}
            </label>
            <FieldEditor key={name} name={name} value={value as TFieldEditor['value']} onChange={onChange(name)} />
          </div>
        ))}
    </>
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
  <P extends object>(
    Component: ComponentType<P>,
    knobs: Tknobs = {},
    className = 'af-editor',
    useToggleEditorFn = useToggleEditor,
  ): ComponentType<P> =>
  (props: P) => {
    const { closeEditor, openEditor, isOpenEditor } = useToggleEditorFn();
    return (
      <section className={className}>
        <Component {...props} openEditor={openEditor} />
        <div className={`af-draggable-container${isOpenEditor ? ' af-draggable-container--open' : ''}`}>
          <Draggable handle="strong">
            <div className="af-draggable">
              <h3 className="af-draggable__title">
                Props Editor
                <div className="af-draggable__tools">
                  <strong className="glyphicon glyphicon-move"></strong>
                  <i className="glyphicon glyphicon-close no-cursor" onClick={closeEditor}></i>
                </div>
              </h3>

              <div className="af-draggable__content">
                <FormEditor<P> {...(props as P & { onChange: ReturnType<typeof useEditable>['onChange'] })} knobs={knobs} />
              </div>
            </div>
          </Draggable>
        </div>
      </section>
    );
  };

export const setValue = (value: string) => {
  if (value === 'false') return true;
  if (value === 'true') return false;

  return value;
};

type TuseEditable<T> = {
  initialState: T;
  logEventFn?: typeof console.log;
  setValueFn?: typeof setValue;
};
export const useEditable = <T extends object>({ initialState, logEventFn = console.log, setValueFn = setValue }: TuseEditable<T>) => {
  const [state, setState] = useState(initialState);

  const onClick = useCallback(
    (e: ClickEvent) => {
      logEventFn('click button event', e);
    },
    [logEventFn],
  );

  const onChange = useCallback(
    (key: string) => (e: TEvent) => {
      setState(prevState => ({ ...prevState, [key]: setValueFn(e.value) }));
    },
    [setValueFn],
  );
  return { onClick, onChange, state };
};

type TEditorHeader = {
  storybookPath?: string;
  designSystemPath?: string;
  githubPackage?: string;
} & Partial<TReturnUseToggleEditor>;

export const EditorHeader = ({ storybookPath = '', designSystemPath = '', githubPackage = '', openEditor }: TEditorHeader) => (
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

    <span className="af-link" onClick={openEditor}>
      <i className="glyphicon glyphicon-cog"></i>
      <span className="af-link">Edit props</span>
    </span>
  </header>
);
