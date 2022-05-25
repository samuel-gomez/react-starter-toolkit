import { Button } from '@axa-fr/react-toolkit-all';
import LiveCode from 'shared/components/LiveCode';

const scope = { Button };
const code = `
  <Button classModifier="success" type="submit" onClick={e => console.log(e)} id="btn-success">
    <span className="af-btn__text">Success button</span>
  </Button>
`;

const ButtonSuccess = () => <LiveCode code={code} scope={scope} />;

export default ButtonSuccess;
