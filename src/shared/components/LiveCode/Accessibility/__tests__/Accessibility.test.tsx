import { render } from '@testing-library/react';
import Accessibility from '../Accessibility';
import { TResults } from '../Accessibility.hook';

const resultsFnMock = {
  violations: [
    {
      description: 'test',
      help: 'test',
      helpUrl: 'url',
      impact: 'critical',
      tags: ['tag1'],
      id: 'id-test',
    },
  ],
  passes: [
    {
      description: 'test',
      help: 'test',
      helpUrl: 'url',
      impact: 'critical',
      tags: ['tag1'],
      id: 'id-test',
    },
  ],
  incomplete: [
    {
      description: 'test',
      help: 'test',
      helpUrl: 'url',
      impact: 'critical',
      tags: ['tag1'],
      id: 'id-test',
    },
  ],
} as TResults['results'];

describe('<Accessibility />', () => {
  it('Render <Accessibility /> with results', () => {
    const { asFragment } = render(<Accessibility results={resultsFnMock} />);

    expect(asFragment()).toMatchSnapshot();
  });
  it('Render <Accessibility /> without results', () => {
    const resultsFnMockWithoutResult = {
      violations: [],
      passes: [],
      incomplete: [],
    } as unknown as TResults['results'];
    const { asFragment } = render(<Accessibility results={resultsFnMockWithoutResult} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
