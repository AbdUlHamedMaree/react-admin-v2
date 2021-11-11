import { useCallback } from 'react';

import useLogout from './useLogout';
import { useNotify } from '../sideEffect';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context';
import { AnyObject } from '@smart-admin/types';

let timer: NodeJS.Timeout | undefined;

/**
 * Returns a callback used to call the authProvider.checkError() method
 * and an error from the dataProvider. If the authProvider rejects the call,
 * the hook logs the user out and shows a logged out notification.
 *
 * Used in the useDataProvider hook to check for access denied responses
 * (e.g. 401 or 403 responses) and trigger a logout.
 *
 * @see useLogout
 * @see useDataProvider
 *
 * @returns {Function} logoutIfAccessDenied callback
 *
 * @example
 *
 * import { useLogoutIfAccessDenied, useNotify, DataProviderContext } from 'react-admin';
 *
 * const FetchRestrictedResource = () => {
 *     const dataProvider = useContext(DataProviderContext);
 *     const logoutIfAccessDenied = useLogoutIfAccessDenied();
 *     const notify = useNotify()
 *     useEffect(() => {
 *         dataProvider.getOne('secret', { id: 123 })
 *             .catch(error => {
 *                  logoutIfAccessDenied(error);
 *                  notify('server error', 'warning');
 *              })
 *     }, []);
 *     // ...
 * }
 */
const useLogoutIfAccessDenied = () => {
  const [checkError, checkAuth] = useAuth(
    useCallback(s => [s.checkError, s.checkAuth], [])
  );
  const logout = useLogout();
  const notify = useNotify();
  const navigate = useNavigate();
  const logoutIfAccessDenied = useCallback<LogoutIfAccessDenied>(
    (error, disableNotification) =>
      checkError(error)
        .then(() => false)
        .catch(async e => {
          const logoutUser = e?.logoutUser ?? true;

          //manual debounce
          if (timer) {
            // side effects already triggered in this tick, exit
            return true;
          }
          timer = setTimeout(() => {
            timer = undefined;
          }, 0);

          const shouldNotify = !(
            disableNotification ||
            (e && e.message === false) ||
            (error && error.message === false)
          );
          if (shouldNotify) {
            // notify only if not yet logged out
            checkAuth({})
              .then(() => {
                if (logoutUser) {
                  notify('ra.notification.logged_out', 'warning');
                } else {
                  notify('ra.notification.not_authorized', 'warning');
                }
              })
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              .catch(() => {});
          }
          const redirectTo =
            e && e.redirectTo
              ? e.redirectTo
              : error && error.redirectTo
              ? error.redirectTo
              : undefined;

          if (logoutUser) {
            logout({}, redirectTo);
          } else {
            navigate(redirectTo);
          }

          return true;
        }),
    [checkError, checkAuth, notify, logout, navigate]
  );
  return logoutIfAccessDenied;
};

/**
 * Call the authProvider.authError() method, using the error passed as argument.
 * If the authProvider rejects the call, logs the user out and shows a logged out notification.
 *
 * @param {Error} error An Error object (usually returned by the dataProvider)
 * @param {boolean} disableNotification Avoid showing a notification after the user is logged out. false by default.
 *
 * @return {Promise} Resolved to true if there was a logout, false otherwise
 */
type LogoutIfAccessDenied = (
  error?: AnyObject,
  /** @deprecated to disable the notification, authProvider.checkAuth() should return an object with an error property set to true */
  disableNotification?: boolean
) => Promise<boolean>;

export default useLogoutIfAccessDenied;
