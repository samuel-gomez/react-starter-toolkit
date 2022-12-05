import { render } from '@testing-library/react';
import TitleTab from '../TitleTab';

const resultsFnMock = [
  {
    description: 'test',
    help: 'test',
    helpUrl: 'url',
    impact: 'critical',
    tags: ['tag1'],
  },
];
describe('<TitleTab />', () => {
  it('Render <AccordionResults /> with results, label, icon', () => {
    const { asFragment } = render(<TitleTab results={resultsFnMock} label="test" icon="ok" />);

    expect(asFragment()).toMatchSnapshot();
  });
});
