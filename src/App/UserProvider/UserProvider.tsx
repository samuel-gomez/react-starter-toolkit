import { createContext, ReactNode } from 'react';
import { useOidcUser } from '@axa-fr/react-oidc-context';
import { isEmpty } from 'lodash';
import { PROFILS } from 'shared/constants';

export const UserContext = createContext({
  authName: '',
  authRole: '',
  authUid: '',
  isEnabled: true,
  isLoading: true,
});
UserContext.displayName = 'UserContext';

const NON_CONNECTE = 'Non Connecté';

type ToidcUser = {
  member_of?: string[];
  name: string;
  axa_uid_racf?: string;
};

/**
 * getAuthName
 */

type TgetAuthName = {
  oidcUser: ToidcUser;
  isEmptyFn?: typeof isEmpty;
};

export const getAuthName = ({ oidcUser, isEmptyFn = isEmpty }: TgetAuthName) => (!isEmptyFn(oidcUser?.name ?? '') ? oidcUser.name : NON_CONNECTE);

/**
 * setAuthRole
 */
type TsetAuthRole = {
  memberOf: string;
  profils?: typeof PROFILS;
};

export const setAuthRole = ({ memberOf, profils = PROFILS }: TsetAuthRole) =>
  profils.map(profil => (memberOf.search(`${profil}`) !== -1 ? profil : '')).join('');

/**
 * getAuthRole
 */

type TgetAuthRole = {
  oidcUser: ToidcUser;
  setAuthRoleFn?: typeof setAuthRole;
};

export const getAuthRole = ({ oidcUser, setAuthRoleFn = setAuthRole }: TgetAuthRole) => setAuthRoleFn({ memberOf: oidcUser?.member_of?.[0] ?? '' });

/**
 * getAuthUid
 */

type TgetAuthUid = {
  oidcUser: ToidcUser;
  isEmptyFn?: typeof isEmpty;
};

export const getAuthUid = ({ oidcUser, isEmptyFn = isEmpty }: TgetAuthUid) =>
  (!isEmptyFn(oidcUser?.axa_uid_racf ?? '') ? oidcUser.axa_uid_racf : '') || '';

/**
 * extractDataFromOAuthToken
 * @param {Object} oidcUser
 */

type TextractDataFromOAuthToken = {
  oidcUser: ToidcUser;
  getAuthNameFn?: typeof getAuthName;
  getAuthRoleFn?: typeof getAuthRole;
  getAuthUidFn?: typeof getAuthUid;
};

const extractDataFromOAuthToken = ({
  oidcUser,
  getAuthNameFn = getAuthName,
  getAuthRoleFn = getAuthRole,
  getAuthUidFn = getAuthUid,
}: TextractDataFromOAuthToken) => ({
  authName: getAuthNameFn({ oidcUser }),
  authRole: getAuthRoleFn({ oidcUser }),
  authUid: getAuthUidFn({ oidcUser }),
  isLoading: !oidcUser,
});

/**
 * UserProvider
 * @param {Function} useOidcUser
 * @param {JSX} children
 */

type TUserProvider = {
  children: ReactNode;
  useOidcUserFn: typeof useOidcUser;
  extractDataFromOAuthTokenFn?: typeof extractDataFromOAuthToken;
  isEnabled?: boolean;
};

const UserProvider = ({
  children,
  useOidcUserFn,
  extractDataFromOAuthTokenFn = extractDataFromOAuthToken,
  isEnabled = true,
  ...rest
}: TUserProvider) => {
  const { oidcUser } = useOidcUserFn();
  return <UserContext.Provider value={{ ...extractDataFromOAuthTokenFn({ oidcUser }), isEnabled, ...rest }}>{children}</UserContext.Provider>;
};

export default UserProvider;
