import { ClassManager } from '@axa-fr/react-toolkit-core';
import ResiliencePage from './ResiliencePage';

export const ResiliencePageEnhance = ({ classModifier, ...rest }) => {
  const newClassModifier = ['resilience-page', classModifier].join(' ');
  const classComponent = ClassManager.getComponentClassName('af-container', newClassModifier);
  return <ResiliencePage classComponent={classComponent} {...rest} />;
};

export default ResiliencePageEnhance;
