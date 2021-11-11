import * as React from 'react';
import { ReactElement } from 'react';

import { RecordContextProvider } from '../../RecordContext';
import { CreateContext } from './CreateContext';
import { CreateControllerProps } from './useCreateController';
import { SaveContextProvider, usePickSaveContext } from '../SaveContext';
import { RecordModel } from '@smart-admin/system';

export type CreateContextProviderProps = {
  value: CreateControllerProps;
};

/**
 * Create a Create Context.
 *
 * @example
 *
 * const MyCreate = (props) => {
 *     const controllerProps = useCreateController(props);
 *     return (
 *         <CreateContextProvider value={controllerProps}>
 *             <MyCreateView>
 *         </CreateContextProvider>
 *     );
 * };
 *
 * const MyCreateView = () => {
 *     const record = useRecordContext();
 *     // or, to rerender only when the save operation change but not data
 *     const { saving } = useCreateContext();
 * }
 *
 * @see CreateContext
 * @see RecordContext
 */
export const CreateContextProvider: React.FC<CreateContextProviderProps> = ({
  children,
  value,
}) => (
  <CreateContext.Provider value={value}>
    <SaveContextProvider value={usePickSaveContext(value)}>
      <RecordContextProvider<Partial<RecordModel>> value={value && value.record}>
        {children}
      </RecordContextProvider>
    </SaveContextProvider>
  </CreateContext.Provider>
);
