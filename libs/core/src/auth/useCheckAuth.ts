import { useCallback } from 'react';

import useLogout from './useLogout';
import { defaultAuthParams, useAuth } from './context';
import { AnyObject } from '@smart-admin/types';
import useNotify from '../sideEffect/useNotify';

/**
 * Get a callback for calling the authProvider.checkAuth() method.
 * In case of rejection, redirects to the login page, displays a notification,
 * and throws an error.
 *
 * This is a low level hook. See those more specialized hooks
 * for common authentication tasks, based on useCheckAuth.
 *
 * @see useAuthenticated
 * @see useAuthState
 *
 * @returns {Function} checkAuth callback
 *
 * @example
 *
 * import { useCheckAuth } from 'react-admin';
 *
 * const MyProtectedPage = () => {
 *     const checkAuth = useCheckAuth();
 *     useEffect(() => {
 *         checkAuth().catch(() => {});
 *     }, []);
 *     return <p>Private content: EZAEZEZAET</p>
 * } // tip: use useAuthenticated() hook instead
 *
 * const MyPage = () => {
 *     const checkAuth = useCheckAuth();
 *     const [authenticated, setAuthenticated] = useState(true); // optimistic auth
 *     useEffect(() => {
 *         checkAuth({}, false)
 *              .then(() => setAuthenticated(true))
 *              .catch(() => setAuthenticated(false));
 *     }, []);
 *     return authenticated ? <Bar /> : <BarNotAuthenticated />;
 * } // tip: use useAuthState() hook instead
 */
const useCheckAuth = () => {
  const _checkAuth = useAuth(useCallback(s => s.checkAuth, []));
  const notify = useNotify();
  const logout = useLogout();

  const checkAuth = useCallback<CheckAuth>(
    (
      params: unknown = {},
      logoutOnFailure = true,
      redirectTo = defaultAuthParams.loginUrl,
      disableNotification = false
    ) =>
      _checkAuth(params).catch(error => {
        if (logoutOnFailure) {
          logout({}, error && error.redirectTo ? error.redirectTo : redirectTo);
          const shouldSkipNotify =
            disableNotification || (error && error.message === false);
          !shouldSkipNotify &&
            notify(
              getErrorMessage(error, 'ra.auth.auth_check_error') as string,
              'warning'
            );
        }
        throw error;
      }),
    [_checkAuth, logout, notify]
  );

  return checkAuth;
};

/**
 * Check if the current user is authenticated by calling authProvider.checkAuth().
 * Logs the user out on failure.
 *
 * @param {Object} params The parameters to pass to the authProvider
 * @param {boolean} logoutOnFailure Whether the user should be logged out if the authProvider fails to authenticate them. True by default.
 * @param {string} redirectTo The login form url. Defaults to '/login'
 * @param {boolean} disableNotification Avoid showing a notification after the user is logged out. false by default.
 *
 * @return {Promise} Resolved to the authProvider response if the user passes the check, or rejected with an error otherwise
 */
type CheckAuth = (
  params?: unknown,
  logoutOnFailure?: boolean,
  redirectTo?: string,
  /** @deprecated to disable the notification, authProvider.checkAuth() should return an object with an error property set to true */
  disableNotification?: boolean
) => Promise<unknown>;

const getErrorMessage = (error: string | AnyObject, defaultMessage: string) =>
  typeof error === 'string' ? error : error.message ? error.message : defaultMessage;

export default useCheckAuth;
