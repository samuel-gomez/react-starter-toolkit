import React from 'react';

import withAuthentication, { getAuthName, getAuthAccessToken, getAuthRole, getAuthUid, setAuthRole } from './withAuthentication';

const oidcUser = {
  access_token: 'tokenid',
  profile: {
    name: 'FDS',
    member_of: ['CN=ADMIN'],
    axa_uid_racf: 'S000007',
  },
};
const profils = ['ADMIN', 'USER'];

describe('getAuthName', () => {
  it('Should return FDS When getAuthName called with profile name "FDS" ', () => {
    const result = getAuthName(oidcUser);
    expect(result).toEqual('FDS');
  });
  it('Should return "" When getAuthName called with no profile', () => {
    const result = getAuthName({});
    expect(result).toEqual('Non Connecté');
  });
});

describe('getAuthAccessToken', () => {
  it('Should return FDS When getAuthAccessToken called with access_token "tokenid" ', () => {
    const result = getAuthAccessToken(oidcUser);
    expect(result).toEqual('tokenid');
  });
  it('Should return "" When getAuthAccessToken called with no access_token', () => {
    const result = getAuthAccessToken({});
    expect(result).toEqual('');
  });
});

describe('getAuthRole', () => {
  it('Should return ADMIN When getAuthRole called with profile member_of "CN=ADMIN" ', () => {
    const result = getAuthRole(oidcUser, profils);
    expect(result).toEqual('ADMIN');
  });
  it('Should return "" When getAuthRole called with no profile member_of', () => {
    const result = getAuthRole({});
    expect(result).toEqual('');
  });
});

describe('getAuthUid', () => {
  it('Should return S000007 When getAuthUID called with profile axa_uid_racf = "S000007" ', () => {
    const result = getAuthUid(oidcUser);
    expect(result).toEqual('S000007');
  });
  it('Should return "" When getAuthUID called with no profile axa_uid_racf', () => {
    const result = getAuthUid({});
    expect(result).toEqual('');
  });
});

describe('setAuthRole', () => {
  it('Should return ADMIN When memberOf contain ADMIN ', () => {
    const result = setAuthRole({ memberOf: 'CN=ADMIN', profils });
    expect(result).toEqual('ADMIN');
  });
  it('Should return "" When memberOf not contain ADMIN', () => {
    const result = setAuthRole({ memberOf: 'CN=OTHER', profils });
    expect(result).toEqual('');
  });
});

describe('withAuthentication', () => {
  it('Should Custom Component have authentication props when use HOC withAuthentication', () => {
    const useReactOidcMock = jest.fn().mockReturnValue({
      oidcUser: {},
    });
    const CustomComponent = () => <div>Hello</div>;
    const EnhancedComponent = withAuthentication(CustomComponent, useReactOidcMock);
    expect(EnhancedComponent().props.authName).toBeDefined();
    expect(EnhancedComponent().props.authAccessToken).toBeDefined();
    expect(EnhancedComponent().props.authRole).toBeDefined();
    expect(EnhancedComponent().props.authUid).toBeDefined();
    expect(EnhancedComponent().props.authName).toEqual('Non Connecté');
    expect(EnhancedComponent().props.authAccessToken).toEqual('');
    expect(EnhancedComponent().props.authRole).toEqual('');
    expect(EnhancedComponent().props.authUid).toEqual('');
  });
});
