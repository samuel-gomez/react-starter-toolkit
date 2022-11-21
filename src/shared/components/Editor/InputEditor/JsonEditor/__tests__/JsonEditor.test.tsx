import { act, render, renderHook } from '@testing-library/react';
import { ChangeEvent } from 'react';
import JsonEditor, { useJsonEditor } from '..';

const onChange = jest.fn();
const defaultProps = {
  onChange,
  value: 'value',
  name: 'name',
  id: 'id',
};

describe('<JsonEditor/>', () => {
  it('Should render JsonEditor', () => {
    const { asFragment } = render(<JsonEditor {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('useJsonEditor', () => {
  const event = {
    preventDefault: jest.fn(),
    target: {
      value: `[
      {
        "label": "Prénom",
        "id": "firstname"
      }
    ]`,
    },
  };

  it('Should update code state when onChangeJsonEditor have been called with event that contain new value', () => {
    const { result } = renderHook(() => useJsonEditor({ ...defaultProps }));
    act(() => result.current.onChangeJsonEditor(event as unknown as ChangeEvent<HTMLTextAreaElement>));
    expect(result.current.code).toEqual(JSON.parse(event.target.value));

    expect(onChange).toHaveBeenCalledWith({ value: JSON.parse(event.target.value), name: 'name', id: 'id' });
  });
});
