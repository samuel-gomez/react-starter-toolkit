import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchForm from '../SearchForm';

const defaultProps = {
  isDisabled: false,
  onDownload: jest.fn(),
  className: 'af-filter-inline',
  fields: { name: { name: 'name', value: 'sam', message: null } },
  hasErrors: false,
  onSubmit: jest.fn(),
  onChange: jest.fn(),
  confirmClassModifier: 'confirm success',
};

describe('SearchForm', () => {
  it('Render <SearchForm/>', () => {
    const { asFragment } = render(<SearchForm {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
