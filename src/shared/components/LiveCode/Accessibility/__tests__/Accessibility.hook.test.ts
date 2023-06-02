import { renderHook, act } from '@testing-library/react';
import { useAxe, axeRunAccessibility, TResults } from '../Accessibility.hook';

const expected = { errors: undefined, results: [] as unknown as TResults['results'] };
const axeRunAccessibilityFnMock = (html: string, setter: ({ errors, results }: TResults) => void) => {
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
