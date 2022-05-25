import ResiliencePage from 'shared/components/ResiliencePage';
import { TITLE, MESSAGE, CODE } from './constants';
import './Unauthorize.scss';

const Unauthorize = () => (
  <ResiliencePage title={TITLE} message={MESSAGE} code={CODE} subtitlePartOne="forbidden" backhome={false} classModifier="unauthorize" />
);

export default Unauthorize;
