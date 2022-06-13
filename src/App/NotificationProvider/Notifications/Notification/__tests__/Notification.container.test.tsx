import { render } from '@testing-library/react';
import { emptyFunction } from 'shared/testsUtils';
import Notification, { EType } from '../Notification';
import NotificationContainer from '../Notification.container';

jest.mock('../Notification');

describe('NotificationContainer', () => {
  const NotificationCmpt = Notification as jest.MockedFunction<typeof Notification>;
  NotificationCmpt.mockImplementation(() => <>NotificationCmpt</>);

  const defaultProps = {
    onClose: emptyFunction,
    id: 'id',
    title: 'title',
    NotificationCmpt,
  };

  it('Render <NotificationContainer/>', () => {
    const { getByText } = render(<NotificationContainer {...defaultProps} />);

    expect(getByText('NotificationCmpt')).toBeInTheDocument();

    expect(NotificationCmpt).toHaveBeenCalledWith(
      {
        classModifier: 'error',
        type: EType.error,
        id: 'id',
        title: 'title',
        onClose: emptyFunction,
      },
      {},
    );
  });

  it('Render <NotificationContainer/> with all props', () => {
    const allProps = {
      ...defaultProps,
      type: EType.success,
      classModifier: 'mymodifier',
    };
    const { getByText } = render(<NotificationContainer {...allProps} />);

    expect(getByText('NotificationCmpt')).toBeInTheDocument();

    expect(NotificationCmpt).toHaveBeenCalledWith(
      {
        classModifier: 'success mymodifier',
        type: EType.success,
        id: 'id',
        title: 'title',
        onClose: emptyFunction,
      },
      {},
    );
  });
});
