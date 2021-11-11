import { Identifier } from '../data/identifier';

export interface UserIdentity {
  id: Identifier;
  fullName?: string;
  avatar?: string;
  [key: string]: unknown;
}
