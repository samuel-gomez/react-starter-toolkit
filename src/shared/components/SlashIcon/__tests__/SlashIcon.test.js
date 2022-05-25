import { render } from '@testing-library/react';
import SlashIcon from '../index';

describe('<SlashIcon/>', () => {
  it('Should render SlashIcon', () => {
    const { asFragment } = render(<SlashIcon />);
    expect(asFragment()).toMatchSnapshot();
  });
});
