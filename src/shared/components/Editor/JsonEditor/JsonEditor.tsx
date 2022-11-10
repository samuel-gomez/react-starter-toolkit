import { Button } from '@axa-fr/react-toolkit-all';
import Modal from '@axa-fr/react-toolkit-modal-default';
import ReactCodeEditor from '@uiw/react-textarea-code-editor';
import '@uiw/react-textarea-code-editor/dist.css';
import { ChangeEvent, useCallback, useState } from 'react';
import { ModalCommonHeader, ModalCommonBody, ModalCommonFooter, useToggleModal } from 'shared/components/ModalCommon';
import { TEvent, TonChange } from '../Editor';
import './JsonEditor.scss';

type TuseJsonEditor = TEvent & {
  onChange: TonChange;
};

export const useJsonEditor = ({ value, id, name, onChange }: TuseJsonEditor) => {
  const [code, setCode] = useState(value);

  const onChangeJsonEditor = useCallback(
    (evn: ChangeEvent<HTMLTextAreaElement>) => {
      onChange({ value: JSON.parse(evn.target.value), name, id });
      setCode(JSON.parse(evn.target.value));
    },
    [id, name, onChange],
  );

  return { onChangeJsonEditor, code, setCode };
};

export type TReturnUseJsonEditor = ReturnType<typeof useJsonEditor>;

type TJsonEditor = TuseJsonEditor & {
  useJsonEditorFn?: typeof useJsonEditor;
  useToggleModalFn?: typeof useToggleModal;
  labelBtnOpenCodeEditor?: string;
};

const JsonEditor = ({
  value,
  onChange,
  name,
  id,
  labelBtnOpenCodeEditor = 'Edit params',
  useJsonEditorFn = useJsonEditor,
  useToggleModalFn = useToggleModal,
}: TJsonEditor) => {
  const { code, onChangeJsonEditor } = useJsonEditorFn({ value, onChange, name, id });
  const { onCancel, openModal, isOpen } = useToggleModalFn();

  return (
    <>
      <Button classModifier="editor" type="submit" onClick={openModal}>
        <span className="af-btn__text">{labelBtnOpenCodeEditor}</span>
      </Button>
      <Modal isOpen={isOpen} onOutsideTap={onCancel} className="af-modal af-modal--editorjson">
        <ModalCommonHeader onCancel={onCancel} title={`Saisir la value de ${name}`} />
        <ModalCommonBody>
          <ReactCodeEditor
            value={JSON.stringify(code, null, 2)}
            language="json"
            placeholder="Please enter JSON code."
            onChange={onChangeJsonEditor}
            padding={15}
            style={{
              fontSize: 12,
              fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              minHeight: '200px',
            }}
          />
        </ModalCommonBody>
        <ModalCommonFooter cancelLabel="Fermer" onCancel={onCancel} />
      </Modal>
    </>
  );
};

export default JsonEditor;
