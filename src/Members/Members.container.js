import React, { createContext } from 'react';
import { func } from 'prop-types';
import setLoaderMode from 'shared/helpers/setLoaderMode';
import Members from './Members';
import { useMembers } from './Members.hook';
import { SERVICE_NAME } from './constants';

export const MembersContext = createContext({ onChangeSorting: null, sorting: {} });
const { Provider: MembersProvider } = MembersContext;

const MembersEnhanced = ({ useMembersFn, setLoaderModeFn, ...rest }) => {
  const { anomaly, isLoading, members, onChangeSorting, stateSorting, onChangePaging } = useMembersFn({});
  return (
    <MembersProvider value={{ onChangeSorting, sorting: stateSorting }}>
      <Members
        {...rest}
        members={members.data}
        loaderMode={setLoaderModeFn({ isLoading })}
        anomaly={anomaly[SERVICE_NAME]}
        pagination={members.pagination}
        onChangePaging={onChangePaging}
        onChangeSorting={onChangeSorting}
        sorting={stateSorting}
      />
    </MembersProvider>
  );
};

MembersEnhanced.propTypes = {
  useMembersFn: func,
  setLoaderModeFn: func,
};

MembersEnhanced.defaultProps = {
  useMembersFn: useMembers,
  setLoaderModeFn: setLoaderMode,
};

export default MembersEnhanced;
