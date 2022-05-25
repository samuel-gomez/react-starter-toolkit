import { node, string } from 'prop-types';
import { Popover } from '@axa-fr/react-toolkit-all';
import './HelpInfo.scss';

const HelpInfo = ({ children, content, isDisabled, mode, classModifier }) =>
  !isDisabled && content ? (
    <Popover mode={mode} classModifier={classModifier}>
      <Popover.Pop>{content}</Popover.Pop>
      <Popover.Over>{children}</Popover.Over>
    </Popover>
  ) : (
    children
  );

HelpInfo.propTypes = {
  children: node.isRequired,
  content: node,
  mode: string,
  classModifier: string,
};

HelpInfo.defaultProps = {
  mode: 'hover',
  classModifier: 'short',
  content: null,
};

export default HelpInfo;
