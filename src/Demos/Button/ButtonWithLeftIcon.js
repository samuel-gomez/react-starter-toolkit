import React from 'react';
import { Button } from '@axa-fr/react-toolkit-all';
import LiveCode from 'shared/components/LiveCode';

const scope = { Button };
const code = `
  <Button classModifier="hasiconLeft" type="submit" onClick={e => console.log(e)} id="btn-reverse-with-left-icon">
    <i className="glyphicon glyphicon-arrowthin-left" />
    <span className="af-btn__text">With left icon button</span>
  </Button>
`;

const ButtonWithLeftIcon = () => <LiveCode code={code} scope={scope} />;

export default ButtonWithLeftIcon;
