import ResiliencePage from 'shared/components/ResiliencePage';
import { TITLE, MESSAGE, CODE } from './constants';

const NotFound = () => <ResiliencePage title={TITLE} message={MESSAGE} code={CODE} subtitlePartOne="not" subtitlePartTwo="found" />;

export default NotFound;
