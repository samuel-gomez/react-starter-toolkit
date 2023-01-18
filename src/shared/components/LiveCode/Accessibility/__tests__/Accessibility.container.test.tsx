import { render } from '@testing-library/react';
import AccessibilityContainer from '../Accessibility.container';
import { useAxe } from '../Accessibility.hook';

const ariaLabelMock = '';

const returnUseAxe = {
  errors: undefined,
  results: {
    violations: [
      {
        description: 'test',
        help: 'test',
        helpUrl: 'url',
        impact: 'critical',
        tags: ['tag1'],
        id: 'id-test',
      },
    ],
    passes: [],
    incomplete: [],
  },
} as unknown as ReturnType<typeof useAxe>;

const useAxeFnMock = () => returnUseAxe;

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
