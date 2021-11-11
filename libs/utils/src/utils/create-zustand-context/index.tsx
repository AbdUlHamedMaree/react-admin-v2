import createContext, { UseContextStore } from 'zustand/context';
import { Draft } from 'immer';
import React, { memo } from 'react';
import { createStore } from '../create-store';
import { AnyObject, StateCreator } from '@smart-admin/types';

export type ProviderProps<TState extends AnyObject, TActions extends AnyObject> = {
  name: string;
  initialState: TState;
  actions: StateCreator<TState, TActions, (fn: (draft: Draft<TState>) => void) => void>;
  devtools?: boolean;
  children: React.ReactNode;
};

/**
 * Summery. The `createZustandContext` function takes a unique name and generate a
 * zustand `Provider` and `useStore`.
 *
 * - The `Provider` have `initialState` & `actions` props to interact with
 * zustand `create` function.
 *
 * - The `useStore` can be used to subscribe to any state/subState changes.
 *
 * @example
 * // models.ts
 * export type Actions = {
 *   setTitle: (newTitle: string) => void;
 * };
 *
 * export type State = {
 *   title: string;
 * };
 *
 * // provider.tsx
 * import { State, Actions } from './models';
 *
 * export const { Provider, useStore } = createZustandContext<
 *   State,
 *   Actions
 * >();
 *
 * export const TitleProvider: React.FC = ({ children }) => (
 *   <Provider
 *     name='unique-name'
 *     initialState={{ title: 'initial-value' }}
 *     actions={({ set }) => ({
 *       setTitle: newTitle =>
 *         set(state => {
 *           state.title = newTitle;
 *         }),
 *     })}
 *     children={children}
 *   />
 * );
 *
 * @returns {[FC<ProviderProps>, UseContextStore<TState & TActions>]} [Provider, useStore].
 */
export const createZustandContext = <
  TState extends AnyObject,
  TActions extends AnyObject
>() => {
  const { Provider: ContextProvider, useStore } = createContext<TState & TActions>();
  const Provider: React.FC<ProviderProps<TState, TActions>> = memo(
    ({ actions, initialState, name, devtools = true, children }) => {
      return (
        <ContextProvider
          createStore={() =>
            createStore({ devtools, persist: true, name })<TState, TActions>(
              initialState,
              actions
            )
          }
        >
          {children}
        </ContextProvider>
      );
    },
    (a, b) => a.name === b.name
  );
  return [Provider, useStore] as const;
};
