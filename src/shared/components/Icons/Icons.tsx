import { PATHS } from './constants';

type TIcons = {
  className?: string;
  icon: keyof typeof PATHS;
  viewBox?: string;
  pathIcon?: string;
};

const Icons = ({ icon, className = 'af-icon-svg', viewBox = '0 0 100 100', pathIcon = PATHS[icon] }: TIcons) => (
  <svg aria-labelledby="title" role="img" className={className} viewBox={viewBox}>
    <title>{icon}</title>
    <path d={pathIcon} />
  </svg>
);

export default Icons;
