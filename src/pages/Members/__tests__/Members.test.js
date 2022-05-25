import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import Members from '../Members';
import { defaultProps, membersFormattedMock } from './Members.mock';

describe('<Members/>', () => {
  it('Should render Members', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<Members {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render <Members /> with one member', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<Members {...defaultProps} members={membersFormattedMock} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
