import { Result } from 'axe-core';
import { Accordion, CollapseCard, Badge } from '@axa-fr/react-toolkit-all';
import { colorTags } from './constants';
import './AccordionResults.scss';

const AccordionResults = ({ results }: { results: Result[] }) => (
  <Accordion classModifier="light accessibility" onlyOne={false}>
    {results.map((result: Result) => (
      <CollapseCard key={result.id} isOpen={false} id={result.id}>
        <CollapseCard.Header key={result.id}>
          {result.description} {result.impact && <Badge classModifier={colorTags[result.impact]}>{result.impact}</Badge>}
        </CollapseCard.Header>
        <CollapseCard.Body key={result.id}>
          <div className="af-accordion--accessibility-wrapper-body">
            <p>{result.help}</p>
            <p>
              <a href={result.helpUrl} rel="noreferrer" target="_blank">
                Plus d'infos...
              </a>
            </p>
          </div>
          <div className="af-accordion--accessibility-wrapper-body">
            <span>Tags : </span>
            {result.tags.map((tag: string) => (
              <Badge key={tag} classModifier="info">
                {tag}
              </Badge>
            ))}
          </div>
        </CollapseCard.Body>
      </CollapseCard>
    ))}
  </Accordion>
);

export default AccordionResults;
