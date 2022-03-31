import React from 'react';
import { render } from '@testing-library/react';
import LineContainer from '../Line.container';

const defaultProps = {
  actions: null,
  children: null,
  idKey: 'uniqueid',
  cols: {},
};

const container = document.createElement('tbody');

const renderWithContainer = Component =>
  render(<Component />, {
    container: document.body.appendChild(container),
  });

describe('LineContainer', () => {
  it('Render <LineContainer/> without cols', () => {
    const { asFragment } = renderWithContainer(() => <LineContainer {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Render <LineContainer/> with cols and actions', () => {
    const ActionsLineContainer = ({ idKey, ...props }) => (
      <p id={idKey} {...props}>
        action body
      </p>
    );
    const { asFragment } = renderWithContainer(() => (
      <LineContainer
        {...defaultProps}
        cols={{
          name: {
            label: 'samuel',
          },
          phone: {
            label: '0606060606',
          },
        }}
        actions={ActionsLineContainer}
      />
    ));
    expect(asFragment()).toMatchSnapshot();
  });
});
