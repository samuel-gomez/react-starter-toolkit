import { renderWithContainer } from 'shared/testsUtils';
import Td from '../Td';

const defaultProps = {
  children: null,
};
const container = document.createElement('tr');

describe('Td', () => {
  it('Render <Td/>', () => {
    const { baseElement } = renderWithContainer(<Td {...defaultProps}>child td</Td>, container);
    expect(baseElement).toMatchSnapshot();
  });

  it('Render <Td/> with modifier', () => {
    const { baseElement } = renderWithContainer(
      <Td {...defaultProps} classModifier="custom">
        child td
      </Td>,
      container,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
