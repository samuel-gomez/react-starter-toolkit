import React from 'react';
import PropTypes from 'prop-types';
import { LoaderModes } from '@axa-fr/react-toolkit-all';
import withEnhancedCustomFetch from 'shared/hoc/withCustomFetch';
import setLoaderMode from 'shared/helpers/setLoaderMode';
import { useNotifications } from 'shared/components/Notifications';
import Members from './Members';
import { useMembers } from './Members.hook';

export const MembersContext = React.createContext({ onchangeOrder: () => {}, sorting: {}, addNotification: () => {}, stateNotifications: [] });
const { Provider: MembersProvider } = MembersContext;

export const MembersEnhanced = ({ useMembersFn, fetch, ...rest }) => {
  const { anomaly, isLoading, members, onChangeOrder, sorting } = useMembersFn({
    fetchCustom: fetch,
  });

  const { addNotification, onDeleteNotification, stateNotifications } = useNotifications();

  return (
    <MembersProvider value={{ onChangeOrder, sorting, addNotification, stateNotifications }}>
      <Members
        {...rest}
        members={members}
        loaderMode={setLoaderMode({ isLoading, LoaderModes })}
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
