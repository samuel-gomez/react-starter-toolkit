import React from 'react';
import { Button } from '@axa-fr/react-toolkit-all';
import LiveCode from 'shared/components/LiveCode';

const scope = { Button };
const code = `
  <Button disabled="disabled" classModifier="disabled" type="submit" onClick={e => console.log(e)} id="btn-disabled">
    <span className="af-btn__text">Disabled button</span>
  </Button>
`;

const ButtonDisabled = () => <LiveCode code={code} scope={scope} />;

export default ButtonDisabled;
