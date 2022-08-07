import { renderWithContainer } from 'shared/testsUtils';
import Body from '../Body';

const container = document.createElement('table');

describe('Body', () => {
  it('Render <Body/> with empty items', () => {
    const { baseElement } = renderWithContainer(<Body />, container);
    expect(baseElement).toMatchSnapshot();
  });

  const items = [
    {
      key: '5f52a9d04ddf8b6c00052a0a',
      cols: {
        firstname: { label: 'Antonius' },
        lastname: { label: 'Panketh' },
        birthdate: { label: '20/12/1968' },
        sexe: { label: 'F' },
      },
    },
  ];

  it('Render <Body/> with 1 item', () => {
    const { baseElement } = renderWithContainer(<Body items={items} />, container);
    expect(baseElement).toMatchSnapshot();
  });
});
