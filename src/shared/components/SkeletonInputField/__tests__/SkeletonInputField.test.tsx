import { render } from '@testing-library/react';
import SkeletonInputField from '..';

describe('<SkeletonInputField/>', () => {
  it('Render <SkeletonInputField/>', () => {
    const { asFragment } = render(<SkeletonInputField label="hello" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
