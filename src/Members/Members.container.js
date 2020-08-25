import React from 'react';
import PropTypes from 'prop-types';
import { LoaderModes } from '@axa-fr/react-toolkit-all';
import withEnhancedCustomFetch from 'shared/hoc/withCustomFetch';
import setLoaderMode from 'shared/helpers/setLoaderMode';
import { useNotifications } from 'shared/components/Notifications';
import Members from './Members';
import { useMembers } from './Members.hook';

export const MembersContext = React.createContext();
export const MembersProvider = MembersContext.Provider;

const initState = {
  isLoading: false,
  members: [],
  anomaly: null,
};

export const MembersEnhanced = ({ useMembersFn, fetch, ...rest }) => {
  const { anomaly, isLoading, members, setHideStudy } = useMembersFn({
    initState,
    fetchCustom: fetch,
  });

  const { addNotification, onDeleteNotification, stateNotifications } = useNotifications();

  return (
    <MembersProvider value={{ addNotification, stateNotifications }}>
      <Members
        {...rest}
        members={members}
        loaderMode={setLoaderMode(isLoading, members, LoaderModes)}
        fetch={fetch}
        setHideStudy={setHideStudy}
        anomaly={anomaly}
        deleteNotification={onDeleteNotification}
        notifications={stateNotifications}
      />
    </MembersProvider>
  );
};

MembersEnhanced.propTypes = {
  useMembersFn: PropTypes.func,
};

MembersEnhanced.defaultProps = {
  useMembersFn: useMembers,
};

export default withEnhancedCustomFetch(MembersEnhanced);
