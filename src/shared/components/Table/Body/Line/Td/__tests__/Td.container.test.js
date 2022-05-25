import { render } from '@testing-library/react';
import TdContainer from '../Td.container';

const defaultProps = {
  children: null,
  label: 'label',
  hover: null,
};
const container = document.createElement('tr');

const renderWithContainer = Component =>
  render(<Component />, {
    container: document.body.appendChild(container),
  });

describe('TdContainer', () => {
  it('Render <TdContainer/> without hover', () => {
    const { asFragment } = renderWithContainer(() => <TdContainer {...defaultProps}>child th</TdContainer>);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Render <TdContainer/> with hover', () => {
    const { asFragment } = renderWithContainer(() => (
      <TdContainer {...defaultProps} hover={<p>Hover content</p>}>
        child td
      </TdContainer>
    ));
    expect(asFragment()).toMatchSnapshot();
  });
});
