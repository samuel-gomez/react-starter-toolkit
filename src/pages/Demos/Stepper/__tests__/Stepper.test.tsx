import { StepModes } from '@axa-fr/react-toolkit-all';
import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import Stepper, { code } from '../Stepper';

describe('<Stepper />', () => {
  it('Should render Stepper', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<Stepper />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const onChange = jest.fn();

  const defaultProps = {
    classModifier: '',
    className: 'af-steps-new',
    step1Separator: 'STEP 1',
    step1Title: 'Step 1',
    step1Mode: StepModes.link,
    step1Href: '/etape1',
    step1Id: 'id1',
    step2Separator: 'STEP 2',
    step2Title: 'Step 2',
    step2Mode: StepModes.link,
    step2Href: '/etape2',
    step2Id: 'id2',
    step3Separator: 'STEP 3',
    step3Title: 'Current Step',
    step3Mode: StepModes.active,
    step3Number: '13',
    step3Id: 'id3',
    step4Separator: 'STEP 4',
    step4Title: 'Custom',
    step4Href: '/etape4',
    step4Id: 'id4',
    step4Icon: 'home',
    step5Separator: 'STEP 5',
    step5Title: 'Final step',
    step5Mode: StepModes.disabled,
    step5Id: 'id5',
    onChange,
  };

  it('Should render Stepper with default props', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`
      <Steps classModifier="${defaultProps.classModifier}" className="${defaultProps.className}">
        <Step
          id="${defaultProps.step1Id}"
          href="${defaultProps.step1Href}"
          onClick={onClick}
          mode="${defaultProps.step1Mode}"
          title="${defaultProps.step1Title}"
        />
        <Step
          id="${defaultProps.step2Id}"
          href="${defaultProps.step2Href}"
          onClick={onClick}
          mode="${defaultProps.step2Mode}"
          title="${defaultProps.step2Title}"
        />
        <Step
          id="${defaultProps.step3Id}"
          number="${defaultProps.step3Number}"
          onClick={onClick}
          mode="${defaultProps.step3Mode}"
          title="${defaultProps.step3Title}"
        />
        <StepBase id="${defaultProps.step4Id}" title="Un titre">
          <a
            className="af-steps-list-stepLabel"
            href="${defaultProps.step4Href}"
            onClick={onClick}>
            <span className="af-steps-list-stepNumber">
              ${defaultProps.step4Icon !== '' ? `<i className="glyphicon glyphicon-${defaultProps.step4Icon}"></i>` : ''}       
            </span>
            <span className="af-steps-list-stepTitle">${defaultProps.step4Title}</span>
          </a>
        </StepBase>
        <Step id="${defaultProps.step5Id}" title="${defaultProps.step5Title}"  mode="${defaultProps.step5Mode}" />
      </Steps>     
      `),
    );
  });
});
