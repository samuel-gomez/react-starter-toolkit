import { act, render, renderHook } from '@testing-library/react';
import { ChangeEvent } from 'react';
import CodeEditor, { useCodeEditor } from '..';

const defaultProps = {
  value: 'value',
  onChange: jest.fn(),
  name: 'name',
  id: 'id',
};

describe('<CodeEditor/>', () => {
  it('Should render CodeEditor', () => {
    const { asFragment } = render(<CodeEditor {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('useCodeEditor', () => {
  const event = {
    preventDefault: jest.fn(),
    target: { value: 'the-new-value' },
  };

  it('Should return notifyError, notifySuccess, notifyWarning useCodeEditor have been called with content', () => {
    const { result } = renderHook(() => useCodeEditor({ ...defaultProps }));
    act(() => result.current.onChangeCodeEditor(event as unknown as ChangeEvent<HTMLTextAreaElement>));
    expect(result.current.code).toEqual('the-new-value');
  });
});
