import { act, render, renderHook } from '@testing-library/react';
import { ChangeEvent } from 'react';
import { clearString } from 'shared/testsUtils';
import CodeEditor, { useCodeEditor, getTemplate } from '..';

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
    target: { value: '<p>the-new-value</p>' },
  };

  it('Should update code state when onChangeCodeEditor have been called with event that contain new value', () => {
    const { result } = renderHook(() => useCodeEditor({ ...defaultProps }));
    act(() => result.current.onChangeCodeEditor(event as unknown as ChangeEvent<HTMLTextAreaElement>));
    expect(result.current.code).toEqual('<p>the-new-value</p>');
  });

  it('Should update code state when onAddTemplateEditor have been called with event that contain new value', () => {
    const { result } = renderHook(() => useCodeEditor({ ...defaultProps, value: '<p>code</p>' }));
    act(() => result.current.onAddTemplateEditor(event as unknown as ChangeEvent<HTMLTextAreaElement>));
    expect(result.current.code).toEqual('<p>code</p><p>the-new-value</p>');
  });

  it('Should update code state when onClearCodeEditor have been called', () => {
    const { result } = renderHook(() => useCodeEditor({ ...defaultProps, initialState: { name: 'name', hasSubmit: true } }));
    act(() => result.current.onClearCodeEditor());
    expect(result.current.template).toEqual({ name: '', hasSubmit: false });
  });

  it('Should update template state when submitTemplate have been called with event that contain id', () => {
    const { result } = renderHook(() => useCodeEditor({ ...defaultProps }));
    act(() => result.current.submitTemplate({ id: 'myid' }));
    expect(result.current.template.name).toEqual('myid');
  });

  it('Should update template state when submitTemplate have been called with event that not contain id', () => {
    const { result } = renderHook(() => useCodeEditor({ ...defaultProps }));
    act(() => result.current.submitTemplate({}));
    expect(result.current.template.name).toEqual('');
  });

  it('Should import file when state template hasSubmit and name not empty', async () => {
    const getTemplateFn = jest.fn().mockImplementation(() => Promise.resolve({ text: '<p>mytemplate</p>' }));
    const { result } = renderHook(() =>
      useCodeEditor({ ...defaultProps, value: '<p>initialcode</p>', initialState: { name: 'add-input__text', hasSubmit: true }, getTemplateFn }),
    );

    await act(async () => {
      expect(result.current.code).toEqual('<p>initialcode</p>');
    });
    expect(clearString(result.current.code)).toEqual(`<p>initialcode</p><p>mytemplate</p>`);
  });
});

describe('getTemplate', () => {
  it('Should load import file when getTemplate have been called', async () => {
    const result = await getTemplate('add-text');
    expect(clearString(result.default)).toEqual(
      clearString(
        `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis voluptatem tempore beatae magnam similique fugit consectetur? Itaque culpa dolor delectus quas doloribus labore? Eius aspernatur ex eligendi molestias veritatis quisquam.</p>`,
      ),
    );
  });
});
