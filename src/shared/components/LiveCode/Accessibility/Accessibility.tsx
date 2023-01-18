import Tabs from '@axa-fr/react-toolkit-tabs';
import { TResults } from './Accessibility.hook';
import AccordionResults from './AccordionResults';
import EmptyResultsAccessiblity from './EmptyResultsAccessiblity';
import TitleTab from './TitleTab';
import './Accessibility.scss';

const Accessibility = ({ results }: TResults) => (
  <Tabs classModifier="accessibility-content">
    <Tabs.Tab title={<TitleTab results={results?.violations} label="Violations" icon="alert" />} classModifier="has-icon-left custom-radius">
      {results && results.violations.length > 0 ? (
        <AccordionResults results={results.violations} />
      ) : (
        <EmptyResultsAccessiblity message="Pas de violations" />
      )}
    </Tabs.Tab>
    <Tabs.Tab title={<TitleTab results={results?.passes} label="Passes" icon="ok" />} classModifier="has-icon-left custom-radius">
      {results && results.passes.length > 0 ? <AccordionResults results={results.passes} /> : <EmptyResultsAccessiblity message="Pas de passes" />}
    </Tabs.Tab>
    <Tabs.Tab title={<TitleTab results={results?.incomplete} label="Incomplete" icon="retweet" />} classModifier="has-icon-left custom-radius">
      {results && results.incomplete.length > 0 ? (
        <AccordionResults results={results.incomplete} />
      ) : (
        <EmptyResultsAccessiblity message="Pas d'incomplete" />
      )}
    </Tabs.Tab>
  </Tabs>
);
export default Accessibility;
