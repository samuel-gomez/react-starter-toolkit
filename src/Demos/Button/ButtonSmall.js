import React from 'react';
import { Button } from '@axa-fr/react-toolkit-all';
import LiveCode from 'shared/components/LiveCode';

const scope = { Button };
const code = `
  <Button classModifier="small" type="submit" onClick={e => console.log(e)} id="btn-small">
    <span className="af-btn__text">OK</span>
  </Button>
`;

const ButtonSmall = () => <LiveCode code={code} scope={scope} />;

export default ButtonSmall;
