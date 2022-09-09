import { createContext } from 'react';
import { setLoaderMode } from 'shared/components/Loader';
import { emptyFunction } from 'shared/testsUtils';
import Members, { TMembers } from './Members';
import { INITIAL_STATE_SORTING, TReturnUseMembers, useMembers } from './Members.hook';

export type TMembersContext = {
  onChangeSorting: TReturnUseMembers['onChangeSorting'];
  sorting: TReturnUseMembers['sorting'];
};

export const MembersContext = createContext<TMembersContext>({
  onChangeSorting: emptyFunction,
  sorting: INITIAL_STATE_SORTING,
});

type TMembersEnhanced = TMembers & {
  useMembersFn?: typeof useMembers;
  setLoaderModeFn?: typeof setLoaderMode;
  MembersCmpt?: typeof Members;
};

const MembersEnhanced = ({ useMembersFn = useMembers, setLoaderModeFn = setLoaderMode, MembersCmpt = Members, ...rest }: TMembersEnhanced) => {
  const { anomaly, isLoading, members, pagination, onChangeSorting, sorting, onChangePaging, refetch } = useMembersFn({});

  return (
    <MembersContext.Provider value={{ onChangeSorting, sorting }}>
      <MembersCmpt
        {...rest}
        members={members}
        loaderMode={setLoaderModeFn({ isLoading })}
        anomaly={anomaly}
        pagination={pagination}
        onChangePaging={onChangePaging}
        onChangeSorting={onChangeSorting}
        sorting={sorting}
        refetch={refetch}
      />
    </MembersContext.Provider>
  );
};

export default MembersEnhanced;
