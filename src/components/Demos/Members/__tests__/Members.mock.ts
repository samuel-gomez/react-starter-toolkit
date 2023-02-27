import { MODES } from 'shared/components/Loader';
import { emptyFunction } from 'shared/testsUtils';
import { DEFAULT_STATE_VALUE, INITIAL_STATE_SORTING, TReturnUseMembers } from '../Members.hook';

export const totals = { total: 1001, count: 50, skip: 50, max: 50 };

export const oneMember = {
  _id: '5f52a9d24ddf8b6c00052b4b',
  firstname: 'Vivianna',
  lastname: 'Ostridge',
  created: '2019-10-02T00:00:00.000Z',
  birthdate: '1969-10-08T00:00:00.000Z',
  status: true,
  email: 'vostridgekn@wisc.edu',
  sexe: 'M',
};

export const defaultProps = {
  loaderMode: MODES.none,
  anomaly: null,
  refetch: emptyFunction as unknown as TReturnUseMembers['refetch'],
  onChangePaging: emptyFunction as unknown as TReturnUseMembers['onChangePaging'],
  onChangeSorting: emptyFunction as unknown as TReturnUseMembers['onChangeSorting'],
  pagination: DEFAULT_STATE_VALUE.pagination,
  members: [] as TReturnUseMembers['members'],
  sorting: INITIAL_STATE_SORTING,
};

export const membersMock = [
  {
    _id: '99999',
    firstname: 'Samuel',
    lastname: 'Gomez',
    birthdate: '1985-10-20T13:44:20.540000',
    sexe: 'M',
  },
];
