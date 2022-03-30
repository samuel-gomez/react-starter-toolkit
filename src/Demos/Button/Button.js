import React from 'react';
import { string } from 'prop-types';
import Layout from 'Layout';
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

const ButtonPage = ({ titleBar, title }) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <ButtonClassic />
    <ButtonReversed />
    <ButtonDisabled />
    <ButtonSuccess />
    <ButtonDanger />
    <ButtonSmall />
    <ButtonWithRightIcon />
    <ButtonWithLeftIcon />
    <ButtonCircle />
  </Layout>
);

ButtonPage.propTypes = {
  titleBar: string,
  title: string,
};

ButtonPage.defaultProps = {
  titleBar: TITLE_BAR,
  title: TITLE,
};

export default ButtonPage;
