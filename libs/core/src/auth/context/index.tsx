import { createZustandContext } from '@smart-admin/utils';
import { AuthActions, AuthState } from './model';

export const [AuthProvider, useAuth] = createZustandContext<AuthState, AuthActions>();
export { AuthActions, AuthState };

export const defaultAuthParams = {
  loginUrl: '/login',
  afterLoginUrl: '/',
};
