import { Button } from '@axa-fr/react-toolkit-all';
import LiveCode from 'shared/components/LiveCode';

const scope = { Button };
const code = `
  <Button type="submit" onClick={e => console.log(e)} id="btn-classic">
    <span className="af-btn__text">Classic button</span>
  </Button>
`;

const ButtonClassic = () => <LiveCode code={code} scope={scope} />;

export default ButtonClassic;
