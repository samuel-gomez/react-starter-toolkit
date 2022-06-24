import { render } from '@testing-library/react';
import Resilience from '../Resilience';

describe('Resilience', () => {
  const CustomComponent = () => <div>No anomaly</div>;

  const resilienceProps = {
    resilienceModifier: '',
  };

  it('Should render null when Resilience have been called with no anomaly and no child', () => {
    const EnhancedComponent = () => <Resilience {...resilienceProps} />;
    const { asFragment } = render(<EnhancedComponent />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render child Component when Resilience have been called with no anomaly and child', () => {
    const EnhancedComponent = () => (
      <Resilience {...resilienceProps}>
        <CustomComponent />
      </Resilience>
    );
    const { getByText } = render(<EnhancedComponent />);
    expect(getByText('No anomaly')).toBeDefined();
  });

  it('Should render FallbackComponent when Resilience have been called with anomaly and FallbackComponent', () => {
    const ErrorComponent = () => <div>There is an error</div>;
    const anomaly = {
      label: 'error label',
    };

    const EnhancedComponent = () => (
      <Resilience {...resilienceProps} resilienceMode="fallback" FallbackComponent={ErrorComponent} anomaly={anomaly}>
        <CustomComponent />
      </Resilience>
    );
    const { getByText } = render(<EnhancedComponent />);
    expect(getByText('There is an error')).toBeDefined();
  });
});
