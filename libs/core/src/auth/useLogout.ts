import { useCallback } from 'react';

import { useAuth, defaultAuthParams } from './context';
import { useLocation, useNavigate } from 'react-router-dom';
import { Location } from 'history';

/**
 * Get a callback for calling the authProvider.logout() method,
 * redirect to the login page, and clear the Redux state.
 *
 * @see useAuthProvider
 *
 * @returns {Function} logout callback
 *
 * @example
 *
 * import { useLogout } from 'react-admin';
 *
 * const LogoutButton = () => {
 *     const logout = useLogout();
 *     const handleClick = () => logout();
 *     return <button onClick={handleClick}>Logout</button>;
 * }
 */
const useLogout = (): Logout => {
  const _logout = useAuth(useCallback(s => s.logout, []));

  /**
   * We need the current location to pass in the router state
   * so that the login hook knows where to redirect to as next route after login.
   *
   * But if we used useLocation to get it, the logout function
   * would be rebuilt each time the user changes location. Consequently, that
   * would force a rerender of all components using this hook upon navigation
   * (CoreAdminRouter for example).
   *
   * To avoid that, we read the location directly from history which is mutable.
   * See: https://reacttraining.com/react-router/web/api/history/history-is-mutable
   */
  const location = useLocation();
  const navigate = useNavigate();

  const logout = useCallback<Logout>(
    (
      params = {},
      redirectTo = defaultAuthParams.loginUrl,
      redirectToCurrentLocationAfterLogin = true
    ) =>
      _logout(params).then(redirectToFromProvider => {
        // dispatch(clearState()); // NOTE: Clear the state.
        if (redirectToFromProvider === false) {
          // do not redirect
          return;
        }
        // redirectTo can contain a query string, e.g. '/login?foo=bar'
        // we must split the redirectTo to pass a structured location to history.push()
        const redirectToParts = (redirectToFromProvider || redirectTo).split('?');
        const newLocation: Partial<Location> = {
          pathname: redirectToParts[0],
        };
        if (redirectToCurrentLocationAfterLogin && location.pathname) {
          newLocation.state = {
            nextPathname: location.pathname,
            nextSearch: location.search,
          };
        }
        if (redirectToParts[1]) {
          newLocation.search = redirectToParts[1];
        }
        navigate(newLocation);
        return redirectToFromProvider;
      }),
    [_logout, location.pathname, location.search, navigate]
  );

  return logout;
};

/**
 * Log the current user out by calling the authProvider.logout() method,
 * and redirect them to the login screen.
 *
 * @param {Object} params The parameters to pass to the authProvider
 * @param {string} redirectTo The path name to redirect the user to (optional, defaults to login)
 * @param {boolean} redirectToCurrentLocationAfterLogin Whether the button shall record the current location to redirect to it after login. true by default.
 *
 * @return {Promise} The authProvider response
 */
type Logout = (
  params?: unknown,
  redirectTo?: string,
  redirectToCurrentLocationAfterLogin?: boolean
) => Promise<unknown>;

export default useLogout;
