import { createZustandContext } from '@smart-admin/utils';
import { CreateActionsModel, CreateStateModel } from './model';

export const [CreateProvider, useCreate] = createZustandContext<
  CreateStateModel,
  CreateActionsModel
>();
