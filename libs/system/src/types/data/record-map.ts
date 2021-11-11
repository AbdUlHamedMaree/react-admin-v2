import { RecordModel as Rec } from './record';

export type RecordMap<RecordType = Rec> = Record<string | number, RecordType>;
