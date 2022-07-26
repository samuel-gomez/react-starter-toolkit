import { ReactNode } from 'react';
import { Popover } from '@axa-fr/react-toolkit-all';
import './HelpInfo.scss';

type THelpInfo = {
  children: ReactNode;
  content?: ReactNode;
  isDisabled?: boolean;
  mode?: string;
  classModifier?: string;
};

const HelpInfo = ({ children, content, isDisabled, mode = 'hover', classModifier = 'short' }: THelpInfo) =>
  !isDisabled && content ? (
    <Popover mode={mode} classModifier={classModifier}>
      <Popover.Pop>{content}</Popover.Pop>
      <Popover.Over>{children}</Popover.Over>
    </Popover>
  ) : (
    <>{children}</>
  );

export default HelpInfo;
