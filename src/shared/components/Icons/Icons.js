import PATHS from './constants';

const Icons = ({ className = 'af-icon-svg', icon }) => (
  <svg aria-labelledby="title" role="img" alt={icon} className={className} viewBox="0 0 100 100">
    <title>{icon}</title>
    <path d={PATHS[icon]} />
  </svg>
);

export default Icons;
