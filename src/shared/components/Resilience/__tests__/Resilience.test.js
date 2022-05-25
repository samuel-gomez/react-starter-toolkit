import { render } from '@testing-library/react';
import Resilience from '../Resilience';

describe('Resilience', () => {
  it('Should return Wrapped Component When use component Resilience and not exist anomaly', () => {
    const CustomComponent = () => <div>No anomaly</div>;
    const baseProps = { loaderMode: 'none' };
    const EnhancedComponent = () => (
      <Resilience>
        <CustomComponent {...baseProps} />
      </Resilience>
    );
    const { getByText } = render(<EnhancedComponent />);
    expect(getByText('No anomaly')).toBeDefined();
  });
  it('Should return Resilience with props When use HOC withResilience and anomaly', () => {
    const CustomComponent = () => <div>No Anomaly</div>;
    const ErrorComponent = () => <div>There is an error</div>;
    CustomComponent.displayName = 'CustomName';
    const baseProps = { loaderMode: 'none' };
    const EnhancedComponent = () => (
      <Resilience anomaly={{ code: 500 }} resilienceMode="fallback" FallbackComponent={ErrorComponent}>
        <CustomComponent {...baseProps} />
      </Resilience>
    );
    const { getByText } = render(<EnhancedComponent />);
    expect(getByText('There is an error')).toBeDefined();
  });
});
