import { string, bool } from 'prop-types';
import TitleBar from 'Layout/TitleBar';
import './ResiliencePage.scss';

const ResiliencePage = ({ classComponent, title, message, subtitlePartOne, subtitlePartTwo, code, backhome }) => (
  <>
    <TitleBar backHome={backhome} classModifier="hasstepper" title={title} />
    <div className={`container ${classComponent}`}>
      <h1 className="af-resilience-page__title">
        <div className="af-resilience-page__title-covernumber">
          <span className="af-resilience-page__title-number">{code}</span>
        </div>
        <div className="af-resilience-page__title-covernot">
          <span className="af-resilience-page__title-not">
            {subtitlePartOne}
            <br />
            {subtitlePartTwo}
          </span>
        </div>
      </h1>
      <p className="af-resilience-page__message">{message}</p>
    </div>
  </>
);

export const resiliencePagePropTypes = {
  title: string.isRequired,
  message: string.isRequired,
  subtitlePartOne: string,
  subtitlePartTwo: string,
  backhome: bool,
  classComponent: string,
};

export const resiliencePageDefaultProps = {
  subtitlePartOne: '',
  subtitlePartTwo: '',
  backhome: true,
  classComponent: 'af-container--resilience-page',
};

ResiliencePage.propTypes = resiliencePagePropTypes;
ResiliencePage.defaultProps = resiliencePageDefaultProps;

export default ResiliencePage;
