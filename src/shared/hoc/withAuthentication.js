import React from 'react';
import { get, isEmpty } from 'lodash';
import { useReactOidc } from '@axa-fr/react-oidc-context';
import { PROFILS } from 'shared/constants';

const NON_CONNECTE = 'Non Connecté';

export const getAuthName = (oidcUser, isEmptyFn = isEmpty, getFn = get) =>
  !isEmptyFn(getFn(oidcUser, 'profile.name')) ? oidcUser.profile.name : NON_CONNECTE;

export const getAuthAccessToken = (oidcUser, isEmptyFn = isEmpty, getFn = get) =>
  !isEmptyFn(getFn(oidcUser, 'access_token')) ? oidcUser.access_token : '';

export const setAuthRole = ({ memberOf, profils }) => profils.map(profil => (memberOf.search(`${profil}`) !== -1 ? profil : '')).join('');

export const getAuthRole = (oidcUser, profils = PROFILS, setAuthRoleFn = setAuthRole, isEmptyFn = isEmpty, getFn = get) =>
  !isEmptyFn(getFn(oidcUser, 'profile.member_of')) ? setAuthRoleFn({ memberOf: oidcUser.profile.member_of[0], profils }) : '';

export const getAuthUid = (oidcUser, isEmptyFn = isEmpty, getFn = get) =>
  !isEmptyFn(getFn(oidcUser, 'profile.axa_uid_racf')) ? oidcUser.profile.axa_uid_racf : '';

/**
 *
 * @param {Object} oidcUser
 */
const extractDataFromOAuthToken = (
  oidcUser,
  getAuthNameFn = getAuthName,
  getAuthAccessTokenFn = getAuthAccessToken,
  getAuthRoleFn = getAuthRole,
  getAuthUidFn = getAuthUid,
) => ({
  authName: getAuthNameFn(oidcUser),
  authAccessToken: getAuthAccessTokenFn(oidcUser),
  authRole: getAuthRoleFn(oidcUser),
  authUid: getAuthUidFn(oidcUser),
});

const withAuthentication = (Component, useReactOidcFn = useReactOidc) => props => {
  const { oidcUser } = useReactOidcFn();
  return <Component {...props} {...extractDataFromOAuthToken(oidcUser)} />;
};

export default withAuthentication;
