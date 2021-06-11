import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { emptyFunction } from 'shared/testsUtils';
import SearchFormContainer, { setOnSubmitSearchForm } from './SearchForm.container';

const defaultProps = {
  submitSearchForm: jest.fn(),
};

describe('SearchFormContainer', () => {
  it('Render <SearchFormContainer/>', () => {
    const { asFragment } = render(<SearchFormContainer {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('useSearchFormFn and setConfirmClassModifierFn when Render <SearchFormContainer/>', () => {
    const useSearchFormFnMock = jest.fn().mockReturnValue({
      onChangeSearchForm: emptyFunction,
      stateSearchForm: {
        hasErrors: true,
        fields: {
          name: { name: 'name', value: '', message: null },
        },
      },
    });
    const setConfirmClassModifierFnMock = jest.fn().mockReturnValue('confirmClassModifier');
    const setOnSubmitSearchFormFnMock = jest.fn().mockReturnValue(emptyFunction);

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
  });
});

describe('setOnSubmitSearchForm', () => {
  it('Should call submitSearchForm with fields values When called with fields', () => {
    const submitSearchFormMock = jest.fn();

    setOnSubmitSearchForm({
      submitSearchForm: submitSearchFormMock,
      fields: {
        name: { name: 'name', value: 'valuename', message: null },
      },
    })();

    expect(submitSearchFormMock).toBeCalledWith({
      name: 'valuename',
    });
  });
});
