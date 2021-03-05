import React, { createContext } from 'react';
import { get, isEmpty } from 'lodash';
import { useReactOidc } from '@axa-fr/react-oidc-context';
import { PROFILS } from 'shared/constants';

export const UserContext = createContext({
  authName: '',
  authAccessToken: '',
  authRole: '',
  authUid: '',
});
export const UserContextProvider = UserContext.Provider;

const NON_CONNECTE = 'Non Connecté';

export const getAuthName = ({ oidcUser, isEmptyFn = isEmpty, getFn = get }) =>
  !isEmptyFn(getFn(oidcUser, 'profile.name')) ? oidcUser.profile.name : NON_CONNECTE;

export const getAuthAccessToken = ({ oidcUser, isEmptyFn = isEmpty, getFn = get }) =>
  !isEmptyFn(getFn(oidcUser, 'access_token')) ? oidcUser.access_token : '';

export const setAuthRole = ({ memberOf, profils = PROFILS }) => profils.map(profil => (memberOf.search(`${profil}`) !== -1 ? profil : '')).join('');

export const getAuthRole = ({ oidcUser, setAuthRoleFn = setAuthRole, isEmptyFn = isEmpty, getFn = get }) =>
  !isEmptyFn(getFn(oidcUser, 'profile.member_of')) ? setAuthRoleFn({ memberOf: oidcUser.profile.member_of[0] }) : '';

export const getAuthUid = ({ oidcUser, isEmptyFn = isEmpty, getFn = get }) =>
  !isEmptyFn(getFn(oidcUser, 'profile.axa_uid_racf')) ? oidcUser.profile.axa_uid_racf : '';

/**
 * MAAM gives us : "member_of": [ELMU_Admin,CN=IAM_ELMU,OU=applis,O=axafrance,DC=REWACAD,DC=axa-fr,DC=intraxa]
 * @param {Object} oidcUser
 */
const extractDataFromOAuthToken = (
  oidcUser,
  getAuthNameFn = getAuthName,
  getAuthAccessTokenFn = getAuthAccessToken,
  getAuthRoleFn = getAuthRole,
  getAuthUidFn = getAuthUid,
) => ({
  authName: getAuthNameFn({ oidcUser }),
  authAccessToken: getAuthAccessTokenFn({ oidcUser }),
  authRole: getAuthRoleFn({ oidcUser }),
  authUid: getAuthUidFn({ oidcUser }),
});

const UserProvider = ({ children, useReactOidcFn = useReactOidc }) => {
  const { oidcUser } = useReactOidcFn();
  return <UserContextProvider value={{ ...extractDataFromOAuthToken(oidcUser) }}>{children}</UserContextProvider>;
};
export default UserProvider;
