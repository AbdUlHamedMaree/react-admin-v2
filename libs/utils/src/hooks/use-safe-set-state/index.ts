import { useCallback, useEffect, useReducer, useRef } from 'react';

export const useSetState = <T>(initialState: T) => {
  const [state, setState] = useReducer<React.Reducer<T, T>>(
    (state, newState) => ({ ...state, ...newState }),
    initialState
  );
  return [state, setState] as const;
};

export const useSafeSetState = <T>(initialState: T) => {
  const [state, setState] = useSetState<T>(initialState);
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  const safeSetState: typeof setState = useCallback(
    args => (mountedRef.current ? setState(args) : undefined),
    [setState]
  );

  return [state, safeSetState] as const;
};
