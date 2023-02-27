import { ADMIN } from 'shared/constants';

// these mock functions are used when you disable the OIDC authentication
export const useOidcUserFnMock = () => ({ oidcUser: { name: 'John Doe', member_of: [ADMIN] } });
export const useOidcAccessTokenFnMock = () => ({ accessToken: 'token' });
