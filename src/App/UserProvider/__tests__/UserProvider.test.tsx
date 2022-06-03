import { useContext } from 'react';
import { render } from '@testing-library/react';
import { omit } from 'lodash';
import UserProvider, { UserContext, getAuthName, getAuthRole, setAuthRole, getAuthUid } from '../UserProvider';

type TBase = {
  authName: string;
  authRole: string;
  authUid: string;
};

const Base = ({ authName, authRole, authUid }: TBase) => (
  <ul>
    <li>{authName ? 'have authName' : 'notHave authName'}</li>
    <li>{authRole ? 'have authRole' : 'notHave authRole'}</li>
    <li>{authUid ? 'have authUid' : 'notHave authUid'}</li>
  </ul>
);

const BaseWithUser = () => {
  const userProps = useContext(UserContext);
  return <Base {...userProps} />;
};

const oidcUser = {
  name: 'Bob Smith',
  given_name: 'Bob',
  family_name: 'Smith',
  email: 'BobSmith@email.com',
  email_verified: true,
  website: 'http://bob.com',
  sub: '11',
  member_of: ['CN=Admin'],
  axa_uid_racf: 'S000007',
};

const profils = ['Admin', 'USER'];

const useOidcUserMock = jest.fn().mockReturnValue({
  oidcUser,
});

const App = () => (
  <UserProvider useOidcUserFn={useOidcUserMock}>
    <BaseWithUser />
  </UserProvider>
);

describe('Render App with Base have user props', () => {
  it('Should Base have user props when render App with UserProvider', () => {
    const { asFragment, getByText } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByText('have authName')).toBeDefined();
    expect(getByText('have authRole')).toBeDefined();
    expect(getByText('have authUid')).toBeDefined();
  });
});

describe('getAuthName', () => {
  it('Should return "Bob Smith" when getAuthName called with profile name "Bob Smith" ', () => {
    const result = getAuthName({ oidcUser });
    expect(result).toEqual('Bob Smith');
  });

  it('Should return "" when getAuthName called with no name profile', () => {
    const result = getAuthName({ ...omit(oidcUser, 'name') });
    expect(result).toEqual('Non Connecté');
  });
});

describe('getAuthRole', () => {
  it('Should return Admin when getAuthRole called with profile member_of "CN=Admin" ', () => {
    const setAuthRoleFn = jest.fn().mockReturnValue('Admin');
    const result = getAuthRole({ oidcUser, setAuthRoleFn });

    expect(result).toEqual('Admin');
    expect(setAuthRoleFn).toHaveBeenCalledWith({ memberOf: oidcUser.member_of[0] });
  });

  it('Should return "" when getAuthRole called with no profile member_of', () => {
    const result = getAuthRole({ oidcUser: { ...omit(oidcUser, 'member_of') } });
    expect(result).toEqual('');
  });

  it('Should return "" when getAuthRole called with empty member_of', () => {
    const setAuthRoleFn = jest.fn().mockReturnValue('');
    const result = getAuthRole({ oidcUser: { ...oidcUser, member_of: [''] }, setAuthRoleFn });

    expect(result).toEqual('');
    expect(setAuthRoleFn).toHaveBeenCalledWith({ memberOf: '' });
  });
});

describe('getAuthUid', () => {
  it('Should return S000007 when getAuthUID called with profile axa_uid_racf = "S000007" ', () => {
    const result = getAuthUid({ oidcUser });
    expect(result).toEqual('S000007');
  });

  it('Should return "" when getAuthUID called with no profile axa_uid_racf', () => {
    const result = getAuthUid({ ...omit(oidcUser, 'axa_uid_racf') });
    expect(result).toEqual('');
  });
});

describe('setAuthRole', () => {
  it('Should return Admin when memberOf contain Admin ', () => {
    const result = setAuthRole({ memberOf: 'CN=Admin', profils });
    expect(result).toEqual('Admin');
  });

  it('Should return "" when memberOf not autorized', () => {
    const result = setAuthRole({ memberOf: 'CN=OTHER', profils });
    expect(result).toEqual('');
  });
});
