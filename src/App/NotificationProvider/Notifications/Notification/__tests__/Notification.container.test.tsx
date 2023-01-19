import { render } from '@testing-library/react';
import { emptyFunction } from 'shared/testsUtils';
import { EType } from '../Notification';
import NotificationContainer from '../Notification.container';

describe('NotificationContainer', () => {
  const NotificationCmpt = jest.fn();
  NotificationCmpt.mockImplementation(() => <>NotificationCmpt</>);

  const defaultProps = {
    onClose: emptyFunction,
    id: 'id',
    label: 'title',
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
        label: 'title',
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
        label: 'title',
        onClose: emptyFunction,
      },
      {},
    );
  });
});
