import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Th from './Th';

const defaultProps = {
  children: null,
};
const container = document.createElement('tr');

const renderWithContainer = Component =>
  render(<Component />, {
    container: document.body.appendChild(container),
  });

describe('Th', () => {
  it('Render <Th/>', () => {
    const { asFragment } = renderWithContainer(() => <Th {...defaultProps} >child th</Th>);
    expect(asFragment()).toMatchSnapshot();
  });
  
});
