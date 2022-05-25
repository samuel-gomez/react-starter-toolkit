import { render } from '@testing-library/react';
import Body from '../Body';

const defaultProps = {
  items: [],
  actions: null,
  children: null,
};

const container = document.createElement('table');

const renderWithContainer = Component =>
  render(<Component />, {
    container: document.body.appendChild(container),
  });

describe('Body', () => {
  it('Render <Body/> with empty items', () => {
    const { asFragment } = renderWithContainer(() => <Body {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  const items = [
    {
      key: 'uid',
      name: {
        label: 'samuel',
      },
    },
  ];

  it('Render <Body/> with 1 item', () => {
    const { asFragment } = renderWithContainer(() => <Body {...defaultProps} items={items} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Render <Body/> with 1 header and 1 item and actions Body', () => {
    const actionsBody = ({ idKey, ...props }) => (
      <p id={idKey} {...props}>
        action body
      </p>
    );
    const { asFragment } = renderWithContainer(() => <Body {...defaultProps} items={items} actions={actionsBody} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
