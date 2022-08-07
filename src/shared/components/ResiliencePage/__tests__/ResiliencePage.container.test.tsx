import { render } from '@testing-library/react';
import ResiliencePageContainer from '../ResiliencePage.container';

const ResiliencePageCmpt = jest.fn();

const defaultProps = {
  ResiliencePageCmpt,
};
describe('<ResiliencePageContainer />', () => {
  it.each`
    classModifier | expectedClassModifier
    ${undefined}  | ${'resilience-page'}
    ${''}         | ${'resilience-page'}
    ${'sam'}      | ${'resilience-page sam'}
  `(
    'Should render view with expectedClassModifier: $expectedClassModifier when classModifier: $classModifier',
    ({ expectedClassModifier, ...rest }) => {
      render(<ResiliencePageContainer {...defaultProps} {...rest} />);
      expect(ResiliencePageCmpt).toHaveBeenCalledWith(
        {
          classModifier: expectedClassModifier,
        },
        {},
      );
    },
  );
});
