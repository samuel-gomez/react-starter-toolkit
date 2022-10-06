import { render } from '@testing-library/react';
import Templates from '..';

const defaultProps = {
  submitTemplate: jest.fn(),
  onClearCodeEditor: jest.fn(),
};

describe('<Templates/>', () => {
  it('Should render Templates', () => {
    const { asFragment } = render(<Templates {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
