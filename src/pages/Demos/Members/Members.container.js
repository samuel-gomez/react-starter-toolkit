import { createContext } from 'react';
import { func } from 'prop-types';
import { setLoaderMode } from 'shared/components/Loader';
import Members from './Members';
import { useMembers } from './Members.hook';

export const MembersContext = createContext({ onChangeSorting: null, sorting: {} });
const { Provider: MembersProvider } = MembersContext;

const MembersEnhanced = ({ useMembersFn, setLoaderModeFn, ...rest }) => {
  const { anomaly, isLoading, members, onChangeSorting, stateSorting, onChangePaging, refetch } = useMembersFn({});
  return (
    <MembersProvider value={{ onChangeSorting, sorting: stateSorting }}>
      <Members
        {...rest}
        members={members.data}
        loaderMode={setLoaderModeFn({ isLoading })}
        anomaly={anomaly}
        pagination={members.pagination}
        onChangePaging={onChangePaging}
        onChangeSorting={onChangeSorting}
        sorting={stateSorting}
        refetch={refetch}
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
