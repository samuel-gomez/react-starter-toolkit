import React from 'react';
import { render } from '@testing-library/react';
import Line from '../Line';

const defaultProps = {
  classComponent: 'classComponent',
  columns: [{ keyCol: 'keyCol1' }],
  actions: null,
  children: null,
};

const container = document.createElement('tbody');

const renderWithContainer = Component =>
  render(<Component />, {
    container: document.body.appendChild(container),
  });

describe('Line', () => {
  it('Render <Line/> without action', () => {
    const { asFragment } = renderWithContainer(() => <Line {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Render <Line/> with action Line', () => {
    const ActionsLine = ({ idKey, ...props }) => (
      <p id={idKey} {...props}>
        action body
      </p>
    );
    const { asFragment } = renderWithContainer(() => <Line {...defaultProps} actions={<ActionsLine idKey="hello" />} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
