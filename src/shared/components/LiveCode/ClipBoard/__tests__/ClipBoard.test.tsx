import { act, render, renderHook } from '@testing-library/react';
import ClipBoard, { useClipBoard } from '..';

describe('<ClipBoard/>', () => {
  it('Should render ClipBoard', () => {
    const { asFragment } = render(<ClipBoard content="<p>info</p>" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render ClipBoard with clicked classModifier', () => {
    const useClipBoardFn = jest.fn().mockReturnValue({ click: jest.fn(), clicked: true });
    const { asFragment } = render(<ClipBoard content="<p>info</p>" useClipBoardFn={useClipBoardFn} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('useClipBoard', () => {
  const content = 'content';
  const writeText = jest.fn();
  Object.assign(navigator, {
    clipboard: {
      writeText,
    },
  });

  it('Should call writeText method of navigator.clipboard when onClick method of useClipBoard have been called with content', () => {
    const { result } = renderHook(() => useClipBoard({ content }));
    jest.spyOn(navigator.clipboard, 'writeText');
    jest.useFakeTimers();
    act(() => result.current.onClick());
    expect(result.current.clicked).toEqual(true);
    expect(writeText).toHaveBeenCalledWith(content);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.clicked).toEqual(false);
  });
});
