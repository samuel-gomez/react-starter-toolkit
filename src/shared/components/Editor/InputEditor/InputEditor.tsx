import { Text, CheckboxItem, CheckboxModes, Select } from '@axa-fr/react-toolkit-all';
import { DEFAULT_OPTION_LABEL } from 'shared/constants';
import CodeEditor from './CodeEditor';
import JsonEditor from './JsonEditor';
import { Tlistelements } from './CodeEditor/Templates';
import { TonChange } from '../Editor';

type TListSelect = {
  value: string;
  options?: Record<string, string>;
  type?: string;
  list?: Tlistelements;
  labelBtnOpenCodeEditor?: string;
};

export type TInputEditor = {
  value: string | boolean | TListSelect;
  name: string;
  onChange: TonChange;
  options?: { label: string; value: string }[];
};

const commonProps = ({ onChange, name }: Omit<TInputEditor, 'value'>) => ({
  onChange,
  name,
  id: name,
});

type TInputEditorObject = Omit<TInputEditor, 'value'> & {
  value: TListSelect;
};
const InputEditorObject = ({ value, ...props }: TInputEditorObject) => (
  <>
    {(() => {
      switch (true) {
        case !!value.type && value.type === 'separator':
          return <h3 className="af-form-editor__separator">{value.value}</h3>;
        case !!value.type && value.type === 'jsx':
          return <CodeEditor {...commonProps(props)} labelBtnOpenCodeEditor={value.labelBtnOpenCodeEditor} list={value?.list} value={value.value} />;
        case !!value.type && value.type === 'json':
          return <JsonEditor {...commonProps(props)} labelBtnOpenCodeEditor={value.labelBtnOpenCodeEditor} value={value.value} />;
        default:
          return (
            <div className="af-form__select">
              <Select
                {...commonProps(props)}
                forceDisplayPlaceholder={true}
                placeholder={DEFAULT_OPTION_LABEL}
                options={value.options}
                value={value.value}
                aria-label={`select-${props.name}`}
              />
            </div>
          );
      }
    })()}
  </>
);

const InputEditor = ({ value, ...props }: TInputEditor) => (
  <>
    {(() => {
      switch (true) {
        case typeof value === 'boolean':
          return (
            <CheckboxItem
              {...commonProps(props)}
              disabled={false}
              isChecked={value}
              value={`${value}`}
              mode={CheckboxModes.toggle}
              className="af-form__checkbox-toggle"
            />
          );

        case typeof value === 'object':
          return <InputEditorObject value={value as TListSelect} {...props} />;

        default:
          return <Text {...commonProps(props)} type="text" value={`${value}`} />;
      }
    })()}
  </>
);

export default InputEditor;
