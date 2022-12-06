import { Button, Alert } from '@axa-fr/react-toolkit-all';
import Modal from '@axa-fr/react-toolkit-modal-default';
import Layout, { TLayout } from 'Layout';
import { ReactNode } from 'react';
import LiveCode from 'shared/components/LiveCode';
import { ModalCommonHeader, ModalCommonBody, ModalCommonFooter, TReturnUseToggleModal } from 'shared/components/ModalCommon';
import { TITLE_BAR, TITLE } from './constants';

const scope = { Button, Modal, ModalCommonHeader, ModalCommonBody, ModalCommonFooter, Alert };
const code = `
<>
  <Button type="submit" onClick={openModal}>
    <span className="af-btn__text">Click me to launch modal</span>
  </Button>
  <Modal isOpen={isOpen} onOutsideTap={onCancel} classModifier={classModifier}>
    <ModalCommonHeader onCancel={onCancel} title="Validation des informations générales" />
    <ModalCommonBody>
      <Alert classModifier="info" icon="info-sign" title="Vous allez créer un nouvel élément." />
      <p>Confirmez-vous vouloir valider avec les informations suivantes ?</p>      
    </ModalCommonBody>
    <ModalCommonFooter cancelLabel="Annuler" onCancel={onCancel} onSubmit={onCancel} confirmLabel="Valider" classModifier="" />
  </Modal>
</>
`;

type TModalPage = TLayout &
  TReturnUseToggleModal & {
    titleBar?: ReactNode;
    title?: ReactNode;
  };

const ModalCustomPage = ({ titleBar = TITLE_BAR, title = TITLE, openModal, isOpen, onCancel }: TModalPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <a
      className="af-link af-link--hasIconRight"
      href="https://codesandbox.io/embed/modal-default-l6sq5"
      target="blank"
      rel="nofollow noreferrer noopener"
    >
      <span className="af-link__text">CodeSandBox</span>
      <i className="glyphicon glyphicon-new-window" />
    </a>
    <LiveCode
      code={code}
      scope={{
        ...scope,
        openModal,
        onCancel,
        isOpen,
        classModifier: '',
      }}
      hideReadme
    />
  </Layout>
);

export default ModalCustomPage;
