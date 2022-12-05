import { render } from '@testing-library/react';
import AccessibilityContainer from '../Accessibility.container';

const ariaLabelMock = '';
const useAxeFnMock = () => ({
  errors: undefined,
  results: {
    violations: [
      {
        description: 'test',
        help: 'test',
        helpUrl: 'url',
        impact: 'critical',
        tags: ['tag1'],
      },
    ],
    passes: [],
    incomplete: [],
  },
});
describe('<AccessibilityContainer />', () => {
  it('Render <AccessibilityContainer /> with ariaLabel and useAxeFn', () => {
    const { asFragment } = render(<AccessibilityContainer ariaLabel={ariaLabelMock} useAxeFn={useAxeFnMock} />);

    expect(asFragment()).toMatchSnapshot();
  });
  it('Render <AccessibilityContainer /> with ariaLabel', () => {
    const { asFragment } = render(<AccessibilityContainer ariaLabel={ariaLabelMock} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
