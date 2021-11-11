import { useSafeSetState } from '@smart-admin/utils';
import { useEffect } from 'react';

import useGetPermissions from './useGetPermissions';

interface State<Permissions, Error> {
  loading: boolean;
  permissions?: Permissions;
  error?: Error;
}

const emptyParams = {};

/**
 * Hook for getting user permissions
 *
 * Calls the authProvider.getPermissions() method asynchronously.
 * If the authProvider returns a rejected promise, returns empty permissions.
 *
 * The return value updates according to the request state:
 *
 * - start: { loading: true, loaded: false }
 * - success: { permissions: [any], loading: false, loaded: true }
 * - error: { error: [error from provider], loading: false, loaded: true }
 *
 * Useful to enable features based on user permissions
 *
 * @param {Object} params Any params you want to pass to the authProvider
 *
 * @returns The current auth check state. Destructure as { permissions, error, loading, loaded }.
 *
 * @example
 *     import { usePermissions } from 'react-admin';
 *
 *     const PostDetail = props => {
 *         const { loaded, permissions } = usePermissions();
 *         if (loaded && permissions == 'editor') {
 *             return <PostEdit {...props} />
 *         } else {
 *             return <PostShow {...props} />
 *         }
 *     };
 */
const usePermissions = <Permissions = unknown, Error = unknown>(params = emptyParams) => {
  const [state, setState] = useSafeSetState<State<Permissions, Error>>({
    loading: true,
  });
  const getPermissions = useGetPermissions();
  useEffect(() => {
    getPermissions(params)
      .then((permissions: any) => {
        setState({ loading: false, permissions });
      })
      .catch(error => {
        setState({
          loading: false,
          error,
        });
      });
  }, [getPermissions, params, setState]);
  return state;
};

export default usePermissions;
