import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { defaultAuthParams, useAuth } from './context';

/**
 * Get a callback for calling the authProvider.login() method
 * and redirect to the previous authenticated page (or the home page) on success.
 *
 * @see useAuthProvider
 *
 * @returns {Function} login callback
 *
 * @example
 *
 * import { useLogin } from 'react-admin';
 *
 * const LoginButton = () => {
 *     const [loading, setLoading] = useState(false);
 *     const login = useLogin();
 *     const handleClick = {
 *         setLoading(true);
 *         login({ username: 'john', password: 'p@ssw0rd' }, '/posts')
 *             .then(() => setLoading(false));
 *     }
 *     return <button onClick={handleClick}>Login</button>;
 * }
 */
const useLogin = () => {
  const _login = useAuth(useCallback(s => s.login, []));
  const locationState = useLocation().state;
  const navigate = useNavigate();
  const nextPathName = locationState && locationState.nextPathname;
  const nextSearch = locationState && locationState.nextSearch;

  const login = useCallback<Login>(
    (params: unknown = {}, pathName) =>
      _login(params).then(ret => {
        const redirectUrl = pathName
          ? pathName
          : nextPathName + nextSearch || defaultAuthParams.afterLoginUrl;
        navigate(redirectUrl);
        return ret;
      }),
    [_login, navigate, nextPathName, nextSearch]
  );

  return login;
};

/**
 * Log a user in by calling the authProvider.login() method
 *
 * @param {Object} params Login parameters to pass to the authProvider. May contain username/email, password, etc
 * @param {string} pathName The path to redirect to after login. By default, redirects to the home page, or to the last page visited after disconnection.
 *
 * @return {Promise} The authProvider response
 */
type Login = (params: unknown, pathName?: string) => Promise<unknown>;

export default useLogin;
