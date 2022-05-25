import { render } from '@testing-library/react';
import Td from '../Td';

const defaultProps = {
  children: null,
};
const container = document.createElement('tr');

const renderWithContainer = Component =>
  render(<Component />, {
    container: document.body.appendChild(container),
  });

describe('Td', () => {
  it('Render <Td/>', () => {
    const { asFragment } = renderWithContainer(() => <Td {...defaultProps}>child td</Td>);
    expect(asFragment()).toMatchSnapshot();
  });
});
