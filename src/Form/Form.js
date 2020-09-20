import React from 'react';
import Panels, { panelsPropTypes } from 'shared/components/Panels';
import { FIELDS, TITLE_BAR, TITLE } from './constants';

const FormPage = ({ header, footer, title, menu, fields }) => (
  <>
    {header()}
    {menu()}
    {title({ title: TITLE_BAR })}
    <div className="af-main container">
      <h2 className="af-title--content">{TITLE}</h2>
      <Panels fields={fields} />
    </div>
    {footer()}
  </>
);

export const formPagePropTypes = {
  ...panelsPropTypes,
};

export const formPageDefaultProps = {
  fields: FIELDS,
};

FormPage.propTypes = formPagePropTypes;
FormPage.defaultProps = formPageDefaultProps;

FormPage.propTypes = formPagePropTypes;

export default FormPage;
