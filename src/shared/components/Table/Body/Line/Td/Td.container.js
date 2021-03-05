import React from 'react';
import PropTypes from 'prop-types';
import HelpHover from 'shared/components/HelpInfo';
import Td from './Td';

const TdContainer = ({ children, label, hover, ...restTd }) => (
  <Td {...restTd}>
    <HelpHover content={hover} classModifier="content">
      {label}
      {children}
    </HelpHover>
  </Td>
);

TdContainer.propTypes = {
  children: PropTypes.node,
};

TdContainer.defaultProps = {
  children: null,
};

export default TdContainer;
