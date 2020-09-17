import React from 'react';
import PropTypes from 'prop-types';
import Panel, { panelPropTypes } from 'shared/components/Panel';
import { FIELDS, TITLE_BAR, TITLE } from './constants';

export const Panels = ({ fields }) =>
  fields.map(({ id, ...rest }) => (
    <div key={id} className="col col-sm-12 col-md-12 col-lg-4 col-xl-4">
      <Panel {...rest} />
    </div>
  ));

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
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      ...panelPropTypes,
    }),
  ),
};

export const formPageDefaultProps = {
  fields: FIELDS,
};

FormPage.propTypes = formPagePropTypes;
FormPage.defaultProps = formPageDefaultProps;

FormPage.propTypes = formPagePropTypes;

export default FormPage;
