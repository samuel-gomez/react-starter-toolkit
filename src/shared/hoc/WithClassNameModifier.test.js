import { render } from '@testing-library/react';
import WithClassNameModifier from './WithClassNameModifier';

const CustomComponent = ({ className }) => <div className={className}>Hello</div>;

describe('WithClassNameModifier', () => {
  it('Should render Custom Component with new className props when apply HOC with className', () => {
    const EnhancedComponent = WithClassNameModifier(CustomComponent);
    const { asFragment } = render(<EnhancedComponent className="af-component" classModifier="sam" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render Custom Component with new className props with 2 modifiers when apply HOC with className with 2 modifiers', () => {
    const EnhancedComponent = WithClassNameModifier(CustomComponent);
    const { asFragment } = render(<EnhancedComponent className="af-component" classModifier="sam sam2" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render Custom Component with new className props null modifier when apply HOC with className null modifier', () => {
    const EnhancedComponent = WithClassNameModifier(CustomComponent);
    const { asFragment } = render(<EnhancedComponent className="af-component" classModifier={null} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
