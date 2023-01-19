import { render } from '@testing-library/react';
import ResilienceSubstitut, { setClassModifier, setClassName } from '../ResilienceSubstitut';

describe('<ResilienceSubstitut/>', () => {
  const defaultProps = {
    anomaly: {
      label: 'label',
      detail: 'detail',
    },
  };

  it('Render <ResilienceSubstitut/> with default props and return Alert resilience', () => {
    const { asFragment, getByText, container } = render(<ResilienceSubstitut {...defaultProps} />);
    expect(getByText('label')).toBeDefined();
    expect(getByText('detail')).toBeDefined();
    expect(container.querySelector('.glyphicon-exclamation-sign')).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Render <ResilienceSubstitut/> with default props and refetchMock', () => {
    const refetchMock = jest.fn();
    const { asFragment, getByText } = render(<ResilienceSubstitut {...defaultProps} refetch={refetchMock} />);
    expect(getByText('Réessayer')).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Render <ResilienceSubstitut/> with classModifier="simple" and return Alert resilience with simple classModifier', () => {
    const customProps = { ...defaultProps, classModifier: 'simple', anomaly: { ...defaultProps.anomaly, iconName: 'icon2', type: 'warning' } };
    const { asFragment, getByText, container } = render(<ResilienceSubstitut {...customProps} />);
    expect(getByText('label')).toBeDefined();
    expect(getByText('detail')).toBeDefined();
    expect(container.querySelector('.af-alert--warning')).toBeDefined();
    expect(container.querySelector('.glyphicon-icon2')).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Render <ResilienceSubstitut/> with resilienceMode="none" and return {}', () => {
    const { container } = render(<ResilienceSubstitut {...defaultProps} resilienceMode="none" />);
    expect(container.firstChild).toBeNull();
  });

  it('Render <ResilienceSubstitut/> with resilienceMode="fallback" and FallBackComponent = Custom and Should contain Custom element', () => {
    const Custom = () => <div>FallbackComponent</div>;
    const { asFragment, getByText } = render(<ResilienceSubstitut {...defaultProps} resilienceMode="fallback" FallbackComponent={Custom} />);
    expect(getByText('FallbackComponent')).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('setClassModifier', () => {
  it('Should return "error" when setClassModifier called type="error" and resilienceModifier=""', () => {
    const result = setClassModifier({ type: 'error', resilienceModifier: '' });
    const expected = 'error';
    expect(result).toEqual(expected);
  });

  it('Should return "error mymodifier" when setClassModifier called type="error" and resilienceModifier="mymodifier"', () => {
    const result = setClassModifier({ type: 'error', resilienceModifier: 'mymodifier' });
    const expected = 'error mymodifier';
    expect(result).toEqual(expected);
  });
});

describe('setClassName', () => {
  it('Should return "af-alert" when setClassName called with resilienceModifier=""', () => {
    const result = setClassName({ resilienceModifier: '' });
    expect(result).toEqual('af-alert');
  });

  it('Should return "container af-alert" when setClassName called with resilienceModifier="container"', () => {
    const result = setClassName({ resilienceModifier: 'container' });
    const expected = 'container af-alert';
    expect(result).toEqual(expected);
  });
});
