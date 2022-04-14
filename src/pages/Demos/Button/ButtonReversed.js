import React from 'react';
import { Button } from '@axa-fr/react-toolkit-all';
import LiveCode from 'shared/components/LiveCode';

const scope = { Button };
const code = `
  <Button classModifier="reverse" type="submit" onClick={e => console.log(e)} id="btn-reverse">
    <span className="af-btn__text">Reversed button</span>
  </Button>
`;

const ButtonReversed = () => <LiveCode code={code} scope={scope} />;

export default ButtonReversed;
