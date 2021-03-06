import { useEffect } from 'react';

import useCheckAuth from './useCheckAuth';
import { useSafeSetState } from '@smart-admin/utils';

/**
 * Hook for getting the authentication status
 *
 * Calls the authProvider.checkAuth() method asynchronously.
 *
 * The return value updates according to the authProvider request state:
 *
 * - loading: true just after mount, while the authProvider is being called. false once the authProvider has answered.
 * - loaded: the opposite of loading.
 * - authenticated: true while loading. then true or false depending on the authProvider response.
 *
 * To avoid rendering a component and force waiting for the authProvider response, use the useAuthState() hook
 * instead of the useAuthenticated() hook.
 *
 * You can render different content depending on the authenticated status.
 *
 * @see useAuthenticated()
 *
 * @param {Object} params Any params you want to pass to the authProvider
 *
 * @returns The current auth check state. Destructure as { authenticated, error, loading, loaded }.
 *
 * @example
 * import { useAuthState, Loading } from 'react-admin';
 *
 * const MyPage = () => {
 *     const { loading, authenticated } = useAuthState();
 *     if (loading) {
 *         return <Loading />;
 *     }
 *     if (authenticated) {
 *        return <AuthenticatedContent />;
 *     }
 *     return <AnonymousContent />;
 * };
 */
const useAuthState = (params: unknown = {}) => {
  const [state, setState] = useSafeSetState({
    loading: true,
    authenticated: true, // optimistic
  });
  const checkAuth = useCheckAuth();
  useEffect(() => {
    checkAuth(params, false)
      .then(() => setState({ loading: false, authenticated: true }))
      .catch(() => setState({ loading: false, authenticated: false }));
  }, [checkAuth, params, setState]);
  return state;
};

export default useAuthState;
