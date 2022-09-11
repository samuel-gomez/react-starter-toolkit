import { renderHook, act } from '@testing-library/react-hooks';
import { NAME } from '../constants';
import { useSearchForm, initStateSearchForm, setOnChangeSearchForm } from '../SearchForm.hook';

describe('useSearchForm', () => {
  it('Should return stateSearchForm, onChangeSearchForm when useSearchForm called', () => {
    const { result } = renderHook(() => useSearchForm({}));

    const expected = {
      ...initStateSearchForm,
      onChangeSearchForm: result.current.onChangeSearchForm,
    };

    act(() => {
      expect(result.current).toEqual(expected);
    });
  });

  it('Should change name state filter when onChangeSearchForm called', () => {
    const { result } = renderHook(() => useSearchForm({ initStateSearchFormCt: initStateSearchForm }));
    act(() => result.current.onChangeSearchForm({ name: 'name', value: 'samuel' }));
    expect(result.current.fields[NAME].value).toEqual('samuel');
  });
});

describe('setOnChangeSearchForm', () => {
  const setStateSearchForm = jest.fn();
  const stateSearchFormMock = { hasErrors: true, fields: {} };
  const genericHandleChangeFn = jest.fn();
  const event = {
    id: 'name',
    name: 'name',
    value: 'valuename',
  };

  const setReturnFields = (value = '') => ({
    name: {
      name: 'name',
      value,
      message: null,
    },
  });

  it.each`
    fields | stateSearchForm        | event    | genericHandleChangeReturnValue | expected
    ${{}}  | ${stateSearchFormMock} | ${event} | ${{}}                          | ${{ fields: {}, hasErrors: true }}
    ${{}}  | ${stateSearchFormMock} | ${event} | ${setReturnFields()}           | ${{ fields: setReturnFields(), hasErrors: true }}
    ${{}}  | ${stateSearchFormMock} | ${event} | ${setReturnFields('sam')}      | ${{ fields: setReturnFields('sam'), hasErrors: false }}
  `(
    'Should return expected: $expected when computeSuccess have neen called with stateSearchForm: $stateSearchForm, fields: $fields, event: $event, genericHandleChangeReturnValue: $genericHandleChangeReturnValue',
    ({ fields, event, stateSearchForm, expected, genericHandleChangeReturnValue }) => {
      genericHandleChangeFn.mockReturnValue(genericHandleChangeReturnValue);
      setOnChangeSearchForm({
        genericHandleChangeFn,
        stateSearchForm,
        setStateSearchForm,
        fields,
        event,
      });
      expect(setStateSearchForm).toBeCalledWith(expected);
    },
  );
});
