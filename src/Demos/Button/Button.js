import React from 'react';
import { TITLE_BAR, TITLE } from './constants';
import ButtonClassic from './ButtonClassic';
import ButtonReversed from './ButtonReversed';
import ButtonDisabled from './ButtonDisabled';
import ButtonSuccess from './ButtonSuccess';
import ButtonDanger from './ButtonDanger';
import ButtonSmall from './ButtonSmall';
import ButtonWithRightIcon from './ButtonWithRightIcon';
import ButtonWithLeftIcon from './ButtonWithLeftIcon';
import ButtonCircle from './ButtonCircle';

const ButtonPage = ({ header, footer, title, menu }) => (
  <>
    {header()}
    {menu()}
    {title({ title: TITLE_BAR })}
    <div className="af-main container">
      <h1 className="af-title--content">{TITLE}</h1>
      <ButtonClassic />
      <ButtonReversed />
      <ButtonDisabled />
      <ButtonSuccess />
      <ButtonDanger />
      <ButtonSmall />
      <ButtonWithRightIcon />
      <ButtonWithLeftIcon />
      <ButtonCircle />
    </div>
    {footer()}
  </>
);

export default ButtonPage;
