import React from 'react';
import { Button } from '@axa-fr/react-toolkit-all';
import LiveCode from 'shared/components/LiveCode';

const scope = { Button };
const code = `
  <Button className="af-btn--circle" type="submit" onClick={e => console.log(e)} id="btn-circle">
    <i className="glyphicon glyphicon-floppy-disk" />
  </Button>
`;

const ButtonCircle = props => <LiveCode code={code} scope={scope} />;

export default ButtonCircle;
