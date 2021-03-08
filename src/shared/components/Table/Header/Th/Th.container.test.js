import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThContainer from './Th.container';

const defaultProps = {
  children: null,
  field: '',
};
const container = document.createElement('tr');

const renderWithContainer = Component =>
  render(<Component />, {
    container: document.body.appendChild(container),
  });

describe('ThContainer', () => {
  it('Render <ThContainer/> with field empty (not sortable)', () => {
    const { asFragment } = renderWithContainer(() => <ThContainer {...defaultProps}>child th</ThContainer>);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Render <ThContainer/> with field not empty (sortable)', () => {
    const { asFragment } = renderWithContainer(() => (
      <ThContainer {...defaultProps} field="myfield" sorting={{ field: 'name', order: true }}>
        child th
      </ThContainer>
    ));
    expect(asFragment()).toMatchSnapshot();
  });
});
