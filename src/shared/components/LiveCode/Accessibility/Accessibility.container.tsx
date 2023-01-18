import Accessibility from './Accessibility';
import { useAxe } from './Accessibility.hook';

type TAccessibilityContainer = {
  hideComponent?: boolean;
  title?: string;
  icon?: string;
  code?: string;
  ariaLabel?: string;
  useAxeFn?: typeof useAxe;
};

const AccessibilityContainer = ({ ariaLabel, code, useAxeFn = useAxe }: TAccessibilityContainer) => {
  const { errors, results } = useAxeFn({ html: `[aria-label="${ariaLabel}"]`, code });

  return <Accessibility errors={errors} results={results} />;
};

export default AccessibilityContainer;
