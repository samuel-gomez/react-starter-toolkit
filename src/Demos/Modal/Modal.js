import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@axa-fr/react-toolkit-all';
import { TITLE_BAR, TITLE } from './constants';
import ModalConfirm from './ModalConfirm';

const ModalPage = ({ header, footer, title, menu, openModalConfirm, modalConfirmProps }) => (
  <>
    {header()}
    {menu()}
    {title({ title: TITLE_BAR })}
    <div className="af-main container">
      <h1 className="af-title--content">{TITLE}</h1>
      <Button type="submit" onClick={openModalConfirm}>
        <span className="af-btn__text">Click me to launch modal</span>
      </Button>
      <ModalConfirm {...modalConfirmProps} />
    </div>
    {footer()}
  </>
);

ModalPage.propTypes = {
  openModalConfirm: PropTypes.func.isRequired,
};

ModalPage.defaultProps = {};

export default ModalPage;
