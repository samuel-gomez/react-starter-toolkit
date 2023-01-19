import { renderHook, act } from '@testing-library/react-hooks';
import useNotifications from '../Notifications.hook';

describe('useNotifications', () => {
  const initState = [
    { id: '01', label: 'title1' },
    { id: '02', label: 'title2' },
  ];
  it('Should add classModifier "hide" to item when onDeleteNotification called with "id"', () => {
    const { result } = renderHook(() => useNotifications(initState));
    act(() => result.current.onDeleteNotification('01'));
    expect(result.current.stateNotifications).toEqual([
      { id: '01', label: 'title1', classModifier: 'hide' },
      { id: '02', label: 'title2' },
    ]);
  });

  it('Should delete item when onDeleteNotification called with "id" after 500ms', async () => {
    const { result } = renderHook(() => useNotifications(initState));

    jest.useFakeTimers();
    act(() => result.current.onDeleteNotification('01'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.stateNotifications).toEqual([{ id: '02', label: 'title2' }]);
  });

  const initStateOne = [{ id: '01', label: 'title1' }];
  it('Should add new notification when addNotification called with notification', () => {
    const { result } = renderHook(() => useNotifications(initStateOne));
    act(() => result.current.addNotification({ id: '02', label: 'title2' }));
    expect(result.current.stateNotifications).toEqual([
      { id: '01', label: 'title1' },
      { id: '02', label: 'title2' },
    ]);
  });

  it('Should not add new notification when addNotification called with notification with same id', () => {
    const { result } = renderHook(() => useNotifications(initStateOne));
    act(() => result.current.addNotification({ id: '01', label: 'title2' }));
    expect(result.current.stateNotifications).toEqual([{ id: '01', label: 'title1' }]);
  });

  it('Should clear stateNotifications when clearAllNotifications called', () => {
    const { result } = renderHook(() => useNotifications(initStateOne));
    act(() => result.current.clearAllNotifications());
    expect(result.current.stateNotifications).toEqual([]);
  });
});
