//
import React, { useContext } from 'react';
import { MembersContext } from 'Members/Members.container';
import MembersHeader from './MembersHeader.component';

export const MembersHeaderEnhanced = () => {
  const { onChangeOrder, sorting } = useContext(MembersContext);
  const { field, order } = sorting;
  const sortingInfo = !field ? {} : { [field]: order };

  return <MembersHeader sorting={sorting} sortingInfo={sortingInfo} onSort={onChangeOrder} />;
};

export default MembersHeaderEnhanced;
