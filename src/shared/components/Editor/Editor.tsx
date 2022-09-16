import { ComponentType, useCallback, useState } from 'react';
import { Text, CheckboxItem, CheckboxModes, Select } from '@axa-fr/react-toolkit-all';
import { ClickEvent } from '@axa-fr/react-toolkit-core';

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

type Tknobs = Record<string, Record<string, unknown>>;

const FieldEditor = ({ value, name, onChange }: TFieldEditor) => (
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
                <Select name={name} id={name} options={value.options} onChange={onChange} value={value.value} aria-label={`select-${name}`} />
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

const mergePropsAndKnobs = <P extends object>({ props, knobs }: TmergePropsAndKnobs<P>) =>
  Object.keys(props).reduce((acc, key) => {
    const res = knobs[key] ? { ...knobs[key], value: props[key] } : props[key];

    return {
      ...acc,
      [key]: res,
    };
  }, {});

const FormEditor = <P extends object>({
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
            <FieldEditor name={name} value={value as TFieldEditor['value']} onChange={onChange(name)} />
          </div>
        ))}
    </>
  </form>
);

/**
 * HOC to add Editor
 * @param Component : component to be wrapped
 * @param knobs : for lists props values
 * @returns Component Editable
 */
export const withEditor =
  <P extends object>(Component: ComponentType<P>, knobs: Tknobs = {}): ComponentType<P> =>
  (props: P) =>
    (
      <section className="af-editor">
        <Component {...(props as P)} />
        <FormEditor<P> {...(props as P & { onChange: ReturnType<typeof useEditable>['onChange'] })} knobs={knobs} />
      </section>
    );

const setValue = (value: string) => {
  if (value === 'false') return true;
  if (value === 'true') return false;

  return value;
};

export const useEditable = <T extends object>(initialState: T) => {
  const [state, setState] = useState(initialState);

  const onClick = useCallback((e: ClickEvent) => {
    console.log('click button event', e);
  }, []);

  const onChange = useCallback(
    (key: string) => (e: TEvent) => {
      setState(prevState => ({ ...prevState, [key]: setValue(e.value) }));
    },
    [],
  );
  return { onClick, onChange, state };
};
