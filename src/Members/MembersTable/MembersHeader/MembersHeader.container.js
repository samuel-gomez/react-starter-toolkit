import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { MembersContext } from 'Members/Members.container';
import { TABLE_HEADERS_MEMBERS } from 'Members/constants';
import MembersHeader from './MembersHeader.component';

export const setSortingInfo = ({field, order}) => !field ? {} : { [field]: order };

export const MembersHeaderEnhanced = ({ setSortingInfoFn , headers}) => {
  const { onChangeOrder, sorting } = useContext(MembersContext);
  const { field, order } = sorting;
  const sortingInfo = setSortingInfoFn({field, order});

  return <MembersHeader sorting={sorting} sortingInfo={sortingInfo} onSort={onChangeOrder} headers={headers} />;
};

const MembersHeaderEnhancedPropTypes = {
  setSortingInfoFn: PropTypes.func,
  headers: PropTypes.arrayOf(
    PropTypes.shape({ 
      label: PropTypes.string.isRequired, 
      id: PropTypes.string.isRequired,
      field: PropTypes.string, 
    })
  )
};

const MembersHeaderEnhancedDefaultProps = {
  setSortingInfoFn: setSortingInfo,
  headers: TABLE_HEADERS_MEMBERS
};

MembersHeaderEnhanced.propTypes = MembersHeaderEnhancedPropTypes;
MembersHeaderEnhanced.defaultProps = MembersHeaderEnhancedDefaultProps;

export default MembersHeaderEnhanced;
