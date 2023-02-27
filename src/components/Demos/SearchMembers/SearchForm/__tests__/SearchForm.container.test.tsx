import { render } from '@testing-library/react';
import SearchFormContainer, { setOnSubmitSearchForm } from '../SearchForm.container';

const SearchFormCmpt = jest.fn();
const onSubmitSearchForm = jest.fn();
const useFormFnMockReturn = {
  handleSubmit: jest.fn(),
  control: {},
};
const defaultProps = {
  submitFormSearchMembers: jest.fn(),
  SearchFormCmpt,
};

describe('SearchFormContainer', () => {
  it('setConfirmClassModifierFn when Render <SearchFormContainer/>', () => {
    const setConfirmClassModifierFnMock = jest.fn().mockReturnValue('confirmClassModifier');
    const setOnSubmitSearchFormFnMock = jest.fn().mockReturnValue(onSubmitSearchForm);
    const useFormFnMock = jest.fn().mockReturnValue({ ...useFormFnMockReturn, formState: { isValid: true }, watch: jest.fn() });

    render(
      <SearchFormContainer
        {...defaultProps}
        setOnSubmitSearchFormFn={setOnSubmitSearchFormFnMock}
        setConfirmClassModifierFn={setConfirmClassModifierFnMock}
        useFormFn={useFormFnMock}
      />,
    );
    expect(setConfirmClassModifierFnMock).toBeCalled();
    expect(setOnSubmitSearchFormFnMock).toBeCalled();
    expect(SearchFormCmpt).toBeCalledWith(
      {
        className: 'af-filter-inline',
        confirmClassModifier: 'confirmClassModifier',
        hasErrors: false,
        onSubmit: onSubmitSearchForm,
        ...useFormFnMockReturn,
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
        name: 'valuename',
      },
    })();

    expect(submitFormSearchMembersMock).toBeCalledWith({
      name: 'valuename',
    });
  });
});
