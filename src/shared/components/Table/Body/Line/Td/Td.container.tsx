import { ReactNode } from 'react';
import HelpHover, { THelpInfo } from 'shared/components/HelpInfo';
import Td from './Td';

export type TTdContainer = Omit<THelpInfo, 'children'> & {
  children?: ReactNode;
  label?: ReactNode;
  classModifier?: string;
  hover?: ReactNode;
  TdCmpt?: typeof Td;
  HelpHoverCmpt?: typeof HelpHover;
};

const TdContainer = ({ children, label, hover, classModifier, TdCmpt = Td, HelpHoverCmpt = HelpHover }: TTdContainer) => (
  <TdCmpt classModifier={classModifier}>
    <HelpHoverCmpt content={hover} classModifier="content">
      {label}
      {children}
    </HelpHoverCmpt>
  </TdCmpt>
);

export default TdContainer;
