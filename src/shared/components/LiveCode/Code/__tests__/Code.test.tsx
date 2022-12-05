import { render } from '@testing-library/react';
import vsDark from 'prism-react-renderer/themes/vsDark';
import Code from '../Code';

describe('<Code />', () => {
  it('Render <Code /> with theme, code', () => {
    const { asFragment } = render(<Code theme={vsDark} code="test" />);

    expect(asFragment()).toMatchSnapshot();
  });
});
