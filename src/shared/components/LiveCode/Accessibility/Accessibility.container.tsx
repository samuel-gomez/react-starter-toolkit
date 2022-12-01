import Accessibility from './Accessibility';
import { useAxe } from './Accessibility.hook';

type TAccessibilityContainer = {
  title?: string;
  icon?: string;
  ariaLabel?: string;
  useAxeFn?: typeof useAxe;
};

const AccessibilityContainer = ({ ariaLabel, useAxeFn = useAxe }: TAccessibilityContainer) => {
  const { errors, results } = useAxeFn({ html: `[aria-label="${ariaLabel}"]` });

  return <Accessibility errors={errors} results={results} />;
};

export default AccessibilityContainer;
