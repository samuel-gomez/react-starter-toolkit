import { render } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Text } from '@axa-fr/react-toolkit-all';
import { emptyFunction } from 'shared/testsUtils';
import { FieldEditor, mergePropsAndKnobs, withEditor, setValue, useEditable, useToggleEditor, TEvent } from '../Editor';

describe('setValue', () => {
  it.each`
    value      | expected
    ${'true'}  | ${false}
    ${'false'} | ${true}
    ${'value'} | ${'value'}
  `('Should return expected: $expected when value: $value', ({ value, expected }) => {
    const result = setValue(value);
    expect(result).toEqual(expected);
  });
});

describe('mergePropsAndKnobs', () => {
  const otherProps = {
    className: 'af-btn',
    label: 'valider',
    disabled: false,
    icon: '',
  };
  const props = {
    ...otherProps,
    classModifier: 'error',
  };
  const knobs = {
    classModifier: {
      value: '',
      options: [
        {
          label: 'Success',
          value: 'success',
        },
      ],
    },
  };
  const expectedMerge = { ...otherProps, classModifier: { ...knobs.classModifier, value: 'error' } };

  it.each`
    props    | knobs    | expected
    ${{}}    | ${{}}    | ${{}}
    ${props} | ${knobs} | ${expectedMerge}
  `('Should return expected: $expected when props: $props, knobs: $knobs', ({ props, knobs, expected }) => {
    const result = mergePropsAndKnobs({ props, knobs });
    expect(result).toEqual(expected);
  });
});

describe('FieldEditor', () => {
  const onChange = jest.fn();
  it.each`
    value
    ${true}
    ${'value'}
    ${{ value: 'value', options: [] }}
    ${{ value: 'value', type: 'jsx', labelBtnOpenCodeEditor: 'Edit JSX' }}
    ${{ value: 'value', type: 'json', labelBtnOpenCodeEditor: 'Edit Json' }}
    ${emptyFunction}
  `('Should render when value: $value', ({ value }) => {
    const { asFragment } = render(<FieldEditor value={value} name="name" onChange={onChange} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('useEditable', () => {
  const initialState = {
    classModifier: '',
    className: 'af-btn',
    label: 'valider',
    disabled: false,
    icon: '',
    autoFocus: false,
  };

  it('Should logEventFn have been called when onClick have been called', () => {
    const logEventFn = jest.fn();
    const { result } = renderHook(() => useEditable({ initialState, logEventFn }));
    act(() => result.current.onClick('name')({ id: 'id' }));
    expect(logEventFn).toHaveBeenCalledWith('click event', 'name', { id: 'id' });
  });

  it('Should setValueFn have been called and return updated state when onChange have been called with event', () => {
    const setValueFn = jest.fn().mockReturnValue('setted value');
    const { result } = renderHook(() => useEditable({ initialState, setValueFn }));
    act(() => result.current.onChange('classModifier')({ value: 'newvalue' }));
    expect(setValueFn).toHaveBeenCalledWith('newvalue');
    expect(result.current.state.classModifier).toEqual('setted value');
  });

  it('Should set autofocus state to false when onBlur have been called', () => {
    const { result } = renderHook(() => useEditable({ initialState: { autoFocus: true } }));
    act(() => result.current.onBlur());
    expect(result.current.state.autoFocus).toBeFalsy();
  });

  it('Should set autofocus state to true when onBlur have been called', () => {
    const { result } = renderHook(() => useEditable({ initialState: { autoFocus: false } }));
    act(() => result.current.onFocus());
    expect(result.current.state.autoFocus).toBeTruthy();
  });
});

describe('withEditor', () => {
  type Props = { className?: string; onChange: ReturnType<typeof useEditable>['onChange'] };
  const onChange = jest.fn().mockImplementation(name => (e: TEvent) => {
    console.log('onChange');
  });
  const Component = ({ className, onChange }: Props) => (
    <Text id="idtext" name="nametext" type="text" value="hello" onChange={onChange} className={className} />
  );

  it('Should render Component with FormEditor when apply withEditor HOC and isOpenEditor true', () => {
    const useToggleEditorFn = jest.fn().mockReturnValue({
      closeEditor: jest.fn(),
      openEditor: jest.fn(),
      isOpenEditor: true,
    });
    const ComponentWithEditor = withEditor<Props>(Component, {}, useToggleEditorFn);
    const { asFragment } = render(<ComponentWithEditor className="af-component" onChange={onChange} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render Component with FormEditor when apply withEditor HOC', () => {
    const ComponentWithEditor = withEditor<Props>(Component);
    const { asFragment } = render(<ComponentWithEditor className="af-component" onChange={onChange} />);
    expect(asFragment()).toMatchSnapshot();
  });

  const useToggleEditorFnNoOpen = jest.fn().mockReturnValue({
    closeEditor: jest.fn(),
    openEditor: jest.fn(),
    isOpenEditor: false,
  });
  it("Shouldn't render Component with isOpenEditor false", () => {
    const ComponentWithEditor = withEditor<Props>(Component, {}, useToggleEditorFnNoOpen);
    const { asFragment } = render(<ComponentWithEditor className="af-component" onChange={onChange} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('useToggleEditor', () => {
  it('Should isOpenEditor to be false when closeEditor called', () => {
    const { result } = renderHook(() => useToggleEditor());
    act(() => result.current.closeEditor());
    const resIsOpenEditor = result.current.isOpenEditor;
    expect(resIsOpenEditor).toBe(false);
  });

  it('Should isOpenEditor to be true when openEditor called', () => {
    const { result } = renderHook(() => useToggleEditor());
    act(() => result.current.openEditor());
    const resIsOpenEditor = result.current.isOpenEditor;
    expect(resIsOpenEditor).toBe(true);
  });
});
