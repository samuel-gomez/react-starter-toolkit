import { render } from '@testing-library/react';
import withClassNameModifier from './WithClassNameModifier';

const CustomComponent = ({ className }: { className?: string }) => <div className={className}>Hello</div>;

describe('WithClassNameModifier', () => {
  const EnhancedComponent = withClassNameModifier(CustomComponent);
  it('Should render Custom Component with new className props when apply HOC with className', () => {
    const { asFragment } = render(<EnhancedComponent className="af-component" classModifier="sam" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render Custom Component with new className props with 2 modifiers when apply HOC with className with 2 modifiers', () => {
    const { asFragment } = render(<EnhancedComponent className="af-component" classModifier="sam sam2" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render Custom Component with new className props null modifier when apply HOC with className null modifier', () => {
    const { asFragment } = render(<EnhancedComponent className="af-component" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render Custom Component without className props when apply HOC with className null modifier', () => {
    const { asFragment } = render(<EnhancedComponent />);
    expect(asFragment()).toMatchSnapshot();
  });
});
