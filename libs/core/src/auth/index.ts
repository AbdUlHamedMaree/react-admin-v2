import Authenticated from './Authenticated';
import useAuthState from './useAuthState';
import usePermissions from './usePermissions';
import usePermissionsOptimized from './usePermissionsOptimized';
import useAuthenticated from './useAuthenticated';
import WithPermissions from './WithPermissions';
import useLogin from './useLogin';
import useLogout from './useLogout';
import useCheckAuth from './useCheckAuth';
import useGetIdentity from './useGetIdentity';
import useGetPermissions from './useGetPermissions';
import useLogoutIfAccessDenied from './useLogoutIfAccessDenied';
export * from './types';
export * from './context';

export {
  // low-level hooks for calling a particular verb on the authProvider
  useLogin,
  useLogout,
  useCheckAuth,
  useGetIdentity,
  useGetPermissions,
  // hooks with state management
  usePermissions,
  usePermissionsOptimized,
  useAuthState,
  // hook with immediate effect
  useAuthenticated,
  useLogoutIfAccessDenied,
  // components
  Authenticated,
  WithPermissions,
};
