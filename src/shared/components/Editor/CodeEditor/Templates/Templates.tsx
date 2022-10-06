import { Button } from '@axa-fr/react-toolkit-all';
import HelpInfo from 'shared/components/HelpInfo';
import { TReturnUseCodeEditor } from '../CodeEditor';

export const DEFAULT_LIST = [
  {
    id: 'add-list',
    icon: 'list',
    tooltipLabel: 'Liste',
  },
  {
    id: 'add-title__h1',
    label: 'H1',
    tooltipLabel: 'Titre h1',
  },
  {
    id: 'add-title__h2',
    label: 'H2',
    tooltipLabel: 'Titre h2',
  },
  {
    id: 'add-title__h3',
    label: 'H3',
    tooltipLabel: 'Titre h3',
  },
  {
    id: 'add-title__h4',
    label: 'H4',
    tooltipLabel: 'Titre h4',
  },
  {
    id: 'add-restitution__basic',
    icon: 'list-alt',
    tooltipLabel: 'Restitution',
  },
  {
    id: 'add-modal',
    icon: 'modal-window',
    tooltipLabel: 'Modal',
  },
];

type TlistElement = {
  id: string;
  label?: string;
  icon?: string;
  tooltipLabel?: string;
};
export type Tlistelements = TlistElement[];

type TTemplates = {
  list?: Tlistelements;
  submitTemplate: TReturnUseCodeEditor['submitTemplate'];
  onClearCodeEditor: TReturnUseCodeEditor['onClearCodeEditor'];
};

const Templates = ({ list = DEFAULT_LIST, submitTemplate, onClearCodeEditor }: TTemplates) => (
  <div className="af-templates">
    <Button className="af-btn--circle af-btn--delete" onClick={onClearCodeEditor}>
      <i className="glyphicon glyphicon-trash"></i>
    </Button>
    {list.map(({ id, label, icon, tooltipLabel }) => (
      <HelpInfo key={id} content={tooltipLabel} classModifier="editor">
        <Button className="af-btn--circle" id={id} onClick={submitTemplate}>
          {!!icon && <i className={`glyphicon glyphicon-${icon}`}></i>}
          {label}
        </Button>
      </HelpInfo>
    ))}
  </div>
);

export default Templates;
