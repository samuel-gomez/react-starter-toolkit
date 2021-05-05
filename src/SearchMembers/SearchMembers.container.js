import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { LoaderModes } from 'shared/components/Loader';
import setLoaderMode from 'shared/helpers/setLoaderMode';
import SearchMembers from './SearchMembers';
import { useSearchMembers, initStateSearch } from './SearchMembers.hook';

export const SearchMembersContext = createContext({ stateSearch: initStateSearch });
const { Provider: SearchMembersProvider } = SearchMembersContext;

export const SearchMembersEnhanced = ({ useSearchMembersFn, setLoaderModeFn, ...rest }) => {
  const { anomaly, isLoading, members, submitSearch, stateSearch } = useSearchMembersFn({});

  return (
    <SearchMembersProvider value={{ stateSearch }}>
      <SearchMembers
        {...rest}
        members={members}
        loaderMode={setLoaderModeFn({ isLoading, LoaderModes })}
        anomaly={anomaly}
        submitSearch={submitSearch}
      />
    </SearchMembersProvider>
  );
};

SearchMembersEnhanced.propTypes = {
  useSearchMembersFn: PropTypes.func,
  setLoaderModeFn: PropTypes.func,
};

SearchMembersEnhanced.defaultProps = {
  useSearchMembersFn: useSearchMembers,
  setLoaderModeFn: setLoaderMode,
};

export default SearchMembersEnhanced;
