import { Identifier } from './identifier';
import { PaginationPayload } from './pagination-payload';
import { RecordModel as Rec } from './record';
import { SortPayload } from './sort-payload';
import { ValidUntil } from './valid-until';

export type DataProvider = {
  getList: <RecordType extends Rec = Rec>(
    resource: string,
    params: GetListParams
  ) => Promise<GetListResult<RecordType>>;

  getOne: <RecordType extends Rec = Rec>(
    resource: string,
    params: GetOneParams
  ) => Promise<GetOneResult<RecordType>>;

  getMany: <RecordType extends Rec = Rec>(
    resource: string,
    params: GetManyParams
  ) => Promise<GetManyResult<RecordType>>;

  getManyReference: <RecordType extends Rec = Rec>(
    resource: string,
    params: GetManyReferenceParams
  ) => Promise<GetManyReferenceResult<RecordType>>;

  update: <RecordType extends Rec = Rec>(
    resource: string,
    params: UpdateParams
  ) => Promise<UpdateResult<RecordType>>;

  updateMany: (resource: string, params: UpdateManyParams) => Promise<UpdateManyResult>;

  create: <RecordType extends Rec = Rec>(
    resource: string,
    params: CreateParams
  ) => Promise<CreateResult<RecordType>>;

  delete: <RecordType extends Rec = Rec>(
    resource: string,
    params: DeleteParams
  ) => Promise<DeleteResult<RecordType>>;

  deleteMany: (resource: string, params: DeleteManyParams) => Promise<DeleteManyResult>;

  [key: string]: unknown;
};

export interface GetListParams {
  pagination: PaginationPayload;
  sort: SortPayload;
  filter: unknown;
}
export interface GetListResult<RecordType = Rec> {
  data: RecordType[];
  total: number;
  validUntil?: ValidUntil;
}

export interface GetOneParams {
  id: Identifier;
}
export interface GetOneResult<RecordType = Rec> {
  data: RecordType;
  validUntil?: ValidUntil;
}

export interface GetManyParams {
  ids: Identifier[];
}
export interface GetManyResult<RecordType = Rec> {
  data: RecordType[];
  validUntil?: ValidUntil;
}

export interface GetManyReferenceParams {
  target: string;
  id: Identifier;
  pagination: PaginationPayload;
  sort: SortPayload;
  filter: unknown;
}
export interface GetManyReferenceResult<RecordType = Rec> {
  data: RecordType[];
  total: number;
  validUntil?: ValidUntil;
}

export interface UpdateParams<T = unknown> {
  id: Identifier;
  data: T;
  previousData: Rec;
}
export interface UpdateResult<RecordType = Rec> {
  data: RecordType;
  validUntil?: ValidUntil;
}

export interface UpdateManyParams<T = unknown> {
  ids: Identifier[];
  data: T;
}
export interface UpdateManyResult {
  data?: Identifier[];
  validUntil?: ValidUntil;
}

export interface CreateParams<T = unknown> {
  data: T;
}
export interface CreateResult<RecordType = Rec> {
  data: RecordType;
  validUntil?: ValidUntil;
}

export interface DeleteParams {
  id: Identifier;
  previousData: Rec;
}
export interface DeleteResult<RecordType = Rec> {
  data?: RecordType;
}

export interface DeleteManyParams {
  ids: Identifier[];
}
export interface DeleteManyResult {
  data?: Identifier[];
}

export type DataProviderResult<RecordType = Rec> =
  | CreateResult<RecordType>
  | DeleteResult<RecordType>
  | DeleteManyResult
  | GetListResult<RecordType>
  | GetManyResult<RecordType>
  | GetManyReferenceResult<RecordType>
  | GetOneResult<RecordType>
  | UpdateResult<RecordType>
  | UpdateManyResult;

export type DataProviderProxy = {
  getList: <RecordType extends Rec = Rec>(
    resource: string,
    params: GetListParams,
    options?: UseDataProviderOptions
  ) => Promise<GetListResult<RecordType>>;

  getOne: <RecordType extends Rec = Rec>(
    resource: string,
    params: GetOneParams,
    options?: UseDataProviderOptions
  ) => Promise<GetOneResult<RecordType>>;

  getMany: <RecordType extends Rec = Rec>(
    resource: string,
    params: GetManyParams,
    options?: UseDataProviderOptions
  ) => Promise<GetManyResult<RecordType>>;

  getManyReference: <RecordType extends Rec = Rec>(
    resource: string,
    params: GetManyReferenceParams,
    options?: UseDataProviderOptions
  ) => Promise<GetManyReferenceResult<RecordType>>;

  update: <RecordType extends Rec = Rec>(
    resource: string,
    params: UpdateParams,
    options?: UseDataProviderOptions
  ) => Promise<UpdateResult<RecordType>>;

  updateMany: (
    resource: string,
    params: UpdateManyParams,
    options?: UseDataProviderOptions
  ) => Promise<UpdateManyResult>;

  create: <RecordType extends Rec = Rec>(
    resource: string,
    params: CreateParams,
    options?: UseDataProviderOptions
  ) => Promise<CreateResult<RecordType>>;

  delete: <RecordType extends Rec = Rec>(
    resource: string,
    params: DeleteParams,
    options?: UseDataProviderOptions
  ) => Promise<DeleteResult<RecordType>>;

  deleteMany: (
    resource: string,
    params: DeleteManyParams,
    options?: UseDataProviderOptions
  ) => Promise<DeleteManyResult>;

  [key: string]: unknown;
};

export type MutationMode = 'pessimistic' | 'optimistic' | 'undoable';
export type OnSuccess = (response?: unknown) => void;
export type OnFailure = (error?: unknown) => void;

export interface UseDataProviderOptions {
  action?: string;
  fetch?: string;
  meta?: Record<string, unknown>;
  // @deprecated use mode: 'undoable' instead
  undoable?: boolean;
  mutationMode?: MutationMode;
  onSuccess?: OnSuccess;
  onFailure?: OnFailure;
  enabled?: boolean;
}

export type LegacyDataProvider = (
  type: string,
  resource: string,
  params: unknown
) => Promise<unknown>;

export interface ResourceDefinition {
  readonly name: string;
  readonly options?: unknown;
  readonly hasList?: boolean;
  readonly hasEdit?: boolean;
  readonly hasShow?: boolean;
  readonly hasCreate?: boolean;
  readonly icon?: unknown;
}
