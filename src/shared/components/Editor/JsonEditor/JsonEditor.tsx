import { Button } from '@axa-fr/react-toolkit-all';
import Modal from '@axa-fr/react-toolkit-modal-default';
import type { JSONContent, OnChange } from 'vanilla-jsoneditor';
import '@uiw/react-textarea-code-editor/dist.css';
import { useCallback, useState } from 'react';
import { ModalCommonHeader, ModalCommonBody, ModalCommonFooter, useToggleModal } from 'shared/components/ModalCommon';
import { TEvent, TonChange } from '../Editor';
import VanillaJsonEditor from './VanillaJsonEditor';
import './JsonEditor.scss';

type TuseJsonEditor = TEvent & {
  onChange: TonChange;
};

export const useJsonEditor = ({ value, id, name, onChange }: TuseJsonEditor) => {
  const [code, setCode] = useState({
    json: value,
  } as JSONContent);

  const onChangeJsonEditor = useCallback(
    (...params: Parameters<typeof setCode>) => {
      const newValue = params?.[0] as JSONContent;
      onChange({ value: newValue.json as unknown as string, name, id });
      return setCode(...params);
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
      <Button type="submit" onClick={openModal}>
        <span className="af-btn__text">{labelBtnOpenCodeEditor}</span>
      </Button>
      <Modal isOpen={isOpen} onOutsideTap={onCancel} className="af-modal af-modal--editor">
        <ModalCommonHeader onCancel={onCancel} title={`Saisir la value de ${name}`} />
        <ModalCommonBody>
          <VanillaJsonEditor content={code} onChange={onChangeJsonEditor as OnChange} />
        </ModalCommonBody>
        <ModalCommonFooter cancelLabel="Fermer" onCancel={onCancel} />
      </Modal>
    </>
  );
};

export default JsonEditor;
