import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import ModalPage, { code } from '../Modal';

describe('<ModalPage />', () => {
  it('Should render ModalPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<ModalPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const onChange = jest.fn();

  const defaultProps = {
    labelButton: 'Click me to launch modal',
    headerTitle: '<h4 className="af-modal__header-title">Titre de modal</h4>',
    bodyContent: `<p>
                Reprehenderit sit quis aute nisi consequat consequat mollit. Commodo
                in aliquip consectetur nulla sit anim. Pariatur minim commodo enim ea
                eu laborum culpa laboris. Labore labore irure ipsum consequat enim
                officia anim ipsum aliqua excepteur qui sint. Duis sint do culpa
                adipisicing dolor adipisicing ea dolore aute nisi quis ullamco aliquip
                occaecat. Aute ut mollit amet.
              </p>`,
    classModifier: '',
    labelButtonCancel: 'Annuler',
    labelButtonValid: 'Valider',
    onChange,
  };

  it('Should render Modal with default props', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`
      <>
        <Button type="submit" onClick={openModal}>
            <span className="af-btn__text">${defaultProps.labelButton}</span>
        </Button>
        <Modal isOpen={isOpen} onOutsideTap={onCancel} classModifier="${defaultProps.classModifier}">
            <Modal.HeaderBase>
            ${defaultProps.headerTitle}
            <button className="af-modal__header-close-btn" type="button" aria-label="Close" onClick={onCancel}>
                <span className="glyphicon glyphicon-close" aria-hidden="true" />
            </button>
            </Modal.HeaderBase>
            <Modal.Body>
            ${defaultProps.bodyContent}
            </Modal.Body>
            <Modal.Footer>
            <Button className="btn af-btn af-btn--reverse" onClick={onCancel}>
                <span>${defaultProps.labelButtonCancel}</span>
            </Button>
            <Button className="btn af-btn">
                <span>${defaultProps.labelButtonValid}</span>
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    `),
    );
  });
});
