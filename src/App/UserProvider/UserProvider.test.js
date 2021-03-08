import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import UserProvider, { UserContext, getAuthName, getAuthAccessToken, getAuthRole, setAuthRole, getAuthUid } from './UserProvider';

const Base = ({ authName, authAccessToken, authRole, authUid }) => (
  <ul>
    <li>{authName ? 'have authName' : 'notHave authName'}</li>
    <li>{authAccessToken ? 'have authAccessToken' : 'notHave authAccessToken'}</li>
    <li>{authRole ? 'have authRole' : 'notHave authRole'}</li>
    <li>{authUid ? 'have authUid' : 'notHave authUid'}</li>
  </ul>
);

const BaseWithUser = () => {
  const userProps = useContext(UserContext);
  return <Base {...userProps} />;
};

const oidcUser = {
  access_token: 'tokenid',
  profile: {
    name: 'FDS',
    member_of: ['CN=Admin'],
    axa_uid_racf: 'S000007',
  },
};
const profils = ['Admin', 'USER'];
const useReactOidcMock = jest.fn().mockReturnValue({
  oidcUser,
});

const App = () => (
  <UserProvider useReactOidcFn={useReactOidcMock}>
    <BaseWithUser />
  </UserProvider>
);

describe('Render App with Base have user props', () => {
  it('Should Base have fetchCustom props when call setFetchCustom', () => {
    const { asFragment, getByText } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByText('have authName')).toBeDefined();
    expect(getByText('have authAccessToken')).toBeDefined();
    expect(getByText('have authRole')).toBeDefined();
    expect(getByText('have authUid')).toBeDefined();
  });
});

describe('getAuthName', () => {
  it('Should return FDS When getAuthName called with profile name "FDS" ', () => {
    const result = getAuthName({ oidcUser });
    expect(result).toEqual('FDS');
  });
  it('Should return "" When getAuthName called with no profile', () => {
    const result = getAuthName({});
    expect(result).toEqual('Non Connecté');
  });
});

describe('getAuthAccessToken', () => {
  it('Should return FDS When getAuthAccessToken called with access_token "tokenid" ', () => {
    const result = getAuthAccessToken({ oidcUser });
    expect(result).toEqual('tokenid');
  });
  it('Should return "" When getAuthAccessToken called with no access_token', () => {
    const result = getAuthAccessToken({});
    expect(result).toEqual('');
  });
});

describe('getAuthRole', () => {
  it('Should return Admin When getAuthRole called with profile member_of "CN=Admin" ', () => {
    const result = getAuthRole({ oidcUser, profils });
    expect(result).toEqual('Admin');
  });
  it('Should return "" When getAuthRole called with no profile member_of', () => {
    const result = getAuthRole({});
    expect(result).toEqual('');
  });
});

describe('getAuthUid', () => {
  it('Should return S000007 When getAuthUID called with profile axa_uid_racf = "S000007" ', () => {
    const result = getAuthUid({ oidcUser });
    expect(result).toEqual('S000007');
  });
  it('Should return "" When getAuthUID called with no profile axa_uid_racf', () => {
    const result = getAuthUid({});
    expect(result).toEqual('');
  });
});

describe('setAuthRole', () => {
  it('Should return Admin When memberOf contain Admin ', () => {
    const result = setAuthRole({ memberOf: 'CN=Admin', profils });
    expect(result).toEqual('Admin');
  });
  it('Should return "" When memberOf not autorized', () => {
    const result = setAuthRole({ memberOf: 'CN=OTHER', profils });
    expect(result).toEqual('');
  });
});
