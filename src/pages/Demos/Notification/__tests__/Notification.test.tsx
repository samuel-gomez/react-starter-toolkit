import { emptyFunction, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import NotificationPage from '../Notification';

const defaultProps = {
  notifyError: emptyFunction,
  notifySuccess: emptyFunction,
  notifyWarning: emptyFunction,
  titleBar: 'titlebar',
  title: 'titre',
};

describe('<NotificationPage/>', () => {
  it('Should render NotificationPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<NotificationPage {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
