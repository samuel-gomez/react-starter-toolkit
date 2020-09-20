import React from 'react';
import PropTypes from 'prop-types';
import Panel, { panelPropTypes } from 'shared/components/Panels/Panel';

const Panels = ({ fields }) =>
  fields.map(({ id, ...rest }) => (
    <div key={id} className="col col-sm-12 col-md-12 col-lg-4 col-xl-4">
      <Panel {...rest} />
    </div>
  ));

export const panelsPropTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      ...panelPropTypes,
    }),
  ).isRequired,
};

Panels.propTypes = panelsPropTypes;

export default Panels;
