import { render } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { FieldEditor, mergePropsAndKnobs, withEditor, setValue, useEditable } from '../Editor';

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
  };

  it('Should logEventFn have been called when onClick have been called', () => {
    const logEventFn = jest.fn();
    const { result } = renderHook(() => useEditable({ initialState, logEventFn }));
    act(() => result.current.onClick({ id: 'id' }));
    expect(logEventFn).toHaveBeenCalledWith('click button event', { id: 'id' });
  });

  it('Should setValueFn have been called and return updated state when onChange have been called with event', () => {
    const setValueFn = jest.fn().mockReturnValue('setted value');
    const { result } = renderHook(() => useEditable({ initialState, setValueFn }));
    act(() => result.current.onChange('classModifier')({ value: 'newvalue' }));
    expect(setValueFn).toHaveBeenCalledWith('newvalue');
    expect(result.current.state.classModifier).toEqual('setted value');
  });
});

describe('withEditor', () => {
  type Props = { className?: string; onChange: ReturnType<typeof useEditable>['onChange'] };
  const Component = ({ className }: Props) => <div className={className}>Hello</div>;
  const ComponentWithEditor = withEditor<Props>(Component);
  const onChange = jest.fn();

  it('Should render Component with FormEditor when apply withEditor HOC', () => {
    const { asFragment } = render(<ComponentWithEditor className="af-component" onChange={onChange} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
