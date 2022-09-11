import { setLoaderMode } from 'shared/components/Loader';
import SearchMembers from './SearchMembers';
import { useSearchMembers, useFormSearchMembers } from './SearchMembers.hook';

const SearchMembersEnhanced = ({
  useSearchMembersFn = useSearchMembers,
  setLoaderModeFn = setLoaderMode,
  useFormSearchMembersFn = useFormSearchMembers,
  SearchMembersCmpt = SearchMembers,
  ...rest
}) => {
  const { submitFormSearchMembers, stateFormSearchMembers } = useFormSearchMembersFn({});
  const { anomaly, isLoading, searchMembers } = useSearchMembersFn({ stateFormSearchMembers });

  return (
    <SearchMembersCmpt
      {...rest}
      searchMembers={searchMembers}
      loaderMode={setLoaderModeFn({ isLoading })}
      anomaly={anomaly}
      submitFormSearchMembers={submitFormSearchMembers}
    />
  );
};

export default SearchMembersEnhanced;
