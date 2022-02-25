import React, { createContext } from 'react';
import { get, isEmpty } from 'lodash';
import { PROFILS } from 'shared/constants';

export const UserContext = createContext({
  authName: '',
  authRole: '',
  authUid: '',
});
export const UserContextProvider = UserContext.Provider;

const NON_CONNECTE = 'Non Connecté';

export const getAuthName = ({ oidcUser, isEmptyFn = isEmpty, getFn = get }) => (!isEmptyFn(getFn(oidcUser, 'name')) ? oidcUser.name : NON_CONNECTE);

export const setAuthRole = ({ memberOf, profils = PROFILS }) => profils.map(profil => (memberOf.search(`${profil}`) !== -1 ? profil : '')).join('');

export const getAuthRole = ({ oidcUser, setAuthRoleFn = setAuthRole, isEmptyFn = isEmpty, getFn = get }) =>
  !isEmptyFn(getFn(oidcUser, 'member_of')) ? setAuthRoleFn({ memberOf: oidcUser.member_of[0] }) : '';

export const getAuthUid = ({ oidcUser, isEmptyFn = isEmpty, getFn = get }) =>
  !isEmptyFn(getFn(oidcUser, 'axa_uid_racf')) ? oidcUser.axa_uid_racf : '';

/**
 *
 * @param {Object} oidcUser
 */
const extractDataFromOAuthToken = (oidcUser, getAuthNameFn = getAuthName, getAuthRoleFn = getAuthRole, getAuthUidFn = getAuthUid) => ({
  authName: getAuthNameFn({ oidcUser }),
  authRole: getAuthRoleFn({ oidcUser }),
  authUid: getAuthUidFn({ oidcUser }),
});

const UserProvider = ({ children, useOidcUser }) => {
  const { oidcUser } = useOidcUser();
  return <UserContextProvider value={{ ...extractDataFromOAuthToken(oidcUser) }}>{children}</UserContextProvider>;
};

export default UserProvider;
