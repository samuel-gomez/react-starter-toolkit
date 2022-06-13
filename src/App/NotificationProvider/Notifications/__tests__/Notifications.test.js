import { render, fireEvent, screen } from '@testing-library/react';
import { emptyFunction } from 'shared/testsUtils';
import Notifications from '../Notifications';

const defaultProps = {
  notifications: [],
  deleteNotification: emptyFunction,
};

describe('Notifications', () => {
  it('Render <Notifications/>', () => {
    const { asFragment } = render(<Notifications {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should contain Notification when array notifications is NOT empty', () => {
    const notifications = [{ id: 'id', title: 'titleerror', classModifier: '', onClose: emptyFunction }];
    const { asFragment, getByText } = render(<Notifications {...defaultProps} notifications={notifications} />);
    expect(getByText('titleerror')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should called onDeleteNotification with id When click on close button', () => {
    const deleteNotificationMock = jest.fn();
    const notifications = [{ id: 'id', title: 'title' }];
    render(<Notifications {...defaultProps} notifications={notifications} deleteNotification={deleteNotificationMock} />);
    fireEvent.click(screen.getByRole('button'));
    expect(deleteNotificationMock).toBeCalledWith('id');
  });
});
