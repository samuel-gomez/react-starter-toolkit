import ReactCodeEditor from '@uiw/react-textarea-code-editor';
import '@uiw/react-textarea-code-editor/dist.css';
import { ChangeEvent, useState } from 'react';
import { TEvent, TonChange } from '../Editor';

type TuseCodeEditor = TEvent & {
  onChange: TonChange;
};

export const useCodeEditor = ({ value, id, name, onChange }: TCodeEditor) => {
  const [code, setCode] = useState(value);

  const onChangeCodeEditor = (evn: ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ value: evn.target.value, name, id });
    setCode(evn.target.value);
  };

  return { onChangeCodeEditor, code };
};

type TCodeEditor = TuseCodeEditor & {
  useCodeEditorFn?: typeof useCodeEditor;
};

const CodeEditor = ({ value, onChange, name, id, useCodeEditorFn = useCodeEditor }: TCodeEditor) => {
  const { code, onChangeCodeEditor } = useCodeEditorFn({ value, onChange, name, id });
  return (
    <ReactCodeEditor
      value={code}
      language="jsx"
      placeholder="Please enter JS code."
      onChange={onChangeCodeEditor}
      padding={15}
      style={{
        fontSize: 12,
        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        minHeight: '200px',
      }}
    />
  );
};

export default CodeEditor;
