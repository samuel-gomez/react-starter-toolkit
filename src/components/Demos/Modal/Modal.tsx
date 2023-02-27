import Layout, { TLayoutPage } from 'shared/components/Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
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
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange?: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
  openModal: () => void;
  onCancel: () => void;
  isOpen: boolean;
  isOpenEditor?: boolean;
};

export const code = ({ labelButton, classModifier, headerTitle, bodyContent, labelButtonCancel, labelButtonValid }: Props) => `
    <>
      <Button type="submit" onClick={openModal}>
        <span className="af-btn__text">${labelButton}</span>
      </Button>
      <Modal isOpen={isOpen} onOutsideTap={onCancel} classModifier="${classModifier}">
        <Modal.HeaderBase>
          ${headerTitle}
          <button className="af-modal__header-close-btn" type="button" aria-label="Close" onClick={onCancel}>
            <span className="glyphicon glyphicon-close" aria-hidden="true" />
          </button>
        </Modal.HeaderBase>
        <Modal.Body>
          ${bodyContent}
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn af-btn af-btn--reverse" onClick={onCancel}>
            <span>${labelButtonCancel}</span>
          </Button>
          <Button className="btn af-btn">
            <span>${labelButtonValid}</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  `;

const ModalWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader
        storybookPath={STORYBOOK_PATH}
        designSystemPath={DESIGN_SYSTEM_PATH}
        githubPackage={GITHUB_PACKAGE}
        npmName={NPM_NAME}
        openEditor={openEditor}
      />
      <LiveCode styleLivePreview={{ textAlign: 'left' }} code={code(props)} scope={props} githubPackage={GITHUB_PACKAGE} />
    </>
  ),
  knobs as unknown as Tknobs,
);

const ModalEditable = () => {
  const { state, onChange, onCancel, openModal, isOpen } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });

  return <ModalWithEditor {...state} openModal={openModal} onCancel={onCancel} isOpen={isOpen} onChange={onChange} />;
};

const ModalPage = ({ titleBar = TITLE_BAR, title = TITLE }: TLayoutPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <ModalEditable />
  </Layout>
);

export default ModalPage;
