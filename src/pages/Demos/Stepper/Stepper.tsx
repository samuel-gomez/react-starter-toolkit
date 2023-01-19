/* eslint-disable max-lines-per-function */
import Layout, { TLayoutPage } from 'Layout';
import { ClickEvent } from '@axa-fr/react-toolkit-core';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent, Tknobs, EditorHeader, TReturnUseToggleEditor } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, DESIGN_SYSTEM_PATH, STORYBOOK_PATH, GITHUB_PACKAGE, NPM_NAME } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  classModifier: '',
  className: 'af-steps-new',
  step1Separator: 'STEP 1',
  step1Title: 'Step 1',
  step1Mode: 'link',
  step1Href: '/etape1',
  step1Id: 'id1',
  step2Separator: 'STEP 2',
  step2Title: 'Step 2',
  step2Mode: 'link',
  step2Href: '/etape2',
  step2Id: 'id2',
  step3Separator: 'STEP 3',
  step3Title: 'Current Step',
  step3Mode: 'active',
  step3Number: '13',
  step3Id: 'id3',
  step4Separator: 'STEP 4',
  step4Title: 'Custom',
  step4Href: '/etape4',
  step4Id: 'id4',
  step4Icon: 'home',
  step5Separator: 'STEP 5',
  step5Title: 'Final step',
  step5Mode: 'disabled',
  step5Id: 'id5',
};

type Props = Partial<typeof INITIAL_STATE> & {
  onClick?: (arg: ClickEvent) => void;
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

export const code = ({
  className,
  classModifier,
  step1Mode,
  step1Title,
  step1Href,
  step1Id,
  step2Mode,
  step2Title,
  step2Href,
  step2Id,
  step3Mode,
  step3Title,
  step3Number,
  step3Id,
  step4Title,
  step4Id,
  step4Href,
  step4Icon,
  step5Mode,
  step5Title,
  step5Id,
}: Props) => `<Steps classModifier="${classModifier}" className="${className}">
  <Step
    id="${step1Id}"
    href="${step1Href}"
    onClick={onClick}
    mode="${step1Mode}"
    title="${step1Title}"
  />
  <Step
    id="${step2Id}"
    href="${step2Href}"
    onClick={onClick}
    mode="${step2Mode}"
    title="${step2Title}"
  />
  <Step
    id="${step3Id}"
    number="${step3Number}"
    onClick={onClick}
    mode="${step3Mode}"
    title="${step3Title}"
  />
  <StepBase id="${step4Id}" title="Un titre">
    <a
      className="af-steps-list-stepLabel"
      href="${step4Href}"
      onClick={onClick}>
      <span className="af-steps-list-stepNumber">
        <i role="img" aria-label="${step4Icon}" className="glyphicon glyphicon-${step4Icon}"></i>      
      </span>
      <span className="af-steps-list-stepTitle">${step4Title}</span>
    </a>
  </StepBase>
  <Step id="${step5Id}" title="${step5Title}"  mode="${step5Mode}" />
</Steps>
  `;

const StepperWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(({ openEditor, ...props }) => {
  return (
    <>
      <EditorHeader
        storybookPath={STORYBOOK_PATH}
        designSystemPath={DESIGN_SYSTEM_PATH}
        githubPackage={GITHUB_PACKAGE}
        npmName={NPM_NAME}
        openEditor={openEditor}
      />
      <LiveCode code={code(props)} scope={props} githubPackage={GITHUB_PACKAGE} />
    </>
  );
}, knobs as unknown as Tknobs);

const StepperEditable = () => {
  const { state, onChange, onClick } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <StepperWithEditor {...state} onClick={onClick('onClick button')} onChange={onChange} />;
};

const StepperDemo = ({ titleBar = TITLE_BAR, title = TITLE }: TLayoutPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <StepperEditable />
  </Layout>
);

export default StepperDemo;
