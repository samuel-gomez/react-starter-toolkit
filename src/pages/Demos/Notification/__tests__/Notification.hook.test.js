import { renderHook, act } from '@testing-library/react-hooks';
import { createContext } from 'react';
import useNotify from '../Notification.hook';

describe('useNotify', () => {
  const addNotification = jest.fn();
  const useContextFn = jest.fn();
  it('Should return notifyError, notifySuccess, notifyWarning when notifyError called', () => {
    renderHook(() => useNotify({ useContextFn }));
    expect(useContextFn).toBeCalled();
  });

  const NotificationContext = createContext({ addNotification });
  it('Should addNotification for error have been called when notifyError called', () => {
    const { result } = renderHook(() => useNotify({ NotificationContextObj: NotificationContext }));
    act(() => result.current.notifyError());
    expect(addNotification).toHaveBeenCalledWith({
      code: 500,
      detail: '',
      id: 'idNotifyAnomaly',
      label: 'Erreur : Contactez le support',
    });
  });

  it('Should addNotification for success have been called when notifySuccess called', () => {
    const { result } = renderHook(() => useNotify({ NotificationContextObj: NotificationContext }));
    act(() => result.current.notifySuccess());
    expect(addNotification).toHaveBeenCalledWith({
      code: 200,
      detail: '',
      id: 'idNotifySuccess',
      type: 'success',
      label: 'Success : opération réussie',
    });
  });

  it('Should addNotification for warning have been called when notifyWarning called', () => {
    const { result } = renderHook(() => useNotify({ NotificationContextObj: NotificationContext }));
    act(() => result.current.notifyWarning());
    expect(addNotification).toHaveBeenCalledWith({
      code: 404,
      detail: '',
      id: 'idNotifyDanger',
      type: 'danger',
      label: 'Warning : opération not found',
    });
  });
});
