import { useCallback } from 'react';
import { useAuth } from './context';

/**
 * Get a callback for calling the authProvider.getPermissions() method.
 *
 * @see useAuthProvider
 *
 * @returns {Function} getPermissions callback
 *
 * This is a low level hook. See those more specialized hooks
 * offering state handling.
 *
 * @see usePermissions
 *
 * @example
 *
 * import { useGetPermissions } from 'react-admin';
 *
 * const Roles = () => {
 *     const [permissions, setPermissions] = useState([]);
 *     const getPermissions = useGetPermissions();
 *     useEffect(() => {
 *         getPermissions().then(permissions => setPermissions(permissions))
 *     }, [])
 *     return (
 *         <ul>
 *             {permissions.map((permission, key) => (
 *                 <li key={key}>{permission}</li>
 *             ))}
 *         </ul>
 *     );
 * }
 */
const useGetPermissions = (): GetPermissions => {
  const _getPermissions = useAuth(useCallback(s => s.getPermissions, []));
  const getPermissions = useCallback<GetPermissions>(
    (params: unknown = {}) => _getPermissions(params),
    [_getPermissions]
  );

  return getPermissions;
};

/**
 * Proxy for calling authProvider.getPermissions()
 *
 * @param {Object} params The parameters to pass to the authProvider
 *
 * @return {Promise} The authProvider response
 */
type GetPermissions = (params?: unknown) => Promise<unknown>;

export default useGetPermissions;
