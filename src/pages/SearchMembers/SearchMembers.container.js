import { func } from 'prop-types';
import setLoaderMode from 'shared/helpers/setLoaderMode';
import SearchMembers from './SearchMembers';
import { useSearchMembers, useFormSearchMembers } from './SearchMembers.hook';
import { SERVICE_NAME } from './constants';

export const SearchMembersEnhanced = ({ useSearchMembersFn, setLoaderModeFn, useFormSearchMembersFn, ...rest }) => {
  const { submitFormSearchMembers, stateFormSearchMembers } = useFormSearchMembersFn({});
  const { anomaly, isLoading, searchMembers } = useSearchMembersFn({ stateFormSearchMembers });

  return (
    <SearchMembers
      {...rest}
      members={searchMembers}
      loaderMode={setLoaderModeFn({ isLoading })}
      anomaly={anomaly[SERVICE_NAME]}
      submitSearch={submitFormSearchMembers}
    />
  );
};

SearchMembersEnhanced.propTypes = {
  useSearchMembersFn: func,
  setLoaderModeFn: func,
  useFormSearchMembersFn: func,
};

SearchMembersEnhanced.defaultProps = {
  useSearchMembersFn: useSearchMembers,
  setLoaderModeFn: setLoaderMode,
  useFormSearchMembersFn: useFormSearchMembers,
};

export default SearchMembersEnhanced;
