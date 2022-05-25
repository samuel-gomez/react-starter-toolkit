import { node } from 'prop-types';
import HelpHover from 'shared/components/HelpInfo';
import Td from './Td';

const TdContainer = ({ children, label, hover, classModifier }) => (
  <Td classModifier={classModifier}>
    <HelpHover content={hover} classModifier="content">
      {label}
      {children}
    </HelpHover>
  </Td>
);

TdContainer.propTypes = {
  children: node,
};

TdContainer.defaultProps = {
  children: null,
};

export default TdContainer;
