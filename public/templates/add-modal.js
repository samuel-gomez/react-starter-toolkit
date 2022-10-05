const html = `{(() => {
    const [isOpen, setStateToggleModal] = useState(false);

    const onCancel = useCallback(() => {
        setStateToggleModal(false);
    }, []);

    const openModal = useCallback(() => {
        setStateToggleModal(true);
    }, []);

   return (<>
    <Button type="submit" onClick={openModal}>
        <span className="af-btn__text">Click me to launch modal</span>
    </Button>
    <Modal isOpen={isOpen}>
      <Modal.HeaderBase id="headerId">
        <p>
          Ici je controle completement <b>le contenu</b>
        </p>
      </Modal.HeaderBase>
      <Modal.Body>
        <p>
          Reprehenderit sit quis aute nisi consequat consequat mollit. Commodo
          in aliquip consectetur nulla sit anim. Pariatur minim commodo enim ea
          eu laborum culpa laboris. Labore labore irure ipsum consequat enim
          officia anim ipsum aliqua excepteur qui sint. Duis sint do culpa
          adipisicing dolor adipisicing ea dolore aute nisi quis ullamco aliquip
          occaecat. Aute ut mollit amet.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onCancel} lassName="btn af-btn af-btn--reverse" type="button">
          Annuler
        </Button>
        <Button onClick={onCancel} className="btn af-btn" type="utton">
          Valider
        </Button>
      </Modal.Footer>
    </Modal></>)
   })()}`;

export default html;
