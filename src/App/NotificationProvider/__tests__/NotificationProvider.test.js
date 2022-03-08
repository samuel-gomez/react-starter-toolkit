import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import NotificationProvider, { NotificationContext } from '../NotificationProvider';

const Base = ({ addNotification }) => (
  <ul>
    <li>{addNotification ? 'have addNotification' : 'notHave addNotification'}</li>
  </ul>
);

const BaseWithNotification = () => {
  const notificationProps = useContext(NotificationContext);
  return <Base {...notificationProps} />;
};
const addNotificationMock = jest.fn();
const onDeleteNotificationMock = jest.fn();

const App = ({ useNotificationsFn }) => (
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
