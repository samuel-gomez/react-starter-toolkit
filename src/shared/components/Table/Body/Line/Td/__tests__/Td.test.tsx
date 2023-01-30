import { renderWithContainer } from 'shared/testsUtils';
import Td from '../Td';

const defaultProps = {
  children: null,
  label: 'label',
  hover: null,
};
const container = document.createElement('tr');

describe('Td', () => {
  it('Render <Td/> without hover', () => {
    const { asFragment } = renderWithContainer(<Td {...defaultProps}>child th</Td>, container);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Render <Td/> with hover', () => {
    const { asFragment } = renderWithContainer(
      <Td {...defaultProps} hover={<p>Hover content</p>}>
        child td
      </Td>,
      container,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
