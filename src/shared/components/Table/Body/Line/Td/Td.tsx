import { ReactNode } from 'react';
import HelpHover, { THelpInfo } from 'shared/components/HelpInfo';
import { default as TableTk } from '@axa-fr/react-toolkit-table';

export type TTdContainer = Omit<THelpInfo, 'children'> & {
  children?: ReactNode;
  label?: ReactNode;
  classModifier?: string;
  hover?: ReactNode;
  TdCmpt?: typeof TableTk.Td;
  HelpHoverCmpt?: typeof HelpHover;
};

const TdContainer = ({ children, label, hover, classModifier, TdCmpt = TableTk.Td, HelpHoverCmpt = HelpHover }: TTdContainer) => (
  <TdCmpt classModifier={classModifier}>
    <HelpHoverCmpt content={hover} classModifier="content">
      {label}
      {children}
    </HelpHoverCmpt>
  </TdCmpt>
);

export default TdContainer;
