import React from 'react';
import PropTypes from 'prop-types';
import { LoaderModes } from '@axa-fr/react-toolkit-all';
import withEnhancedCustomFetch from 'shared/hoc/withCustomFetch';
import setLoaderMode from 'shared/helpers/setLoaderMode';
import { useNotifications } from 'shared/components/Notifications';
import Members from './Members';
import { useMembers } from './Members.hook';

export const MembersContext = React.createContext({ onChangeSorting: null, sorting: {}, addNotification: null, stateNotifications: [] });
const { Provider: MembersProvider } = MembersContext;

export const MembersEnhanced = ({ useMembersFn, useNotificationsFn, setLoaderModeFn, fetchCustom, ...rest }) => {
  const { anomaly, isLoading, members, pagination, onChangeSorting, stateSorting, onChangePaging } = useMembersFn({ fetchCustom });
  const { addNotification, onDeleteNotification, stateNotifications } = useNotificationsFn();

  return (
    <MembersProvider value={{ onChangeSorting, sorting: stateSorting, addNotification, stateNotifications }}>
      <Members
        {...rest}
        members={members}
        loaderMode={setLoaderModeFn({ isLoading, LoaderModes })}
        anomaly={anomaly}
        deleteNotification={onDeleteNotification}
        notifications={stateNotifications}
        pagination={pagination}
        onChangePaging={onChangePaging}
      />
    </MembersProvider>
  );
};

MembersEnhanced.propTypes = {
  useMembersFn: PropTypes.func,
  useNotificationsFn: PropTypes.func,
  setLoaderModeFn: PropTypes.func,
};

MembersEnhanced.defaultProps = {
  useMembersFn: useMembers,
  useNotificationsFn: useNotifications,
  setLoaderModeFn: setLoaderMode,
};

export default withEnhancedCustomFetch(MembersEnhanced);
