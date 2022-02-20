import { useMemo } from "react";

export type Dispatch<State> = (_: State) => State;
export type Reducer<State> = [_: State, _: Dispatch<State>];

export type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export function useSelectors<State, Selectors>(
  reducer: [state: State],
  mapStateToSelectors: (_: State) => Selectors
): Selectors {
  const [state] = reducer;
  return useMemo(
    () => mapStateToSelectors(state),
    [state, mapStateToSelectors]
  );
}

export function useActions<State, Actions>(
  reducer: Reducer<State>,
  mapDispatchToActions: (_: Dispatch<State>) => Actions
): Actions {
  const [, dispatch] = reducer;
  return useMemo(
    () => mapDispatchToActions(dispatch),
    [dispatch, mapDispatchToActions]
  );
}
