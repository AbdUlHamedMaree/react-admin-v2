import { UserIdentity } from '../user-identity';

export type AuthProvider = {
  login: (params: unknown) => Promise<unknown>;
  logout: (params: unknown) => Promise<void | false | string>;
  checkAuth: (params: unknown) => Promise<void>;
  checkError: (error: unknown) => Promise<void>;
  getPermissions: (params: unknown) => Promise<unknown>;
  getIdentity?: () => Promise<UserIdentity>;
  [key: string]: unknown;
};
