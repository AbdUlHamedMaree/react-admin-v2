/* eslint-disable @typescript-eslint/ban-types */
import { OnSuccess, OnFailure, RecordModel } from '@smart-admin/system';
import { RedirectionSideEffect } from '../../../../sideEffect';
import {
  SetOnFailure,
  SetOnSuccess,
  SetTransformData,
  TransformData,
} from '../../../saveModifiers';

export type CreateStateModel<RecordType extends Omit<RecordModel, 'id'> = RecordModel> = {
  basePath?: string;
  // Necessary for actions (EditActions) which expect a data prop containing the record
  // @deprecated - to be removed in 4.0d
  data?: RecordType;
  defaultTitle: string;
  loading: boolean;
  loaded: boolean;
  hasCreate?: boolean;
  hasEdit?: boolean;
  hasList?: boolean;
  hasShow?: boolean;
  onSuccessRef: React.MutableRefObject<OnSuccess>;
  onFailureRef: React.MutableRefObject<OnFailure>;
  transformRef: React.MutableRefObject<TransformData>;
  save: (
    record: Partial<RecordModel>,
    redirect: RedirectionSideEffect,
    callbacks?: {
      onSuccess?: OnSuccess;
      onFailure?: OnFailure;
      transform?: TransformData;
    }
  ) => void;
  saving: boolean;
  setOnSuccess: SetOnSuccess;
  setOnFailure: SetOnFailure;
  setTransform: SetTransformData;
  successMessage?: string;
  record?: Partial<RecordType>;
  redirect: RedirectionSideEffect;
  resource: string;
  version: number;
};

export type CreateActionsModel = {};
