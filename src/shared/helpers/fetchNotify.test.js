import { fetchNotifyError, fetchNotifySuccess } from './fetchNotify';

const SERVICE_NAME = 'servicename';

describe('fetchNotifyError', () => {
  const addNotificationMock = jest.fn();
  it('Should addNotificationMock to be called with error info When called fetchNotifyError stateDownload.anomaly.downloadFile.code startswith "50" or "40"', () => {
    fetchNotifyError({
      addNotification: addNotificationMock,
      serviceName: SERVICE_NAME,
      state: {
        anomaly: {
          [SERVICE_NAME]: {
            code: '500',
            label: 'error',
            detail: 'detail error',
          },
        },
      },
      idNotifyAnomaly: 'idNotifyAnomaly',
    });

    expect(addNotificationMock).toBeCalledWith({
      code: '500',
      detail: 'detail error',
      label: 'error',
      id: 'idNotifyAnomaly',
    });
  });

  it('Should addNotificationMock NOT to be called When called fetchNotifyError and stateDownload.anomaly.downloadFile.code not exist', () => {
    fetchNotifyError({
      addNotification: addNotificationMock,
      serviceName: SERVICE_NAME,
      stateDownload: {
        anomaly: {
          [SERVICE_NAME]: {},
        },
      },
    });
    expect(addNotificationMock).not.toBeCalled();
  });
});

describe('fetchNotifySuccess', () => {
  const addNotificationMock = jest.fn();
  it('Should addNotificationMock to be called with success info When called fetchNotifySuccess stateDownload.downloadFile.code equal "200"', () => {
    fetchNotifySuccess({
      addNotification: addNotificationMock,
      state: {
        code: 200,
        label: 'success label',
        detail: 'detail success',
      },
      idNotifySuccess: 'idNotifySuccess',
    });

    expect(addNotificationMock).toBeCalledWith({
      code: 200,
      detail: 'detail success',
      label: 'success label',
      type: 'success',
      id: 'idNotifySuccess',
    });
  });

  it('Should addNotificationMock NOT to be called When called fetchNotifySuccess and stateDownload.downloadFile.code not exist', () => {
    fetchNotifySuccess({
      addNotification: addNotificationMock,
      state: {},
      idNotifySuccess: 'idNotifySuccess',
    });
    expect(addNotificationMock).not.toBeCalled();
  });
});
