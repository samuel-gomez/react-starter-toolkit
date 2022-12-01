import { render } from '@testing-library/react';
import EmptyResultsAccessiblity from '../EmptyResultsAccessiblity';

describe('<EmptyResultsAccessiblity />', () => {
  it('Render <EmptyResultsAccessiblity /> with message', () => {
    const { asFragment } = render(<EmptyResultsAccessiblity message="test" />);

    expect(asFragment()).toMatchSnapshot();
  });
});
