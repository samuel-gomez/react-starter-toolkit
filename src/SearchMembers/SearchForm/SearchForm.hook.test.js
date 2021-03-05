import { renderHook, act } from '@testing-library/react-hooks';
import { NAME } from './constants';
import { useSearchForm, initStateSearchForm, setOnChangeSearchForm } from './SearchForm.hook';

describe('useSearchForm', () => {
  it('Should return stateSearchForm, onChangeSearchForm when useSearchForm called', () => {
    const { result } = renderHook(() => useSearchForm({}));

    const expected = {
      stateSearchForm: initStateSearchForm,
      onChangeSearchForm: result.current.onChangeSearchForm,
    };

    act(() => {
      expect(result.current).toEqual(expected);
    });
  });

  it('Should change name state filter when onChangeSearchForm called', () => {
    const { result } = renderHook(() => useSearchForm({ initStateSearchFormCt: initStateSearchForm }));
    act(() => result.current.onChangeSearchForm({ name: 'name', value: 'samuel' }));
    expect(result.current.stateSearchForm.fields[NAME].value).toEqual('samuel');
  });
});

describe('setOnChangeSearchForm', () => {
  const setStateSearchFormMock = jest.fn();
  it('Should setOnChangeSearchForm called with empty fields when called with { fields: [], hasErrors: true }', () => {
    setOnChangeSearchForm({
      stateSearchForm: {},
      setStateSearchForm: setStateSearchFormMock,
      fields: [],
      event: {
        id: 'name',
        value: 'valuename',
      },
    });
    expect(setStateSearchFormMock).toBeCalledWith({ fields: [], hasErrors: true });
  });
  it('Should setOnChangeSearchForm called with valuename when called with event.id=name and event.value = valuename', () => {
    setOnChangeSearchForm({
      stateSearchForm: {},
      setStateSearchForm: setStateSearchFormMock,
      fields: [
        {
          name: {
            name: 'name',
            value: '',
            message: null,
          },
        },
      ],
      event: {
        name: 'name',
        id: 'name',
        value: 'valuename',
      },
    });
    expect(setStateSearchFormMock).toBeCalledWith({
      fields: {
        0: {
          name: {
            message: null,
            name: 'name',
            value: '',
          },
        },
        name: {
          message: null,
          value: 'valuename',
        },
      },
      hasErrors: true,
    });
  });
});
