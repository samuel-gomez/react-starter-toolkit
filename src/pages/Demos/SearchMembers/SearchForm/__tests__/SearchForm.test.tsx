import { useForm, useController } from 'react-hook-form';
import { render } from '@testing-library/react';
import SearchForm, { onChangeValue, InputCustom } from '../SearchForm';
import { FormValues } from '../SearchForm.container';

describe('SearchForm', () => {
  it('Render <SearchForm />', () => {
    const WrapperSearchForm = () => {
      const { control } = useForm<FormValues>();
      const defaultProps = {
        className: 'af-filter-inline',
        hasErrors: false,
        handleSubmit: jest.fn(),
        onSubmit: jest.fn(),
        confirmClassModifier: 'confirm success',
        control,
      };

      return <SearchForm {...defaultProps} />;
    };

    const { asFragment } = render(<WrapperSearchForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('InputCustom', () => {
  it('Render <InputCustom />', () => {
    const WrapperSearchForm = () => {
      const { formState, control } = useForm<FormValues>();
      const { field } = useController<FormValues>({ name: 'name', control });
      const defaultProps = {
        field,
        formState,
      };

      return <InputCustom {...defaultProps} />;
    };

    const { asFragment } = render(<WrapperSearchForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('onChangeValue', () => {
  it('Should called onChange', () => {
    const field = {
      onChange: jest.fn(),
    };
    onChangeValue(field)({ value: 'test' });
    expect(field.onChange).toBeCalledWith('test');
  });
});
