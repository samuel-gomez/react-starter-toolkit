import { render } from '@testing-library/react';
import StorybookIcon from '../index';

describe('<StorybookIcon/>', () => {
  it('Should render StorybookIcon', () => {
    const { asFragment } = render(<StorybookIcon />);
    expect(asFragment()).toMatchSnapshot();
  });
});
