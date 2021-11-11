import { AnyObject } from '@smart-admin/types';
import { GetState, SetState, StoreApi } from 'zustand';

export type StateCreator<
  TState extends AnyObject,
  TActions extends AnyObject = TState,
  TSetState = SetState<TState>,
  TGetState = GetState<TState & TActions>,
  TStoreApi = StoreApi<TState & TActions>
> = (set: TSetState, get: TGetState, api: TStoreApi) => TActions;
