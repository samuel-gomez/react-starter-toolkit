import { render } from '@testing-library/react';
import Accessibility from '../Accessibility';

const resultsFnMock = {
  violations: [
    {
      description: 'test',
      help: 'test',
      helpUrl: 'url',
      impact: 'critical',
      tags: ['tag1'],
    },
  ],
  passes: [
    {
      description: 'test',
      help: 'test',
      helpUrl: 'url',
      impact: 'critical',
      tags: ['tag1'],
    },
  ],
  incomplete: [
    {
      description: 'test',
      help: 'test',
      helpUrl: 'url',
      impact: 'critical',
      tags: ['tag1'],
    },
  ],
};
describe('<Accessibility />', () => {
  it('Render <Accessibility /> with results', () => {
    const { asFragment } = render(<Accessibility results={resultsFnMock} />);

    expect(asFragment()).toMatchSnapshot();
  });
  it('Render <Accessibility /> without results', () => {
    const resultsFnMock = {
      violations: [],
      passes: [],
      incomplete: [],
    };
    const { asFragment } = render(<Accessibility results={resultsFnMock} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
