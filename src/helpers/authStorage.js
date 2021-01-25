const AUTH_STORAGE_KEY = 'authData';
const ACCESS_TOKEN_DATA_REGEXP = /^[^.]+\.([^\s]+)[^.]*$/i;

export const getAuthData = () =>
  JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || '{}');

export const hasAuthData = () => !!getAuthData().userId;

export const saveAuthData = ({ userId, accessToken, refreshToken }) =>
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({ userId, accessToken, refreshToken })
  );

export const clearAuthData = () => localStorage.removeItem(AUTH_STORAGE_KEY);

/**
 * Get data saved in token (userId, role..)
 * @returns {object|null}
 */
export const getTokenData = () => {
  const { accessToken } = getAuthData();

  if (!accessToken || !ACCESS_TOKEN_DATA_REGEXP.test(accessToken)) {
    return null;
  }

  const accessTokenData = accessToken.replace(ACCESS_TOKEN_DATA_REGEXP, '$1');
  return JSON.parse(atob(accessTokenData));
};
