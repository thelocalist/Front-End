import { defaultGlobals } from 'redux-rest-resource';
import { fetch } from 'whatwg-fetch';

import { actions } from '../resources/users';
import { getAuthData, clearAuthData } from './authStorage';

const NOOP = () => {};
const PATH_THROUGH_REQUEST_REGEXP = /\/(auth-token-refresh|login|forgot-password|reset-password|users\/create)/i;

let refreshTokenPromise;
Object.assign(defaultGlobals, {
  fetch: (...args) =>
    fetch.apply(this, args).then((requestResponse) => {
      if (
        requestResponse.status !== 401 ||
        PATH_THROUGH_REQUEST_REGEXP.test(requestResponse.url)
      ) {
        return requestResponse;
      }

      const { refreshToken, userId } = getAuthData();
      if (!refreshToken) {
        return Promise.reject(requestResponse);
      }

      if (refreshTokenPromise) {
        return refreshTokenPromise;
      }

      refreshTokenPromise = actions
        .refreshUser({ refreshToken, userId })(NOOP)
        .then((res) => {
          refreshTokenPromise = null;
          return res;
        })
        .catch((refreshTokenResponse) => {
          clearAuthData();

          document.location.href = '/login';
          return Promise.reject(refreshTokenResponse);
        })
        .then(() => fetch.apply(this, args));

      return refreshTokenPromise;
    }),
});
