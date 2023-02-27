import { withClassDefault, withClassModifier, WithClassModifierOptions, compose, identity } from '@axa-fr/react-toolkit-core';
import TitleBar from '../Layout/TitleBar';
import './ResiliencePage.scss';

export type TResiliencePage = WithClassModifierOptions & {
  title: string;
  message?: string;
  subtitlePartOne?: string;
  subtitlePartTwo?: string;
  backhome?: boolean;
  code?: string;
  ariaLabel?: string;
};

const DEFAULT_CLASSNAME = 'af-container';

const ResiliencePage = ({
  title,
  className,
  message = '',
  subtitlePartOne = '',
  subtitlePartTwo = '',
  code = '404',
  backhome = true,
  ariaLabel = `page error ${code}`,
}: TResiliencePage) => (
  <>
    <TitleBar backHome={backhome} classModifier="hasstepper" title={title} />
    <div role="main" aria-label={ariaLabel} className={`container ${className}`}>
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
      {!!message && <p className="af-resilience-page__message">{message}</p>}
    </div>
  </>
);

const enhance = compose(identity<TResiliencePage>(), withClassDefault(DEFAULT_CLASSNAME), withClassModifier());

const Enhanced = enhance(ResiliencePage);
Enhanced.displayName = ResiliencePage.name;

export default Enhanced;
