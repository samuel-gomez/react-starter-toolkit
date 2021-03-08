import React from 'react';
import PropTypes from 'prop-types';
import { LoaderModes } from '@axa-fr/react-toolkit-all';
import setLoaderMode from 'shared/helpers/setLoaderMode';
import Members from './Members';
import { useMembers } from './Members.hook';

export const MembersContext = React.createContext({ onChangeSorting: null, sorting: {} });
const { Provider: MembersProvider } = MembersContext;

export const MembersEnhanced = ({ useMembersFn, setLoaderModeFn, ...rest }) => {
  const { anomaly, isLoading, members, pagination, onChangeSorting, stateSorting, onChangePaging } = useMembersFn({});

  return (
    <MembersProvider value={{ onChangeSorting, sorting: stateSorting }}>
      <Members
        {...rest}
        members={members}
        loaderMode={setLoaderModeFn({ isLoading, LoaderModes })}
        anomaly={anomaly}
        pagination={pagination}
        onChangePaging={onChangePaging}
        onChangeSorting={onChangeSorting}
        sorting={stateSorting}
      />
    </MembersProvider>
  );
};

MembersEnhanced.propTypes = {
  useMembersFn: PropTypes.func,
  setLoaderModeFn: PropTypes.func,
};

MembersEnhanced.defaultProps = {
  useMembersFn: useMembers,
  setLoaderModeFn: setLoaderMode,
};

export default MembersEnhanced;
