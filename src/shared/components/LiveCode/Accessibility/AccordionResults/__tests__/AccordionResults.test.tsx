import { render } from '@testing-library/react';
import { Result } from 'axe-core';
import AccordionResults from '../AccordionResults';

const resultsFnMock = [
  {
    description: 'test',
    help: 'test',
    helpUrl: 'url',
    impact: 'critical',
    tags: ['tag1'],
    id: 'id-test',
  },
];

describe('<AccordionResults />', () => {
  it('Render <AccordionResults /> with results', () => {
    const { asFragment } = render(<AccordionResults results={resultsFnMock as Result[]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
