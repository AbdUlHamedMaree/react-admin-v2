import { Identifier } from './identifier';

export interface RecordModel {
  id: Identifier;
  [key: string]: unknown;
}
