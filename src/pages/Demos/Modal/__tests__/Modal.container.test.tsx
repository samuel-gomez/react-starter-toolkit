import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import ModalPageContainer from '../Modal.container';

describe('<ModalPageContainer/>', () => {
  const ModalPageCmpt = jest.fn().mockReturnValue('ModalPageCmpt');
  const onCancel = jest.fn();
  const openModal = jest.fn();

  it('Should render ModalPageContainer and called functions', () => {
    const useToggleModalFn = jest.fn().mockReturnValue({
      onCancel,
      openModal,
      isOpen: false,
    });

    renderWithWrapperStaticRouter(<ModalPageContainer ModalPageCmpt={ModalPageCmpt} useToggleModalFn={useToggleModalFn} />);

    expect(useToggleModalFn).toHaveBeenCalled();
    expect(ModalPageCmpt).toHaveBeenCalledWith(
      {
        onCancel,
        openModal,
        isOpen: false,
      },
      {},
    );
  });

  it('Should render ModalPageContainer and called functions', () => {
    const { baseElement } = renderWithWrapperStaticRouter(<ModalPageContainer />);

    expect(baseElement).toMatchSnapshot();
  });
});
