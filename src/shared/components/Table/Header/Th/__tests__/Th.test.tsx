import { renderWithContainer } from 'shared/testsUtils';
import Th from '../Th';

const container = document.createElement('tr');

describe('Th', () => {
  it('Render <Th/>', () => {
    const { baseElement } = renderWithContainer(<Th>child th</Th>, container);
    expect(baseElement).toMatchSnapshot();
  });

  it('Render <Th/> with modifier', () => {
    const { baseElement } = renderWithContainer(<Th classModifier="custom">child th</Th>, container);
    expect(baseElement).toMatchSnapshot();
  });
});
