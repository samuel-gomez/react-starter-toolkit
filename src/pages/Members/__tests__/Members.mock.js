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
  members: [],
  anomaly: null,
  loaderMode: 'none',
};

export const membersFormattedMock = [
  {
    key: 99999,
    firstname: {
      label: 'Samuel',
    },
    lastname: {
      label: 'Gomez',
    },
    birthdate: {
      label: '20/10/1985',
    },
    sexe: {
      label: 'M',
    },
  },
];

export const membersMock = [
  {
    _id: 99999,
    firstname: 'Samuel',
    lastname: 'Gomez',
    birthdate: '1985-10-20T13:44:20.540000',
    sexe: 'M',
  },
];
