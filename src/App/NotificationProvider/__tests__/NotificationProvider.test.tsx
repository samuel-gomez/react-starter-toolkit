import { useContext } from 'react';
import { render } from '@testing-library/react';
import NotificationProvider, { NotificationContext } from '../NotificationProvider';
import type { TNotificationContext } from '../NotificationProvider';
import useNotifications from '../Notifications.hook';

const Base = ({ addNotification }: TNotificationContext) => {
  addNotification({ id: '02', label: 'title2' });
  return (
    <ul>
      <li>have addNotification</li>
    </ul>
  );
};

const BaseWithNotification = () => {
  const notificationProps = useContext(NotificationContext);
  return <Base {...notificationProps} />;
};
const addNotificationMock = jest.fn();
const onDeleteNotificationMock = jest.fn();

const App = ({ useNotificationsFn }: { useNotificationsFn: typeof useNotifications }) => (
  <NotificationProvider useNotificationsFn={useNotificationsFn}>
    <BaseWithNotification />
  </NotificationProvider>
);

describe('Render App with Base have addNotification props', () => {
  it('Should Base have fetchCustom props when call setFetchCustom', () => {
    const useNotificationsMock = jest.fn().mockReturnValue({
      addNotification: addNotificationMock,
      onDeleteNotification: onDeleteNotificationMock,
      stateNotifications: [],
    });
    const { asFragment, getByText } = render(<App useNotificationsFn={useNotificationsMock} />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByText('have addNotification')).toBeDefined();
  });

  it('Should Base have fetchCustom props when call setFetchCustom with 1 notification', () => {
    const notification = {
      code: 200,
      detail: 'detail',
      label: 'labeldemonalert',
      id: 'id',
    };

    const useNotificationsMock = jest.fn().mockReturnValue({
      addNotification: addNotificationMock,
      onDeleteNotification: onDeleteNotificationMock,
      stateNotifications: [notification],
    });

    const { asFragment, getByText, getByRole } = render(<App useNotificationsFn={useNotificationsMock} />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByText('have addNotification')).toBeDefined();
    expect(getByRole('alert')).toBeDefined();
    expect(getByText('labeldemonalert')).toBeDefined();
  });
});
