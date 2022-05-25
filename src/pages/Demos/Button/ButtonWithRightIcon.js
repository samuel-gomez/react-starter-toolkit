import { Button } from '@axa-fr/react-toolkit-all';
import LiveCode from 'shared/components/LiveCode';

const scope = { Button };
const code = `
  <Button classModifier="hasiconRight" type="submit" onClick={e => console.log(e)} id="btn-reverse-with-right-icon">
    <span className="af-btn__text">With right icon button</span>
    <i className="glyphicon glyphicon-arrowthin-right" />
  </Button>
`;

const ButtonWithRightIcon = () => <LiveCode code={code} scope={scope} />;

export default ButtonWithRightIcon;
