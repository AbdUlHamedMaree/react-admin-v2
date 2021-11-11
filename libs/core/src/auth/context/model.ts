/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { UserIdentity } from '../../types';

export type AuthActions = {
  login: (params: unknown) => Promise<unknown>;
  logout: (params: unknown) => Promise<void | false | string>;
  checkAuth: (params: unknown) => Promise<void>;
  checkError: (error: unknown) => Promise<void>;
  getPermissions: (params: unknown) => Promise<unknown>;
  getIdentity?: () => Promise<UserIdentity>;
  [key: string]: any;
};

export type AuthState = {};
