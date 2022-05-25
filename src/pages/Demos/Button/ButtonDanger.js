import { Button } from '@axa-fr/react-toolkit-all';
import LiveCode from 'shared/components/LiveCode';

const scope = { Button };
const code = `
  <Button classModifier="danger" type="submit" onClick={e => console.log(e)} id="btn-danger">
    <span className="af-btn__text">Danger button</span>
  </Button>
`;

const ButtonDanger = () => <LiveCode code={code} scope={scope} />;

export default ButtonDanger;
