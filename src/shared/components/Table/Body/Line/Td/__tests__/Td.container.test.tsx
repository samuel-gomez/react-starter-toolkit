import { renderWithContainer } from 'shared/testsUtils';
import TdContainer from '../Td.container';

const defaultProps = {
  children: null,
  label: 'label',
  hover: null,
};
const container = document.createElement('tr');

describe('TdContainer', () => {
  it('Render <TdContainer/> without hover', () => {
    const { asFragment } = renderWithContainer(<TdContainer {...defaultProps}>child th</TdContainer>, container);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Render <TdContainer/> with hover', () => {
    const { asFragment } = renderWithContainer(
      <TdContainer {...defaultProps} hover={<p>Hover content</p>}>
        child td
      </TdContainer>,
      container,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
