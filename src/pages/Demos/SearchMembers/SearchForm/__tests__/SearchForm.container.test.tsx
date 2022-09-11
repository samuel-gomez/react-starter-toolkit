import { render } from '@testing-library/react';
import SearchFormContainer, { setOnSubmitSearchForm } from '../SearchForm.container';

const SearchFormCmpt = jest.fn();
const onChangeSearchForm = jest.fn();
const onSubmitSearchForm = jest.fn();
const defaultProps = {
  submitFormSearchMembers: jest.fn(),
  SearchFormCmpt,
};

describe('SearchFormContainer', () => {
  it('useSearchFormFn and setConfirmClassModifierFn when Render <SearchFormContainer/>', () => {
    const useSearchFormFnMock = jest.fn().mockReturnValue({
      onChangeSearchForm,
      hasErrors: true,
      fields: {
        name: { name: 'name', value: '', message: null },
      },
    });
    const setConfirmClassModifierFnMock = jest.fn().mockReturnValue('confirmClassModifier');
    const setOnSubmitSearchFormFnMock = jest.fn().mockReturnValue(onSubmitSearchForm);

    render(
      <SearchFormContainer
        {...defaultProps}
        setOnSubmitSearchFormFn={setOnSubmitSearchFormFnMock}
        useSearchFormFn={useSearchFormFnMock}
        setConfirmClassModifierFn={setConfirmClassModifierFnMock}
      />,
    );
    expect(useSearchFormFnMock).toBeCalled();
    expect(setConfirmClassModifierFnMock).toBeCalled();
    expect(setOnSubmitSearchFormFnMock).toBeCalled();
    expect(SearchFormCmpt).toBeCalledWith(
      {
        className: 'af-filter-inline',
        confirmClassModifier: 'confirmClassModifier',
        fields: {
          name: { name: 'name', value: '', message: null },
        },
        hasErrors: true,
        onChange: onChangeSearchForm,
        onSubmit: onSubmitSearchForm,
      },
      {},
    );
  });
});

describe('setOnSubmitSearchForm', () => {
  it('Should call submitFormSearchMembers with fields values When called with fields', () => {
    const submitFormSearchMembersMock = jest.fn();

    setOnSubmitSearchForm({
      submitFormSearchMembers: submitFormSearchMembersMock,
      fields: {
        name: { name: 'name', value: 'valuename', message: null },
      },
    })();

    expect(submitFormSearchMembersMock).toBeCalledWith({
      name: 'valuename',
    });
  });
});
