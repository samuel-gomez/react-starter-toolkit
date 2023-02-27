import { DEFAULT_A11Y_LINKS, DEFAULT_ARIA_LABEL } from './constants';
import './A11yMenu.scss';

type TA11yMenuItem = {
  label: string;
  id: string;
};

type TA11yMenu = {
  items?: TA11yMenuItem[];
  ariaLabel?: string;
};

const A11yMenu = ({ items = DEFAULT_A11Y_LINKS, ariaLabel = DEFAULT_ARIA_LABEL }: TA11yMenu) => (
  <ul aria-label={ariaLabel} className="af-a11ymenu">
    {items.map(({ label, id }) => (
      <li className="af-a11ymenu__item" key={id}>
        <a className="af-a11ymenu__link" href={`#${id}`}>
          {label}
        </a>
      </li>
    ))}
  </ul>
);

export default A11yMenu;
