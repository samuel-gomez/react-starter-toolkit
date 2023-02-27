import { useToggleModal } from 'shared/components/ModalCommon';
import ModalPage from './ModalCustom';

type TModalPageContainer = {
  useToggleModalFn?: typeof useToggleModal;
  ModalPageCmpt?: typeof ModalPage;
};

const ModalCustomPageContainer = ({ useToggleModalFn = useToggleModal, ModalPageCmpt = ModalPage, ...rest }: TModalPageContainer) => {
  const { onCancel, openModal, isOpen } = useToggleModalFn();

  return <ModalPageCmpt {...rest} openModal={openModal} isOpen={isOpen} onCancel={onCancel} />;
};

export default ModalCustomPageContainer;
