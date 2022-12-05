import { renderHook, act } from '@testing-library/react-hooks';
import { AxeResults } from 'axe-core';
import { useAxe, axeRunAccessibility } from '../Accessibility.hook';

const expected = { errors: undefined, results: [] };
const axeRunAccessibilityFnMock = (html: string, setter: ({ errors, results }: { errors: Error; results: AxeResults }) => void) => {
  setter({ ...expected });
};
describe('useAxe', () => {
  it('Should return undefined', () => {
    const { result } = renderHook(() => useAxe({ html: 'label', axeRunAccessibilityFn: axeRunAccessibilityFnMock }));
    act(() => {
      expect(result.current).toEqual(expected);
    });
  });
});

describe('axeRunAccessibility', () => {
  const setterMock = jest.fn();
  const errorMock = new Error('No elements found for include in page Context');
  it('Should return axeRunAccessibility', () => {
    axeRunAccessibility('test', setterMock);
    expect(setterMock).toBeCalledWith({ errors: errorMock, results: undefined });
  });
});
