import { crudGetMany, crudGetMatching } from './dataActions';
import { PaginationPayload, SortPayload, Identifier } from '../types';
import { AnyObject } from '@smart-admin/types';

export const CRUD_GET_MANY_ACCUMULATE = 'RA/CRUD_GET_MANY_ACCUMULATE';

export interface CrudGetManyAccumulateAction {
  readonly type: typeof CRUD_GET_MANY_ACCUMULATE;
  readonly payload: {
    resource: string;
    ids: Identifier[];
  };
  readonly meta: {
    accumulate: any;
  };
}

export const crudGetManyAccumulate = (
  resource: string,
  ids: Identifier[]
): CrudGetManyAccumulateAction => ({
  type: CRUD_GET_MANY_ACCUMULATE,
  payload: { resource, ids },
  meta: { accumulate: crudGetMany },
});

export const CRUD_GET_MATCHING_ACCUMULATE = 'RA/CRUD_GET_MATCHING_ACCUMULATE';

export interface CrudGetMatchingAccumulateAction {
  readonly type: typeof CRUD_GET_MATCHING_ACCUMULATE;
  readonly meta: {
    accumulate: () => any;
    accumulateValues?: () => boolean;
    accumulateKey?: string;
  };
}

export const crudGetMatchingAccumulate = (
  reference: string,
  relatedTo: string,
  pagination: PaginationPayload,
  sort: SortPayload,
  filter: AnyObject
): CrudGetMatchingAccumulateAction => {
  const action = crudGetMatching(reference, relatedTo, pagination, sort, filter);

  return {
    type: CRUD_GET_MATCHING_ACCUMULATE,
    meta: {
      accumulate: () => action,
      accumulateValues: () => true,
      accumulateKey: JSON.stringify({
        resource: reference,
        relatedTo,
        ...action.payload,
      }),
    },
  };
};
