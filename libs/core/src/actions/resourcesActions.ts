import { ResourceDefinition } from '../types';

export const REGISTER_RESOURCE = 'RA/REGISTER_RESOURCE';

export interface RegisterResourceAction {
  readonly type: typeof REGISTER_RESOURCE;
  readonly payload: ResourceDefinition;
}

export const registerResource = (
  resource: ResourceDefinition
): RegisterResourceAction => ({
  type: REGISTER_RESOURCE,
  payload: resource,
});

export const UNREGISTER_RESOURCE = 'RA/UNREGISTER_RESOURCE';

export interface UnregisterResourceAction {
  readonly type: typeof UNREGISTER_RESOURCE;
  readonly payload: string;
}

export const unregisterResource = (resourceName: string): UnregisterResourceAction => ({
  type: UNREGISTER_RESOURCE,
  payload: resourceName,
});
