import { render } from '@testing-library/react';
import Icon from '..';

const props = {
  icon: 'date',
} as const;

describe('<Icon/>', () => {
  it('Should render Icon', () => {
    const { asFragment } = render(<Icon {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
